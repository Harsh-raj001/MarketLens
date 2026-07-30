import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Indicator {
  name: string;
  category: "Trend" | "Momentum" | "Volatility" | "Volume";
  description: string;
  usage: string;
  range?: string;
}

const indicators: Indicator[] = [
  { name: "Simple Moving Average (SMA)", category: "Trend", description: "Calculates the average price over a specified number of periods, giving equal weight to each data point.", usage: "Identifies trend direction and potential support/resistance levels. Crossovers between short and long SMAs generate trading signals.", range: "0 to ∞" },
  { name: "Exponential Moving Average (EMA)", category: "Trend", description: "Similar to SMA but gives more weight to recent prices, making it more responsive to recent price changes.", usage: "Better for identifying short-term trends and quick trend reversals. Commonly used in pairs (e.g., 12 and 26 EMA).", range: "0 to ∞" },
  { name: "Relative Strength Index (RSI)", category: "Momentum", description: "A momentum oscillator that measures the speed and magnitude of recent price changes on a scale of 0-100.", usage: "Readings above 70 suggest overbought conditions, below 30 suggest oversold. Divergences between RSI and price can signal reversals.", range: "0 to 100" },
  { name: "MACD (Moving Average Convergence Divergence)", category: "Momentum", description: "A trend-following momentum indicator showing the relationship between two moving averages of a security's price.", usage: "Crossovers between the MACD line and signal line generate buy/sell signals. Histogram shows momentum strength.", range: "Unbounded" },
  { name: "Bollinger Bands", category: "Volatility", description: "Consists of a middle SMA with two standard deviation bands above and below. The bands expand and contract with volatility.", usage: "Price touching the upper band suggests overbought, lower band suggests oversold. Band squeeze indicates low volatility before a big move.", range: "Dynamic" },
  { name: "Stochastic Oscillator", category: "Momentum", description: "Compares a closing price to its price range over a given period, producing two lines: %K and %D.", usage: "Readings above 80 suggest overbought, below 20 suggest oversold. Crossovers between %K and %D generate signals.", range: "0 to 100" },
  { name: "Average True Range (ATR)", category: "Volatility", description: "Measures market volatility by calculating the average range of price movements over a given period.", usage: "Used for setting stop-loss distances and position sizing. Higher ATR means more volatile market.", range: "0 to ∞" },
  { name: "Volume Weighted Average Price (VWAP)", category: "Volume", description: "Calculates the average price weighted by volume for a trading session.", usage: "Institutional traders use VWAP to assess whether they're buying at a good price. Price above VWAP is bullish, below is bearish.", range: "Price level" },
  { name: "On-Balance Volume (OBV)", category: "Volume", description: "A cumulative indicator that adds volume on up days and subtracts volume on down days.", usage: "Rising OBV confirms uptrend strength, falling OBV confirms downtrend. Divergences can signal reversals.", range: "Cumulative" },
  { name: "Ichimoku Cloud", category: "Trend", description: "A comprehensive indicator system with multiple lines forming a 'cloud' that shows support, resistance, trend direction, and momentum.", usage: "Price above the cloud is bullish, below is bearish. The cloud thickness indicates support/resistance strength.", range: "Dynamic" },
  { name: "Parabolic SAR", category: "Trend", description: "Places dots above or below price to indicate potential reversal points. Also called 'stop and reverse'.", usage: "Dots below price indicate uptrend, above indicate downtrend. Used for trailing stop-loss placement.", range: "Price level" },
  { name: "Williams %R", category: "Momentum", description: "A momentum indicator that measures overbought and oversold levels, similar to the Stochastic Oscillator.", usage: "Readings above -20 suggest overbought, below -80 suggest oversold. Useful for identifying reversal points.", range: "-100 to 0" },
];

