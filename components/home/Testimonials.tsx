'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getTestimonials } from '@/lib/firestore';
import { Testimonial } from '@/types';
import { Star, Quote } from 'lucide-react';

// Static fallback testimonials when Firestore is empty
const fallbackTestimonials = [
  {
    id: '1',
    name: 'Priya Sundaram',
    location: 'Chennai, Tamil Nadu',
    rating: 5,
    comment: 'The Agrotourism farm stay was an absolute delight! Woke up to rooster calls, milked cows, and had the freshest meals ever. Rajeev sir made sure every detail was perfect.',
    packageName: 'Pollachi Agrotourism Farm Stay',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Karthik Rajan',
    location: 'Bangalore, Karnataka',
    rating: 5,
    comment: 'Witnessed Theyyam live at midnight — goosebumps! GP Travels took us to places no other agency would. Truly mood-based travel at its finest.',
    packageName: 'Theyyam & Unseen Kannur',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Meena Krishnamurthy',
    location: 'Coimbatore, Tamil Nadu',
    rating: 5,
    comment: 'Booked the mystery trek package and it exceeded all expectations. Hidden waterfalls, ancient temples, and local cuisine — this is what real travel feels like!',
    packageName: 'Mystery Trek Experience',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    createdAt: new Date(),
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTestimonials()
      .then(t => setTestimonials(t.slice(0, 3)))
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  }, []);

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <section className="relative section-pad overflow-hidden">
      {/* Background */}
      <Image
        src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80"
        alt="Nature background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[var(--forest)]/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block bg-white/10 border border-white/20 text-white/80 font-semibold text-sm uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white mt-2 mb-3">
            What Our Travelers Say
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">Real stories from real adventures across Tamil Nadu</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white/10 p-6 rounded-2xl animate-pulse h-48" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayTestimonials.map((t, idx) => (
              <div
                key={t.id}
                className={`bg-white/10 backdrop-blur-sm border border-white/20 p-7 rounded-2xl card-hover ${idx === 1 ? 'md:-translate-y-4' : ''}`}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < t.rating ? '#A7C957' : 'none'} className="text-[#A7C957]" />
                  ))}
                </div>

                {/* Quote */}
                <Quote className="text-[var(--primary-light)] mb-3 opacity-60" size={28} />
                <p className="text-white/85 italic leading-relaxed mb-6">"{t.comment}"</p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  {t.avatarUrl ? (
                    <Image
                      src={t.avatarUrl}
                      alt={t.name}
                      width={44}
                      height={44}
                      className="rounded-full object-cover border-2 border-[var(--primary-light)]"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center text-white font-bold text-lg">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-white/50">{t.location}</p>
                  </div>
                </div>
                <p className="text-xs text-[var(--primary-light)]/80 mt-3 font-medium">📦 {t.packageName}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
