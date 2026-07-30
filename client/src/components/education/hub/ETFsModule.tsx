import { Button } from "@/components/ui/button";
import { Brain, Info, Layers, Zap } from "lucide-react";
import { LumpsumCalculator } from "@/components/calculators/LumpsumCalculator";

export default function ETFsModule() {
  const triggerAI = (prompt: string) => {
    const event = new CustomEvent('open-lens-ai', { detail: { prompt } });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Doodle */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <div className="flex-1 space-y-4">
          <h2 className="text-4xl font-display text-slate-900 font-extrabold">Exchange Traded Funds (ETFs)</h2>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            An ETF is essentially a mutual fund that trades on the stock exchange like a regular stock. They usually track an index (like the Nifty 50) passively, resulting in extremely low fees.
          </p>
        </div>
        <div className="w-40 h-40 shrink-0">
          {/* Custom ETF / Index Chart Outline SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-500 drop-shadow-sm">
            {/* Box / Container */}
            <path d="M15 25h70v50H15z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
            {/* Mini stocks inside */}
            <path d="M25 65v-10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            <path d="M40 65V45" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            <path d="M55 65V35" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            <path d="M70 65V55" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            {/* The Index Line representing the ETF wrapper */}
            <path d="M15 60l20-10 15-15 15 5 20-20" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Floating blocks */}
            <rect x="20" y="10" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2"/>
            <rect x="72" y="10" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M48 8l8 4-8 4-8-4z" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      {/* Grid Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-blue-900 flex items-center gap-2"><Zap className="w-5 h-5" /> Benefits of ETFs</h3>
          <ul className="space-y-3 text-sm text-blue-800 font-medium">
            <li><strong>Intraday Trading:</strong> Unlike Mutual Funds (which settle at end-of-day NAV), ETFs can be bought and sold all day.</li>
            <li><strong>Low Expense Ratio:</strong> Because they passively track an index, fees are often 0.05% compared to a Mutual Fund's 1.0%.</li>
          </ul>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-indigo-900 flex items-center gap-2"><Layers className="w-5 h-5" /> What do they track?</h3>
          <ul className="space-y-3 text-sm text-indigo-800 font-medium">
            <li><strong>Equity Indices:</strong> Nifty 50 (NIFTYBEES), Sensex, Bank Nifty.</li>
            <li><strong>Commodities:</strong> Gold (GOLDBEES), Silver.</li>
            <li><strong>Sectors:</strong> IT, Pharma, Infrastructure.</li>
          </ul>
        </div>
      </div>

      {/* AI Context */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 justify-between shadow-sm">
        <div>
          <h4 className="font-bold text-purple-900 flex items-center gap-2 mb-2"><Brain className="w-5 h-5" /> Ask Lens AI about ETFs</h4>
          <p className="text-sm text-purple-800 font-medium">What is tracking error? ETF vs Index Fund?</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" className="bg-white border-purple-200 text-purple-900 hover:bg-purple-100" onClick={() => triggerAI("What is the difference between an ETF and an Index Fund?")}>ETF vs Index Fund</Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => triggerAI("What is tracking error in an ETF and why is it bad?")}>Tracking Error</Button>
        </div>
      </div>

      {/* Educational Calculator Section */}
      <div className="space-y-6 pt-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-2xl font-display text-slate-900 font-extrabold mb-2">ETF Growth Simulator</h3>
          <p className="text-slate-600 font-medium leading-relaxed">
            ETFs are great for lumpsum investments when the market dips. Simulate the long-term growth of a lumpsum investment in a Nifty 50 ETF (historically ~12-14% CAGR).
          </p>
        </div>
        
        <LumpsumCalculator />

        {/* Pedagogical "What does this mean?" */}
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 space-y-4 mt-6 shadow-sm">
          <h4 className="font-bold text-amber-900 flex items-center gap-2"><Info className="w-5 h-5" /> Why is Expense Ratio so important?</h4>
          <p className="text-sm text-amber-800 font-medium leading-relaxed">
            Over a 20-year period, a 1% difference in expense ratio can eat up nearly 20% of your total final wealth. 
            This is why legendary investors like Warren Buffett heavily recommend low-cost passive ETFs over expensive actively managed mutual funds for most people.
          </p>
        </div>
      </div>

    </div>
  );
}
