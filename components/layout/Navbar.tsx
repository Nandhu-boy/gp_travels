'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown, MessageCircle, ArrowRight } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', emoji: '🏠' },
  {
    href: '/packages', label: 'Packages', emoji: '🎒',
    children: [
      { href: '/packages?category=Agrotourism', label: 'Agrotourism', icon: '🌾' },
      { href: '/packages?category=Spiritual',   label: 'Spiritual',   icon: '🕌' },
      { href: '/packages?category=Mystery',     label: 'Mystery',     icon: '🌿' },
      { href: '/packages?category=Trek',        label: 'Trek',        icon: '🏔️' },
      { href: '/packages?category=Adventure',   label: 'Adventure',   icon: '🚀' },
      { href: '/packages?category=Workation',   label: 'Workation',   icon: '💻' },
      { href: '/packages?category=Festival',    label: 'Festival',    icon: '🎉' },
      { href: '/packages?category=Corporate',   label: 'Corporate',   icon: '🏢' },
    ]
  },
  { href: '/destinations', label: 'Destinations', emoji: '🗺️' },
  { href: '/about', label: 'About Us', emoji: '🌿' },
  { href: '/contact', label: 'Contact', emoji: '💬' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full">
        <div className={`transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-[0_4px_20px_rgba(76,175,80,0.15)]'
            : 'bg-white/70 backdrop-blur-sm'
        }`} style={{ borderBottom: '3px solid', borderImage: 'linear-gradient(90deg, var(--grass-light), var(--sun), var(--water), var(--grass)) 1' }}>
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-[66px]">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="text-3xl bounce-hover">🌴</div>
              <div className="leading-none">
                <span className="text-[18px] font-black text-[var(--grass-dark)] tracking-tight">GP Travels</span>
                <span className="block text-[9px] font-bold tracking-[0.12em] uppercase text-[var(--grass)]">Thennadu Holidays</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => link.children && setDropdown(link.label)}
                    onMouseLeave={() => setDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={`relative px-3.5 py-2 text-[13px] font-extrabold rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                        isActive
                          ? 'text-white bg-gradient-to-r from-[var(--grass)] to-[var(--grass-light)] shadow-[0_3px_0_var(--grass-dark),0_4px_12px_rgba(76,175,80,0.3)]'
                          : 'text-[var(--wood)] hover:text-white hover:bg-gradient-to-r hover:from-[var(--grass)] hover:to-[var(--grass-light)] hover:shadow-[0_3px_0_var(--grass-dark),0_4px_12px_rgba(76,175,80,0.3)]'
                      }`}
                    >
                      <span className="text-sm">{link.emoji}</span>
                      {link.label}
                      {link.children && (
                        <ChevronDown size={12} className={`transition-transform duration-300 ${dropdown === link.label ? 'rotate-180' : ''}`} />
                      )}
                    </Link>

                    {/* Dropdown */}
                    {link.children && dropdown === link.label && (
                      <div className="absolute top-full left-0 pt-2 z-50">
                        <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border-2 border-[var(--grass-light)]/30 py-2 min-w-[240px] overflow-hidden">
                          <div className="px-4 py-2 border-b border-green-100">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--grass)]/60">🧭 Choose Your Mood</span>
                          </div>
                          {link.children.map(child => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--wood)] hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 hover:text-[var(--grass-dark)] font-bold transition-all group/item"
                            >
                              <span className="text-lg group-hover/item:scale-125 transition-transform">{child.icon}</span>
                              <span className="flex-1">{child.label}</span>
                              <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover/item:opacity-50 group-hover/item:translate-x-0 transition-all" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href="https://wa.me/918825482411"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-extrabold text-green-700 bg-green-100 hover:bg-green-200 hover:scale-105 transition-all border border-green-200"
              >
                💬 WhatsApp
              </a>
              <a
                href="tel:+918825482411"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold text-white bg-gradient-to-r from-[var(--sun-dark)] to-[var(--sun)] shadow-[0_3px_0_#e65100,0_4px_12px_rgba(255,167,38,0.3)] hover:-translate-y-0.5 hover:shadow-[0_5px_0_#e65100,0_6px_16px_rgba(255,167,38,0.4)] transition-all"
              >
                📞 +91 8825482411
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-2xl text-[var(--wood)] hover:bg-green-100 transition-all bounce-hover"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile slide-out ── */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ${mobileOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-[var(--grass-dark)]/30 backdrop-blur-sm transition-opacity duration-400 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileOpen(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-[82%] max-w-xs shadow-2xl transition-transform duration-400 ease-out flex flex-col ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ background: 'linear-gradient(180deg, #fff 0%, #F1F8E9 100%)' }}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-green-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌴</span>
              <span className="text-base font-black text-[var(--grass-dark)]">GP Travels</span>
            </div>
            <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-xl hover:bg-green-100 text-[var(--wood)]"><X size={20} /></button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto p-3">
            {navLinks.map(link => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <div key={link.href}>
                  <Link href={link.href} onClick={() => !link.children && setMobileOpen(false)}
                    className={`flex items-center gap-2 py-3 px-3 rounded-2xl text-[15px] font-extrabold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[var(--grass)] to-[var(--grass-light)] text-white shadow-md'
                        : 'text-[var(--wood)] hover:bg-green-50'
                    }`}>
                    <span>{link.emoji}</span>
                    {link.label}
                    {link.children && <ChevronDown size={14} className="ml-auto" />}
                  </Link>
                  {link.children && (
                    <div className="ml-4 mt-1 mb-2 flex flex-col gap-0.5">
                      {link.children.map(child => (
                        <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 py-2.5 px-3 rounded-xl text-sm text-[var(--wood)]/70 hover:bg-green-50 hover:text-[var(--grass-dark)] font-bold transition-all">
                          <span className="text-base">{child.icon}</span> {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom CTAs */}
          <div className="p-3 border-t border-green-100 flex gap-2">
            <a href="https://wa.me/918825482411" target="_blank"
              className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 text-white py-3 rounded-2xl font-extrabold text-sm shadow-[0_3px_0_#2E7D32]">
              💬 WhatsApp
            </a>
            <a href="tel:+918825482411"
              className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[var(--sun-dark)] to-[var(--sun)] text-white py-3 rounded-2xl font-extrabold text-sm shadow-[0_3px_0_#e65100]">
              📞 Call
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
