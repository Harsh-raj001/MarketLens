import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, BookOpen } from "lucide-react";

interface DictionaryEntry {
  term: string;
  definition: string;
  category: string;
  related: string[];
}

const entries: DictionaryEntry[] = [
  { term: "Ask Price", definition: "The lowest price at which a seller is willing to sell a security. Also known as the offer price. The ask is always higher than the bid.", category: "Market Structure", related: ["Bid Price", "Spread"] },
  { term: "Bid Price", definition: "The highest price a buyer is willing to pay for a security. The bid is always lower than the ask price.", category: "Market Structure", related: ["Ask Price", "Spread"] },
  { term: "Bull Market", definition: "A market condition where prices are rising or expected to rise. Characterized by investor optimism and strong economic indicators.", category: "Market Conditions", related: ["Bear Market", "Trend"] },
  { term: "Bear Market", definition: "A market condition where prices are falling or expected to fall. Typically defined as a decline of 20% or more from recent highs.", category: "Market Conditions", related: ["Bull Market", "Downtrend"] },
  { term: "Candlestick", definition: "A type of price chart that displays the open, high, low, and close prices for a specific period. Green/white candles indicate price rose, red/black indicate price fell.", category: "Technical Analysis", related: ["Candlestick Patterns", "Chart"] },
  { term: "Support Level", definition: "A price level where a security historically has difficulty falling below, due to buying interest. Acts as a floor for price.", category: "Technical Analysis", related: ["Resistance Level", "Trend"] },
  { term: "Resistance Level", definition: "A price level where a security historically has difficulty rising above, due to selling pressure. Acts as a ceiling for price.", category: "Technical Analysis", related: ["Support Level", "Breakout"] },
  { term: "Moving Average", definition: "A technical indicator that calculates the average price of a security over a specific number of periods, smoothing out short-term fluctuations.", category: "Indicators", related: ["SMA", "EMA"] },
  { term: "RSI (Relative Strength Index)", definition: "A momentum oscillator that measures the speed and magnitude of price movements on a scale of 0-100. Above 70 = overbought, below 30 = oversold.", category: "Indicators", related: ["Momentum", "Oscillator"] },
  { term: "MACD", definition: "Moving Average Convergence Divergence. A trend-following momentum indicator showing the relationship between two moving averages.", category: "Indicators", related: ["Moving Average", "Signal Line"] },
  { term: "Position Size", definition: "The amount of capital allocated to a single trade. Proper position sizing is the most critical aspect of risk management.", category: "Risk Management", related: ["Stop Loss", "Risk/Reward"] },
  { term: "Stop Loss", definition: "A predetermined price level at which a trader exits a position to limit losses. Essential for capital preservation.", category: "Risk Management", related: ["Position Size", "Take Profit"] },
  { term: "Risk/Reward Ratio", definition: "The ratio of potential profit to potential loss on a trade. A 1:2 ratio means you risk $1 to potentially gain $2. Professionals typically seek 1:2 or better.", category: "Risk Management", related: ["Stop Loss", "Position Size"] },
  { term: "Drawdown", definition: "The decline from a peak in portfolio value to a subsequent trough. Maximum drawdown measures the largest historical loss from peak to trough.", category: "Risk Management", related: ["Recovery", "Risk"] },
  { term: "FOMO", definition: "Fear of Missing Out. An emotional bias where traders enter positions because they see others profiting, often leading to buying at peaks.", category: "Psychology", related: ["Fear", "Overtrading"] },
  { term: "Anchoring Bias", definition: "A cognitive bias where traders fixate on a specific price level (like the price they paid) and make decisions based on that anchor rather than current market conditions.", category: "Psychology", related: ["Confirmation Bias", "Loss Aversion"] },
  { term: "Confirmation Bias", definition: "The tendency to seek, interpret, and remember information that confirms one's pre-existing beliefs while ignoring contradictory evidence.", category: "Psychology", related: ["Anchoring Bias", "FOMO"] },
  { term: "Loss Aversion", definition: "The psychological phenomenon where the pain of losses is felt more intensely than the pleasure of equivalent gains. Typically 2-3x more intense.", category: "Psychology", related: ["Fear", "Risk"] },
  { term: "Diversification", definition: "A risk management strategy that spreads investments across different assets, sectors, or markets to reduce overall portfolio risk.", category: "Risk Management", related: ["Correlation", "Portfolio"] },
  { term: "Liquidity", definition: "The ease with which an asset can be bought or sold without significantly affecting its price. High liquidity means tight spreads and fast execution.", category: "Market Structure", related: ["Volume", "Spread"] },
  { term: "Volume", definition: "The number of shares or contracts traded during a specific period. High volume confirms price movements; low volume suggests weak conviction.", category: "Technical Analysis", related: ["Liquidity", "OBV"] },
  { term: "Breakout", definition: "When a security's price moves above a resistance level or below a support level with increased volume, signaling a potential new trend.", category: "Technical Analysis", related: ["Support", "Resistance"] },
  { term: "Trend", definition: "The general direction in which a security's price is moving. Uptrends have higher highs and higher lows; downtrends have lower highs and lower lows.", category: "Technical Analysis", related: ["Support", "Resistance"] },
  { term: "P/E Ratio", definition: "Price-to-Earnings ratio. A valuation metric comparing a company's current share price to its earnings per share. Higher P/E may indicate overvaluation.", category: "Fundamentals", related: ["EPS", "Valuation"] },
  { term: "EPS", definition: "Earnings Per Share. A company's net profit divided by the number of outstanding shares. A key metric for evaluating profitability.", category: "Fundamentals", related: ["P/E Ratio", "ROE"] },
  { term: "ROE", definition: "Return on Equity. Measures how efficiently a company uses shareholders' equity to generate profit. Higher ROE indicates better efficiency.", category: "Fundamentals", related: ["EPS", "Cash Flow"] },
];

export default function TradingDictionary() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(entries.map((e) => e.category)))];

  const filtered = entries.filter((entry) => {
    const matchesSearch = entry.term.toLowerCase().includes(search.toLowerCase()) ||
      entry.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Trading Dictionary</h1>
        <p className="text-muted-foreground mt-1">Searchable glossary of trading terminology with definitions and cross-references.</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search terms or definitions..."
          className="pl-10 max-w-lg"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">{filtered.length} terms found</p>

      {/* Entries */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((entry, i) => (
          <Card key={i} className="border-border/60">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <h3 className="font-semibold text-sm text-foreground">{entry.term}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{entry.definition}</p>
              <div className="flex flex-wrap gap-1">
                {entry.related.map((r, j) => (
                  <span key={j} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary/50 text-muted-foreground">
                    {r}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No terms found matching your search.</p>
        </div>
      )}
    </div>
  );
}
