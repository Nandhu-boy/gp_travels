'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllPackages } from '@/lib/firestore';
import { TravelPackage, PackageCategory } from '@/types';
import PackageCard from '@/components/packages/PackageCard';
import { staticPackages } from '@/lib/staticPackages';

const CATEGORIES: PackageCategory[] = [
  'Agrotourism', 'Spiritual', 'Mystery', 'Trek',
  'Adventure', 'Workation', 'Festival', 'Corporate', 'Weekend'
];

function getVisibleStaticPackages() {
  if (typeof window === 'undefined') return staticPackages;
  try {
    const deleted = JSON.parse(localStorage.getItem('deletedStaticPackages') || '[]');
    const deletedSet = new Set(deleted);
    return staticPackages.filter(p => !deletedSet.has(p.id));
  } catch {
    return staticPackages;
  }
}

function PackagesContent() {
  const searchParams = useSearchParams();
  const visibleStatic = getVisibleStaticPackages();
  const [packages, setPackages] = useState<TravelPackage[]>(visibleStatic);
  const [filtered, setFiltered] = useState<TravelPackage[]>(visibleStatic);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  // Try to load from Firestore in background; merge with visible static
  useEffect(() => {
    getAllPackages()
      .then(p => {
        if (p.length > 0) {
          // Merge Firestore + remaining static (avoid duplicates)
          const firestoreIds = new Set(p.map(pkg => pkg.id));
          const merged = [...p, ...visibleStatic.filter(s => !firestoreIds.has(s.id))];
          setPackages(merged);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    const q = searchParams.get('search');
    if (cat) setActiveCategory(cat);
    if (q) setSearch(q);
  }, [searchParams]);

  useEffect(() => {
    let result = packages;
    if (activeCategory !== 'All') result = result.filter(p => p.category === activeCategory);
    if (search) result = result.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [activeCategory, search, packages]);

  const categoryEmoji: Record<string, string> = {
    All: '🌍', Agrotourism: '🌾', Spiritual: '🕌', Mystery: '🌿', Trek: '🏔️',
    Adventure: '🚀', Workation: '💻', Festival: '🎉', Corporate: '🏢', Weekend: '🏕️',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Search */}
      <input
        type="text" placeholder="🔍 Search by name or location..."
        value={search} onChange={e => setSearch(e.target.value)}
        className="w-full max-w-md mx-auto block bg-white border-2 border-green-200 rounded-full px-5 py-3 mb-8 shadow-[0_4px_15px_rgba(76,175,80,0.1)] focus:outline-none focus:ring-3 focus:ring-[var(--grass-light)]/30 focus:border-[var(--grass)] font-bold text-[var(--wood)] transition-all"
      />

      {/* Category filters — cartoon pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {['All', ...CATEGORIES].map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-extrabold transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-[var(--grass)] to-[var(--grass-light)] text-white shadow-[0_3px_0_var(--grass-dark),0_4px_12px_rgba(76,175,80,0.3)] -translate-y-0.5'
                : 'bg-white text-[var(--wood)] border-2 border-green-200 hover:border-[var(--grass)] hover:bg-green-50 hover:-translate-y-0.5'
            }`}>
            {categoryEmoji[cat] || '📦'} {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-[var(--wood)]/50 text-sm mb-6 font-bold">🎯 {filtered.length} packages found</p>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-80 bg-white rounded-3xl animate-pulse border-2 border-green-100" />)}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(pkg => <PackageCard key={pkg.id} package={pkg} />)}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🏝️</p>
          <p className="text-[var(--wood)]/50 text-lg font-bold">No packages found. Try a different filter!</p>
        </div>
      )}
    </div>
  );
}

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-[var(--cream)] pt-16">
      {/* Page header — cartoon style */}
      <div className="relative bg-gradient-to-br from-[var(--grass-dark)] via-[var(--grass)] to-[var(--grass-light)] py-16 px-4 text-center overflow-hidden">
        <div className="absolute top-4 left-10 text-5xl opacity-20 animate-float">🌿</div>
        <div className="absolute top-8 right-16 text-4xl opacity-15 animate-float" style={{animationDelay: '2s'}}>🦋</div>
        <div className="absolute bottom-4 left-1/4 text-3xl opacity-10 animate-float" style={{animationDelay: '4s'}}>🍃</div>
        <div className="relative z-10">
          <span className="text-5xl mb-3 block">🎒</span>
          <h1 className="text-4xl md:text-5xl text-white font-black mb-3">All Packages</h1>
          <p className="text-white/70 font-bold">Find your perfect mood-based escape ✨</p>
        </div>
        {/* Wavy bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 50" fill="var(--cream)" className="w-full"><path d="M0,25 C360,50 720,0 1080,25 C1260,37 1360,30 1440,25 L1440,50 L0,50 Z"/></svg>
        </div>
      </div>
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-80 bg-white rounded-2xl animate-pulse" />)}
          </div>
        </div>
      }>
        <PackagesContent />
      </Suspense>
    </div>
  );
}
