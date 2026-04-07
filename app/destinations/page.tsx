import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';

const destinations = [
  {
    name: 'Kannur',
    description: 'Experience the mystical Theyyam ritual art form and unexplored backwaters',
    image: '/images/kannur.jpg',
    packages: 3,
    rating: 4.8,
    highlights: ['Theyyam Festival', 'Backwater Exploration', 'Forest Treks']
  },
  {
    name: 'Pollachi',
    description: 'Authentic agrotourism with working farms and sustainable agriculture',
    image: '/images/pollachi.jpg',
    packages: 2,
    rating: 4.9,
    highlights: ['Farm Stays', 'Organic Farming', 'Village Life']
  },
  {
    name: 'Rann of Kutch',
    description: 'White desert magic under the full moon at the famous Rann Utsav',
    image: '/images/rann.jpg',
    packages: 1,
    rating: 4.7,
    highlights: ['White Desert', 'Camel Safari', 'Cultural Shows']
  },
  {
    name: 'Chennai',
    description: 'Gateway to Tamil Nadu with rich history and modern vibes',
    image: '/images/chennai.jpg',
    packages: 4,
    rating: 4.6,
    highlights: ['Heritage Sites', 'Beach Life', 'Street Food']
  },
  {
    name: 'Madurai',
    description: 'Temple city with ancient architecture and spiritual significance',
    image: '/images/madurai.jpg',
    packages: 3,
    rating: 4.8,
    highlights: ['Meenakshi Temple', 'Cultural Heritage', 'Local Crafts']
  },
  {
    name: 'Kodaikanal',
    description: 'Queen of hill stations with misty mountains and serene lakes',
    image: '/images/kodaikanal.jpg',
    packages: 2,
    rating: 4.7,
    highlights: ['Hill Station', 'Trekking', 'Boating']
  }
];

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-[var(--cream)] pt-16">
      <div className="relative bg-gradient-to-br from-[var(--grass-dark)] via-[var(--grass)] to-[var(--water)] py-16 px-4 text-center overflow-hidden">
        <div className="absolute top-4 right-16 text-5xl opacity-20 animate-float">🗺️</div>
        <div className="absolute bottom-6 left-12 text-4xl opacity-15 animate-float" style={{animationDelay: '2s'}}>🧭</div>
        <div className="relative z-10">
          <span className="text-5xl mb-3 block">🏝️</span>
          <h1 className="text-4xl md:text-5xl text-white font-black mb-3">Explore Destinations</h1>
          <p className="text-white/70 font-bold">Discover hidden gems and iconic spots ✨</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 50" fill="var(--cream)" className="w-full"><path d="M0,25 C360,50 720,0 1080,25 C1260,37 1360,30 1440,25 L1440,50 L0,50 Z"/></svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden card-hover shadow-sm">
              <div className="relative h-48 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center">
                <span className="text-6xl">🏔️</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-xl font-semibold text-[var(--dark)]">{dest.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star size={16} fill="#A7C957" className="text-[#A7C957]" />
                    <span className="text-sm font-medium">{dest.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{dest.description}</p>
                <div className="mb-4">
                  <p className="text-sm font-medium text-[var(--dark)] mb-2">Highlights:</p>
                  <div className="flex flex-wrap gap-2">
                    {dest.highlights.map((highlight, j) => (
                      <span key={j} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{dest.packages} packages available</span>
                  <Link href={`/packages?location=${dest.name}`}
                    className="text-[var(--primary)] font-semibold hover:underline">
                    View Packages →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
