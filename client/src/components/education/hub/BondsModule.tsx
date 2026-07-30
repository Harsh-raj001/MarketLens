import { Button } from "@/components/ui/button";
import { Brain, Info, ShieldCheck, Scale } from "lucide-react";
import { ComparisonCalculator } from "@/components/education/ComparisonCalculator";

export default function BondsModule() {
  const triggerAI = (prompt: string) => {
    const event = new CustomEvent('open-lens-ai', { detail: { prompt } });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Doodle */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <div className="flex-1 space-y-4">
          <h2 className="text-4xl font-display text-slate-900 font-extrabold">Bonds & Government Securities</h2>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            When you buy a bond, you are lending your money to a company or the government. In exchange, they promise to pay you regular interest (the coupon) and return your principal amount on a specific maturity date.
          </p>
        </div>
        <div className="w-40 h-40 shrink-0">
          {/* Custom Government Certificate Outline SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-600 drop-shadow-sm">
            {/* Certificate Border */}
            <path d="M15 20h70v60H15z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
            <path d="M20 25h60v50H20z" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2"/>
            {/* Seal / Stamp */}
            <circle cx="70" cy="65" r="10" fill="none" stroke="#f59e0b" strokeWidth="2"/>
            <path d="M70 57v16" fill="none" stroke="#f59e0b" strokeWidth="1"/>
            <path d="M62 65h16" fill="none" stroke="#f59e0b" strokeWidth="1"/>
            <path d="M64 59l12 12" fill="none" stroke="#f59e0b" strokeWidth="1"/>
            <path d="M64 71l12-12" fill="none" stroke="#f59e0b" strokeWidth="1"/>
            {/* Seal Ribbons */}
            <path d="M65 74l-5 12 5-3 5 3-1-12" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M75 74l1 12 5-3 5 3-5-12" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round"/>
            {/* Text lines */}
            <path d="M30 40h40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            <path d="M30 50h25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M30 60h30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            {/* Building Icon (Government) at top */}
            <path d="M40 30L50 22l10 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M42 30v5h16v-5" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M45 35v-5" fill="none" stroke="currentColor" strokeWidth="1"/>
            <path d="M55 35v-5" fill="none" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>
      </div>

      {/* Grid Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-emerald-900 flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Why buy Bonds?</h3>
          <ul className="space-y-3 text-sm text-emerald-800 font-medium">
            <li><strong>Safety:</strong> Government bonds (G-Secs) have a sovereign guarantee. You will not lose your money.</li>
            <li><strong>Predictable Income:</strong> You know exactly how much interest you will receive and when.</li>
          </ul>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-amber-900 flex items-center gap-2"><Scale className="w-5 h-5" /> The Hidden Risk: Inflation</h3>
          <ul className="space-y-3 text-sm text-amber-800 font-medium">
            <li><strong>Low Real Returns:</strong> If a bond pays 7% but inflation is 6%, your "real" wealth only grows by 1%.</li>
            <li><strong>Interest Rate Risk:</strong> If market interest rates go up, the price of existing bonds goes down.</li>
          </ul>
        </div>
      </div>

      {/* AI Context */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 justify-between shadow-sm">
        <div>
          <h4 className="font-bold text-purple-900 flex items-center gap-2 mb-2"><Brain className="w-5 h-5" /> Ask Lens AI about Bonds</h4>
          <p className="text-sm text-purple-800 font-medium">Confused by YTM (Yield to Maturity) or Credit Ratings?</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" className="bg-white border-purple-200 text-purple-900 hover:bg-purple-100" onClick={() => triggerAI("What does Yield to Maturity (YTM) mean for a bond?")}>Explain YTM</Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => triggerAI("What happens to bond prices when interest rates go up?")}>Rates vs Prices</Button>
        </div>
      </div>

      {/* Educational Calculator Section */}
      <div className="space-y-6 pt-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-2xl font-display text-slate-900 font-extrabold mb-2">Bonds vs The Rest</h3>
          <p className="text-slate-600 font-medium leading-relaxed">
            Bonds are safer than stocks, but how does their growth compare over 20 years? Notice how inflation destroys the purchasing power of low-yield bonds over long periods.
          </p>
        </div>
        
        {/* Reuse ComparisonCalculator but maybe the user can just focus on Bonds */}
        <ComparisonCalculator />

        {/* Pedagogical "What does this mean?" */}
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 space-y-4 mt-6 shadow-sm">
          <h4 className="font-bold text-blue-900 flex items-center gap-2"><Info className="w-5 h-5" /> The Role of Bonds in a Portfolio</h4>
          <p className="text-sm text-blue-800 font-medium leading-relaxed">
            Bonds aren't meant to make you rich; they are meant to keep you rich. In a market crash, your equity portfolio might drop 40%, but your bonds will remain stable. They provide the psychological anchor needed to prevent panic selling.
          </p>
        </div>
      </div>

    </div>
  );
}
