import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { TravelPackage } from '@/types';

const categoryEmoji: Record<string, string> = {
  Agrotourism: '🌾', Spiritual: '🕌', Mystery: '🌿', Trek: '🏔️',
  Adventure: '🚀', Workation: '💻', Festival: '🎉', Corporate: '🏢', Weekend: '🏕️',
};

export default function PackageCard({ package: pkg }: { package: TravelPackage }) {
  const discount = pkg.originalPrice
    ? Math.round((1 - pkg.price / pkg.originalPrice) * 100)
    : null;

  return (
    <Link href={`/packages/${pkg.id}`} className="block group">
      <div className="bg-white rounded-3xl overflow-hidden card-hover shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-2 border-green-100/50">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          {pkg.thumbnailImage ? (
            <Image
              src={pkg.thumbnailImage}
              alt={pkg.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--grass)] to-[var(--water)] flex items-center justify-center text-5xl">
              🌴
            </div>
          )}

          {/* Category badge — cartoon pill */}
          <div className="absolute top-3 left-3">
            <span className="text-xs font-extrabold px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[var(--wood)] shadow-md border border-white/50">
              {categoryEmoji[pkg.category] || '📦'} {pkg.category}
            </span>
          </div>

          {/* Discount badge — bouncy */}
          {discount && (
            <div className="absolute top-3 right-3 bg-[var(--berry)] text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-[0_2px_0_#c62828,0_3px_10px_rgba(239,83,80,0.4)]">
              {discount}% OFF 🔥
            </div>
          )}

          {/* Featured */}
          {pkg.isFeatured && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-[var(--sun)]/90 backdrop-blur-sm text-[var(--wood)] text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md">
              <Star size={12} fill="currentColor" /> Featured
            </div>
          )}

          {/* Wavy bottom edge */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg viewBox="0 0 400 20" fill="white" className="w-full"><path d="M0,10 C100,20 200,0 300,10 C350,15 375,12 400,10 L400,20 L0,20 Z"/></svg>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 pt-2">
          <h3 className="text-base font-extrabold text-[var(--wood)] line-clamp-2 mb-2 group-hover:text-[var(--grass-dark)] transition-colors leading-snug">
            {pkg.title}
          </h3>

          <p className="text-[var(--wood)]/50 text-sm line-clamp-2 mb-3 leading-relaxed font-bold">{pkg.description}</p>

          {/* Meta — cartoon chips */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--wood)]/60 mb-4 font-bold">
            <span className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
              📍 {pkg.location}
            </span>
            <span className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
              ⏱️ {pkg.duration}
            </span>
            <span className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
              👥 Max {pkg.maxGroupSize}
            </span>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[var(--wood)]/40 font-bold uppercase">Starting from</div>
              <div className="flex items-baseline gap-1">
                {pkg.originalPrice && (
                  <span className="text-[var(--wood)]/30 line-through text-sm font-bold">₹{pkg.originalPrice.toLocaleString()}</span>
                )}
                <span className="text-[var(--grass-dark)] font-black text-xl">₹{pkg.price.toLocaleString()}</span>
              </div>
            </div>
            <div className="btn-primary !py-2 !px-4 !text-xs !rounded-full !shadow-[0_2px_0_var(--grass-dark),0_3px_8px_rgba(76,175,80,0.25)] group-hover:!-translate-y-1 transition-all">
              Explore <ArrowRight size={13} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
