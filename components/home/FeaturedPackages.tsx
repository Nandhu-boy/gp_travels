'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getFeaturedPackages } from '@/lib/firestore';
import { TravelPackage } from '@/types';
import PackageCard from '@/components/packages/PackageCard';
import { ArrowRight } from 'lucide-react';
import { staticPackages } from '@/lib/staticPackages';

function getFeaturedStatic() {
  if (typeof window === 'undefined') return staticPackages.filter(p => p.isFeatured).slice(0, 6);
  try {
    const deleted = JSON.parse(localStorage.getItem('deletedStaticPackages') || '[]');
    const deletedSet = new Set(deleted);
    return staticPackages.filter(p => p.isFeatured && !deletedSet.has(p.id)).slice(0, 6);
  } catch {
    return staticPackages.filter(p => p.isFeatured).slice(0, 6);
  }
}

export default function FeaturedPackages() {
  const [packages, setPackages] = useState<TravelPackage[]>(getFeaturedStatic());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFeaturedPackages()
      .then(p => { if (p.length > 0) setPackages(p); })
      .catch(() => {});
  }, []);

  const displayPackages = packages;

  return (
    <section className="section-pad bg-[var(--cream)] nature-pattern">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block bg-[var(--grass)]/10 text-[var(--grass-dark)] font-extrabold text-sm uppercase tracking-widest px-5 py-2 rounded-full mb-3 border-2 border-[var(--grass)]/20">
              ⭐ Handpicked For You
            </span>
            <h2 className="text-4xl md:text-5xl text-[var(--wood)] font-black">
              Featured Trips
            </h2>
            <p className="text-[var(--wood)]/50 mt-3 max-w-xl font-bold">
              Every trip is curated based on your mood 🎯
            </p>
          </div>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-[var(--grass-dark)] font-extrabold hover:gap-3 transition-all whitespace-nowrap bounce-hover"
          >
            View All Packages <ArrowRight size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="h-80 bg-white rounded-2xl animate-pulse shadow-sm" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPackages.map(pkg => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
