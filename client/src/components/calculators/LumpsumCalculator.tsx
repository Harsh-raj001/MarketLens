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
            <div className="flex justify-between items-center">
              <Label className="text-slate-600 font-semibold uppercase tracking-wider text-xs">Total Investment (₹)</Label>
              <span className="text-slate-900 font-extrabold text-xl">{formatCurrency(investment)}</span>
            </div>
            <input 
              type="range" min="10000" max="10000000" step="10000"
              value={investment} 
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-slate-600 font-semibold uppercase tracking-wider text-xs">Expected Return (%)</Label>
              <span className="text-slate-900 font-extrabold text-xl">{expectedReturn}%</span>
            </div>
            <input 
              type="range" min="1" max="30" step="0.5"
              value={expectedReturn} 
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-slate-600 font-semibold uppercase tracking-wider text-xs">Time Period (Years)</Label>
              <span className="text-slate-900 font-extrabold text-xl">{years} Yrs</span>
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
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Total Invested</div>
            <div className="text-3xl font-extrabold text-slate-900">{formatCurrency(result.totalInvested)}</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Est. Returns</div>
            <div className="text-3xl font-extrabold text-emerald-600">{formatCurrency(result.estimatedReturns)}</div>
          </div>
          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-600" />
            <div className="text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">Total Value</div>
            <div className="text-4xl font-extrabold text-slate-900">{formatCurrency(result.totalValue)}</div>
          </div>
        </div>

        <div className="h-[300px] bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={result.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWealthLump" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="colorInvestedLump" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickMargin={10} minTickGap={20} axisLine={false} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} tickFormatter={(val) => {
                if (val >= 10000000) return `${(val / 10000000).toFixed(1)}Cr`;
                if (val >= 100000) return `${(val / 100000).toFixed(0)}L`;
                return val;
              }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Area type="monotone" dataKey="invested" name="Invested Amount" stroke="#3b82f6" strokeWidth={3} fill="url(#colorInvestedLump)" animationDuration={1500} />
              <Area type="monotone" dataKey="wealth" name="Total Wealth" stroke="#10b981" strokeWidth={3} fill="url(#colorWealthLump)" animationDuration={1500} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex gap-4 text-emerald-900 shadow-sm">
          <div className="w-10 h-10 shrink-0 rounded-full bg-emerald-100 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="font-semibold mb-1">The power of time in the market</p>
            <p className="text-sm text-emerald-800 leading-relaxed">
              Lumpsum investing gives your capital the maximum possible time in the market. Since all the money is invested on Day 1, it generally outperforms SIPs in a constantly rising market over the long term.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
