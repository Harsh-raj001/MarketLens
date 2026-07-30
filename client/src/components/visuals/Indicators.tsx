import { useState } from "react";
import { motion } from "framer-motion";

interface InteractivePatternProps {
  onHover?: (element: string | null) => void;
}

export function RSI({ onHover }: InteractivePatternProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full bg-card border border-border/60 rounded-xl p-6 my-4 shadow-sm relative overflow-hidden flex flex-col space-y-4">
      <div className="relative w-full h-32 border-l border-b border-border/80">
        <line x1="0" y1="20" x2="100%" y2="20" className={`stroke-2 border-dashed absolute top-[30%] transition-colors ${hovered === "overbought" ? "stroke-red-500" : "stroke-red-300"}`} style={{ width: '100%', borderTopStyle: 'dashed', position: 'absolute' }} />
        <span className={`absolute top-[30%] -right-8 text-[10px] font-bold -translate-y-1/2 ${hovered === "overbought" ? "text-red-500 scale-110" : "text-red-400"}`}>70</span>
        
        <line x1="0" y1="80" x2="100%" y2="80" className={`stroke-2 border-dashed absolute top-[70%] transition-colors ${hovered === "oversold" ? "stroke-emerald-500" : "stroke-emerald-300"}`} style={{ width: '100%', borderTopStyle: 'dashed', position: 'absolute' }} />
        <span className={`absolute top-[70%] -right-8 text-[10px] font-bold -translate-y-1/2 ${hovered === "oversold" ? "text-emerald-500 scale-110" : "text-emerald-400"}`}>30</span>

        <line x1="0" y1="50" x2="100%" y2="50" className="stroke-border stroke-1 absolute top-[50%]" style={{ width: '100%', borderTopStyle: 'solid', position: 'absolute' }} />

        <svg className="w-full h-full absolute inset-0 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M 0 30 L 20 15 L 30 25 L 40 10 L 50 30 Z" fill={hovered === "overbought" ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.05)"} className="transition-colors duration-300" />
          <path d="M 0 50 Q 10 30, 20 15 T 40 10 T 60 70 T 80 85 T 100 40" fill="none" stroke={hovered === "divergence" ? "#818cf8" : "#6366f1"} strokeWidth={hovered === "divergence" ? "3" : "2"} strokeLinecap="round" />
          <path d="M 50 70 L 60 70 L 80 85 L 90 70 Z" fill={hovered === "oversold" ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.05)"} className="transition-colors duration-300" />
          
          {hovered === "divergence" && (
            <path d="M 20 15 L 40 10" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="2 2" className="animate-pulse" />
          )}
        </svg>
      </div>

      <div className="flex flex-wrap justify-center gap-2 pt-2">
        {[
          { id: "overbought", label: "Overbought (>70)" },
          { id: "oversold", label: "Oversold (<30)" },
          { id: "divergence", label: "Divergence" }
        ].map((btn) => (
          <button
            key={btn.id} onMouseEnter={() => setHovered(btn.id)} onMouseLeave={() => setHovered(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${hovered === btn.id ? "bg-primary text-primary-foreground border-primary shadow-md scale-105" : "bg-background text-muted-foreground border-border hover:border-primary/50"}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function MACD({ onHover }: InteractivePatternProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full bg-card border border-border/60 rounded-xl p-6 my-4 shadow-sm relative overflow-hidden flex flex-col space-y-4">
      <div className="relative w-full h-32 border-l border-b border-border/80">
        <line x1="0" y1="50" x2="100%" y2="50" className="stroke-border stroke-1 absolute top-[50%]" style={{ width: '100%', borderTopStyle: 'solid', position: 'absolute' }} />

        <svg className="w-full h-full absolute inset-0 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
          {/* Histograms */}
          <g className={`transition-opacity duration-300 ${hovered === "lines" ? "opacity-30" : "opacity-100"}`}>
            <rect x="10" y="30" width="4" height="20" fill="#10b981" opacity={hovered === "histogram" ? "0.8" : "0.5"} />
            <rect x="20" y="20" width="4" height="30" fill="#10b981" opacity={hovered === "histogram" ? "1" : "0.7"} />
            <rect x="30" y="10" width="4" height="40" fill="#10b981" opacity={hovered === "histogram" ? "1" : "0.9"} />
            <rect x="50" y="50" width="4" height="10" fill="#ef4444" opacity={hovered === "histogram" ? "0.8" : "0.5"} />
            <rect x="60" y="50" width="4" height="25" fill="#ef4444" opacity={hovered === "histogram" ? "1" : "0.7"} />
            <rect x="70" y="50" width="4" height="40" fill="#ef4444" opacity={hovered === "histogram" ? "1" : "0.9"} />
          </g>

          {/* MACD Line (Fast) */}
          <path d="M 0 50 Q 15 10, 30 5 T 50 60 T 70 95 T 100 50" fill="none" stroke="#3b82f6" strokeWidth={hovered === "lines" ? "3" : "2"} strokeLinecap="round" className={`transition-all duration-300 ${hovered === "histogram" ? "opacity-30" : "opacity-100"}`} />
          {/* Signal Line (Slow) */}
          <path d="M 0 60 Q 20 20, 35 15 T 55 50 T 75 80 T 100 60" fill="none" stroke="#f59e0b" strokeWidth={hovered === "lines" ? "3" : "2"} strokeLinecap="round" className={`transition-all duration-300 ${hovered === "histogram" ? "opacity-30" : "opacity-100"}`} />
          
          {hovered === "crossover" && (
            <>
              <circle cx="45" cy="45" r="4" fill="#ef4444" className="animate-pulse" />
              <circle cx="85" cy="72" r="4" fill="#10b981" className="animate-pulse" />
            </>
          )}
        </svg>
      </div>

      <div className="flex flex-wrap justify-center gap-2 pt-2">
        {[
          { id: "lines", label: "MACD & Signal Lines" },
          { id: "histogram", label: "Histogram" },
          { id: "crossover", label: "Crossovers" }
        ].map((btn) => (
          <button
            key={btn.id} onMouseEnter={() => setHovered(btn.id)} onMouseLeave={() => setHovered(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${hovered === btn.id ? "bg-primary text-primary-foreground border-primary shadow-md scale-105" : "bg-background text-muted-foreground border-border hover:border-primary/50"}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function BollingerBands({ onHover }: InteractivePatternProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full bg-card border border-border/60 rounded-xl p-6 my-4 shadow-sm relative overflow-hidden flex flex-col space-y-4">
      <div className="relative w-full h-40 border-l border-b border-border/80">
        <svg className="w-full h-full absolute inset-0 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M 0 10 Q 20 5, 40 40 T 70 20 T 100 10 L 100 90 Q 70 80, 40 60 T 20 95 T 0 90 Z" fill="rgba(99, 102, 241, 0.05)" />
          
          <path d="M 0 10 Q 20 5, 40 40 T 70 20 T 100 10" fill="none" stroke={hovered === "bands" ? "#4f46e5" : "#818cf8"} strokeWidth={hovered === "bands" ? "2.5" : "1.5"} strokeDasharray="2 2" strokeLinecap="round" className="transition-colors duration-300" />
          <path d="M 0 90 Q 20 95, 40 60 T 70 80 T 100 90" fill="none" stroke={hovered === "bands" ? "#4f46e5" : "#818cf8"} strokeWidth={hovered === "bands" ? "2.5" : "1.5"} strokeDasharray="2 2" strokeLinecap="round" className="transition-colors duration-300" />
          
          <path d="M 0 50 Q 20 50, 40 50 T 70 50 T 100 50" fill="none" stroke={hovered === "sma" ? "#d97706" : "#f59e0b"} strokeWidth={hovered === "sma" ? "2" : "1"} strokeLinecap="round" className="transition-colors duration-300" />
          
          <path d="M 5 60 L 15 40 L 25 70 L 35 55 L 45 45 L 55 35 L 65 25 L 75 40 L 85 60 L 95 30" fill="none" stroke={hovered === "price" ? "#059669" : "#10b981"} strokeWidth={hovered === "price" ? "3" : "2"} strokeLinejoin="round" className={`transition-all duration-300 ${hovered === "bands" || hovered === "sma" ? "opacity-50" : "opacity-100"}`} />
          
          {hovered === "squeeze" && (
            <>
              <rect x="35" y="35" width="10" height="30" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1" strokeDasharray="1 1" className="animate-pulse" />
              <text x="35" y="30" fontSize="4" fill="#ef4444" fontWeight="bold">Squeeze</text>
            </>
          )}
        </svg>
      </div>

      <div className="flex flex-wrap justify-center gap-2 pt-2">
        {[
          { id: "bands", label: "Upper/Lower Bands (2 SD)" },
          { id: "sma", label: "20-Period SMA" },
          { id: "squeeze", label: "Volatility Squeeze" },
          { id: "price", label: "Price Action" }
        ].map((btn) => (
          <button
            key={btn.id} onMouseEnter={() => setHovered(btn.id)} onMouseLeave={() => setHovered(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${hovered === btn.id ? "bg-primary text-primary-foreground border-primary shadow-md scale-105" : "bg-background text-muted-foreground border-border hover:border-primary/50"}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Fallbacks for MVP speed
export const VWAP = RSI;
export const EMA = BollingerBands;
export const SMA = BollingerBands;
export const ATR = RSI;
export const ADX = MACD;
