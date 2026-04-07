'use client';
import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import CartoonMascot from './CartoonMascot';

type MascotMood = 'wave' | 'excited' | 'thinking' | 'pointing' | 'happy' | 'sleeping';

interface MascotState {
  mood: MascotMood;
  message: string;
}

const pageGreetings: Record<string, MascotState> = {
  '/':             { mood: 'wave',     message: "Hi there! 🌴 I'm Globy, your travel buddy! Scroll down to explore!" },
  '/packages':     { mood: 'excited',  message: "Wow, so many trips! 🎒 Use the filters to find your perfect one!" },
  '/destinations': { mood: 'pointing', message: "These places are amazing! 🗺️ Click any to see packages!" },
  '/about':        { mood: 'happy',    message: "This is our story! 🌟 We love creating memories!" },
  '/contact':      { mood: 'wave',     message: "Got questions? 💬 Fill the form or WhatsApp us!" },
};

const scrollTips = [
  { mood: 'excited' as MascotMood, message: "You're exploring! 🔍 Keep scrolling for more!" },
  { mood: 'pointing' as MascotMood, message: "Check out the packages below! 👇" },
  { mood: 'happy' as MascotMood, message: "Great finds ahead! ✨ Keep going!" },
];

const clickReactions: Record<string, MascotState> = {
  'search':   { mood: 'thinking', message: "Hmm, let me help you find the best trip! 🔎" },
  'book':     { mood: 'excited',  message: "Great choice! 🎉 WhatsApp us to book!" },
  'category': { mood: 'pointing', message: "Nice pick! 👆 Here are trips for that mood!" },
  'card':     { mood: 'excited',  message: "Ooh, that looks fun! 🌟 Click to see details!" },
  'review':   { mood: 'happy',    message: "Your feedback helps others! ✍️ Thanks!" },
};

export default function MascotHelper() {
  const pathname = usePathname();
  const [state, setState] = useState<MascotState>({ mood: 'wave', message: '' });
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null);

  // Skip admin pages
  if (pathname.startsWith('/admin')) return null;

  const showMessage = useCallback((newState: MascotState, duration = 6000) => {
    setState(newState);
    setVisible(true);
    setMinimized(false);

    if (idleTimer) clearTimeout(idleTimer);
    const timer = setTimeout(() => setMinimized(true), duration);
    setIdleTimer(timer);
  }, [idleTimer]);

  // Page greeting on load/route change
  useEffect(() => {
    const timer = setTimeout(() => {
      const greeting = pageGreetings[pathname] || pageGreetings['/'];
      showMessage(greeting, 5000);
    }, 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Listen for scroll — give tips
  useEffect(() => {
    let scrollCount = 0;
    let lastScroll = 0;
    const handler = () => {
      const y = window.scrollY;
      if (y > lastScroll + 400) {
        lastScroll = y;
        scrollCount++;
        if (scrollCount === 2 || scrollCount === 5) {
          const tip = scrollTips[Math.floor(Math.random() * scrollTips.length)];
          showMessage(tip, 4000);
        }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Listen for clicks on interactive elements
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest('button, a, input, select');
      if (!el) return;

      const text = el.textContent?.toLowerCase() || '';
      const tag = el.tagName.toLowerCase();

      if (text.includes('search') || tag === 'input') {
        showMessage(clickReactions['search'], 4000);
      } else if (text.includes('book') || text.includes('whatsapp')) {
        showMessage(clickReactions['book'], 5000);
      } else if (text.includes('agrotourism') || text.includes('spiritual') || text.includes('trek') || text.includes('adventure') || text.includes('mystery') || text.includes('festival')) {
        showMessage(clickReactions['category'], 4000);
      } else if (text.includes('review') || text.includes('submit')) {
        showMessage(clickReactions['review'], 5000);
      }
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // Idle state — mascot sleeps after 30s of no interaction
  useEffect(() => {
    const sleepTimer = setTimeout(() => {
      if (minimized) {
        setState({ mood: 'sleeping', message: '' });
      }
    }, 30000);
    return () => clearTimeout(sleepTimer);
  }, [minimized, state]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-1" style={{ animation: 'mascotSlideIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards' }}>

      {/* Speech bubble */}
      {!minimized && state.message && (
        <div className="relative bg-white rounded-3xl px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.12)] border-2 border-[var(--sky)] max-w-[220px] mr-2"
          style={{ animation: 'bubblePop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards' }}>
          <p className="text-[var(--wood)] text-[11px] font-extrabold leading-snug">{state.message}</p>
          {/* Bubble tail */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r-2 border-b-2 border-[var(--sky)] rotate-45" />
        </div>
      )}

      {/* Character */}
      <div
        className="cursor-pointer bounce-hover"
        onClick={() => {
          if (minimized) {
            const greeting = pageGreetings[pathname] || pageGreetings['/'];
            showMessage(greeting, 5000);
          } else {
            setMinimized(true);
          }
        }}
        title={minimized ? 'Click me for tips!' : 'Click to minimize'}
      >
        <CartoonMascot mood={state.mood} size={minimized ? 60 : 80} />
      </div>

      {/* Name tag (when minimized) */}
      {minimized && (
        <div className="bg-[var(--sky)] text-white text-[8px] font-extrabold px-2 py-0.5 rounded-full -mt-1 shadow-sm">
          Globy 🌍
        </div>
      )}

      <style jsx>{`
        @keyframes mascotSlideIn {
          from { transform: translateY(80px) scale(0.5); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes bubblePop {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
