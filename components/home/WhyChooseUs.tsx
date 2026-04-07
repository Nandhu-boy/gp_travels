import Image from 'next/image';
import { Users, MapPin, Award, Headphones, CheckCircle, Leaf, Heart, Shield } from 'lucide-react';

const stats = [
  { icon: Users, num: '500+', label: 'Happy Travelers', color: 'bg-green-50 text-[var(--primary)]' },
  { icon: MapPin, num: '50+', label: 'Unique Destinations', color: 'bg-emerald-50 text-emerald-600' },
  { icon: Award, num: '5+', label: 'Years Experience', color: 'bg-teal-50 text-teal-600' },
  { icon: Headphones, num: '24/7', label: 'Support', color: 'bg-green-50 text-green-600' },
];

const features = [
  { icon: Leaf, text: 'Mood-based itinerary planning — tailored to your vibe' },
  { icon: Heart, text: 'Authentic local experiences beyond tourist trails' },
  { icon: Users, text: 'Small group trips for genuine connections' },
  { icon: Award, text: 'Agro-certified sustainable travel practices' },
  { icon: Shield, text: 'Fully insured trips with 24/7 emergency support' },
  { icon: CheckCircle, text: 'Every trip personally curated by Rajeev Gnanavel' },
];

export default function WhyChooseUs() {
  return (
    <section className="section-pad bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((s, i) => (
            <div key={i} className={`rounded-2xl p-6 text-center ${s.color} border border-current/10`}>
              <s.icon size={32} className="mx-auto mb-3 opacity-80" />
              <div className="font-display text-3xl font-bold">{s.num}</div>
              <div className="text-sm mt-1 opacity-70 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Image side */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden h-[500px] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800&q=85"
                alt="Tamil Nadu Travel Experience"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 max-w-[200px]">
              <div className="text-3xl mb-2">🌿</div>
              <p className="font-display font-bold text-[var(--dark)] text-sm">100% Curated</p>
              <p className="text-gray-500 text-xs mt-1">Every trip personally designed</p>
            </div>
            {/* Floating badge */}
            <div className="absolute -top-4 -left-4 bg-[var(--primary)] text-white rounded-2xl shadow-xl p-4 text-center">
              <div className="font-bold text-2xl">5★</div>
              <div className="text-xs font-medium opacity-90">Rated</div>
            </div>
          </div>

          {/* Content side */}
          <div>
            <span className="inline-block bg-[var(--primary)]/10 text-[var(--primary)] font-semibold text-sm uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--dark)] mb-5 leading-tight">
              Your Trusted<br />Travel Partner
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              We don't just plan trips — we curate experiences that resonate with your soul.
              Founded by Rajeev Gnanavel, GP Travels brings Tamil Nadu's hidden treasures to you.
            </p>
            <div className="space-y-4">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center flex-shrink-0">
                    <f.icon size={18} className="text-white" />
                  </div>
                  <p className="text-gray-700 font-medium">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full width CTA banner */}
        <div className="relative rounded-3xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85"
            alt="Tamil Nadu Landscape"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--forest)]/90 via-[var(--primary-dark)]/80 to-[var(--primary)]/70" />
          <div className="relative z-10 py-14 px-8 md:px-16 text-center text-white">
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">
              100% Curated Trips — No Compromises
            </h3>
            <p className="text-white/85 max-w-2xl mx-auto text-lg">
              Every itinerary is personally crafted by Rajeev Gnanavel, ensuring authentic experiences
              that go beyond typical tourist attractions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
