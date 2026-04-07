'use client';
import { useState } from 'react';
import { createPackage, updatePackage } from '@/lib/firestore';
import { TravelPackage, PackageCategory, ItineraryDay } from '@/types';
import { useRouter } from 'next/navigation';
import { Save, X, Plus } from 'lucide-react';
import ImageUploader from './ImageUploader';

const CATEGORIES: PackageCategory[] = [
  'Agrotourism', 'Spiritual', 'Mystery', 'Trek',
  'Adventure', 'Workation', 'Festival', 'Corporate', 'Weekend'
];

interface PackageFormProps {
  initialData?: TravelPackage;
  isEdit?: boolean;
}

export default function PackageForm({ initialData, isEdit = false }: PackageFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<TravelPackage>>({
    title: '',
    slug: '',
    category: 'Agrotourism',
    duration: '',
    price: 0,
    originalPrice: undefined,
    location: '',
    description: '',
    longDescription: '',
    highlights: [''],
    inclusions: [''],
    exclusions: [''],
    itinerary: [{ day: 1, title: '', description: '', activities: [''], meals: [], accommodation: '' }],
    images: [],
    thumbnailImage: '',
    maxGroupSize: 10,
    minAge: undefined,
    difficulty: 'Easy',
    isActive: true,
    isFeatured: false,
    tags: [],
    pdfUrl: '',
    ...initialData,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        ...formData,
        slug: formData.title?.toLowerCase().replace(/\s+/g, '-') || '',
        tags: formData.tags || [],
      };
      if (isEdit && initialData?.id) {
        await updatePackage(initialData.id, data);
      } else {
        await createPackage(data as any); // firestore adds timestamps
      }
      router.push('/admin/packages');
    } catch (error) {
      console.error('Error saving package:', error);
      alert('Error saving package. Please try again.');
    }
    setLoading(false);
  };

  const addItem = (field: 'highlights' | 'inclusions' | 'exclusions') => {
    setFormData({ ...formData, [field]: [...(formData[field] || []), ''] });
  };

  const removeItem = (field: 'highlights' | 'inclusions' | 'exclusions', index: number) => {
    setFormData({ ...formData, [field]: (formData[field] || []).filter((_, i) => i !== index) });
  };

  const updateItem = (field: 'highlights' | 'inclusions' | 'exclusions', index: number, value: string) => {
    const items = [...(formData[field] || [])];
    items[index] = value;
    setFormData({ ...formData, [field]: items });
  };

  const addItineraryDay = () => {
    const newDay: ItineraryDay = {
      day: (formData.itinerary?.length || 0) + 1,
      title: '',
      description: '',
      activities: [''],
      meals: [],
      accommodation: '',
    };
    setFormData({ ...formData, itinerary: [...(formData.itinerary || []), newDay] });
  };

  const removeItineraryDay = (index: number) => {
    setFormData({ ...formData, itinerary: (formData.itinerary || []).filter((_, i) => i !== index) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as PackageCategory })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            >
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g. 4D 3N"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price per person (₹) *</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (₹)</label>
            <input
              type="number"
              value={formData.originalPrice || ''}
              onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value ? parseInt(e.target.value) : undefined })}
              placeholder="Leave empty if no discount"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Group Size *</label>
            <input
              type="number"
              value={formData.maxGroupSize}
              onChange={(e) => setFormData({ ...formData, maxGroupSize: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as 'Easy' | 'Moderate' | 'Challenging' })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            >
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Challenging">Challenging</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Long Description *</label>
          <textarea
            value={formData.longDescription}
            onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
            rows={5}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            value={(formData.tags || []).join(', ')}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
            placeholder="e.g. agro, family, weekend"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
      </div>

      {/* Images */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Package Images</h2>
        <p className="text-sm text-gray-500 mb-6">Upload images for this package. The first image will be used as the thumbnail.</p>
        <ImageUploader
          existingImages={formData.images || []}
          packageId={initialData?.id}
          onImagesChange={(images, thumbnail) => setFormData({ ...formData, images, thumbnailImage: thumbnail })}
        />
      </div>

      {/* Highlights */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Highlights</h2>
        <div className="space-y-3">
          {(formData.highlights || []).map((highlight, i) => (
            <div key={i} className="flex gap-3">
              <input
                type="text"
                value={highlight}
                onChange={(e) => updateItem('highlights', i, e.target.value)}
                placeholder="Enter highlight"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
              <button type="button" onClick={() => removeItem('highlights', i)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl">
                <X size={20} />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addItem('highlights')} className="flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium">
            <Plus size={20} /> Add Highlight
          </button>
        </div>
      </div>

      {/* Inclusions & Exclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">What's Included</h2>
          <div className="space-y-3">
            {(formData.inclusions || []).map((inclusion, i) => (
              <div key={i} className="flex gap-3">
                <input
                  type="text"
                  value={inclusion}
                  onChange={(e) => updateItem('inclusions', i, e.target.value)}
                  placeholder="Enter inclusion"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
                <button type="button" onClick={() => removeItem('inclusions', i)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl">
                  <X size={20} />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addItem('inclusions')} className="flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium">
              <Plus size={20} /> Add Inclusion
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">What's Not Included</h2>
          <div className="space-y-3">
            {(formData.exclusions || []).map((exclusion, i) => (
              <div key={i} className="flex gap-3">
                <input
                  type="text"
                  value={exclusion}
                  onChange={(e) => updateItem('exclusions', i, e.target.value)}
                  placeholder="Enter exclusion"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
                <button type="button" onClick={() => removeItem('exclusions', i)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl">
                  <X size={20} />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addItem('exclusions')} className="flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium">
              <Plus size={20} /> Add Exclusion
            </button>
          </div>
        </div>
      </div>

      {/* Itinerary */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Itinerary</h2>
        <div className="space-y-6">
          {(formData.itinerary || []).map((day, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Day {day.day}</h3>
                <button type="button" onClick={() => removeItineraryDay(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Day title"
                  value={day.title}
                  onChange={(e) => {
                    const itinerary = [...(formData.itinerary || [])];
                    itinerary[i] = { ...itinerary[i], title: e.target.value };
                    setFormData({ ...formData, itinerary });
                  }}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
                <input
                  type="text"
                  placeholder="Accommodation"
                  value={day.accommodation}
                  onChange={(e) => {
                    const itinerary = [...(formData.itinerary || [])];
                    itinerary[i] = { ...itinerary[i], accommodation: e.target.value };
                    setFormData({ ...formData, itinerary });
                  }}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              <textarea
                placeholder="Day description"
                value={day.description}
                onChange={(e) => {
                  const itinerary = [...(formData.itinerary || [])];
                  itinerary[i] = { ...itinerary[i], description: e.target.value };
                  setFormData({ ...formData, itinerary });
                }}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] mb-4"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activities</label>
                <div className="space-y-2">
                  {day.activities.map((activity, j) => (
                    <div key={j} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Activity"
                        value={activity}
                        onChange={(e) => {
                          const itinerary = [...(formData.itinerary || [])];
                          const activities = [...itinerary[i].activities];
                          activities[j] = e.target.value;
                          itinerary[i] = { ...itinerary[i], activities };
                          setFormData({ ...formData, itinerary });
                        }}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const itinerary = [...(formData.itinerary || [])];
                          itinerary[i] = { ...itinerary[i], activities: itinerary[i].activities.filter((_, k) => k !== j) };
                          setFormData({ ...formData, itinerary });
                        }}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const itinerary = [...(formData.itinerary || [])];
                      itinerary[i] = { ...itinerary[i], activities: [...itinerary[i].activities, ''] };
                      setFormData({ ...formData, itinerary });
                    }}
                    className="flex items-center gap-1 text-sm text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium"
                  >
                    <Plus size={16} /> Add Activity
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={addItineraryDay} className="flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium">
            <Plus size={20} /> Add Day
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Settings</h2>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 rounded focus:ring-[var(--primary)]"
            />
            <span className="text-sm font-medium text-gray-700">Active (visible to customers)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-4 h-4 rounded focus:ring-[var(--primary)]"
            />
            <span className="text-sm font-medium text-gray-700">Featured on homepage</span>
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <Save size={20} />
          {loading ? 'Saving...' : isEdit ? 'Update Package' : 'Create Package'}
        </button>
      </div>
    </form>
  );
}