export default function IndicatorExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "Trend" | "Momentum" | "Volatility" | "Volume">("all");
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(null);

  const filtered = selectedCategory === "all" ? indicators : indicators.filter((i) => i.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Indicator Explorer</h1>
        <p className="text-muted-foreground mt-1">Understand {indicators.length}+ technical indicators used in market analysis.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["all", "Trend", "Momentum", "Volatility", "Volume"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {cat === "all" ? "All" : cat}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-3">
          {filtered.map((indicator) => (
            <Card
              key={indicator.name}
              onClick={() => setSelectedIndicator(indicator)}
              className={`cursor-pointer transition-all duration-150 border-border/60 hover:shadow-md ${
                selectedIndicator?.name === indicator.name ? "ring-2 ring-primary/30" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm text-foreground">{indicator.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{indicator.category}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{indicator.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          {selectedIndicator ? (
            <Card className="border-primary/20 sticky top-4">
              <CardContent className="p-5 space-y-4">
                <div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{selectedIndicator.category}</span>
                  <h3 className="font-display text-xl text-foreground mt-2">{selectedIndicator.name}</h3>
                </div>

                {/* SVG Visualizer */}
                <div className="bg-background rounded-xl border border-border/60 p-6 flex justify-center items-center shadow-inner overflow-hidden relative">
                   <div className="absolute inset-0 bg-grid-white/5 bg-[size:10px_10px]" />
                   <div className="relative z-10 w-full max-w-[200px] aspect-[4/3] flex items-center justify-center">
                      <IndicatorVisualizer name={selectedIndicator.name} />
                   </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">{selectedIndicator.description}</p>
                <div className="space-y-2 text-sm">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Usage</h4>
                  <p className="text-foreground/80 leading-relaxed">{selectedIndicator.usage}</p>
                </div>
                {selectedIndicator.range && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Range</span>
                    <span className="font-mono font-medium text-foreground">{selectedIndicator.range}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground text-sm">Select an indicator to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function IndicatorVisualizer({ name }: { name: string }) {
  const primary = "#10b981"; // Emerald
  const secondary = "#6366f1"; // Indigo
  const tertiary = "#ef4444"; // Red
  const grid = "#334155";

  const renderPattern = () => {
    switch (name) {
      case "Relative Strength Index (RSI)":
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-md overflow-visible">
            <line x1="0" y1="20" x2="100" y2="20" stroke={grid} strokeWidth="1" strokeDasharray="4 4" />
            <text x="10" y="15" fontSize="8" fill={grid}>70</text>
            <line x1="0" y1="60" x2="100" y2="60" stroke={grid} strokeWidth="1" strokeDasharray="4 4" />
            <text x="10" y="70" fontSize="8" fill={grid}>30</text>
            <motion.polyline initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} points="0,50 20,25 40,35 60,15 80,65 100,45" fill="none" stroke={secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} cx="60" cy="15" r="3" fill={tertiary} />
            <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} cx="80" cy="65" r="3" fill={primary} />
          </svg>
        );
      case "MACD (Moving Average Convergence Divergence)":
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-md overflow-visible">
            <line x1="0" y1="50" x2="100" y2="50" stroke={grid} strokeWidth="1" />
            {/* Histogram */}
            <motion.rect initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.5 }} style={{ originY: 1 }} x="20" y="30" width="4" height="20" fill={primary} opacity={0.6} />
            <motion.rect initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.5, delay: 0.1 }} style={{ originY: 1 }} x="40" y="40" width="4" height="10" fill={primary} opacity={0.6} />
            <motion.rect initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ originY: 0 }} x="60" y="50" width="4" height="15" fill={tertiary} opacity={0.6} />
            <motion.rect initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.5, delay: 0.3 }} style={{ originY: 0 }} x="80" y="50" width="4" height="25" fill={tertiary} opacity={0.6} />
            {/* MACD Line */}
            <motion.polyline initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} points="0,20 30,25 60,60 100,75" fill="none" stroke={secondary} strokeWidth="2" />
            {/* Signal Line */}
            <motion.polyline initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} points="0,30 35,35 60,50 100,60" fill="none" stroke="#f59e0b" strokeWidth="2" />
          </svg>
        );
      case "Bollinger Bands":
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Shaded Area */}
            <motion.polygon initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} transition={{ duration: 1 }} points="0,20 50,40 100,30 100,70 50,60 0,50" fill={secondary} />
            {/* Upper Band */}
            <motion.polyline initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} points="0,20 50,40 100,30" fill="none" stroke={secondary} strokeWidth="1" strokeDasharray="2 2" />
            {/* Lower Band */}
            <motion.polyline initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} points="0,50 50,60 100,70" fill="none" stroke={secondary} strokeWidth="1" strokeDasharray="2 2" />
            {/* Middle SMA */}
            <motion.polyline initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} points="0,35 50,50 100,50" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            {/* Price line bouncing inside */}
            <motion.polyline initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }} points="0,40 25,55 50,40 75,30 100,60" fill="none" stroke={primary} strokeWidth="2" />
          </svg>
        );
      default:
        // Generic Moving Average
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Price Candles stub */}
            <rect x="20" y="30" width="4" height="20" fill={primary} />
            <rect x="40" y="20" width="4" height="25" fill={tertiary} />
            <rect x="60" y="40" width="4" height="15" fill={primary} />
            <rect x="80" y="30" width="4" height="30" fill={tertiary} />
            {/* Smooth Indicator Curve */}
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} d="M0,50 Q25,20 50,40 T100,35" fill="none" stroke={secondary} strokeWidth="3" />
          </svg>
        );
    }
  };

  return (
    <motion.div key={name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full">
      {renderPattern()}
    </motion.div>
  );
}
