import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, ArrowRight, Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=85"
        alt="Tamil Nadu landscape"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--forest)]/95 via-[var(--primary-dark)]/85 to-[var(--forest)]/70" />

      {/* Decorative circles */}
      <div className="absolute top-8 right-8 w-72 h-72 border border-[var(--primary-light)]/15 rounded-full" />
      <div className="absolute bottom-8 left-8 w-48 h-48 border border-[var(--primary-light)]/10 rounded-full" />
      <div className="absolute -top-20 -right-20 w-96 h-96 border border-white/5 rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        {/* Label */}
        <div className="inline-flex items-center gap-2 bg-[var(--primary-light)]/20 border border-[var(--primary-light)]/40 text-[var(--primary-light)] text-sm font-bold px-5 py-2 rounded-full mb-8 uppercase tracking-widest">
          Start Your Journey Today
        </div>

        <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Find Your
          <br />
          <span className="gold-text">Perfect Escape?</span>
        </h2>

        <p className="text-white/75 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Let us craft a journey that matches your mood. 500+ travelers have trusted us —
          your adventure in Tamil Nadu is just one click away.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/packages"
            className="inline-flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-2xl shadow-green-900/30"
          >
            Browse All Packages <ArrowRight size={20} />
          </Link>
          <a
            href="https://wa.me/918825482411"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-xl text-lg"
          >
            <MessageCircle size={20} /> WhatsApp Us
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 text-white/50 text-sm font-medium">
          {['No hidden charges', 'Flexible cancellation', '24/7 support', '500+ happy travelers'].map(t => (
            <span key={t} className="flex items-center gap-2">
              <span className="text-[var(--primary-light)]">✓</span> {t}
            </span>
          ))}
        </div>

        {/* Quick call box */}
        <div className="mt-12 inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-4">
          <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center">
            <Phone size={22} className="text-white" />
          </div>
          <div className="text-left">
            <div className="text-white/60 text-xs font-medium uppercase tracking-wider">Call Us Anytime</div>
            <a href="tel:+918825482411" className="text-white font-bold text-xl hover:text-[var(--primary-light)] transition-colors">
              +91 8825482411
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
