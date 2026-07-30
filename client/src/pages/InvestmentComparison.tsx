import { Target } from "lucide-react";
import { ComparisonCalculator } from "@/components/education/ComparisonCalculator";

export default function InvestmentComparison() {
  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mt-8">
        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mb-2">
          <Target className="w-8 h-8" />
        </div>
        <h1 className="font-display text-4xl lg:text-5xl text-foreground tracking-tight">Investment Comparison Hub</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Don't just chase returns. Understand how taxes, inflation, and expense ratios affect your actual wealth creation over time.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-4">
        <ComparisonCalculator />
      </div>
    </div>
  );
}
