import { Button } from "@/components/ui/button";
import { Brain, Landmark, AlertTriangle } from "lucide-react";
import { ComparisonCalculator } from "@/components/education/ComparisonCalculator";

export default function FDModule() {
  const triggerAI = (prompt: string) => {
    const event = new CustomEvent('open-lens-ai', { detail: { prompt } });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Doodle */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <div className="flex-1 space-y-4">
          <h2 className="text-4xl font-display text-slate-900 font-extrabold">Fixed Deposits (FDs)</h2>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            The most popular investment in India. You lock your money with a bank for a fixed tenure, and they guarantee a fixed interest rate in return.
          </p>
        </div>
        <div className="w-40 h-40 shrink-0">
          {/* Custom Bank Vault/Building Outline SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full text-slate-800 drop-shadow-sm">
            <path d="M50 15L15 35v5h70v-5L50 15z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M25 40v35" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <path d="M42 40v35" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <path d="M58 40v35" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <path d="M75 40v35" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <path d="M10 75h80v10H10z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Vault lock inside */}
            <circle cx="50" cy="57" r="8" fill="none" stroke="#10b981" strokeWidth="2"/>
            <circle cx="50" cy="57" r="2" fill="#10b981"/>
          </svg>
        </div>
      </div>

      {/* Grid Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-blue-900 flex items-center gap-2"><Landmark className="w-5 h-5" /> The Appeal</h3>
          <ul className="space-y-3 text-sm text-blue-800 font-medium">
            <li><strong>Guaranteed Returns:</strong> Zero market volatility. You know exactly what you'll get.</li>
            <li><strong>High Liquidity:</strong> Can be broken instantly in an emergency (with a small penalty).</li>
            <li><strong>DICGC Insurance:</strong> Protected up to ₹5 Lakhs per bank.</li>
          </ul>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-amber-900 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> The Wealth Killer: Taxes</h3>
          <ul className="space-y-3 text-sm text-amber-800 font-medium">
            <li><strong>Taxed at Slab Rate:</strong> Interest is added to your income. If you are in the 30% bracket, a 7% FD actually yields only 4.9%.</li>
            <li><strong>Inflation Negative:</strong> After 30% taxes and 6% inflation, FDs often destroy purchasing power over the long term.</li>
          </ul>
        </div>
      </div>

      {/* AI Context */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 justify-between shadow-sm">
        <div>
          <h4 className="font-bold text-purple-900 flex items-center gap-2 mb-2"><Brain className="w-5 h-5" /> Ask Lens AI</h4>
          <p className="text-sm text-purple-800 font-medium">What is DICGC? How is FD tax calculated?</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" className="bg-white border-purple-200 text-purple-900 hover:bg-purple-100" onClick={() => triggerAI("Explain how FD interest is taxed for someone in the 30% tax slab.")}>FD Taxation</Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => triggerAI("What is DICGC insurance on Fixed Deposits?")}>DICGC Rules</Button>
        </div>
      </div>

      {/* Educational Calculator Section */}
      <div className="space-y-6 pt-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-2xl font-display text-slate-900 font-extrabold mb-2">The Impact of Taxes on FDs</h3>
          <p className="text-slate-600 font-medium leading-relaxed">
            Use the Comparison Calculator below to see how the "Tax Paid" on an FD completely ruins its compounding ability over a 20-year horizon compared to Equity.
          </p>
        </div>
        
        <ComparisonCalculator />

      </div>

    </div>
  );
}
