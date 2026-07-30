import { TradingCalculator } from "@/components/education/TradingCalculator";
import { Calculator } from "lucide-react";

export default function TradingCalculatorPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl text-foreground">True Cost Calculator</h1>
          <p className="text-sm text-muted-foreground">Calculate exact trading fees, taxes, and net profit</p>
        </div>
      </div>
      
      <TradingCalculator />
    </div>
  );
}
