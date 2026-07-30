import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Sparkles } from "lucide-react";

export function LumpsumCalculator() {
  const [investment, setInvestment] = useState(100000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [years, setYears] = useState(10);

  const calculateLumpsum = () => {
    const data = [];
    let currentCorpus = investment;

    for (let y = 0; y <= years; y++) {
      if (y > 0) {
        currentCorpus = currentCorpus * (1 + expectedReturn / 100);
      }
      
      data.push({
        year: `Yr ${y}`,
        invested: investment,
        wealth: Math.round(currentCorpus)
      });
    }

    const estimatedReturns = currentCorpus - investment;

    return { data, totalInvested: investment, estimatedReturns, totalValue: currentCorpus };
  };

  const result = calculateLumpsum();

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${Math.round(val).toLocaleString('en-IN')}`;
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      
      {/* Controls */}
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-slate-300">Total Investment (₹)</Label>
              <span className="text-primary font-mono">{formatCurrency(investment)}</span>
            </div>
            <input 
              type="range" min="10000" max="10000000" step="10000"
              value={investment} 
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-slate-300">Expected Return (%)</Label>
              <span className="text-emerald-400 font-mono">{expectedReturn}%</span>
            </div>
            <input 
              type="range" min="1" max="30" step="0.5"
              value={expectedReturn} 
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-slate-300">Time Period (Years)</Label>
              <span className="text-blue-400 font-mono">{years} Yrs</span>
            </div>
            <input 
              type="range" min="1" max="40" step="1"
              value={years} 
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Chart & Results */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
            <div className="text-slate-400 text-xs uppercase mb-1">Total Invested</div>
            <div className="text-xl font-bold font-mono text-slate-200">{formatCurrency(result.totalInvested)}</div>
          </div>
          <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
            <div className="text-slate-400 text-xs uppercase mb-1">Est. Returns</div>
            <div className="text-xl font-bold font-mono text-emerald-400">{formatCurrency(result.estimatedReturns)}</div>
          </div>
          <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
            <div className="text-primary text-xs uppercase mb-1 font-semibold">Total Value</div>
            <div className="text-2xl font-bold font-mono text-white">{formatCurrency(result.totalValue)}</div>
          </div>
        </div>

        <div className="h-[300px] bg-slate-950/30 rounded-xl p-4 border border-slate-800">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={result.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWealthLump" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorInvestedLump" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickMargin={10} minTickGap={20} />
              <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => {
                if (val >= 10000000) return `${(val / 10000000).toFixed(1)}Cr`;
                if (val >= 100000) return `${(val / 100000).toFixed(0)}L`;
                return val;
              }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Area type="monotone" dataKey="invested" name="Invested Amount" stroke="#3b82f6" strokeWidth={2} fill="url(#colorInvestedLump)" />
              <Area type="monotone" dataKey="wealth" name="Total Wealth" stroke="#10b981" strokeWidth={2} fill="url(#colorWealthLump)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-lg p-4 flex gap-3 text-sm text-emerald-200">
          <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
          <p>
            Lumpsum investing gives your capital the maximum possible time in the market. Since all the money is invested on Day 1, it generally outperforms SIPs in a constantly rising market over the long term.
          </p>
        </div>
      </div>
    </div>
  );
}
