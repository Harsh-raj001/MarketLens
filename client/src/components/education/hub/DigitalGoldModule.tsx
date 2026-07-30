import { Button } from "@/components/ui/button";
import { Brain, Gem, AlertCircle } from "lucide-react";

export default function DigitalGoldModule() {
  const triggerAI = (prompt: string) => {
    const event = new CustomEvent('open-lens-ai', { detail: { prompt } });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Doodle */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <div className="flex-1 space-y-4">
          <h2 className="text-4xl font-display text-slate-900 font-extrabold">Digital Gold</h2>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            Digital gold allows you to buy 24K gold online for as low as ₹1. The provider stores equivalent physical gold in a secure vault on your behalf.
          </p>
        </div>
        <div className="w-40 h-40 shrink-0">
          {/* Custom Mobile Wallet Outline SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-500 drop-shadow-sm">
            {/* Phone Body */}
            <path d="M30 10h40a10 10 0 0 1 10 10v60a10 10 0 0 1-10 10H30a10 10 0 0 1-10-10V20a10 10 0 0 1 10-10z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Screen */}
            <path d="M25 20h50v55H25z" fill="none" stroke="currentColor" strokeWidth="2"/>
            {/* Home button */}
            <circle cx="50" cy="82" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
            {/* Top speaker */}
            <path d="M45 15h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            {/* Gold Coin on screen */}
            <circle cx="50" cy="45" r="15" fill="none" stroke="#f59e0b" strokeWidth="3"/>
            <path d="M50 35v20" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
            <path d="M45 40h10" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
            <path d="M45 50h10" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Grid Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-blue-900 flex items-center gap-2"><Gem className="w-5 h-5" /> The Pros</h3>
          <ul className="space-y-3 text-sm text-blue-800 font-medium">
            <li><strong>Fractional Investment:</strong> Buy tiny amounts (even ₹10).</li>
            <li><strong>No Making Charges:</strong> You avoid the 15-20% penalty of jewelry.</li>
            <li><strong>High Liquidity:</strong> Sell it back instantly online 24/7.</li>
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-red-900 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> The Cons</h3>
          <ul className="space-y-3 text-sm text-red-800 font-medium">
            <li><strong>3% GST:</strong> Applied on every purchase.</li>
            <li><strong>Spread:</strong> There's a 2-3% difference between buying and selling price.</li>
            <li><strong>Regulation:</strong> Not regulated by RBI or SEBI (unlike SGBs or Gold ETFs).</li>
          </ul>
        </div>
      </div>

      {/* AI Context */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 justify-between shadow-sm">
        <div>
          <h4 className="font-bold text-purple-900 flex items-center gap-2 mb-2"><Brain className="w-5 h-5" /> Ask Lens AI</h4>
          <p className="text-sm text-purple-800 font-medium">Digital Gold vs Gold ETF?</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" className="bg-white border-purple-200 text-purple-900 hover:bg-purple-100" onClick={() => triggerAI("Digital Gold vs Gold ETF - which is better for trading?")}>Vs Gold ETF</Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => triggerAI("Are digital gold platforms regulated in India?")}>Regulation Risk</Button>
        </div>
      </div>

    </div>
  );
}
