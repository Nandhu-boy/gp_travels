import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    slug: 'Agrotourism',
    emoji: '🌾',
    label: 'Agrotourism',
    desc: 'Farm stays & eco villages',
    color: 'from-green-900/80 to-green-600/60',
    img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80',
  },
  {
    slug: 'Spiritual',
    emoji: '🕌',
    label: 'Spiritual',
    desc: 'Temples & sacred trails',
    color: 'from-amber-900/80 to-amber-600/60',
    img: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=600&q=80',
  },
  {
    slug: 'Mystery',
    emoji: '🌿',
    label: 'Mystery',
    desc: 'Unexplored hidden gems',
    color: 'from-emerald-900/80 to-emerald-700/60',
    img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80',
  },
  {
    slug: 'Trek',
    emoji: '🏔️',
    label: 'Trek',
    desc: 'Mountain & forest trails',
    color: 'from-teal-900/80 to-teal-700/60',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
  },
  {
    slug: 'Adventure',
    emoji: '🚀',
    label: 'Adventure',
    desc: 'Thrills & experiences',
    color: 'from-green-900/80 to-lime-700/60',
    img: 'https://images.unsplash.com/photo-1502786129293-79981df4e689?w=600&q=80',
  },
  {
    slug: 'Workation',
    emoji: '💻',
    label: 'Workation',
    desc: 'Work from paradise',
    color: 'from-teal-900/80 to-teal-600/60',
    img: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80',
  },
  {
    slug: 'Festival',
    emoji: '🎉',
    label: 'Festival',
    desc: 'Cultural celebrations',
    color: 'from-emerald-900/80 to-green-600/60',
    img: 'https://images.unsplash.com/photo-1567604130959-6edb9fd97800?w=600&q=80',
  },
  {
    slug: 'Corporate',
    emoji: '🏢',
    label: 'Corporate OBT',
    desc: 'Team trips & launches',
    color: 'from-slate-900/80 to-slate-700/60',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
  },
];

export default function MoodCategories() {
  return (
    <section className="pt-10 pb-20 nature-pattern bg-[var(--cream)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block bg-[var(--primary)]/10 text-[var(--primary)] font-semibold text-sm uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            What's Your Vibe?
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--dark)] mt-2 mb-3">Travel By Mood</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We match your mood with the perfect destination. Pick your vibe and let us craft the journey.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/packages?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl min-h-[200px] md:min-h-[220px] flex flex-col justify-end card-hover shadow-md"
            >
              {/* Background image */}
              <Image
                src={cat.img}
                alt={cat.label}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} group-hover:opacity-80 transition-opacity`} />

              {/* Content */}
              <div className="relative z-10 p-5">
                <span className="text-3xl block mb-2 drop-shadow-lg">{cat.emoji}</span>
                <h3 className="font-display text-white font-bold text-lg leading-tight drop-shadow">{cat.label}</h3>
                <p className="text-white/80 text-xs mt-1">{cat.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-white/60 text-xs font-medium group-hover:text-white transition-colors">
                  Explore →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
