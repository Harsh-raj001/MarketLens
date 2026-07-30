import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChartPattern {
  name: string;
  type: "reversal" | "continuation" | "bilateral";
  bias: "bullish" | "bearish" | "neutral";
  description: string;
  keyFeatures: string[];
}

const patterns: ChartPattern[] = [
  { name: "Head and Shoulders", type: "reversal", bias: "bearish", description: "A top reversal pattern consisting of three peaks: the middle (head) is the highest, flanked by two lower peaks (shoulders). The neckline connects the troughs between the peaks. A break below the neckline confirms the pattern.", keyFeatures: ["Three peaks with middle highest", "Neckline support level", "Volume decreases on each peak", "Confirmed on neckline break"] },
  { name: "Inverse Head and Shoulders", type: "reversal", bias: "bullish", description: "A bottom reversal pattern — the mirror image of the head and shoulders. Three troughs with the middle (head) being the lowest. A break above the neckline confirms a bullish reversal.", keyFeatures: ["Three troughs with middle lowest", "Neckline resistance level", "Volume increases on breakout", "Confirmed on neckline break"] },
  { name: "Double Top", type: "reversal", bias: "bearish", description: "A bearish reversal pattern where price reaches a resistance level twice but fails to break through. The two peaks are roughly equal in height. A break below the support level between the peaks confirms the pattern.", keyFeatures: ["Two equal peaks at resistance", "Support between peaks", "Confirmed on support break", "Volume declines on second peak"] },
  { name: "Double Bottom", type: "reversal", bias: "bullish", description: "A bullish reversal pattern where price tests a support level twice and holds. The two troughs are roughly equal. A break above the resistance between the troughs confirms the pattern.", keyFeatures: ["Two equal troughs at support", "Resistance between troughs", "Confirmed on resistance break", "Volume increases on breakout"] },
  { name: "Ascending Triangle", type: "continuation", bias: "bullish", description: "A continuation pattern with a flat upper resistance and rising lower support. The pattern suggests buying pressure is increasing while sellers hold at a fixed level. A breakout above resistance is bullish.", keyFeatures: ["Flat top resistance", "Rising support line", "Volume increases near apex", "Breakout above resistance"] },
  { name: "Descending Triangle", type: "continuation", bias: "bearish", description: "A continuation pattern with a flat lower support and declining upper resistance. The pattern suggests selling pressure is increasing while buyers hold at a fixed level. A breakdown below support is bearish.", keyFeatures: ["Flat bottom support", "Declining resistance line", "Volume increases near apex", "Breakdown below support"] },
  { name: "Symmetrical Triangle", type: "bilateral", bias: "neutral", description: "A consolidation pattern with converging trendlines — declining resistance and rising support. The breakout direction determines the bias. It can resolve in either direction.", keyFeatures: ["Converging trendlines", "Declining volume", "Breakout direction uncertain", "Measured move potential"] },
  { name: "Bull Flag", type: "continuation", bias: "bullish", description: "A continuation pattern that forms after a strong upward move (the flagpole). The consolidation (flag) slopes downward against the trend. A breakout above the flag's upper trendline continues the uptrend.", keyFeatures: ["Strong prior uptrend (flagpole)", "Downward sloping channel", "Low volume in flag", "Breakout above upper trendline"] },
  { name: "Bear Flag", type: "continuation", bias: "bearish", description: "A continuation pattern after a strong downward move. The consolidation slopes upward against the trend. A breakdown below the flag's lower trendline continues the downtrend.", keyFeatures: ["Strong prior downtrend (flagpole)", "Upward sloping channel", "Low volume in flag", "Breakdown below lower trendline"] },
  { name: "Cup and Handle", type: "continuation", bias: "bullish", description: "A long-term bullish continuation pattern. The cup forms a U-shaped bottom, and the handle is a small downward drift. The pattern is confirmed when price breaks above the handle's resistance.", keyFeatures: ["U-shaped cup bottom", "Small downward handle", "Long formation period", "Breakout above handle resistance"] },
  { name: "Rising Wedge", type: "reversal", bias: "bearish", description: "A pattern with converging upward-sloping trendlines. Despite the upward direction, it typically signals a bearish reversal. The narrowing range shows weakening momentum.", keyFeatures: ["Converging upward trendlines", "Declining volume", "Typically bearish reversal", "Breakdown below lower trendline"] },
  { name: "Falling Wedge", type: "reversal", bias: "bullish", description: "A pattern with converging downward-sloping trendlines. Despite the downward direction, it typically signals a bullish reversal. The narrowing range shows selling pressure weakening.", keyFeatures: ["Converging downward trendlines", "Declining volume", "Typically bullish reversal", "Breakout above upper trendline"] },
];

export default function ChartPatternExplorer() {
  const [selectedPattern, setSelectedPattern] = useState<ChartPattern | null>(null);
  const [filter, setFilter] = useState<"all" | "reversal" | "continuation" | "bilateral">("all");

  const filtered = filter === "all" ? patterns : patterns.filter((p) => p.type === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Chart Pattern Explorer</h1>
        <p className="text-muted-foreground mt-1">Study {patterns.length}+ classical chart patterns used in technical analysis.</p>
      </div>

      <Tabs defaultValue="all" onValueChange={(v) => setFilter(v as any)}>
        <TabsList>
          <TabsTrigger value="all">All ({patterns.length})</TabsTrigger>
          <TabsTrigger value="reversal">Reversal</TabsTrigger>
          <TabsTrigger value="continuation">Continuation</TabsTrigger>
          <TabsTrigger value="bilateral">Bilateral</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-3">
          {filtered.map((pattern) => (
            <Card
              key={pattern.name}
              onClick={() => setSelectedPattern(pattern)}
              className={`cursor-pointer transition-all duration-150 border-border/60 hover:shadow-md ${
                selectedPattern?.name === pattern.name ? "ring-2 ring-primary/30" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm text-foreground">{pattern.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    pattern.bias === "bullish" ? "bg-green-100 text-green-700" :
                    pattern.bias === "bearish" ? "bg-red-100 text-red-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>{pattern.bias}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{pattern.description}</p>
                <div className="mt-2 text-xs text-muted-foreground capitalize">{pattern.type} Pattern</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          {selectedPattern ? (
            <Card className="border-primary/20 sticky top-4">
              <CardContent className="p-5 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      selectedPattern.bias === "bullish" ? "bg-green-100 text-green-700" :
                      selectedPattern.bias === "bearish" ? "bg-red-100 text-red-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>{selectedPattern.bias}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground capitalize">{selectedPattern.type}</span>
                  </div>
                  <h3 className="font-display text-xl text-foreground">{selectedPattern.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedPattern.description}</p>
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Key Features</h4>
                  <ul className="space-y-1.5">
                    {selectedPattern.keyFeatures.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground text-sm">Select a pattern to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
