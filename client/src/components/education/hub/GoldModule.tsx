import { Button } from "@/components/ui/button";
import { Brain, Info, Banknote, ShieldAlert } from "lucide-react";
import { ComparisonCalculator } from "@/components/education/ComparisonCalculator";

export default function GoldModule() {
  const triggerAI = (prompt: string) => {
    const event = new CustomEvent('open-lens-ai', { detail: { prompt } });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Doodle */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <div className="flex-1 space-y-4">
          <h2 className="text-4xl font-display text-slate-900 font-extrabold">Physical Gold</h2>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            Physical gold (jewelry, coins, bars) has been humanity's oldest store of value. While deeply culturally significant, it is often a poor financial investment due to high hidden costs.
          </p>
        </div>
        <div className="w-40 h-40 shrink-0">
          {/* Custom Gold Bars Outline SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500 drop-shadow-sm">
            {/* Back bar */}
            <path d="M40 30L65 20l25 10v15L65 35 40 45V30z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
            <path d="M65 20v15" fill="none" stroke="currentColor" strokeWidth="2"/>
            {/* Middle bar */}
            <path d="M25 50l25-10 25 10v15L50 55 25 65V50z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
            <path d="M50 40v15" fill="none" stroke="currentColor" strokeWidth="2"/>
            {/* Front bar */}
            <path d="M10 70l25-10 25 10v15L35 75 10 85V70z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
            <path d="M35 60v15" fill="none" stroke="currentColor" strokeWidth="2"/>
            {/* Sparkles */}
            <path d="M80 70l3-5 5-3-5-3-3-5-3 5-5 3 5 3z" fill="currentColor"/>
            <path d="M20 20l2-4 4-2-4-2-2-4-2 4-4 2 4 2z" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Grid Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-amber-900 flex items-center gap-2"><Banknote className="w-5 h-5" /> The Appeal</h3>
          <ul className="space-y-3 text-sm text-amber-800 font-medium">
            <li><strong>Tangible Asset:</strong> You can hold it. It carries zero counterparty risk.</li>
            <li><strong>Inflation Hedge:</strong> Historically, gold maintains its purchasing power over centuries.</li>
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-red-900 flex items-center gap-2"><ShieldAlert className="w-5 h-5" /> The Reality</h3>
          <ul className="space-y-3 text-sm text-red-800 font-medium">
            <li><strong>Making Charges:</strong> 10-25% of your investment vanishes instantly when buying jewelry.</li>
            <li><strong>Storage & Security:</strong> Bank lockers cost money, eating into your returns.</li>
            <li><strong>Purity Issues:</strong> Selling physical gold often results in purity deductions by jewelers.</li>
          </ul>
        </div>
      </div>

      {/* AI Context */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 justify-between shadow-sm">
        <div>
          <h4 className="font-bold text-purple-900 flex items-center gap-2 mb-2"><Brain className="w-5 h-5" /> Ask Lens AI about Gold</h4>
          <p className="text-sm text-purple-800 font-medium">Is Sovereign Gold Bond (SGB) better than Physical Gold?</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" className="bg-white border-purple-200 text-purple-900 hover:bg-purple-100" onClick={() => triggerAI("What are the financial disadvantages of buying gold jewelry as an investment?")}>Jewelry Risks</Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => triggerAI("Compare Physical Gold vs Sovereign Gold Bonds (SGB)")}>Physical vs SGB</Button>
        </div>
      </div>

      {/* Educational Calculator Section */}
      <div className="space-y-6 pt-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-2xl font-display text-slate-900 font-extrabold mb-2">The Making Charge Penalty</h3>
          <p className="text-slate-600 font-medium leading-relaxed">
            Check the Comparison Chart below. Notice how Physical Gold underperforms Sovereign Gold Bonds entirely because of the 15% making charges applied at purchase.
          </p>
        </div>
        
        <ComparisonCalculator />

      </div>

    </div>
  );
}
