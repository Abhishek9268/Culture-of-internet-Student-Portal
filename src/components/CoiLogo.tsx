import React from 'react';

interface CoiLogoProps {
  className?: string;
}

export default function CoiLogo({ className = "w-12 h-12" }: CoiLogoProps) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 select-none ${className}`}>
      <div className="w-full h-full relative">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main Dark Slate Circular Base */}
          <circle cx="50" cy="50" r="47" fill="#1e2d3d" stroke="#121e2b" strokeWidth="1.5" />
          
          {/* Subtle concentric inner guideline mapping */}
          <circle cx="50" cy="50" r="43" stroke="#fed65b" strokeWidth="0.5" strokeDasharray="1.5 2.5" className="opacity-30" />
          
          {/* Golden Left-side Orbits / Crescent Spiral */}
          {/* Thick external sweep */}
          <path 
            d="M 56 11 A 38 38 0 0 0 15 54 C 18 73 34 87 54 87" 
            stroke="#fed65b" 
            strokeWidth="4" 
            strokeLinecap="round" 
            fill="none" 
          />
          {/* Inner amber layered brush curve */}
          <path 
            d="M 52 18 A 31 31 0 0 0 21 53 C 23 68 36 80 50 80" 
            stroke="#d97706" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            fill="none" 
          />
          
          {/* Precise Golden Central Medallion Circle */}
          <circle cx="50" cy="50" r="22.5" stroke="#fed65b" strokeWidth="3" fill="#132337" />
          
          {/* Central Key / Inverted-T Emblem - Column & Base T-Bar */}
          <line x1="50" y1="36" x2="50" y2="61" stroke="#fed65b" strokeWidth="4" strokeLinecap="round" />
          <line x1="38" y1="61" x2="62" y2="61" stroke="#fed65b" strokeWidth="4" strokeLinecap="round" />
          
          {/* Arc path definition for text mapping along the right boundary */}
          <defs>
            <path id="logoTextArc" d="M 55 12.5 A 36.5 36.5 0 0 1 87.5 50 A 36.5 36.5 0 0 1 55 87.5" fill="none" />
          </defs>
          
          {/* Wrapped Golden Font-Mono Brand Script */}
          <text fontSize="5.2" fontWeight="900" fill="#fed65b" letterSpacing="0.4" className="font-mono tracking-widest opacity-95">
            <textPath href="#logoTextArc" startOffset="50%" textAnchor="middle">
              CULTURE OF INTERNET
            </textPath>
          </text>
          
          {/* Mini accent design dots to ground alignment */}
          <circle cx="16" cy="50" r="1.2" fill="#fed65b" className="opacity-90" />
          <circle cx="50" cy="9" r="1" fill="#fed65b" className="opacity-40" />
        </svg>
      </div>
    </div>
  );
}

