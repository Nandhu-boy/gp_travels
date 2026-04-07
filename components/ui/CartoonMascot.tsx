'use client';
import { useState, useEffect } from 'react';

type MascotMood = 'wave' | 'excited' | 'thinking' | 'pointing' | 'happy' | 'sleeping';

interface Props {
  mood?: MascotMood;
  size?: number;
  className?: string;
}

export default function CartoonMascot({ mood = 'wave', size = 90, className = '' }: Props) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 2500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  const ey = blink ? 1.5 : 5;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`${className} ${mood === 'wave' ? 'animate-wiggle' : mood === 'excited' ? 'animate-bounce' : ''}`}
    >
      {/* Shadow */}
      <ellipse cx="50" cy="95" rx="25" ry="5" fill="#000" opacity="0.08" />

      {/* Body — cute globe */}
      <circle cx="50" cy="50" r="34" fill="#4FC3F7" />
      {/* Land masses — cartoon style */}
      <ellipse cx="38" cy="40" rx="14" ry="10" fill="#66BB6A" />
      <ellipse cx="62" cy="55" rx="12" ry="15" fill="#66BB6A" />
      <ellipse cx="45" cy="65" rx="8" ry="6" fill="#81C784" />
      <circle cx="30" cy="55" r="5" fill="#81C784" />

      {/* Shine */}
      <ellipse cx="36" cy="32" rx="8" ry="5" fill="white" opacity="0.3" transform="rotate(-20 36 32)" />

      {/* Face */}
      {/* Eyes */}
      <ellipse cx="40" cy="48" rx="4.5" ry={ey} fill="#1A237E" />
      <ellipse cx="60" cy="48" rx="4.5" ry={ey} fill="#1A237E" />
      {!blink && (
        <>
          <circle cx="42" cy="46" r="1.8" fill="white" />
          <circle cx="62" cy="46" r="1.8" fill="white" />
        </>
      )}

      {/* Eyebrows */}
      {mood === 'excited' && (
        <>
          <path d="M34 41 Q40 37 46 41" stroke="#1A237E" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M54 41 Q60 37 66 41" stroke="#1A237E" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      )}
      {mood === 'thinking' && (
        <>
          <path d="M34 42 L46 40" stroke="#1A237E" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M54 40 L66 42" stroke="#1A237E" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* Mouth */}
      {(mood === 'wave' || mood === 'happy') && (
        <path d="M40 58 Q50 66 60 58" stroke="#E53935" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )}
      {mood === 'excited' && (
        <ellipse cx="50" cy="60" rx="7" ry="5" fill="#E53935" />
      )}
      {mood === 'thinking' && (
        <ellipse cx="55" cy="59" rx="3" ry="3" fill="#E53935" />
      )}
      {mood === 'pointing' && (
        <path d="M42 58 Q50 64 58 58" stroke="#E53935" strokeWidth="2" fill="none" strokeLinecap="round" />
      )}
      {mood === 'sleeping' && (
        <>
          <path d="M42 58 L58 58" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
          <text x="68" y="35" fontSize="10" fill="#4FC3F7" fontWeight="bold" opacity="0.7">z</text>
          <text x="74" y="26" fontSize="8" fill="#4FC3F7" fontWeight="bold" opacity="0.5">z</text>
        </>
      )}

      {/* Cheeks */}
      <circle cx="33" cy="55" r="4" fill="#FF8A80" opacity="0.4" />
      <circle cx="67" cy="55" r="4" fill="#FF8A80" opacity="0.4" />

      {/* Legs — little stubs */}
      <ellipse cx="40" cy="84" rx="6" ry="8" fill="#4FC3F7" />
      <ellipse cx="60" cy="84" rx="6" ry="8" fill="#4FC3F7" />
      {/* Shoes */}
      <ellipse cx="40" cy="91" rx="8" ry="4" fill="#FF6F00" />
      <ellipse cx="60" cy="91" rx="8" ry="4" fill="#FF6F00" />

      {/* Arms */}
      {mood === 'wave' ? (
        <>
          {/* Waving right hand */}
          <g>
            <circle cx="82" cy="35" r="6" fill="#4FC3F7" />
            <path d="M75 50 Q82 40 82 35" stroke="#4FC3F7" strokeWidth="8" strokeLinecap="round" fill="none">
              <animateTransform attributeName="transform" type="rotate" values="0 75 50;-12 75 50;0 75 50;12 75 50;0 75 50" dur="0.8s" repeatCount="indefinite" />
            </path>
            <circle cx="82" cy="35" r="5" fill="#4FC3F7">
              <animateTransform attributeName="transform" type="rotate" values="0 75 50;-12 75 50;0 75 50;12 75 50;0 75 50" dur="0.8s" repeatCount="indefinite" />
            </circle>
          </g>
          {/* Left arm down */}
          <circle cx="18" cy="62" r="5" fill="#4FC3F7" />
          <path d="M25 50 Q20 58 18 62" stroke="#4FC3F7" strokeWidth="8" strokeLinecap="round" fill="none" />
        </>
      ) : mood === 'pointing' ? (
        <>
          {/* Pointing right */}
          <path d="M75 50 Q88 42 95 38" stroke="#4FC3F7" strokeWidth="7" strokeLinecap="round" fill="none" />
          <circle cx="95" cy="38" r="4" fill="#4FC3F7" />
          {/* Left arm */}
          <circle cx="18" cy="62" r="5" fill="#4FC3F7" />
          <path d="M25 50 Q20 58 18 62" stroke="#4FC3F7" strokeWidth="7" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          {/* Both arms down */}
          <circle cx="18" cy="62" r="5" fill="#4FC3F7" />
          <path d="M25 50 Q20 58 18 62" stroke="#4FC3F7" strokeWidth="7" strokeLinecap="round" fill="none" />
          <circle cx="82" cy="62" r="5" fill="#4FC3F7" />
          <path d="M75 50 Q80 58 82 62" stroke="#4FC3F7" strokeWidth="7" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* Backpack on top */}
      <rect x="44" y="8" width="12" height="14" rx="5" fill="#FF8F00" />
      <rect x="46" y="10" width="8" height="4" rx="2" fill="#FFB74D" />
      <circle cx="50" cy="7" r="2" fill="#FF6F00" />

      {/* Map pin on backpack */}
      <circle cx="50" cy="4" r="3" fill="#E53935" />
      <circle cx="50" cy="4" r="1.2" fill="white" />
    </svg>
  );
}
