import Image from 'next/image';
import { Award, Users, MapPin, Heart } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Authentic Experiences',
    desc: 'We believe in real, unfiltered experiences that connect you with the true essence of Tamil Nadu.'
  },
  {
    icon: Users,
    title: 'Local Communities',
    desc: 'Every trip supports local communities and preserves traditional ways of life.'
  },
  {
    icon: Award,
    title: 'Sustainable Travel',
    desc: 'We prioritize eco-friendly practices and responsible tourism for future generations.'
  },
  {
    icon: MapPin,
    title: 'Curated Journeys',
    desc: 'Each itinerary is personally crafted by Rajeev to ensure meaningful, mood-based adventures.'
  }
];

const journey = [
  {
    year: '2010',
    title: 'The Beginning',
    desc: 'Started as a small-town boy with big dreams, Rajeev founded his first venture in branding.'
  },
  {
    year: '2015',
    title: 'The Brand Saviours',
    desc: 'Established a successful branding agency helping businesses tell their stories authentically.'
  },
  {
    year: '2018',
    title: 'Coatsuit Vivasayi',
    desc: 'Launched an agrotourism initiative to promote sustainable farming and rural experiences.'
  },
  {
    year: '2020',
    title: 'GP Travels',
    desc: 'Founded GP Travels to share the magic of Tamil Nadu through mood-based travel experiences.'
  },
  {
    year: '2024',
    title: 'Thennadu Holidays',
    desc: 'Rebranded to Thennadu Holidays, expanding our reach while staying true to our roots.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--cream)] pt-16">
      {/* Hero Section — cartoon */}
      <div className="relative bg-gradient-to-br from-[var(--grass-dark)] via-[var(--grass)] to-[var(--grass-light)] py-20 px-4 text-center text-white overflow-hidden">
        <div className="absolute top-6 left-12 text-5xl opacity-20 animate-float">🌳</div>
        <div className="absolute top-10 right-20 text-4xl opacity-15 animate-float" style={{animationDelay: '3s'}}>🌻</div>
        <div className="relative z-10">
          <span className="text-5xl mb-4 block">🌿</span>
          <h1 className="text-4xl md:text-5xl font-black mb-6">About GP Travels</h1>
          <p className="text-white/80 text-lg max-w-3xl mx-auto font-bold">
            From a small-town dream to Tamil Nadu's premier mood-based travel brand ✨
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 50" fill="var(--cream)" className="w-full"><path d="M0,25 C360,50 720,0 1080,25 C1260,37 1360,30 1440,25 L1440,50 L0,50 Z"/></svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--dark)] mb-6">
              Meet Rajeev Gnanavel
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Rajeev Gnanavel is a small-town boy with big dreams who turned his passion for authentic experiences
                into Tamil Nadu's most trusted travel brand. What started as a simple desire to share the hidden
                gems of his homeland has evolved into a movement.
              </p>
              <p>
                With three successful ventures under his belt — The Brand Saviours (branding), Coatsuit Vivasayi
                (agrotourism), and GP Travels (travel) — Rajeev has consistently proven that authenticity,
                sustainability, and genuine human connections are the keys to success.
              </p>
              <p>
                Today, as the founder of GP Travels (also known as Thennadu Holidays), he continues to personally
                curate every journey, ensuring that each traveler doesn't just visit Tamil Nadu — they experience it.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] rounded-2xl flex items-center justify-center text-8xl">
              🌿
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--dark)] mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These principles guide everything we do, from itinerary planning to community partnerships.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm text-center card-hover">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon size={32} className="text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--dark)] mb-4">
              Our Journey
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From humble beginnings to becoming Tamil Nadu's travel pioneers.
            </p>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[var(--primary)] to-[var(--primary-light)] hidden md:block" />

            <div className="space-y-12">
              {journey.map((item, i) => (
                <div key={i} className={`flex items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}>
                  <div className="md:w-1/2">
                    <div className="bg-white p-6 rounded-2xl shadow-sm card-hover">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] rounded-xl flex items-center justify-center text-white font-bold">
                          {item.year.slice(-2)}
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-semibold text-[var(--dark)]">{item.title}</h3>
                          <p className="text-[var(--primary)] font-medium">{item.year}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-4 h-4 bg-[var(--primary)] rounded-full border-4 border-white shadow-md" />
                  <div className="md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--dark)] mb-4">
              By The Numbers
            </h2>
            <p className="text-gray-600 text-lg">
              Our impact on Tamil Nadu tourism and community development.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[var(--primary)] mb-2">500+</div>
              <div className="text-gray-600">Happy Travelers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[var(--primary)] mb-2">50+</div>
              <div className="text-gray-600">Unique Destinations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[var(--primary)] mb-2">5+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[var(--primary)] mb-2">100%</div>
              <div className="text-gray-600">Curated Trips</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
