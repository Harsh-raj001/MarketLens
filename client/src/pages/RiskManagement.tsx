import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Scale, Target, Layers, TrendingDown, Calculator, ArrowRight, CheckCircle2 } from "lucide-react";

const topics = [
  {
    icon: Target,
    title: "Position Sizing",
    description: "Position sizing determines how much capital to allocate to a single trade. It is the single most important risk management technique, as it directly controls your maximum possible loss on any trade.",
    keyPoints: [
      "The 1-2% Rule: Never risk more than 1-2% of total capital on a single trade",
      "Formula: Position Size = (Account × Risk %) ÷ Stop-Loss Distance",
      "Example: $10,000 account, 1% risk ($100), 50-pip stop = 2 mini lots",
      "Position sizing should account for correlation between multiple open trades",
    ],
    calculator: true,
  },
  {
    icon: Shield,
    title: "Stop Loss Strategies",
    description: "A stop loss is a predetermined exit point that limits losses on a trade. Setting stops before entry removes emotion from the exit decision and protects capital during unexpected market moves.",
    keyPoints: [
      "Technical stops: Place below support levels or above resistance",
      "Fixed percentage stops: Exit if price moves X% against you",
      "ATR-based stops: Use Average True Range for volatility-adjusted stops",
      "Trailing stops: Move your stop as the trade moves in your favor",
    ],
    calculator: false,
  },
  {
    icon: Scale,
    title: "Risk/Reward Ratio",
    description: "The risk/reward ratio compares potential profit to potential loss. A higher ratio means you stand to gain more relative to what you risk. This metric determines whether a trade is worth taking, regardless of win rate.",
    keyPoints: [
      "Minimum acceptable R/R is 1:1.5 (risk $1 to gain $1.50)",
      "Professional traders typically seek 1:2 or better",
      "With 1:2 R/R, you only need a 34% win rate to break even",
      "Never adjust your stop loss to improve R/R after entry",
    ],
    calculator: true,
  },
  {
    icon: Layers,
    title: "Diversification",
    description: "Diversification spreads risk across different assets, sectors, or markets to reduce the impact of any single loss. It is the only 'free lunch' in investing — reducing risk without necessarily reducing returns.",
    keyPoints: [
      "Avoid over-concentration in a single stock or sector",
      "Correlation matters: holding 10 correlated stocks isn't true diversification",
      "Diversify across asset classes (equities, bonds, commodities)",
      "Consider geographic diversification for broader risk reduction",
    ],
    calculator: false,
  },
  {
    icon: TrendingDown,
    title: "Understanding Drawdown",
    description: "Drawdown is the decline from a portfolio's peak value to its lowest point before a new peak. Maximum drawdown measures the worst-case historical loss. Managing drawdown is essential for long-term capital preservation.",
    keyPoints: [
      "A 50% drawdown requires a 100% gain to recover",
      "Limit maximum drawdown to 20% for sustainable trading",
      "Recovery from large drawdowns takes disproportionately longer",
      "Track peak-to-trough declines to monitor portfolio health",
    ],
    calculator: false,
  },
];

interface CalcState {
  accountSize: string;
  riskPercent: string;
  stopLoss: string;
}

function PositionCalculator() {
  const [calc, setCalc] = useState<CalcState>({ accountSize: "10000", riskPercent: "1", stopLoss: "50" });

  const positionSize = calc.accountSize && calc.riskPercent && calc.stopLoss
    ? ((parseFloat(calc.accountSize) * parseFloat(calc.riskPercent) / 100) / parseFloat(calc.stopLoss)).toFixed(2)
    : "0";

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-5 space-y-4">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <Calculator className="w-4 h-4 text-primary" /> Position Size Calculator
        </h4>
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Account Size ($)</label>
            <input
              type="number"
              value={calc.accountSize}
              onChange={(e) => setCalc({ ...calc, accountSize: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-border text-sm bg-white"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Risk (%)</label>
            <input
              type="number"
              value={calc.riskPercent}
              onChange={(e) => setCalc({ ...calc, riskPercent: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-border text-sm bg-white"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Stop-Loss (pips)</label>
            <input
              type="number"
              value={calc.stopLoss}
              onChange={(e) => setCalc({ ...calc, stopLoss: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-border text-sm bg-white"
            />
          </div>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-border/40">
          <span className="text-sm text-muted-foreground">Calculated Position Size</span>
          <span className="font-display text-xl text-primary">{positionSize} lots</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function RiskManagement() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Risk Management</h1>
        <p className="text-muted-foreground mt-1">Protect your capital with proven risk management strategies. This is the most critical skill for long-term trading success.</p>
      </div>

      {/* Key principle banner */}
      <Card className="border-red-200 bg-red-50/50">
        <CardContent className="p-5 flex items-start gap-4">
          <Shield className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground">The Golden Rule</h3>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Rule #1: Never lose money. Rule #2: Never forget Rule #1. — Warren Buffett. In practical terms, this means never risking more than 1-2% of your capital on a single trade, always using stop losses, and maintaining a positive risk/reward ratio.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Calculator */}
      <PositionCalculator />

      <div className="space-y-3">
        {topics.map((topic, i) => (
          <Card
            key={i}
            className={`border-border/60 cursor-pointer transition-all duration-150 hover:shadow-md ${
              expandedTopic === i ? "ring-2 ring-primary/30" : ""
            }`}
            onClick={() => setExpandedTopic(expandedTopic === i ? null : i)}
          >
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <topic.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground">{topic.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{topic.description}</p>

              {expandedTopic === i && (
                <div className="space-y-2 pt-2 border-t border-border/40">
                  {topic.keyPoints.map((point, j) => (
                    <div key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              )}

              {expandedTopic !== i && (
                <p className="text-xs text-primary font-medium">Click to expand →</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
