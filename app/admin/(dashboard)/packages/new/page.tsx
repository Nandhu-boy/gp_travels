import PackageForm from '@/components/admin/PackageForm';

export default function NewPackagePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Package</h1>
        <p className="text-gray-600">Add a new travel package to your collection</p>
      </div>
      <PackageForm />
    </div>
  );
}