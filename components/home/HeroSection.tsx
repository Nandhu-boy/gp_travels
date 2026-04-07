'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowDown, Search, Calendar, MapPin } from 'lucide-react';

const moods = [
  { emoji: '🌾', label: 'Agrotourism' },
  { emoji: '🕌', label: 'Spiritual' },
  { emoji: '🌿', label: 'Mystery' },
  { emoji: '🏔️', label: 'Trek' },
  { emoji: '🚀', label: 'Adventure' },
  { emoji: '💻', label: 'Workation' },
  { emoji: '🎉', label: 'Festival' },
  { emoji: '🏢', label: 'Corporate' },
];

const heroImages = [
  '/images/packages/hero-trek.jpg',
  '/images/packages/hero-beach.jpg',
  '/images/packages/hero-safari.jpg',
  '/images/packages/hero-explore.jpg',
  '/images/packages/hero-camp.jpg',
];

const destinations = [
  'Pollachi', 'Ooty', 'Kodaikanal', 'Yercaud', 'Madurai', 'Rameswaram',
  'Kanyakumari', 'Munnar', 'Kannur', 'Pondicherry', 'Hampi', 'Coorg',
];

const categories = [
  { slug: 'Agrotourism', emoji: '🌾', label: 'Agrotourism', desc: 'Farm stays & eco villages', color: 'from-green-600 to-green-400', img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80' },
  { slug: 'Spiritual', emoji: '🕌', label: 'Spiritual', desc: 'Temples & sacred trails', color: 'from-amber-600 to-amber-400', img: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=600&q=80' },
  { slug: 'Mystery', emoji: '🌿', label: 'Mystery', desc: 'Unexplored hidden gems', color: 'from-emerald-700 to-emerald-500', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80' },
  { slug: 'Trek', emoji: '🏔️', label: 'Trek', desc: 'Mountain & forest trails', color: 'from-teal-700 to-teal-500', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80' },
  { slug: 'Adventure', emoji: '🚀', label: 'Adventure', desc: 'Thrills & experiences', color: 'from-orange-600 to-orange-400', img: 'https://images.unsplash.com/photo-1502786129293-79981df4e689?w=600&q=80' },
  { slug: 'Workation', emoji: '💻', label: 'Workation', desc: 'Work from paradise', color: 'from-cyan-600 to-cyan-400', img: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80' },
  { slug: 'Festival', emoji: '🎉', label: 'Festival', desc: 'Cultural celebrations', color: 'from-pink-600 to-pink-400', img: 'https://images.unsplash.com/photo-1567604130959-6edb9fd97800?w=600&q=80' },
  { slug: 'Corporate', emoji: '🏢', label: 'Corporate OBT', desc: 'Team trips & launches', color: 'from-slate-600 to-slate-400', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80' },
];

export default function HeroSection() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const interval = setInterval(() => setImgIndex(i => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category !== 'All') params.set('category', category);
    router.push(`/packages?${params.toString()}`);
  };

  return (
    <div className="w-full overflow-hidden">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[calc(100vh+66px)] flex flex-col items-center justify-center overflow-hidden -mt-[66px]">
        {/* Background slideshow */}
        {heroImages.map((src, i) => (
          <div key={src} className={`absolute inset-0 transition-opacity duration-1500 ${i === imgIndex ? 'opacity-100' : 'opacity-0'}`}>
            <Image src={src} alt="Tamil Nadu" fill className="object-cover" sizes="100vw" priority={i === 0} />
          </div>
        ))}

        {/* Cartoon-style overlay: gradient + soft tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--grass-dark)]/60 via-[var(--grass-dark)]/30 to-[var(--grass-dark)]/70" />

        {/* Floating cartoon clouds */}
        <div className="absolute top-20 left-0 w-full pointer-events-none overflow-hidden">
          <svg className="floating-cloud absolute top-0 w-40 h-20" viewBox="0 0 160 80" fill="white" fillOpacity="0.6">
            <ellipse cx="80" cy="50" rx="70" ry="25"/><ellipse cx="50" cy="35" rx="40" ry="20"/><ellipse cx="110" cy="38" rx="35" ry="18"/>
          </svg>
          <svg className="floating-cloud absolute top-10 w-32 h-16" viewBox="0 0 160 80" fill="white" fillOpacity="0.4" style={{animationDelay: '-8s'}}>
            <ellipse cx="80" cy="50" rx="65" ry="22"/><ellipse cx="45" cy="38" rx="35" ry="18"/><ellipse cx="115" cy="40" rx="30" ry="16"/>
          </svg>
        </div>

        {/* Hero content */}
        <div className={`relative z-10 w-full max-w-6xl mx-auto px-4 pt-[100px] md:pt-[120px] pb-10 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white text-xs md:text-sm font-extrabold px-5 py-2 rounded-full shadow-lg">
              🌿 India's Mood-Based Travel Brand
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-black text-center leading-tight mb-3 drop-shadow-[0_3px_6px_rgba(0,0,0,0.3)]">
            Explore the World
            <br />
            <span className="gold-text" style={{WebkitTextStroke: '1px rgba(255,255,255,0.1)'}}>Your Mood, Our Mission</span>
          </h1>

          <p className="text-white/80 text-base md:text-lg text-center max-w-2xl mx-auto mb-8 font-bold drop-shadow">
            India · Nepal · Thailand · Kenya · South Korea & beyond — 50+ destinations, one vibe at a time ✨
          </p>

          {/* Search widget — cartoon style */}
          <form onSubmit={handleSearch} className="bg-white rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-3 md:p-4 max-w-4xl mx-auto mb-8 border-3 border-[var(--grass-light)]/30">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-2">
                <label className="block text-xs font-extrabold text-[var(--grass-dark)] uppercase tracking-wider mb-1 px-1">🗺️ Destination</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--grass)]" />
                  <input type="text" placeholder="Where do you want to go?" value={search} onChange={e => setSearch(e.target.value)} list="destinations"
                    className="w-full pl-9 pr-3 py-3 bg-[var(--cream)] border-2 border-green-100 rounded-2xl text-sm font-bold text-[var(--wood)] focus:outline-none focus:border-[var(--grass)] focus:ring-2 focus:ring-[var(--grass-light)]/30 transition-all" />
                  <datalist id="destinations">{destinations.map(d => <option key={d} value={d} />)}</datalist>
                </div>
              </div>
              <div>
                <label className="block text-xs font-extrabold text-[var(--grass-dark)] uppercase tracking-wider mb-1 px-1">🎒 Trip Type</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--grass)]" />
                  <select value={category} onChange={e => setCategory(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 bg-[var(--cream)] border-2 border-green-100 rounded-2xl text-sm font-bold text-[var(--wood)] focus:outline-none focus:border-[var(--grass)] focus:ring-2 focus:ring-[var(--grass-light)]/30 transition-all appearance-none">
                    <option value="All">All Types</option>
                    {moods.map(m => <option key={m.label} value={m.label}>{m.emoji} {m.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex items-end">
                <button type="submit" className="btn-primary w-full py-3 text-sm">
                  <Search size={18} /> Search
                </button>
              </div>
            </div>
          </form>

          {/* Stats — cartoon badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              { num: '500+', label: 'Happy Travelers', emoji: '😊' },
              { num: '50+', label: 'Destinations', emoji: '📍' },
              { num: '5+', label: 'Years', emoji: '🏆' },
              { num: '100%', label: 'Curated', emoji: '✅' },
            ].map(stat => (
              <div key={stat.label} className="text-center bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-2.5 border border-white/20">
                <div className="text-xl md:text-2xl font-black text-[var(--sun)]">{stat.num}</div>
                <div className="text-white/70 text-[10px] md:text-xs font-bold">{stat.emoji} {stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, i) => (
            <button key={i} onClick={() => setImgIndex(i)}
              className={`rounded-full transition-all ${i === imgIndex ? 'bg-[var(--sun)] w-8 h-3' : 'bg-white/50 w-3 h-3'}`} />
          ))}
        </div>

        {/* Bouncy scroll arrow */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 animate-bounce z-10">
          <div className="bg-white/20 rounded-full p-2 backdrop-blur-sm">
            <ArrowDown size={20} />
          </div>
        </div>

        {/* Wavy bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1360,50 1440,40 L1440,80 L0,80 Z" fill="#F1F8E9"/>
          </svg>
        </div>
      </section>

      {/* ═══ MOOD CATEGORIES ═══ */}
      <section className="relative bg-[var(--cream)] pb-16 pt-6 -mt-[1px]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-[var(--grass)]/10 text-[var(--grass-dark)] font-extrabold text-sm uppercase tracking-widest px-5 py-2 rounded-full mb-3 border-2 border-[var(--grass)]/20">
              🧭 What's Your Vibe?
            </span>
            <h2 className="text-3xl md:text-5xl text-[var(--wood)] mt-2 mb-3 font-black">Travel By Mood</h2>
            <p className="text-[var(--wood)]/60 max-w-xl mx-auto font-bold">
              Pick your vibe and let us craft the perfect journey for you!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {categories.map(cat => (
              <Link
                key={cat.slug}
                href={`/packages?category=${cat.slug}`}
                className="group relative overflow-hidden rounded-3xl min-h-[180px] md:min-h-[220px] flex flex-col justify-end card-hover shadow-lg border-3 border-white/50"
              >
                <Image src={cat.img} alt={cat.label} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-70 group-hover:opacity-60 transition-opacity`} />
                <div className="relative z-10 p-4 md:p-5">
                  <span className="text-3xl block mb-1.5 drop-shadow-lg group-hover:scale-125 transition-transform inline-block">{cat.emoji}</span>
                  <h3 className="text-white font-black text-base md:text-lg leading-tight drop-shadow">{cat.label}</h3>
                  <p className="text-white/80 text-[11px] md:text-xs mt-0.5 font-bold">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
