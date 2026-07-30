import { Button } from "@/components/ui/button";
import { Brain, Info, CheckCircle2, TrendingUp } from "lucide-react";
import { SIPCalculator } from "@/components/calculators/SIPCalculator";

export default function MutualFundsModule() {
  const triggerAI = (prompt: string) => {
    const event = new CustomEvent('open-lens-ai', { detail: { prompt } });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Doodle */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <div className="flex-1 space-y-4">
          <h2 className="text-4xl font-display text-slate-900 font-extrabold">Mutual Funds</h2>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            A mutual fund pools money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities, managed by a professional fund manager.
          </p>
        </div>
        <div className="w-40 h-40 shrink-0">
          {/* Custom Fund Basket & Coins Outline SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-600 drop-shadow-sm">
            {/* Basket */}
            <path d="M20 40l10 40h40l10-40z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 40h70" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            {/* Basket Handle */}
            <path d="M30 40a20 20 0 0 1 40 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            {/* Coins in basket */}
            <circle cx="35" cy="45" r="8" fill="none" stroke="#f59e0b" strokeWidth="2"/>
            <circle cx="50" cy="50" r="10" fill="none" stroke="#f59e0b" strokeWidth="2"/>
            <circle cx="65" cy="45" r="8" fill="none" stroke="#f59e0b" strokeWidth="2"/>
            <circle cx="42" cy="65" r="10" fill="none" stroke="#f59e0b" strokeWidth="2"/>
            <circle cx="60" cy="62" r="9" fill="none" stroke="#f59e0b" strokeWidth="2"/>
            {/* Coin Details */}
            <path d="M50 45v10" fill="none" stroke="#f59e0b" strokeWidth="1"/>
            <path d="M47 48h6" fill="none" stroke="#f59e0b" strokeWidth="1"/>
            <path d="M47 52h6" fill="none" stroke="#f59e0b" strokeWidth="1"/>
            <path d="M42 60v10" fill="none" stroke="#f59e0b" strokeWidth="1"/>
            <path d="M39 63h6" fill="none" stroke="#f59e0b" strokeWidth="1"/>
            <path d="M39 67h6" fill="none" stroke="#f59e0b" strokeWidth="1"/>
            {/* Floating leaf/growth */}
            <path d="M70 25c-5 0-10 5-10 10 5 0 10-5 10-10z" fill="#10b981" stroke="#10b981" strokeWidth="1"/>
            <path d="M60 35l10-10" fill="none" stroke="#fff" strokeWidth="1"/>
          </svg>
        </div>
      </div>

      {/* Grid Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-blue-900 flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Why choose Mutual Funds?</h3>
          <ul className="space-y-3 text-sm text-blue-800 font-medium">
            <li><strong>Instant Diversification:</strong> You don't put all your eggs in one basket.</li>
            <li><strong>Professional Management:</strong> Experts analyze and buy stocks on your behalf.</li>
            <li><strong>Affordability:</strong> Start investing with as little as ₹500/month via SIP.</li>
          </ul>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-emerald-900 flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Key Concepts</h3>
          <ul className="space-y-3 text-sm text-emerald-800 font-medium">
            <li><strong>NAV (Net Asset Value):</strong> The price of one unit of the mutual fund.</li>
            <li><strong>Expense Ratio:</strong> The annual fee charged by the AMC to manage your money.</li>
            <li><strong>Exit Load:</strong> A penalty fee if you withdraw your money too early.</li>
          </ul>
        </div>
      </div>

      {/* AI Context */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 justify-between shadow-sm">
        <div>
          <h4 className="font-bold text-purple-900 flex items-center gap-2 mb-2"><Brain className="w-5 h-5" /> Ask Lens AI about Mutual Funds</h4>
          <p className="text-sm text-purple-800 font-medium">Don't know what Direct vs Regular means? Want to know about XIRR?</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" className="bg-white border-purple-200 text-purple-900 hover:bg-purple-100" onClick={() => triggerAI("What is the difference between Direct and Regular mutual funds?")}>Direct vs Regular</Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => triggerAI("What is XIRR and why is it used for SIPs?")}>Explain XIRR</Button>
        </div>
      </div>

      {/* Educational Calculator Section */}
      <div className="space-y-6 pt-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-2xl font-display text-slate-900 font-extrabold mb-2">The Power of SIP Compounding</h3>
          <p className="text-slate-600 font-medium leading-relaxed">
            A Systematic Investment Plan (SIP) helps you average out market volatility. See how small monthly investments can create immense wealth over decades.
          </p>
        </div>
        
        <SIPCalculator />

        {/* Pedagogical "What does this mean?" */}
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 space-y-4 mt-6 shadow-sm">
          <h4 className="font-bold text-amber-900 flex items-center gap-2"><Info className="w-5 h-5" /> Why does the graph curve upwards?</h4>
          <p className="text-sm text-amber-800 font-medium leading-relaxed">
            This is the visual representation of <strong>Compound Interest</strong>. In the early years, your wealth grows linearly based on your contributions. 
            However, in later years, the returns you've already earned start earning their own returns, causing the curve to steepen exponentially. 
            This is why starting early is more important than investing a large amount!
          </p>
        </div>
      </div>

    </div>
  );
}
