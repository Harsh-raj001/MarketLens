import { Calculator, Coins, PiggyBank, Receipt } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TradingCalculator } from "@/components/education/TradingCalculator";
import { SIPCalculator } from "@/components/calculators/SIPCalculator";
import { LumpsumCalculator } from "@/components/calculators/LumpsumCalculator";

export default function CalculatorHub() {
  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mt-8">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-2">
          <Calculator className="w-8 h-8" />
        </div>
        <h1 className="font-display text-4xl lg:text-5xl text-foreground tracking-tight">Financial Calculator Suite</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Plan your investments, calculate your trading costs, and understand the power of compounding over time.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-4">
        <Tabs defaultValue="sip" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-[600px] mx-auto mb-12">
            <TabsTrigger value="sip" className="flex items-center gap-2">
              <PiggyBank className="w-4 h-4" /> SIP
            </TabsTrigger>
            <TabsTrigger value="lumpsum" className="flex items-center gap-2">
              <Coins className="w-4 h-4" /> Lumpsum
            </TabsTrigger>
            <TabsTrigger value="truecost" className="flex items-center gap-2">
              <Receipt className="w-4 h-4" /> True Cost
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sip">
            <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="mb-8">
                <h2 className="text-2xl font-display text-foreground">SIP Calculator</h2>
                <p className="text-muted-foreground text-sm">Calculate the future value of your monthly Systematic Investment Plan.</p>
              </div>
              <SIPCalculator />
            </div>
          </TabsContent>
          
          <TabsContent value="lumpsum">
            <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="mb-8">
                <h2 className="text-2xl font-display text-foreground">Lumpsum Calculator</h2>
                <p className="text-muted-foreground text-sm">Calculate the future value of a single, one-time investment.</p>
              </div>
              <LumpsumCalculator />
            </div>
          </TabsContent>

          <TabsContent value="truecost">
            {/* The TradingCalculator already has its own card styling internally */}
            <TradingCalculator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
