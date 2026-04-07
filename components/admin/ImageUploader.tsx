'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, ImageIcon } from 'lucide-react';
import { uploadMultipleImages, deleteImage } from '@/lib/storage';

interface ImageUploaderProps {
  existingImages?: string[];
  onImagesChange: (images: string[], thumbnail: string) => void;
  packageId?: string;
}

export default function ImageUploader({
  existingImages = [],
  onImagesChange,
  packageId,
}: ImageUploaderProps) {
  const [images, setImages] = useState<string[]>(existingImages);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const folder = `packages/${packageId || 'temp'}`;
      const urls = await uploadMultipleImages(Array.from(files), folder);
      const updated = [...images, ...urls];
      setImages(updated);
      onImagesChange(updated, updated[0] || '');
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (url: string, index: number) => {
    try {
      await deleteImage(url);
    } catch {
      // Image may not exist in storage yet (external URL); ignore
    }
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    onImagesChange(updated, updated[0] || '');
  };

  const setAsThumbnail = (index: number) => {
    const reordered = [images[index], ...images.filter((_, i) => i !== index)];
    setImages(reordered);
    onImagesChange(reordered, reordered[0]);
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-[var(--primary)] bg-green-50'
            : 'border-gray-200 hover:border-[var(--primary)] hover:bg-green-50/30'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-3 text-gray-500">
            <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium">Uploading images...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <Upload size={32} />
            <div>
              <p className="font-medium text-gray-600">Click or drag images here</p>
              <p className="text-sm mt-1">PNG, JPG, WEBP up to 10MB each</p>
            </div>
          </div>
        )}
      </div>

      {/* Preview grid */}
      {images.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">
            {images.length} image{images.length > 1 ? 's' : ''} — first image is the thumbnail
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((url, i) => (
              <div key={url} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square">
                <Image
                  src={url}
                  alt={`Package image ${i + 1}`}
                  fill
                  className="object-cover"
                />
                {i === 0 && (
                  <div className="absolute top-2 left-2 bg-[var(--primary)] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    Thumbnail
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {i !== 0 && (
                    <button
                      type="button"
                      onClick={() => setAsThumbnail(i)}
                      className="bg-white text-gray-800 text-xs font-medium px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ImageIcon size={12} className="inline mr-1" />
                      Set as thumb
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemove(url, i)}
                    className="bg-red-500 text-white p-1.5 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
