import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, PieChart, ShieldAlert, TrendingUp, Wallet, AlertCircle } from "lucide-react";

interface AssetClass {
  id: string;
  name: string;
  cagr: number;
  taxRate: number; // Percentage taken by tax
  risk: number; // 1 to 10
  color: string;
}

const ASSET_CLASSES: AssetClass[] = [
  { id: 'largeCap', name: 'Large Cap Equity', cagr: 12, taxRate: 12.5, risk: 7, color: 'bg-blue-500' },
  { id: 'midSmallCap', name: 'Mid/Small Cap Equity', cagr: 15, taxRate: 12.5, risk: 9, color: 'bg-indigo-500' },
  { id: 'gold', name: 'Gold', cagr: 8, taxRate: 12.5, risk: 4, color: 'bg-amber-400' },
  { id: 'debtFd', name: 'Debt & FDs', cagr: 7, taxRate: 30, risk: 2, color: 'bg-emerald-500' },
];

export default function InvestmentLab() {
  const [allocations, setAllocations] = useState<Record<string, number>>({
    largeCap: 40,
    midSmallCap: 10,
    gold: 10,
    debtFd: 40,
  });

  const totalAllocation = Object.values(allocations).reduce((a, b) => a + b, 0);
  
  const handleAllocationChange = (id: string, value: string) => {
    let num = parseInt(value) || 0;
    if (num < 0) num = 0;
    
    setAllocations(prev => {
      const otherTotal = Object.entries(prev).reduce((sum, [k, v]) => k === id ? sum : sum + v, 0);
      if (num + otherTotal > 100) {
        num = 100 - otherTotal; // Cap it so it doesn't exceed 100%
      }
      return { ...prev, [id]: num };
    });
  };

  const cashAllocation = Math.max(0, 100 - totalAllocation);

  // Calculations
  const metrics = useMemo(() => {
    let weightedCagr = 0;
    let weightedTaxCagr = 0;
    let weightedRisk = 0;

    ASSET_CLASSES.forEach(asset => {
      const weight = (allocations[asset.id] || 0) / 100;
      weightedCagr += asset.cagr * weight;
      
      const postTaxReturn = asset.cagr * (1 - asset.taxRate / 100);
      weightedTaxCagr += postTaxReturn * weight;
      
      weightedRisk += asset.risk * weight;
    });

    // Cash has 0% return
    weightedCagr += 0 * (cashAllocation / 100);
    weightedTaxCagr += 0 * (cashAllocation / 100);
    weightedRisk += 1 * (cashAllocation / 100);

    const taxDrag = weightedCagr - weightedTaxCagr;
    
    let riskProfile = "Conservative";
    if (weightedRisk > 7) riskProfile = "Aggressive";
    else if (weightedRisk > 5) riskProfile = "Balanced";
    else if (weightedRisk > 3) riskProfile = "Moderate";

    return { weightedCagr, weightedTaxCagr, taxDrag, riskProfile, weightedRisk };
  }, [allocations, cashAllocation]);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 py-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-primary mb-2">
          <PieChart className="w-6 h-6" />
          <span className="font-semibold uppercase tracking-wider text-sm">Investment Lab</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display text-foreground">Build Your Portfolio</h1>
        <p className="text-xl text-muted-foreground">
          Allocate 100% of your capital across different asset classes. See how your choices impact expected returns, volatility, and the hidden killer: taxes.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Controls Panel */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 border-border/60 shadow-lg bg-card space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-border/50">
              <h3 className="font-semibold text-lg">Asset Allocation</h3>
              <div className={`font-bold px-3 py-1 rounded-full text-sm ${cashAllocation === 0 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                {cashAllocation}% Unallocated Cash
              </div>
            </div>

            <div className="space-y-6">
              {ASSET_CLASSES.map(asset => (
                <div key={asset.id} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="flex items-center gap-2 text-base">
                      <div className={`w-3 h-3 rounded-full ${asset.color}`} />
                      {asset.name}
                    </Label>
                    <div className="flex items-center gap-2 w-24">
                      <Input 
                        type="number" 
                        value={allocations[asset.id]} 
                        onChange={(e) => handleAllocationChange(asset.id, e.target.value)}
                        className="text-right h-8"
                      />
                      <span className="text-muted-foreground font-medium">%</span>
                    </div>
                  </div>
                  {/* Visual Bar */}
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${asset.color} transition-all duration-300`} 
                      style={{ width: `${allocations[asset.id]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 text-xs text-muted-foreground flex gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>For educational purposes. Expected CAGR is based on long-term historical averages. FDs are taxed at the 30% income slab. Equities at 12.5% LTCG.</p>
            </div>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-6 border-border/60 shadow-md bg-card">
              <div className="flex items-center gap-3 text-emerald-600 mb-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg"><TrendingUp className="w-5 h-5" /></div>
                <h3 className="font-semibold text-sm uppercase tracking-wider">Gross CAGR</h3>
              </div>
              <div className="text-4xl font-display text-foreground">{metrics.weightedCagr.toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground mt-2">Expected return before taxes.</p>
            </Card>
            
            <Card className="p-6 border-border/60 shadow-md bg-card relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between text-red-500 mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/10 rounded-lg"><Wallet className="w-5 h-5" /></div>
                  <h3 className="font-semibold text-sm uppercase tracking-wider">Tax Drag</h3>
                </div>
              </div>
              <div className="text-4xl font-display text-foreground relative z-10">-{metrics.taxDrag.toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground mt-2 relative z-10">Lost annually to taxation.</p>
            </Card>

            <Card className="p-6 border-border/60 shadow-md bg-card sm:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3 text-primary">
                  <div className="p-2 bg-primary/10 rounded-lg"><ShieldAlert className="w-5 h-5" /></div>
                  <h3 className="font-semibold text-sm uppercase tracking-wider">Risk Profile</h3>
                </div>
                <div className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-bold">
                  {metrics.riskProfile}
                </div>
              </div>
              
              <div className="w-full h-3 bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500 rounded-full relative">
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-primary rounded-full shadow-lg transition-all duration-500"
                  style={{ left: `calc(${(metrics.weightedRisk / 10) * 100}% - 10px)` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-3 font-medium uppercase tracking-wider">
                <span>Low Risk (FDs)</span>
                <span>High Risk (Small Cap)</span>
              </div>
            </Card>
          </div>

          {/* AI Mentor Review */}
          <Card className="p-6 border-primary/30 shadow-lg bg-primary/5 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-md">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg mb-2">Lens AI Review</h4>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  {cashAllocation > 20 && (
                    <p><strong className="text-amber-600">High Cash Drag:</strong> You are holding {cashAllocation}% in cash. Inflation will slowly erode this purchasing power over time.</p>
                  )}
                  {metrics.taxDrag > 2.0 && (
                    <p><strong className="text-red-500">Tax Inefficient:</strong> A tax drag of {metrics.taxDrag.toFixed(1)}% means you are losing a massive portion of your compounding to taxes. This usually happens when holding a lot of Debt/FDs in the 30% bracket.</p>
                  )}
                  {allocations.midSmallCap > 50 && (
                    <p><strong className="text-amber-600">Extreme Volatility:</strong> Heavy allocation to Small/Mid caps can yield high returns, but prepare for 40-50% drawdowns during bear markets.</p>
                  )}
                  {metrics.riskProfile === "Conservative" && metrics.taxDrag < 1.5 && (
                    <p><strong className="text-emerald-600">Stable & Safe:</strong> A very safe portfolio. Capital preservation is the priority here, though it may struggle to beat inflation significantly after taxes.</p>
                  )}
                  {metrics.riskProfile === "Balanced" && cashAllocation < 10 && (
                    <p><strong className="text-emerald-600">Well Balanced:</strong> This is a solid, diversified approach. You have growth engines (Equity) and stabilizers (Debt/Gold). The tax drag is manageable.</p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
