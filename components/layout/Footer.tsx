import Link from 'next/link';
import { Phone, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative">
      {/* Wavy top edge */}
      <div className="bg-[var(--cream)]">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full block">
          <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="#2E7D32"/>
        </svg>
      </div>

      {/* CTA strip */}
      <div className="bg-gradient-to-r from-[var(--grass-dark)] to-[var(--grass)] py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-white text-xl font-black">🌴 Plan Your Dream Trip Today</p>
            <p className="text-white/70 text-sm font-bold">Get personalized itineraries crafted just for you</p>
          </div>
          <div className="flex gap-3">
            <a href="https://wa.me/918825482411" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-[var(--grass-dark)] px-5 py-2.5 rounded-full font-extrabold text-sm shadow-[0_3px_0_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all">
              💬 Chat on WhatsApp
            </a>
            <Link href="/contact"
              className="flex items-center gap-2 bg-[var(--sun)] text-[var(--wood)] px-5 py-2.5 rounded-full font-extrabold text-sm shadow-[0_3px_0_#e65100] hover:-translate-y-0.5 transition-all">
              Book Now →
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-[var(--grass-dark)] text-white">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-3xl">🌴</span>
                <div>
                  <div className="text-xl font-black text-white leading-tight">GP Travels</div>
                  <div className="text-[10px] text-white/40 font-bold tracking-widest uppercase">Thennadu Holidays</div>
                </div>
              </div>
              <p className="text-white/60 text-sm mb-5 leading-relaxed font-bold">
                We offer mood-based destinations to experience, not just explore. Discover hidden gems through authentic travel. 🌿
              </p>
              <div className="flex gap-2">
                {[
                  { href: 'https://instagram.com/gptravels', label: '📸' },
                  { href: 'https://youtube.com/@gptravels', label: '▶️' },
                  { href: 'https://wa.me/918825482411', label: '💬' },
                  { href: 'https://linkedin.com/in/rajeev-gnanavel', label: '💼' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-lg hover:bg-white/20 hover:scale-110 transition-all">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-black mb-5 text-white">🔗 Quick Links</h3>
              <ul className="space-y-2.5">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/packages', label: 'All Packages' },
                  { href: '/destinations', label: 'Destinations' },
                  { href: '/about', label: 'About Us' },
                  { href: '/contact', label: 'Contact' },
                  { href: '/admin/login', label: 'Admin Login' },
                ].map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/60 hover:text-[var(--sun)] transition-colors text-sm font-bold flex items-center gap-2">
                      → {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-black mb-5 text-white">🧭 Categories</h3>
              <ul className="space-y-2.5">
                {[
                  { cat: 'Agrotourism', e: '🌾' }, { cat: 'Spiritual', e: '🕌' },
                  { cat: 'Mystery', e: '🌿' }, { cat: 'Trek', e: '🏔️' },
                  { cat: 'Adventure', e: '🚀' }, { cat: 'Workation', e: '💻' },
                  { cat: 'Festival', e: '🎉' }, { cat: 'Corporate', e: '🏢' },
                ].map(c => (
                  <li key={c.cat}>
                    <Link href={`/packages?category=${c.cat}`} className="text-white/60 hover:text-[var(--sun)] transition-colors text-sm font-bold flex items-center gap-2">
                      {c.e} {c.cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-black mb-5 text-white">📞 Get In Touch</h3>
              <div className="space-y-4">
                <a href="tel:+918825482411" className="flex items-center gap-3 text-white/70 hover:text-[var(--sun)] transition-colors group">
                  <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-lg group-hover:bg-white/20 transition-colors">📞</div>
                  <div>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Phone</p>
                    <p className="text-white text-sm font-extrabold">+91 8825482411</p>
                  </div>
                </a>
                <a href="mailto:gptravels1976@gmail.com" className="flex items-center gap-3 text-white/70 hover:text-[var(--sun)] transition-colors group">
                  <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-lg group-hover:bg-white/20 transition-colors">📧</div>
                  <div>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Email</p>
                    <p className="text-white text-sm font-extrabold">gptravels1976@gmail.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-lg">📍</div>
                  <div>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Location</p>
                    <p className="text-white text-sm font-extrabold">Tamil Nadu, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-white/40 text-sm font-bold">
            <p>© 2024 GP Travels | Thennadu Holidays. All rights reserved. 🌿</p>
            <p>Made with 💚 for Tamil Nadu Travel</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
