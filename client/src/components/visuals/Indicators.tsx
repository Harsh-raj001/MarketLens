export function RSI() {
  return (
    <div className="w-full bg-card border border-border/60 rounded-xl p-6 my-4 shadow-sm relative overflow-hidden">
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-foreground">RSI Playground</h4>
        <p className="text-xs text-muted-foreground">Overbought (70+) vs Oversold (30-)</p>
      </div>
      <div className="relative w-full h-32 border-l border-b border-border/80">
        {/* 70 Line (Overbought) */}
        <line x1="0" y1="20" x2="100%" y2="20" className="stroke-red-300 stroke-2 border-dashed absolute top-[30%]" style={{ width: '100%', borderTopStyle: 'dashed', position: 'absolute' }} />
        <span className="absolute top-[30%] -right-8 text-[10px] text-red-500 font-bold -translate-y-1/2">70</span>
        
        {/* 30 Line (Oversold) */}
        <line x1="0" y1="80" x2="100%" y2="80" className="stroke-emerald-300 stroke-2 border-dashed absolute top-[70%]" style={{ width: '100%', borderTopStyle: 'dashed', position: 'absolute' }} />
        <span className="absolute top-[70%] -right-8 text-[10px] text-emerald-600 font-bold -translate-y-1/2">30</span>

        {/* 50 Line (Neutral) */}
        <line x1="0" y1="50" x2="100%" y2="50" className="stroke-border stroke-1 absolute top-[50%]" style={{ width: '100%', borderTopStyle: 'solid', position: 'absolute' }} />

        {/* RSI SVG Line */}
        <svg className="w-full h-full absolute inset-0 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
          {/* Overbought area highlight */}
          <path d="M 0 30 L 20 15 L 30 25 L 40 10 L 50 30 Z" fill="rgba(239, 68, 68, 0.1)" />
          {/* RSI Line */}
          <path d="M 0 50 Q 10 30, 20 15 T 40 10 T 60 70 T 80 85 T 100 40" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
          {/* Oversold area highlight */}
          <path d="M 50 70 L 60 70 L 80 85 L 90 70 Z" fill="rgba(16, 185, 129, 0.1)" />
          
          <circle cx="20" cy="15" r="3" fill="#ef4444" />
          <circle cx="80" cy="85" r="3" fill="#10b981" />
        </svg>
      </div>
    </div>
  );
}

export function MACD() {
  return (
    <div className="w-full bg-card border border-border/60 rounded-xl p-6 my-4 shadow-sm relative overflow-hidden">
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-foreground">MACD (Moving Average Convergence Divergence)</h4>
        <p className="text-xs text-muted-foreground">Histogram & Signal Crosses</p>
      </div>
      <div className="relative w-full h-32 border-l border-b border-border/80">
        {/* Zero Line */}
        <line x1="0" y1="50" x2="100%" y2="50" className="stroke-border stroke-1 absolute top-[50%]" style={{ width: '100%', borderTopStyle: 'solid', position: 'absolute' }} />

        <svg className="w-full h-full absolute inset-0 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
          {/* Histogram (Bullish) */}
          <rect x="10" y="30" width="4" height="20" fill="#10b981" opacity="0.6" />
          <rect x="20" y="20" width="4" height="30" fill="#10b981" opacity="0.8" />
          <rect x="30" y="10" width="4" height="40" fill="#10b981" opacity="1" />
          <rect x="40" y="25" width="4" height="25" fill="#10b981" opacity="0.6" />
          
          {/* Histogram (Bearish) */}
          <rect x="50" y="50" width="4" height="10" fill="#ef4444" opacity="0.6" />
          <rect x="60" y="50" width="4" height="25" fill="#ef4444" opacity="0.8" />
          <rect x="70" y="50" width="4" height="40" fill="#ef4444" opacity="1" />
          <rect x="80" y="50" width="4" height="20" fill="#ef4444" opacity="0.6" />
          <rect x="90" y="50" width="4" height="5" fill="#ef4444" opacity="0.4" />

          {/* MACD Line (Fast) */}
          <path d="M 0 50 Q 15 10, 30 5 T 50 60 T 70 95 T 100 50" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
          {/* Signal Line (Slow) */}
          <path d="M 0 60 Q 20 20, 35 15 T 55 50 T 75 80 T 100 60" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          
          {/* Crossover points */}
          <circle cx="45" cy="45" r="3" fill="#ef4444" className="animate-pulse" />
          <circle cx="85" cy="72" r="3" fill="#10b981" className="animate-pulse" />
        </svg>
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-0.5 bg-blue-500"></div>
            <span className="text-[10px] text-muted-foreground">MACD Line</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-0.5 bg-amber-500"></div>
            <span className="text-[10px] text-muted-foreground">Signal Line</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BollingerBands() {
  return (
    <div className="w-full bg-card border border-border/60 rounded-xl p-6 my-4 shadow-sm relative overflow-hidden">
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-foreground">Bollinger Bands</h4>
        <p className="text-xs text-muted-foreground">Volatility & Squeeze</p>
      </div>
      <div className="relative w-full h-40 border-l border-b border-border/80">
        <svg className="w-full h-full absolute inset-0 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
          {/* Bands Fill */}
          <path d="M 0 10 Q 20 5, 40 40 T 70 20 T 100 10 L 100 90 Q 70 80, 40 60 T 20 95 T 0 90 Z" fill="rgba(99, 102, 241, 0.05)" />
          
          {/* Upper Band */}
          <path d="M 0 10 Q 20 5, 40 40 T 70 20 T 100 10" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="2 2" strokeLinecap="round" />
          {/* Lower Band */}
          <path d="M 0 90 Q 20 95, 40 60 T 70 80 T 100 90" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="2 2" strokeLinecap="round" />
          {/* Simple Moving Average (Middle) */}
          <path d="M 0 50 Q 20 50, 40 50 T 70 50 T 100 50" fill="none" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" />
          
          {/* Price Action (Candles approximation) */}
          <path d="M 5 60 L 15 40 L 25 70 L 35 55 L 45 45 L 55 35 L 65 25 L 75 40 L 85 60 L 95 30" fill="none" stroke="#10b981" strokeWidth="2" strokeLinejoin="round" />
          
          {/* Squeeze Highlight */}
          <rect x="35" y="35" width="10" height="30" fill="transparent" stroke="#ef4444" strokeWidth="1" strokeDasharray="1 1" />
          <text x="35" y="30" fontSize="4" fill="#ef4444" fontWeight="bold">Squeeze</text>
        </svg>
      </div>
    </div>
  );
}
