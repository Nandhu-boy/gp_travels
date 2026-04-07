'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPackagesAdmin, deletePackage, updatePackage, createPackage } from '@/lib/firestore';
import { TravelPackage } from '@/types';
import { staticPackages } from '@/lib/staticPackages';
import { Edit, Trash2, Eye, Star, Box, Upload, Search, Filter } from 'lucide-react';

const categoryColors: Record<string, string> = {
  Agrotourism: 'bg-green-100 text-green-700',
  Spiritual:   'bg-amber-100 text-amber-700',
  Mystery:     'bg-purple-100 text-purple-700',
  Trek:        'bg-blue-100 text-blue-700',
  Adventure:   'bg-red-100 text-red-700',
  Workation:   'bg-teal-100 text-teal-700',
  Festival:    'bg-pink-100 text-pink-700',
  Corporate:   'bg-slate-100 text-slate-700',
  Weekend:     'bg-orange-100 text-orange-700',
};

export default function AdminPackagesPage() {
  const [firestorePackages, setFirestorePackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [syncing, setSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(false);
  const [deletedStaticIds, setDeletedStaticIds] = useState<string[]>([]);

  useEffect(() => {
    // Load deleted static package IDs from localStorage
    const saved = localStorage.getItem('deletedStaticPackages');
    if (saved) setDeletedStaticIds(JSON.parse(saved));
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      const pkgs = await getAllPackagesAdmin();
      setFirestorePackages(pkgs);
    } catch {
      setFirestorePackages([]);
    }
    setLoading(false);
  };

  // Merge: Firestore packages + static packages (exclude deleted static ones)
  const firestoreIds = new Set(firestorePackages.map(p => p.id));
  const deletedSet = new Set(deletedStaticIds);
  const allPackages = [
    ...firestorePackages,
    ...staticPackages
      .filter(p => !firestoreIds.has(p.id) && !deletedSet.has(p.id))
      .map(p => ({ ...p, _isStatic: true })),
  ] as (TravelPackage & { _isStatic?: boolean })[];

  // Filter
  let filtered = allPackages;
  if (filterCategory !== 'All') {
    filtered = filtered.filter(p => p.category === filterCategory);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q)
    );
  }

  const handleDelete = async (pkg: TravelPackage & { _isStatic?: boolean }) => {
    if (!confirm(`Are you sure you want to delete "${pkg.title}"?`)) return;

    if (pkg._isStatic) {
      // Static package — save to localStorage as deleted
      const updated = [...deletedStaticIds, pkg.id];
      setDeletedStaticIds(updated);
      localStorage.setItem('deletedStaticPackages', JSON.stringify(updated));
    } else {
      // Firestore package — delete from database
      try {
        await deletePackage(pkg.id);
        loadPackages();
      } catch {
        alert('Failed to delete. Make sure Firestore is enabled.');
      }
    }
  };

  const toggleActive = async (pkg: TravelPackage & { _isStatic?: boolean }) => {
    if (pkg._isStatic) {
      alert('This is a static package. Sync to Firestore first to edit.');
      return;
    }
    try {
      await updatePackage(pkg.id, { isActive: !pkg.isActive });
      loadPackages();
    } catch {
      alert('Failed to update. Make sure Firestore is enabled.');
    }
  };

  const toggleFeatured = async (pkg: TravelPackage & { _isStatic?: boolean }) => {
    if (pkg._isStatic) {
      alert('This is a static package. Sync to Firestore first to edit.');
      return;
    }
    try {
      await updatePackage(pkg.id, { isFeatured: !pkg.isFeatured });
      loadPackages();
    } catch {
      alert('Failed to update. Make sure Firestore is enabled.');
    }
  };

  // Push all static packages to Firestore
  const syncToFirestore = async () => {
    setSyncing(true);
    let count = 0;
    for (const pkg of staticPackages) {
      if (!firestoreIds.has(pkg.id)) {
        try {
          const { id, ...data } = pkg;
          await createPackage(data as any);
          count++;
        } catch (err) {
          console.error('Failed to sync:', pkg.title, err);
        }
      }
    }
    setSyncing(false);
    setSyncDone(true);
    if (count > 0) {
      alert(`Synced ${count} packages to Firestore!`);
      loadPackages();
    } else {
      alert('All packages already in Firestore.');
    }
  };

  const categories = ['All', ...Array.from(new Set(allPackages.map(p => p.category)))];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Packages</h1>
          <p className="text-gray-500 text-sm">{allPackages.length} total packages ({firestorePackages.length} in Firestore, {allPackages.length - firestorePackages.length} static)</p>
        </div>
        <div className="flex items-center gap-2">
          {allPackages.length - firestorePackages.length > 0 && (
            <button
              onClick={syncToFirestore}
              disabled={syncing}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              <Upload size={15} />
              {syncing ? 'Syncing...' : 'Sync All to Firestore'}
            </button>
          )}
          <Link href="/admin/packages/new"
            className="flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            + New Package
          </Link>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search packages..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="pl-9 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] appearance-none bg-white"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Packages Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(pkg => (
                <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                  {/* Package */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        {pkg.thumbnailImage ? (
                          <Image src={pkg.thumbnailImage} alt={pkg.title} width={44} height={44} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center text-white font-bold text-sm">
                            {pkg.title.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 text-sm truncate max-w-[200px]">{pkg.title}</div>
                        <div className="text-xs text-gray-400">{pkg.location}</div>
                      </div>
                    </div>
                  </td>
                  {/* Category */}
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColors[pkg.category] || 'bg-gray-100 text-gray-600'}`}>
                      {pkg.category}
                    </span>
                  </td>
                  {/* Duration */}
                  <td className="px-4 py-3 text-sm text-gray-600">{pkg.duration}</td>
                  {/* Price */}
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-gray-900">₹{pkg.price.toLocaleString()}</div>
                    {pkg.originalPrice && (
                      <div className="text-xs text-gray-400 line-through">₹{pkg.originalPrice.toLocaleString()}</div>
                    )}
                  </td>
                  {/* Status */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(pkg)}
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-full transition-colors ${
                        pkg.isActive
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {pkg.isActive ? 'Active' : 'Draft'}
                    </button>
                  </td>
                  {/* Featured */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleFeatured(pkg)}
                      className={`transition-colors ${pkg.isFeatured ? 'text-amber-400' : 'text-gray-300 hover:text-amber-300'}`}
                    >
                      <Star size={18} fill={pkg.isFeatured ? 'currentColor' : 'none'} />
                    </button>
                  </td>
                  {/* Source */}
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      (pkg as any)._isStatic
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-green-50 text-green-600'
                    }`}>
                      {(pkg as any)._isStatic ? 'Static' : 'Firestore'}
                    </span>
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link href={`/packages/${pkg.id}`} target="_blank"
                        className="p-1.5 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors" title="View">
                        <Eye size={15} />
                      </Link>
                      {!(pkg as any)._isStatic && (
                        <Link href={`/admin/packages/${pkg.id}`}
                          className="p-1.5 text-gray-400 hover:text-[var(--primary)] rounded-md hover:bg-green-50 transition-colors" title="Edit">
                          <Edit size={15} />
                        </Link>
                      )}
                      <button
                        onClick={() => handleDelete(pkg)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors" title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Box size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No packages found</h3>
            <p className="text-gray-500 mb-4">Try a different search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
