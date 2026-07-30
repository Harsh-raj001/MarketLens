import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { motion } from "framer-motion";
import { Info, Download, Sparkles } from "lucide-react";

const INVESTMENT_OPTIONS = {
  nifty: { name: "Nifty 50 Index Fund", expectedCagr: 12, taxRate: 12.5, color: "#10b981", risk: "High", lockIn: "None", expenseRatio: 0.1 },
  activeMf: { name: "Active Equity MF", expectedCagr: 14, taxRate: 12.5, color: "#3b82f6", risk: "Very High", lockIn: "None", expenseRatio: 1.5 },
  fd: { name: "Fixed Deposit", expectedCagr: 7, taxRate: 30, color: "#f59e0b", risk: "Low", lockIn: "Variable", expenseRatio: 0 },
  gold: { name: "Physical Gold", expectedCagr: 8.5, taxRate: 20, color: "#eab308", risk: "Medium", lockIn: "None", expenseRatio: 0 },
  sgb: { name: "Sovereign Gold Bond", expectedCagr: 11, taxRate: 0, color: "#d946ef", risk: "Low", lockIn: "8 Years", expenseRatio: 0 } // 8.5% cap app + 2.5% interest
};

export function ComparisonCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(100000);
  const [years, setYears] = useState(20);
  const [inflationRate, setInflationRate] = useState(6);

  // Generate chart data
  const generateData = () => {
    const data = [];
    for (let i = 0; i <= years; i++) {
      const yearData: any = { year: `Year ${i}` };
      
      Object.entries(INVESTMENT_OPTIONS).forEach(([key, opt]) => {
        if (i === 0) {
          yearData[key] = initialInvestment;
        } else {
          // Compound interest
          const previousValue = data[i - 1][key];
          const rawGrowth = previousValue * (1 + (opt.expectedCagr - opt.expenseRatio) / 100);
          yearData[key] = Math.round(rawGrowth);
        }
      });
      data.push(yearData);
    }
    return data;
  };

  const chartData = generateData();

  // Final Values Calculation
  const getFinalMetrics = (key: keyof typeof INVESTMENT_OPTIONS) => {
    const opt = INVESTMENT_OPTIONS[key];
    const finalGrossValue = chartData[years][key];
    const profit = finalGrossValue - initialInvestment;
    
    // Simplistic tax calculation for educational purposes
    let tax = 0;
    if (key === 'nifty' || key === 'activeMf') {
      tax = Math.max(0, profit - 125000) * (opt.taxRate / 100); // 1.25L exemption LTCG
    } else {
      tax = profit * (opt.taxRate / 100);
    }

    const netValue = finalGrossValue - tax;
    
    // Inflation adjustment: What is this money worth in today's purchasing power?
    const inflationAdjusted = netValue / Math.pow(1 + inflationRate / 100, years);
    
    return { finalGrossValue, tax, netValue, inflationAdjusted };
  };

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden mt-8">
      <div className="p-6 md:p-8 grid lg:grid-cols-3 gap-8 border-b border-slate-800">
        
        {/* Controls */}
        <div className="space-y-6 lg:border-r border-slate-800 lg:pr-8">
          <div>
            <h3 className="text-xl font-display text-white mb-2">Simulate Your Wealth</h3>
            <p className="text-slate-400 text-sm">See how inflation, taxes, and expense ratios eat into different asset classes over decades.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Initial Investment (₹)</Label>
              <Input 
                type="number" 
                value={initialInvestment} 
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-slate-300">Time Horizon (Years)</Label>
                <span className="text-primary font-mono">{years} Yrs</span>
              </div>
              <input 
                type="range" 
                min="1" max="40" 
                value={years} 
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-slate-300">Expected Inflation (%)</Label>
                <span className="text-red-400 font-mono">{inflationRate}%</span>
              </div>
              <input 
                type="range" 
                min="2" max="12" step="0.5"
                value={inflationRate} 
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full accent-red-500"
              />
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4 text-sm text-blue-200">
            <Info className="w-5 h-5 text-blue-400 mb-2" />
            <p>Notice how high taxes on FDs and high expense ratios on Active MFs drag down long-term compounding.</p>
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                {Object.entries(INVESTMENT_OPTIONS).map(([key, opt]) => (
                  <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={opt.color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={opt.color} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickMargin={10} minTickGap={30} />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={12} 
                tickFormatter={(val) => {
                  if (val >= 10000000) return `${(val / 10000000).toFixed(1)}Cr`;
                  if (val >= 100000) return `${(val / 100000).toFixed(1)}L`;
                  return val;
                }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                itemStyle={{ fontSize: '14px', fontWeight: 500 }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Legend />
              {Object.entries(INVESTMENT_OPTIONS).map(([key, opt]) => (
                <Area 
                  key={key}
                  type="monotone" 
                  dataKey={key} 
                  name={opt.name} 
                  stroke={opt.color} 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill={`url(#color${key})`} 
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="p-6 md:p-8 bg-slate-950/50 overflow-x-auto">
        <h4 className="text-slate-300 font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" /> After {years} Years Analysis
        </h4>
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="text-slate-400 border-b border-slate-800">
              <th className="pb-3 font-medium">Asset Class</th>
              <th className="pb-3 font-medium text-right">Gross Value</th>
              <th className="pb-3 font-medium text-right">Taxes Paid</th>
              <th className="pb-3 font-medium text-right">Net Value</th>
              <th className="pb-3 font-medium text-right text-amber-400">Purchasing Power (Adj. Inflation)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(INVESTMENT_OPTIONS).map(([key, opt]) => {
              const metrics = getFinalMetrics(key as keyof typeof INVESTMENT_OPTIONS);
              return (
                <tr key={key} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                  <td className="py-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: opt.color }} />
                    <span className="font-medium text-slate-200">{opt.name}</span>
                  </td>
                  <td className="py-4 text-right text-slate-300 font-mono">{formatCurrency(metrics.finalGrossValue)}</td>
                  <td className="py-4 text-right text-red-400 font-mono">-{formatCurrency(metrics.tax)}</td>
                  <td className="py-4 text-right text-emerald-400 font-mono font-bold">{formatCurrency(metrics.netValue)}</td>
                  <td className="py-4 text-right text-amber-400 font-mono">{formatCurrency(metrics.inflationAdjusted)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
