'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPackageById } from '@/lib/firestore';
import { TravelPackage } from '@/types';
import PackageForm from '@/components/admin/PackageForm';

export default function EditPackagePage() {
  const params = useParams();
  const id = params.id as string;
  const [pkg, setPkg] = useState<TravelPackage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPackageById(id)
      .then(p => setPkg(p))
      .catch(() => setPkg(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full" />
    </div>
  );

  if (!pkg) return (
    <div className="text-center py-20">
      <p className="text-5xl mb-4">📦</p>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Package not found</h2>
      <p className="text-gray-500">This package doesn't exist or couldn't be loaded.</p>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Package</h1>
        <p className="text-gray-600">Update the details of your travel package</p>
      </div>
      <PackageForm initialData={pkg} isEdit />
    </div>
  );
}
