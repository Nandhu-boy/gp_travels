import { getPackageById } from '@/lib/firestore';
import { notFound } from 'next/navigation';
import PackageForm from '@/components/admin/PackageForm';

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pkg = await getPackageById(id);
  if (!pkg) notFound();

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