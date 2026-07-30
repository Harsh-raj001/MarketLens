import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";

interface CandlestickPattern {
  name: string;
  type: "bullish" | "bearish" | "neutral";
  description: string;
  reliability: "High" | "Medium" | "Low";
  timeframe: string;
}

const patterns: CandlestickPattern[] = [
  { name: "Hammer", type: "bullish", description: "A single candlestick pattern with a small body at the top and a long lower wick (at least 2x the body). It appears after a downtrend and signals a potential reversal to the upside. The long lower wick shows that sellers pushed prices down but buyers stepped in to push them back up.", reliability: "High", timeframe: "1 day" },
  { name: "Bullish Engulfing", type: "bullish", description: "A two-candle pattern where a large green candle completely engulfs the previous red candle's body. It signals a strong shift from bearish to bullish sentiment and is one of the most reliable reversal patterns.", reliability: "High", timeframe: "1 day" },
  { name: "Morning Star", type: "bullish", description: "A three-candle pattern: a large bearish candle, followed by a small-bodied candle (star) that gaps below, and then a large bullish candle. It signals a potential bottom and reversal of a downtrend.", reliability: "High", timeframe: "1-3 days" },
  { name: "Doji", type: "neutral", description: "A candlestick with a very small body where the opening and closing prices are nearly equal. It indicates indecision in the market and can signal a potential reversal when it appears after a strong trend.", reliability: "Medium", timeframe: "Any" },
  { name: "Spinning Top", type: "neutral", description: "A small-bodied candle with upper and lower wicks of roughly equal length. It represents indecision between buyers and sellers and often precedes a reversal or consolidation.", reliability: "Medium", timeframe: "Any" },
  { name: "Shooting Star", type: "bearish", description: "A single candlestick with a small body at the bottom and a long upper wick. It appears after an uptrend and signals a potential reversal to the downside. The long upper wick shows buyers pushed prices up but sellers took control.", reliability: "High", timeframe: "1 day" },
  { name: "Bearish Engulfing", type: "bearish", description: "A two-candle pattern where a large red candle completely engulfs the previous green candle's body. It signals a strong shift from bullish to bearish sentiment.", reliability: "High", timeframe: "1 day" },
  { name: "Evening Star", type: "bearish", description: "A three-candle pattern: a large bullish candle, followed by a small-bodied star that gaps above, and then a large bearish candle. It signals a potential top and reversal of an uptrend.", reliability: "High", timeframe: "1-3 days" },
  { name: "Marubozu", type: "bullish", description: "A candlestick with no wicks (or very small ones) and a large body. A green Marubozu indicates strong buying pressure throughout the session with no significant pullbacks.", reliability: "Medium", timeframe: "Any" },
  { name: "Hanging Man", type: "bearish", description: "A single candlestick with a small body at the top and a long lower wick, appearing after an uptrend. It signals potential weakness and a possible reversal to the downside.", reliability: "Medium", timeframe: "1 day" },
  { name: "Piercing Line", type: "bullish", description: "A two-candle pattern where a bearish candle is followed by a bullish candle that opens below the previous close but closes above the midpoint of the bearish candle's body.", reliability: "Medium", timeframe: "1 day" },
  { name: "Dark Cloud Cover", type: "bearish", description: "A two-candle pattern where a bullish candle is followed by a bearish candle that opens above the previous high but closes below the midpoint of the bullish candle's body.", reliability: "Medium", timeframe: "1 day" },
];

export default function CandlestickExplorer() {
  const [selectedPattern, setSelectedPattern] = useState<CandlestickPattern | null>(null);
  const [filter, setFilter] = useState<"all" | "bullish" | "bearish" | "neutral">("all");

  const filteredPatterns = filter === "all" ? patterns : patterns.filter((p) => p.type === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Candlestick Explorer</h1>
        <p className="text-muted-foreground mt-1">Learn and practice identifying {patterns.length}+ candlestick patterns. Click any pattern to explore it in detail.</p>
      </div>

      {/* Filter tabs */}
      <Tabs defaultValue="all" onValueChange={(v) => setFilter(v as any)}>
        <TabsList>
          <TabsTrigger value="all">All ({patterns.length})</TabsTrigger>
          <TabsTrigger value="bullish">Bullish</TabsTrigger>
          <TabsTrigger value="bearish">Bearish</TabsTrigger>
          <TabsTrigger value="neutral">Neutral</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Pattern list */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-3">
          {filteredPatterns.map((pattern) => (
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
                    pattern.type === "bullish"
                      ? "bg-green-100 text-green-700"
                      : pattern.type === "bearish"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {pattern.type}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{pattern.description}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span>Reliability: {pattern.reliability}</span>
                  <span>Timeframe: {pattern.timeframe}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-1">
          {selectedPattern ? (
            <Card className="border-primary/20 sticky top-4">
              <CardContent className="p-5 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      selectedPattern.type === "bullish"
                        ? "bg-green-100 text-green-700"
                        : selectedPattern.type === "bearish"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {selectedPattern.type}
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-foreground">{selectedPattern.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedPattern.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium capitalize text-foreground">{selectedPattern.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reliability</span>
                    <span className="font-medium text-foreground">{selectedPattern.reliability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best Timeframe</span>
                    <span className="font-medium text-foreground">{selectedPattern.timeframe}</span>
                  </div>
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
