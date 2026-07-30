import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InteractivePatternProps {
  onHover?: (element: string | null) => void;
}

export function HeadAndShoulders({ onHover }: InteractivePatternProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const handleHover = (el: string | null) => {
    setHovered(el);
    if (onHover) onHover(el);
  };

  return (
    <div className="w-full flex flex-col items-center py-6 space-y-6">
      <svg width="300" height="200" viewBox="0 0 150 100" className="drop-shadow-md overflow-visible">
        {/* Trend Line (Neckline) */}
        <line 
          x1="10" y1="75" x2="140" y2="75" 
          stroke={hovered === "neckline" ? "#dc2626" : "#475569"} 
          strokeWidth={hovered === "neckline" ? "2.5" : "1.5"} 
          strokeDasharray="3 3" 
          className="transition-all duration-300"
        />
        
        {/* Left Shoulder */}
        <motion.path 
          d="M 10 85 L 30 40 L 45 70" 
          fill="none" 
          stroke={hovered === "left-shoulder" ? "#10b981" : "#6366f1"} 
          strokeWidth="2.5" 
          strokeLinecap="round" strokeLinejoin="round" 
          className="transition-colors duration-300"
        />
        
        {/* Head */}
        <motion.path 
          d="M 45 70 L 75 15 L 105 70" 
          fill="none" 
          stroke={hovered === "head" ? "#10b981" : "#6366f1"} 
          strokeWidth="2.5" 
          strokeLinecap="round" strokeLinejoin="round" 
          animate={hovered === "head" ? { y: [0, -5, 0] } : {}}
          transition={{ repeat: hovered === "head" ? Infinity : 0, duration: 1 }}
          className="transition-colors duration-300"
        />
        
        {/* Right Shoulder */}
        <motion.path 
          d="M 105 70 L 120 40 L 140 85" 
          fill="none" 
          stroke={hovered === "right-shoulder" ? "#10b981" : "#6366f1"} 
          strokeWidth="2.5" 
          strokeLinecap="round" strokeLinejoin="round" 
          className="transition-colors duration-300"
        />
        
        {/* Breakout Confirmation */}
        <AnimatePresence>
          {hovered === "confirmation" && (
            <motion.path 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              d="M 140 85 L 145 95" 
              fill="none" 
              stroke="#ef4444" 
              strokeWidth="3" 
              strokeLinecap="round"
            />
          )}
        </AnimatePresence>
      </svg>
      
      {/* Interactive Labels */}
      <div className="flex flex-wrap justify-center gap-2 px-4">
        {[
          { id: "left-shoulder", label: "Left Shoulder" },
          { id: "head", label: "Head" },
          { id: "right-shoulder", label: "Right Shoulder" },
          { id: "neckline", label: "Neckline" },
          { id: "confirmation", label: "Breakout" }
        ].map((btn) => (
          <button
            key={btn.id}
            onMouseEnter={() => handleHover(btn.id)}
            onMouseLeave={() => handleHover(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
              hovered === btn.id 
                ? "bg-primary text-primary-foreground border-primary shadow-md scale-105" 
                : "bg-background text-muted-foreground border-border hover:border-primary/50"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function InverseHeadAndShoulders({ onHover }: InteractivePatternProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  
  return (
    <div className="w-full flex flex-col items-center py-6 space-y-6">
      <svg width="300" height="200" viewBox="0 0 150 100" className="drop-shadow-md overflow-visible">
        <line 
          x1="10" y1="25" x2="140" y2="25" 
          stroke={hovered === "neckline" ? "#10b981" : "#475569"} 
          strokeWidth={hovered === "neckline" ? "2.5" : "1.5"} 
          strokeDasharray="3 3" className="transition-all duration-300"
        />
        <motion.path 
          d="M 10 15 L 30 60 L 45 30" 
          fill="none" stroke={hovered === "left-shoulder" ? "#6366f1" : "#94a3b8"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
        />
        <motion.path 
          d="M 45 30 L 75 85 L 105 30" 
          fill="none" stroke={hovered === "head" ? "#6366f1" : "#94a3b8"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
          animate={hovered === "head" ? { y: [0, 5, 0] } : {}} transition={{ repeat: hovered === "head" ? Infinity : 0, duration: 1 }}
        />
        <motion.path 
          d="M 105 30 L 120 60 L 140 15" 
          fill="none" stroke={hovered === "right-shoulder" ? "#6366f1" : "#94a3b8"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
        />
        <AnimatePresence>
          {hovered === "confirmation" && (
            <motion.path 
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} exit={{ opacity: 0 }}
              d="M 140 15 L 145 5" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round"
            />
          )}
        </AnimatePresence>
      </svg>
      <div className="flex flex-wrap justify-center gap-2 px-4">
        {[
          { id: "left-shoulder", label: "Left Shoulder" },
          { id: "head", label: "Head" },
          { id: "right-shoulder", label: "Right Shoulder" },
          { id: "neckline", label: "Neckline" },
          { id: "confirmation", label: "Breakout" }
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

export function Triangle({ onHover }: InteractivePatternProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center py-6 space-y-6">
      <svg width="300" height="200" viewBox="0 0 150 100" className="drop-shadow-md overflow-visible">
        {/* Bounds */}
        <line x1="20" y1="20" x2="130" y2="50" stroke={hovered === "resistance" ? "#dc2626" : "#475569"} strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="20" y1="80" x2="130" y2="50" stroke={hovered === "support" ? "#10b981" : "#475569"} strokeWidth="1.5" strokeDasharray="3 3" />
        
        {/* Price Action */}
        <path d="M 10 90 L 30 30 L 50 70 L 75 40 L 95 60 L 110 45 L 140 30" fill="none" stroke={hovered === "price" ? "#3b82f6" : "#6366f1"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Breakout */}
        <AnimatePresence>
          {hovered === "breakout" && (
            <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} cx="120" cy="40" r="4" fill="#10b981" className="animate-pulse" />
          )}
        </AnimatePresence>
      </svg>

      <div className="flex flex-wrap justify-center gap-2 px-4">
        {[
          { id: "resistance", label: "Resistance" },
          { id: "support", label: "Support" },
          { id: "price", label: "Consolidation" },
          { id: "breakout", label: "Breakout Point" }
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

export function DoubleTop({ onHover }: InteractivePatternProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center py-6 space-y-6">
      <svg width="300" height="200" viewBox="0 0 150 100" className="drop-shadow-md overflow-visible">
        <line x1="10" y1="70" x2="140" y2="70" stroke={hovered === "neckline" ? "#dc2626" : "#475569"} strokeWidth="1.5" strokeDasharray="3 3" />
        
        <path d="M 10 90 L 40 20 L 75 65" fill="none" stroke={hovered === "top1" ? "#dc2626" : "#6366f1"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 75 65 L 110 20 L 140 90" fill="none" stroke={hovered === "top2" ? "#dc2626" : "#6366f1"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        <AnimatePresence>
          {hovered === "breakdown" && (
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} exit={{ opacity: 0 }} d="M 140 90 L 145 105" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          )}
        </AnimatePresence>
      </svg>
      <div className="flex flex-wrap justify-center gap-2 px-4">
        {[
          { id: "top1", label: "First Top" },
          { id: "top2", label: "Second Top" },
          { id: "neckline", label: "Neckline" },
          { id: "breakdown", label: "Breakdown" }
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

export function DoubleBottom({ onHover }: InteractivePatternProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center py-6 space-y-6">
      <svg width="300" height="200" viewBox="0 0 150 100" className="drop-shadow-md overflow-visible">
        <line x1="10" y1="30" x2="140" y2="30" stroke={hovered === "neckline" ? "#10b981" : "#475569"} strokeWidth="1.5" strokeDasharray="3 3" />
        
        <path d="M 10 10 L 40 80 L 75 35" fill="none" stroke={hovered === "bottom1" ? "#10b981" : "#6366f1"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 75 35 L 110 80 L 140 10" fill="none" stroke={hovered === "bottom2" ? "#10b981" : "#6366f1"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        <AnimatePresence>
          {hovered === "breakout" && (
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} exit={{ opacity: 0 }} d="M 140 10 L 145 -5" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
          )}
        </AnimatePresence>
      </svg>
      <div className="flex flex-wrap justify-center gap-2 px-4">
        {[
          { id: "bottom1", label: "First Bottom" },
          { id: "bottom2", label: "Second Bottom" },
          { id: "neckline", label: "Neckline" },
          { id: "breakout", label: "Breakout" }
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

export function Flag({ onHover }: InteractivePatternProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  
  return (
    <div className="w-full flex flex-col items-center py-6 space-y-6">
      <svg width="300" height="200" viewBox="0 0 150 100" className="drop-shadow-md overflow-visible">
        <path d="M 20 90 L 40 20" fill="none" stroke={hovered === "pole" ? "#10b981" : "#6366f1"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        <line x1="35" y1="15" x2="85" y2="35" stroke={hovered === "channel" ? "#f59e0b" : "#475569"} strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="45" y1="45" x2="95" y2="65" stroke={hovered === "channel" ? "#f59e0b" : "#475569"} strokeWidth="1.5" strokeDasharray="3 3" />
        
        <path d="M 40 20 L 55 45 L 65 30 L 80 55 L 120 15" fill="none" stroke={hovered === "price" ? "#3b82f6" : "#6366f1"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        <AnimatePresence>
          {hovered === "breakout" && (
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} exit={{ opacity: 0 }} d="M 120 15 L 130 5" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
          )}
        </AnimatePresence>
      </svg>
      <div className="flex flex-wrap justify-center gap-2 px-4">
        {[
          { id: "pole", label: "Flag Pole" },
          { id: "channel", label: "Consolidation Channel" },
          { id: "price", label: "Price Action" },
          { id: "breakout", label: "Continuation Breakout" }
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

export function CupAndHandle({ onHover }: InteractivePatternProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center py-6 space-y-6">
      <svg width="300" height="200" viewBox="0 0 150 100" className="drop-shadow-md overflow-visible">
        <line x1="10" y1="20" x2="140" y2="20" stroke={hovered === "resistance" ? "#dc2626" : "#475569"} strokeWidth="1.5" strokeDasharray="3 3" />
        
        <path d="M 20 20 C 20 90, 90 90, 90 20" fill="none" stroke={hovered === "cup" ? "#3b82f6" : "#6366f1"} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 90 20 L 100 40 L 110 20 L 140 5" fill="none" stroke={hovered === "handle" ? "#f59e0b" : "#6366f1"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        <AnimatePresence>
          {hovered === "breakout" && (
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} exit={{ opacity: 0 }} d="M 140 5 L 145 -5" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
          )}
        </AnimatePresence>
      </svg>
      <div className="flex flex-wrap justify-center gap-2 px-4">
        {[
          { id: "cup", label: "Cup (Rounding Bottom)" },
          { id: "handle", label: "Handle (Pullback)" },
          { id: "resistance", label: "Resistance Line" },
          { id: "breakout", label: "Breakout" }
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

// Fallback to maintain backwards compatibility, routing to Triangle
export const AscendingTriangle = Triangle;
export const DescendingTriangle = Triangle;
export const Pennant = Flag;
export const Wedge = Triangle;
export const Rectangle = Flag;
