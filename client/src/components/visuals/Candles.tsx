export function Hammer() {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <svg width="200" height="200" viewBox="0 0 100 100" className="drop-shadow-md">
        {/* Wick */}
        <line x1="50" y1="20" x2="50" y2="90" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
        {/* Body */}
        <rect x="35" y="25" width="30" height="20" fill="#10b981" rx="2" stroke="#047857" strokeWidth="2" />
        
        {/* Annotations */}
        <text x="80" y="35" fontSize="6" fill="#065f46" fontWeight="bold">Open/Close</text>
        <line x1="68" y1="35" x2="78" y2="35" stroke="#065f46" strokeWidth="1" strokeDasharray="2 2" />
        
        <text x="75" y="90" fontSize="6" fill="#065f46" fontWeight="bold">Low (Long Wick)</text>
        <line x1="55" y1="88" x2="73" y2="88" stroke="#065f46" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    </div>
  );
}

export function Doji() {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <svg width="200" height="200" viewBox="0 0 100 100" className="drop-shadow-md">
        {/* Wick */}
        <line x1="50" y1="15" x2="50" y2="85" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        {/* Body (Cross) */}
        <line x1="35" y1="50" x2="65" y2="50" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        
        {/* Annotations */}
        <text x="80" y="52" fontSize="6" fill="#334155" fontWeight="bold">Open = Close</text>
        <line x1="68" y1="50" x2="78" y2="50" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    </div>
  );
}

export function Engulfing() {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <svg width="240" height="200" viewBox="0 0 120 100" className="drop-shadow-md">
        {/* Candle 1 (Bearish) */}
        <line x1="30" y1="40" x2="30" y2="70" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
        <rect x="20" y="45" width="20" height="20" fill="#ef4444" rx="2" stroke="#b91c1c" strokeWidth="1.5" />
        
        {/* Candle 2 (Bullish Engulfing) */}
        <line x1="80" y1="20" x2="80" y2="85" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
        <rect x="65" y="30" width="30" height="50" fill="#10b981" rx="2" stroke="#047857" strokeWidth="1.5" />
        
        {/* Annotations */}
        <path d="M 45 42 Q 55 35 62 35" fill="transparent" stroke="#065f46" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M 45 68 Q 55 75 62 75" fill="transparent" stroke="#065f46" strokeWidth="1" strokeDasharray="2 2" />
        <text x="45" y="25" fontSize="6" fill="#065f46" fontWeight="bold">Engulfs completely</text>
      </svg>
    </div>
  );
}

export function ShootingStar() {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <svg width="200" height="200" viewBox="0 0 100 100" className="drop-shadow-md">
        {/* Wick */}
        <line x1="50" y1="10" x2="50" y2="80" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
        {/* Body */}
        <rect x="35" y="55" width="30" height="20" fill="#ef4444" rx="2" stroke="#b91c1c" strokeWidth="2" />
        
        {/* Annotations */}
        <text x="80" y="20" fontSize="6" fill="#991b1b" fontWeight="bold">High (Rejection)</text>
        <line x1="55" y1="18" x2="78" y2="18" stroke="#991b1b" strokeWidth="1" strokeDasharray="2 2" />
        
        <text x="75" y="65" fontSize="6" fill="#991b1b" fontWeight="bold">Open/Close</text>
        <line x1="68" y1="65" x2="73" y2="65" stroke="#991b1b" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    </div>
  );
}

export function Marubozu() {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <svg width="200" height="200" viewBox="0 0 100 100" className="drop-shadow-md">
        {/* Body (No wicks) */}
        <rect x="35" y="10" width="30" height="80" fill="#10b981" rx="2" stroke="#047857" strokeWidth="2" />
        
        {/* Annotations */}
        <text x="80" y="15" fontSize="6" fill="#065f46" fontWeight="bold">Close = High</text>
        <line x1="68" y1="13" x2="78" y2="13" stroke="#065f46" strokeWidth="1" strokeDasharray="2 2" />
        
        <text x="80" y="85" fontSize="6" fill="#065f46" fontWeight="bold">Open = Low</text>
        <line x1="68" y1="83" x2="78" y2="83" stroke="#065f46" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    </div>
  );
}

export function Harami() {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <svg width="240" height="200" viewBox="0 0 120 100" className="drop-shadow-md">
        {/* Mother Candle */}
        <line x1="35" y1="15" x2="35" y2="85" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
        <rect x="20" y="25" width="30" height="50" fill="#ef4444" rx="2" stroke="#b91c1c" strokeWidth="1.5" />
        
        {/* Inside Candle (Harami) */}
        <line x1="85" y1="40" x2="85" y2="60" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
        <rect x="75" y="45" width="20" height="10" fill="#10b981" rx="2" stroke="#047857" strokeWidth="1.5" />
        
        {/* Annotations */}
        <text x="75" y="35" fontSize="6" fill="#065f46" fontWeight="bold">Contained within</text>
        <path d="M 55 35 Q 65 35 70 35" fill="transparent" stroke="#065f46" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M 55 65 Q 65 65 70 65" fill="transparent" stroke="#065f46" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    </div>
  );
}

export function MorningStar() {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <svg width="280" height="200" viewBox="0 0 140 100" className="drop-shadow-md">
        {/* Candle 1 (Bearish) */}
        <line x1="30" y1="20" x2="30" y2="80" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
        <rect x="20" y="30" width="20" height="40" fill="#ef4444" rx="2" stroke="#b91c1c" strokeWidth="1.5" />
        
        {/* Candle 2 (Star - Doji/Small) */}
        <line x1="70" y1="75" x2="70" y2="95" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        <rect x="65" y="82" width="10" height="6" fill="#94a3b8" rx="1" stroke="#475569" strokeWidth="1.5" />
        
        {/* Candle 3 (Bullish) */}
        <line x1="110" y1="25" x2="110" y2="85" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
        <rect x="100" y="35" width="20" height="40" fill="#10b981" rx="2" stroke="#047857" strokeWidth="1.5" />
        
        {/* Annotations */}
        <text x="60" y="70" fontSize="5" fill="#334155" fontWeight="bold">Indecision Gap</text>
      </svg>
    </div>
  );
}

export function EveningStar() {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <svg width="280" height="200" viewBox="0 0 140 100" className="drop-shadow-md">
        {/* Candle 1 (Bullish) */}
        <line x1="30" y1="20" x2="30" y2="80" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
        <rect x="20" y="30" width="20" height="40" fill="#10b981" rx="2" stroke="#047857" strokeWidth="1.5" />
        
        {/* Candle 2 (Star - Doji/Small) */}
        <line x1="70" y1="5" x2="70" y2="25" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        <rect x="65" y="12" width="10" height="6" fill="#94a3b8" rx="1" stroke="#475569" strokeWidth="1.5" />
        
        {/* Candle 3 (Bearish) */}
        <line x1="110" y1="25" x2="110" y2="85" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
        <rect x="100" y="35" width="20" height="40" fill="#ef4444" rx="2" stroke="#b91c1c" strokeWidth="1.5" />
        
        {/* Annotations */}
        <text x="60" y="33" fontSize="5" fill="#334155" fontWeight="bold">Top Reversal</text>
      </svg>
    </div>
  );
}
