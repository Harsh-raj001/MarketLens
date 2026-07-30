import { Button } from "@/components/ui/button";
import { Brain, ShieldCheck, Lock } from "lucide-react";
import { SIPCalculator } from "@/components/calculators/SIPCalculator";

export default function PPFModule() {
  const triggerAI = (prompt: string) => {
    const event = new CustomEvent('open-lens-ai', { detail: { prompt } });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Doodle */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <div className="flex-1 space-y-4">
          <h2 className="text-4xl font-display text-slate-900 font-extrabold">Public Provident Fund (PPF)</h2>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            Backed by the Government of India, PPF is one of the safest and most tax-efficient long-term retirement savings schemes available.
          </p>
        </div>
        <div className="w-40 h-40 shrink-0">
          {/* Custom Piggy Bank Outline SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full text-slate-800 drop-shadow-sm">
            <path d="M75 55c0 11.046-8.954 20-20 20H35C23.954 75 15 66.046 15 55S23.954 35 35 35h5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M45 35c0-5.523 4.477-10 10-10s10 4.477 10 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="55" cy="55" r="4" fill="currentColor"/>
            <path d="M85 55c0-3.314-2.686-6-6-6v12c3.314 0 6-2.686 6-6z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M30 75v10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            <path d="M60 75v10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            {/* Coin dropping */}
            <circle cx="55" cy="15" r="5" fill="none" stroke="#10b981" strokeWidth="2"/>
            <path d="M55 12v6" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Grid Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-amber-900 flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> EEE Tax Status</h3>
          <ul className="space-y-3 text-sm text-amber-800 font-medium">
            <li><strong>Exempt (Investment):</strong> Contributions up to ₹1.5L/year are tax-deductible under 80C.</li>
            <li><strong>Exempt (Accumulation):</strong> The interest earned every year is completely tax-free.</li>
            <li><strong>Exempt (Withdrawal):</strong> The final maturity amount is completely tax-free.</li>
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-red-900 flex items-center gap-2"><Lock className="w-5 h-5" /> The Lock-in</h3>
          <ul className="space-y-3 text-sm text-red-800 font-medium">
            <li><strong>15-Year Lock:</strong> Your money is locked for 15 full financial years.</li>
            <li><strong>Partial Withdrawals:</strong> Allowed only after the 7th financial year under strict conditions.</li>
          </ul>
        </div>
      </div>

      {/* AI Context */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 justify-between shadow-sm">
        <div>
          <h4 className="font-bold text-purple-900 flex items-center gap-2 mb-2"><Brain className="w-5 h-5" /> Ask Lens AI about Retirement</h4>
          <p className="text-sm text-purple-800 font-medium">Is PPF better than ELSS (Tax Saving Mutual Funds)?</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" className="bg-white border-purple-200 text-purple-900 hover:bg-purple-100" onClick={() => triggerAI("Compare PPF vs ELSS Mutual Funds for 80C tax saving.")}>PPF vs ELSS</Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => triggerAI("What are the rules for partial withdrawal from a PPF account?")}>Withdrawal Rules</Button>
        </div>
      </div>

      {/* Educational Calculator Section */}
      <div className="space-y-6 pt-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-2xl font-display text-slate-900 font-extrabold mb-2">Simulate PPF Growth</h3>
          <p className="text-slate-600 font-medium leading-relaxed">
            Use the SIP calculator below to simulate PPF compounding. <strong className="text-slate-900">Set the Expected Return to 7.1%</strong> (current PPF rate) and the Time Period to 15 years to see your guaranteed, tax-free retirement corpus!
          </p>
        </div>
        
        <SIPCalculator />

      </div>

    </div>
  );
}
