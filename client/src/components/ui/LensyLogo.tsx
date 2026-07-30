import { motion } from "framer-motion";

interface LensyLogoProps {
  className?: string;
  animated?: boolean;
}

export function LensyLogo({ className = "w-6 h-6", animated = false }: LensyLogoProps) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <defs>
        <linearGradient id="lensy-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#0F766E" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>
      </defs>
      
      {/* Sparkle */}
      {animated ? (
        <motion.path 
          d="M80 15 Q80 25 90 25 Q80 25 80 35 Q80 25 70 25 Q80 25 80 15" 
          fill="#14B8A6" 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      ) : (
        <path 
          d="M80 15 Q80 25 90 25 Q80 25 80 35 Q80 25 70 25 Q80 25 80 15" 
          fill="#14B8A6" 
        />
      )}

      {/* Main Lens Body */}
      <circle cx="45" cy="45" r="35" fill="none" stroke="url(#lensy-grad)" strokeWidth="8" />
      
      {/* Handle */}
      <line x1="70" y1="70" x2="88" y2="88" stroke="url(#lensy-grad)" strokeWidth="10" strokeLinecap="round" />

      {/* Friendly Eyes */}
      <circle cx="35" cy="38" r="4" fill="#0F766E" />
      <circle cx="55" cy="38" r="4" fill="#0F766E" />

      {/* Graph Smile */}
      <path 
        d="M28 50 L40 60 L52 54 L62 44" 
        fill="none" 
        stroke="#22C55E" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}
