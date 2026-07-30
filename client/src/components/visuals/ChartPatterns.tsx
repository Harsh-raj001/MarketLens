export function HeadAndShoulders() {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <svg width="300" height="200" viewBox="0 0 150 100" className="drop-shadow-md">
        {/* Trend Line (Neckline) */}
        <line x1="10" y1="75" x2="140" y2="75" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="110" y="82" fontSize="5" fill="#475569">Neckline</text>
        
        {/* Pattern Line */}
        <path d="M 10 85 L 30 40 L 45 70 L 75 15 L 105 70 L 120 40 L 140 85" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Labels */}
        <text x="22" y="35" fontSize="5" fill="#4f46e5" fontWeight="bold">L Shoulder</text>
        <text x="70" y="10" fontSize="5" fill="#4f46e5" fontWeight="bold">Head</text>
        <text x="112" y="35" fontSize="5" fill="#4f46e5" fontWeight="bold">R Shoulder</text>
      </svg>
    </div>
  );
}

export function Triangle() {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <svg width="300" height="200" viewBox="0 0 150 100" className="drop-shadow-md">
        {/* Triangle Bounds */}
        <line x1="20" y1="20" x2="130" y2="50" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="20" y1="80" x2="130" y2="50" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
        
        {/* Price Action */}
        <path d="M 10 90 L 30 30 L 50 70 L 75 40 L 95 60 L 110 45 L 140 30" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        <circle cx="120" cy="40" r="3" fill="#10b981" />
        <text x="125" y="38" fontSize="5" fill="#059669" fontWeight="bold">Breakout</text>
      </svg>
    </div>
  );
}

export function Flag() {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <svg width="300" height="200" viewBox="0 0 150 100" className="drop-shadow-md">
        {/* Flag Pole */}
        <path d="M 20 90 L 40 20" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Flag Bounds */}
        <line x1="35" y1="15" x2="85" y2="35" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="45" y1="45" x2="95" y2="65" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
        
        {/* Price Action inside Flag */}
        <path d="M 40 20 L 55 45 L 65 30 L 80 55 L 120 15" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        <text x="10" y="55" fontSize="5" fill="#475569">Pole</text>
      </svg>
    </div>
  );
}

export function DoubleTop() {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <svg width="300" height="200" viewBox="0 0 150 100" className="drop-shadow-md">
        {/* Neckline */}
        <line x1="10" y1="70" x2="140" y2="70" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="110" y="77" fontSize="5" fill="#475569">Neckline</text>
        
        {/* Price Action */}
        <path d="M 10 90 L 40 20 L 75 65 L 110 20 L 140 90" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Labels */}
        <text x="35" y="15" fontSize="5" fill="#dc2626" fontWeight="bold">Top 1</text>
        <text x="105" y="15" fontSize="5" fill="#dc2626" fontWeight="bold">Top 2</text>
      </svg>
    </div>
  );
}

export function DoubleBottom() {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <svg width="300" height="200" viewBox="0 0 150 100" className="drop-shadow-md">
        {/* Neckline */}
        <line x1="10" y1="30" x2="140" y2="30" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="110" y="25" fontSize="5" fill="#475569">Neckline</text>
        
        {/* Price Action */}
        <path d="M 10 10 L 40 80 L 75 35 L 110 80 L 140 10" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Labels */}
        <text x="30" y="90" fontSize="5" fill="#059669" fontWeight="bold">Bottom 1</text>
        <text x="100" y="90" fontSize="5" fill="#059669" fontWeight="bold">Bottom 2</text>
      </svg>
    </div>
  );
}

export function CupAndHandle() {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <svg width="300" height="200" viewBox="0 0 150 100" className="drop-shadow-md">
        {/* Resistance Line */}
        <line x1="10" y1="20" x2="140" y2="20" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="105" y="15" fontSize="5" fill="#475569">Resistance</text>
        
        {/* Price Action (Cup) */}
        <path d="M 20 20 C 20 90, 90 90, 90 20" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
        {/* Price Action (Handle & Breakout) */}
        <path d="M 90 20 L 100 40 L 110 20 L 140 5" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        <text x="50" y="90" fontSize="5" fill="#4f46e5" fontWeight="bold">Cup</text>
        <text x="95" y="48" fontSize="5" fill="#4f46e5" fontWeight="bold">Handle</text>
      </svg>
    </div>
  );
}

export function Pennant() {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <svg width="300" height="200" viewBox="0 0 150 100" className="drop-shadow-md">
        {/* Pole */}
        <path d="M 20 90 L 40 20" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Pennant Bounds (Symmetrical Triangle) */}
        <line x1="35" y1="20" x2="85" y2="40" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="35" y1="60" x2="85" y2="40" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
        
        {/* Price Action inside Pennant */}
        <path d="M 40 20 L 50 50 L 60 30 L 70 45 L 90 20 L 120 15" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        <text x="10" y="55" fontSize="5" fill="#475569">Pole</text>
        <text x="75" y="15" fontSize="5" fill="#059669" fontWeight="bold">Breakout</text>
      </svg>
    </div>
  );
}
