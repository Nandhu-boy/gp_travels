'use client';

// Floating butterflies, birds, leaves, and nature elements
export function FloatingNature() {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Butterfly 1 */}
      <div className="absolute" style={{ top: '15%', animation: 'butterflyFloat 12s ease-in-out infinite' }}>
        <svg width="30" height="30" viewBox="0 0 40 40" className="opacity-40">
          <g>
            <ellipse cx="14" cy="16" rx="10" ry="7" fill="#FFB74D" transform="rotate(-20 14 16)">
              <animateTransform attributeName="transform" type="rotate" values="-20 14 16;-40 14 16;-20 14 16" dur="0.5s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="26" cy="16" rx="10" ry="7" fill="#FFA726" transform="rotate(20 26 16)">
              <animateTransform attributeName="transform" type="rotate" values="20 26 16;40 26 16;20 26 16" dur="0.5s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="20" cy="20" rx="2" ry="8" fill="#5D4037" />
          </g>
        </svg>
      </div>

      {/* Butterfly 2 */}
      <div className="absolute" style={{ top: '40%', animation: 'butterflyFloat2 15s ease-in-out infinite', animationDelay: '-5s' }}>
        <svg width="24" height="24" viewBox="0 0 40 40" className="opacity-30">
          <g>
            <ellipse cx="14" cy="16" rx="9" ry="6" fill="#81C784">
              <animateTransform attributeName="transform" type="rotate" values="-15 14 16;-35 14 16;-15 14 16" dur="0.4s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="26" cy="16" rx="9" ry="6" fill="#66BB6A">
              <animateTransform attributeName="transform" type="rotate" values="15 26 16;35 26 16;15 26 16" dur="0.4s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="20" cy="20" rx="1.5" ry="7" fill="#5D4037" />
          </g>
        </svg>
      </div>

      {/* Floating leaves */}
      <div className="absolute top-[10%] left-[5%] text-2xl opacity-20" style={{ animation: 'leafFall 8s linear infinite' }}>🍃</div>
      <div className="absolute top-[5%] left-[35%] text-lg opacity-15" style={{ animation: 'leafFall 11s linear infinite', animationDelay: '-3s' }}>🍂</div>
      <div className="absolute top-[8%] left-[65%] text-xl opacity-20" style={{ animation: 'leafFall 9s linear infinite', animationDelay: '-6s' }}>🍃</div>
      <div className="absolute top-[3%] left-[85%] text-lg opacity-15" style={{ animation: 'leafFall 13s linear infinite', animationDelay: '-9s' }}>🌿</div>

      {/* Flying birds */}
      <div className="absolute" style={{ top: '20%', animation: 'birdFly 18s linear infinite' }}>
        <svg width="30" height="15" viewBox="0 0 40 20" className="opacity-25">
          <path d="M0 10 Q10 0 20 10 Q30 0 40 10" stroke="#5D4037" strokeWidth="2" fill="none">
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="0.8s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
      <div className="absolute" style={{ top: '25%', animation: 'birdFly 22s linear infinite', animationDelay: '-8s' }}>
        <svg width="24" height="12" viewBox="0 0 40 20" className="opacity-20">
          <path d="M0 10 Q10 2 20 10 Q30 2 40 10" stroke="#5D4037" strokeWidth="2" fill="none">
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="0.6s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      <style jsx>{`
        @keyframes butterflyFloat {
          0% { left: -5%; transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-30px) rotate(10deg); }
          50% { transform: translateY(10px) rotate(-5deg); }
          75% { transform: translateY(-20px) rotate(8deg); }
          100% { left: 105%; transform: translateY(0) rotate(0deg); }
        }
        @keyframes butterflyFloat2 {
          0% { right: -5%; transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-40px) rotate(-10deg); }
          50% { transform: translateY(15px) rotate(5deg); }
          75% { transform: translateY(-25px) rotate(-8deg); }
          100% { right: 105%; transform: translateY(0) rotate(0deg); }
        }
        @keyframes leafFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.2; }
          90% { opacity: 0.15; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes birdFly {
          0% { left: -5%; }
          100% { left: 105%; }
        }
      `}</style>
    </div>
  );
}

// Bottom nature scene (hills, trees) for page backgrounds
export function NatureGroundScene() {
  return (
    <div className="relative w-full overflow-hidden pointer-events-none" style={{ height: '120px', marginTop: '-60px' }}>
      <svg viewBox="0 0 1440 120" fill="none" className="w-full h-full" preserveAspectRatio="none">
        {/* Far hills */}
        <path d="M0,80 Q200,20 400,60 Q600,100 800,50 Q1000,20 1200,70 Q1350,40 1440,60 L1440,120 L0,120 Z" fill="#81C784" opacity="0.3" />
        {/* Near hills */}
        <path d="M0,90 Q150,50 350,80 Q550,110 750,70 Q950,40 1150,80 Q1300,100 1440,75 L1440,120 L0,120 Z" fill="#66BB6A" opacity="0.4" />
        {/* Ground */}
        <path d="M0,100 Q360,85 720,100 Q1080,115 1440,95 L1440,120 L0,120 Z" fill="#4CAF50" opacity="0.3" />

        {/* Trees (simple cartoon) */}
        {[100, 300, 550, 800, 1050, 1300].map((x, i) => (
          <g key={i} transform={`translate(${x}, ${60 + (i % 3) * 10})`}>
            <rect x="-3" y="10" width="6" height="20" rx="2" fill="#795548" />
            <circle cx="0" cy="5" r="15" fill="#4CAF50" opacity="0.6" />
            <circle cx="-8" cy="10" r="10" fill="#66BB6A" opacity="0.5" />
            <circle cx="8" cy="8" r="11" fill="#81C784" opacity="0.5" />
          </g>
        ))}
      </svg>
    </div>
  );
}

// Cute sun with face
export function CartoonSun({ className = '' }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <svg width="60" height="60" viewBox="0 0 80 80">
        {/* Rays */}
        <g opacity="0.6">
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line key={angle} x1="40" y1="40" x2={40 + 35 * Math.cos(angle * Math.PI / 180)} y2={40 + 35 * Math.sin(angle * Math.PI / 180)}
              stroke="#FFD54F" strokeWidth="3" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" values={`0 40 40;360 40 40`} dur="20s" repeatCount="indefinite" />
            </line>
          ))}
        </g>
        {/* Sun body */}
        <circle cx="40" cy="40" r="20" fill="#FFD54F" />
        <circle cx="40" cy="40" r="18" fill="#FFEB3B" />
        {/* Face */}
        <circle cx="34" cy="38" r="2.5" fill="#F57F17" />
        <circle cx="46" cy="38" r="2.5" fill="#F57F17" />
        <path d="M34 45 Q40 50 46 45" stroke="#F57F17" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Cheeks */}
        <circle cx="30" cy="43" r="3" fill="#FFB74D" opacity="0.5" />
        <circle cx="50" cy="43" r="3" fill="#FFB74D" opacity="0.5" />
      </svg>
    </div>
  );
}

// Animated clouds
export function FloatingClouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[
        { top: '5%', dur: '30s', delay: '0s', size: 120, opacity: 0.3 },
        { top: '12%', dur: '40s', delay: '-15s', size: 90, opacity: 0.2 },
        { top: '8%', dur: '35s', delay: '-8s', size: 100, opacity: 0.25 },
      ].map((c, i) => (
        <div key={i} className="absolute" style={{ top: c.top, animation: `drift ${c.dur} linear infinite`, animationDelay: c.delay, opacity: c.opacity }}>
          <svg width={c.size} height={c.size * 0.5} viewBox="0 0 160 80" fill="white">
            <ellipse cx="80" cy="50" rx="70" ry="22" />
            <ellipse cx="50" cy="38" rx="40" ry="18" />
            <ellipse cx="110" cy="40" rx="35" ry="16" />
          </svg>
        </div>
      ))}
    </div>
  );
}
