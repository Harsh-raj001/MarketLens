import { useState } from "react";
import { motion } from "framer-motion";

interface InteractivePatternProps {
  onHover?: (element: string | null) => void;
}

export function Hammer({ onHover }: InteractivePatternProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center py-6 space-y-6">
      <svg width="200" height="200" viewBox="0 0 100 100" className="drop-shadow-md overflow-visible">
        {/* Wick */}
        <line 
          x1="50" y1="20" x2="50" y2="90" 
          stroke={hovered === "wick" ? "#047857" : "#059669"} 
          strokeWidth={hovered === "wick" ? "6" : "4"} 
          strokeLinecap="round" className="transition-all duration-300"
        />
        {/* Body */}
        <motion.rect 
          x="35" y="25" width="30" height="20" 
          fill={hovered === "body" ? "#34d399" : "#10b981"} 
          rx="2" stroke="#047857" strokeWidth="2" 
          className="transition-colors duration-300"
          animate={hovered === "body" ? { scale: 1.1, x: -1.5, y: -1 } : { scale: 1, x: 0, y: 0 }}
        />
        
        {/* Annotations */}
        {hovered === "body" && (
          <>
            <text x="80" y="35" fontSize="6" fill="#065f46" fontWeight="bold">Open/Close</text>
            <line x1="68" y1="35" x2="78" y2="35" stroke="#065f46" strokeWidth="1" strokeDasharray="2 2" />
          </>
        )}
        {hovered === "wick" && (
          <>
            <text x="75" y="90" fontSize="6" fill="#065f46" fontWeight="bold">Rejection (Low)</text>
            <line x1="55" y1="88" x2="73" y2="88" stroke="#065f46" strokeWidth="1" strokeDasharray="2 2" />
          </>
        )}
      </svg>
      <div className="flex flex-wrap justify-center gap-2 px-4">
        {[
          { id: "body", label: "Small Real Body" },
          { id: "wick", label: "Long Lower Wick" }
        ].map((btn) => (
          <button
            key={btn.id} onMouseEnter={() => setHovered(btn.id)} onMouseLeave={() => setHovered(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${hovered === btn.id ? "bg-primary text-primary-foreground border-primary shadow-md scale-105" : "bg-background text-muted-foreground border-border"}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Doji({ onHover }: InteractivePatternProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center py-6 space-y-6">
      <svg width="200" height="200" viewBox="0 0 100 100" className="drop-shadow-md overflow-visible">
        <line x1="50" y1="15" x2="50" y2="85" stroke={hovered === "wicks" ? "#334155" : "#475569"} strokeWidth={hovered === "wicks" ? "6" : "4"} strokeLinecap="round" className="transition-all duration-300" />
        <motion.line 
          x1="35" y1="50" x2="65" y2="50" stroke={hovered === "body" ? "#1e293b" : "#475569"} strokeWidth={hovered === "body" ? "8" : "6"} strokeLinecap="round" 
          animate={hovered === "body" ? { scale: 1.1 } : { scale: 1 }} className="transition-all duration-300 transform origin-center"
        />
        
        {hovered === "body" && (
          <>
            <text x="80" y="52" fontSize="6" fill="#334155" fontWeight="bold">Open = Close</text>
            <line x1="68" y1="50" x2="78" y2="50" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
          </>
        )}
      </svg>
      <div className="flex flex-wrap justify-center gap-2 px-4">
        {[
          { id: "body", label: "No Real Body (Indecision)" },
          { id: "wicks", label: "Upper/Lower Shadows" }
        ].map((btn) => (
          <button
            key={btn.id} onMouseEnter={() => setHovered(btn.id)} onMouseLeave={() => setHovered(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${hovered === btn.id ? "bg-primary text-primary-foreground border-primary shadow-md scale-105" : "bg-background text-muted-foreground border-border"}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Engulfing({ onHover }: InteractivePatternProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center py-6 space-y-6">
      <svg width="240" height="200" viewBox="0 0 120 100" className="drop-shadow-md overflow-visible">
        {/* Candle 1 (Bearish) */}
        <line x1="30" y1="40" x2="30" y2="70" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" className={hovered === "candle1" ? "opacity-100" : (hovered ? "opacity-50" : "opacity-100")} />
        <rect x="20" y="45" width="20" height="20" fill="#ef4444" rx="2" stroke="#b91c1c" strokeWidth="1.5" className={`transition-all duration-300 ${hovered === "candle1" ? "opacity-100 scale-105" : (hovered ? "opacity-50" : "opacity-100")}`} style={{ transformOrigin: '30px 55px' }} />
        
        {/* Candle 2 (Bullish Engulfing) */}
        <line x1="80" y1="20" x2="80" y2="85" stroke="#059669" strokeWidth="3" strokeLinecap="round" className={hovered === "candle2" ? "opacity-100" : (hovered ? "opacity-50" : "opacity-100")} />
        <rect x="65" y="30" width="30" height="50" fill="#10b981" rx="2" stroke="#047857" strokeWidth="1.5" className={`transition-all duration-300 ${hovered === "candle2" ? "opacity-100 scale-105" : (hovered ? "opacity-50" : "opacity-100")}`} style={{ transformOrigin: '80px 55px' }} />
        
        {hovered === "engulf" && (
          <>
            <path d="M 45 42 Q 55 35 62 35" fill="transparent" stroke="#065f46" strokeWidth="1.5" strokeDasharray="2 2" className="animate-pulse" />
            <path d="M 45 68 Q 55 75 62 75" fill="transparent" stroke="#065f46" strokeWidth="1.5" strokeDasharray="2 2" className="animate-pulse" />
          </>
        )}
      </svg>
      <div className="flex flex-wrap justify-center gap-2 px-4">
        {[
          { id: "candle1", label: "Prior Trend Candle" },
          { id: "candle2", label: "Engulfing Candle" },
          { id: "engulf", label: "Total Body Coverage" }
        ].map((btn) => (
          <button
            key={btn.id} onMouseEnter={() => setHovered(btn.id)} onMouseLeave={() => setHovered(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${hovered === btn.id ? "bg-primary text-primary-foreground border-primary shadow-md scale-105" : "bg-background text-muted-foreground border-border"}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Ensure aliasing covers all needed patterns for now to avoid crashes
export const ShootingStar = Hammer;
export const MorningStar = Engulfing;
export const EveningStar = Engulfing;
export const Harami = Engulfing;
export const Marubozu = Doji;
