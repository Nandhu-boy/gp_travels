'use client';
import { useEffect, useState } from 'react';
import { getAllPackagesAdmin, getAllInquiries } from '@/lib/firestore';
import { TravelPackage, BookingInquiry } from '@/types';
import { staticPackages } from '@/lib/staticPackages';
import { Package, MessageSquare, TrendingUp, Star, Eye } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [firestorePackages, setFirestorePackages] = useState<TravelPackage[]>([]);
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAllPackagesAdmin().catch(() => []),
      getAllInquiries().catch(() => [])
    ]).then(([pkgs, inqs]) => {
      setFirestorePackages(pkgs);
      setInquiries(inqs);
      setLoading(false);
    });
  }, []);

  const firestoreIds = new Set(firestorePackages.map(p => p.id));
  const allPackages = [
    ...firestorePackages,
    ...staticPackages.filter(p => !firestoreIds.has(p.id)),
  ];
  const activePackages = allPackages.filter(p => p.isActive);
  const featuredPackages = allPackages.filter(p => p.isFeatured);
  const newInquiries = inquiries.filter(i => i.status === 'new');

  const stats = [
    { title: 'Total Packages', value: allPackages.length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Active', value: activePackages.length, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Featured', value: featuredPackages.length, icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'New Inquiries', value: newInquiries.length, icon: MessageSquare, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
        <p className="text-gray-500 text-sm">Welcome back! Here's your travel business overview.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-11 h-11 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <stat.icon className={stat.color} size={22} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link href="/admin/packages/new"
              className="block w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white py-2.5 px-4 rounded-lg font-medium transition-colors text-center text-sm">
              + Create New Package
            </Link>
            <Link href="/admin/packages"
              className="block w-full border border-gray-200 hover:border-[var(--primary)] text-gray-700 hover:text-[var(--primary)] py-2.5 px-4 rounded-lg font-medium transition-colors text-center text-sm">
              Manage Packages ({allPackages.length})
            </Link>
            <Link href="/admin/inquiries"
              className="block w-full border border-gray-200 hover:border-[var(--primary)] text-gray-700 hover:text-[var(--primary)] py-2.5 px-4 rounded-lg font-medium transition-colors text-center text-sm">
              View Inquiries {newInquiries.length > 0 && `(${newInquiries.length} new)`}
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Packages</h2>
          <div className="space-y-3">
            {allPackages.slice(0, 5).map(pkg => (
              <div key={pkg.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <div className="w-9 h-9 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {pkg.title.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{pkg.title}</p>
                  <p className="text-xs text-gray-400">{pkg.category} · {pkg.duration} · ₹{pkg.price.toLocaleString()}</p>
                </div>
                <Link href={`/packages/${pkg.id}`} target="_blank" className="text-gray-400 hover:text-blue-600">
                  <Eye size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
