'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPackageById } from '@/lib/firestore';
import { TravelPackage } from '@/types';
import PackageDetail from '@/components/packages/PackageDetail';
import { staticPackages } from '@/lib/staticPackages';

export default function PackagePage() {
  const params = useParams();
  const id = params.id as string;

  // Load static package instantly
  const staticPkg = staticPackages.find(p => p.id === id) || null;
  const [pkg, setPkg] = useState<TravelPackage | null>(staticPkg);

  // Try Firestore in background
  useEffect(() => {
    getPackageById(id)
      .then(p => { if (p) setPkg(p); })
      .catch(() => {});
  }, [id]);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-[var(--cream)] pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🌿</p>
          <h2 className="font-display text-2xl font-bold text-[var(--dark)] mb-2">Package Not Found</h2>
          <p className="text-gray-500">This package doesn't exist or has been removed.</p>
          <a href="/packages" className="mt-6 inline-block bg-[var(--primary)] text-white px-6 py-3 rounded-xl font-semibold">
            Browse All Packages
          </a>
        </div>
      </div>
    );
  }

  return <PackageDetail package={pkg} />;
}
