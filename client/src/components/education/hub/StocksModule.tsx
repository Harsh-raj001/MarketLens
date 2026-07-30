import { Button } from "@/components/ui/button";
import { Brain, Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import { TradingCalculator } from "@/components/education/TradingCalculator";

export default function StocksModule() {
  const triggerAI = (prompt: string) => {
    const event = new CustomEvent('open-lens-ai', { detail: { prompt } });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Doodle */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <div className="flex-1 space-y-4">
          <h2 className="text-4xl font-display text-slate-900 font-extrabold">Stocks (Equities)</h2>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            When you buy a stock, you are buying a piece of ownership in a real business. If the business grows and makes profits, the value of your piece goes up.
          </p>
        </div>
        <div className="w-40 h-40 shrink-0">
          {/* Custom Candlestick & Growth Arrow Outline SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-600 drop-shadow-sm">
            {/* Grid background */}
            <path d="M10 90h80" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4"/>
            <path d="M10 65h80" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4"/>
            <path d="M10 40h80" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4"/>
            
            {/* Candlestick 1 (Red/Down) */}
            <path d="M25 80v-10" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
            <path d="M25 55v-10" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
            <rect x="20" y="55" width="10" height="15" fill="none" stroke="#ef4444" strokeWidth="3" rx="1"/>
            
            {/* Candlestick 2 (Green/Up) */}
            <path d="M50 70V50" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
            <path d="M50 30V15" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
            <rect x="45" y="30" width="10" height="20" fill="none" stroke="#10b981" strokeWidth="3" rx="1"/>
            
            {/* Candlestick 3 (Green/Up) */}
            <path d="M75 50v-10" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
            <path d="M75 25V10" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
            <rect x="70" y="25" width="10" height="15" fill="none" stroke="#10b981" strokeWidth="3" rx="1"/>

            {/* Growth Arrow overlay */}
            <path d="M15 75L45 45l15 15L90 15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M75 15h15v15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Grid Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-blue-900 flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> How you make money</h3>
          <ul className="space-y-3 text-sm text-blue-800 font-medium">
            <li><strong>Capital Appreciation:</strong> Buying at ₹100 and selling at ₹150.</li>
            <li><strong>Dividends:</strong> The company shares a portion of its cash profits directly into your bank account.</li>
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-red-900 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> The Risks</h3>
          <ul className="space-y-3 text-sm text-red-800 font-medium">
            <li><strong>Volatility:</strong> Prices can crash 20-30% in a few weeks due to panic.</li>
            <li><strong>Capital Loss:</strong> If a company goes bankrupt, your investment can literally go to zero.</li>
          </ul>
        </div>
      </div>

      {/* AI Context */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 justify-between shadow-sm">
        <div>
          <h4 className="font-bold text-purple-900 flex items-center gap-2 mb-2"><Brain className="w-5 h-5" /> Ask Lens AI about Stocks</h4>
          <p className="text-sm text-purple-800 font-medium">Confused about terms like P/E Ratio, Market Cap, or Dividends?</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" className="bg-white border-purple-200 text-purple-900 hover:bg-purple-100" onClick={() => triggerAI("What is P/E ratio in simple terms?")}>Explain P/E Ratio</Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => triggerAI("What happens if a stock I own goes bankrupt?")}>Bankruptcies?</Button>
        </div>
      </div>

      {/* Educational Calculator Section */}
      <div className="space-y-6 pt-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-2xl font-display text-slate-900 font-extrabold mb-2">The Hidden Costs of Stock Trading</h3>
          <p className="text-slate-600 font-medium leading-relaxed">
            Before buying stocks, you need to understand that the government and exchanges take a cut of every transaction. Use our calculator below to see the true cost.
          </p>
        </div>
        
        {/* We reuse the TradingCalculator here, which has been restyled to the light theme */}
        <TradingCalculator />

        {/* Pedagogical "What does this mean?" */}
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 space-y-4 mt-6 shadow-sm">
          <h4 className="font-bold text-emerald-900 flex items-center gap-2"><Info className="w-5 h-5" /> What do these charges mean?</h4>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-emerald-800 font-medium leading-relaxed">
            <p><strong>STT (Securities Transaction Tax):</strong> A direct tax levied by the government on the purchase and sale of securities.</p>
            <p><strong>DP Charges:</strong> A flat fee charged by the depository (CDSL/NSDL) when you sell stocks from your demat account.</p>
            <p><strong>Brokerage:</strong> The fee your broker (e.g., Zerodha, Groww) charges to facilitate the trade.</p>
            <p><strong>Stamp Duty:</strong> A tax collected by the State Government, applicable only when buying stocks.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
