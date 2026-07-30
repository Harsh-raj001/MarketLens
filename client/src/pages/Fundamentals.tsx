import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, TrendingUp, DollarSign, PieChart, Activity, Globe, ThermometerSun, Percent } from "lucide-react";
import { useState } from "react";

const topics = [
  {
    icon: BarChart3,
    title: "P/E Ratio (Price-to-Earnings)",
    description: "The P/E ratio compares a company's current share price to its earnings per share (EPS). It helps investors determine whether a stock is overvalued or undervalued relative to its earnings.",
    formula: "P/E = Market Price per Share ÷ Earnings Per Share",
    example: "If a stock trades at ₹200 and EPS is ₹10, the P/E ratio is 20. This means investors pay ₹20 for every ₹1 of earnings.",
    insight: "A higher P/E may indicate growth expectations, but could also signal overvaluation. Compare P/E ratios within the same industry for meaningful analysis.",
  },
  {
    icon: TrendingUp,
    title: "EPS (Earnings Per Share)",
    description: "EPS measures a company's profitability by dividing net income by the number of outstanding shares. It is one of the most widely used indicators of a company's financial health.",
    formula: "EPS = Net Income ÷ Number of Outstanding Shares",
    example: "A company with ₹50 crore net income and 10 crore shares has an EPS of ₹5.",
    insight: "Consistent EPS growth over time indicates improving profitability. Compare EPS across quarters to identify trends.",
  },
  {
    icon: PieChart,
    title: "ROE (Return on Equity)",
    description: "ROE measures how efficiently a company generates profit from shareholders' equity. It indicates management's effectiveness in deploying capital.",
    formula: "ROE = Net Income ÷ Shareholders' Equity",
    example: "A company with ₹20 crore net income and ₹100 crore equity has an ROE of 20%.",
    insight: "An ROE above 15% is generally considered good. However, very high ROE driven by excessive debt should be viewed cautiously.",
  },
  {
    icon: DollarSign,
    title: "Debt Analysis",
    description: "Debt analysis evaluates a company's leverage — how much it owes relative to its assets and equity. Key metrics include Debt-to-Equity (D/E) ratio and Interest Coverage ratio.",
    formula: "D/E Ratio = Total Debt ÷ Shareholders' Equity",
    example: "A company with ₹200 crore debt and ₹100 crore equity has a D/E ratio of 2.0, meaning it has twice as much debt as equity.",
    insight: "High debt increases financial risk, especially during economic downturns. Compare D/E ratios within the same industry.",
  },
  {
    icon: Activity,
    title: "Cash Flow",
    description: "Cash flow tracks the actual movement of money in and out of a business. Unlike earnings (which include non-cash items), cash flow shows the company's real liquidity.",
    formula: "Free Cash Flow = Operating Cash Flow − Capital Expenditures",
    example: "A company with ₹30 crore operating cash flow and ₹10 crore capex has a free cash flow of ₹20 crore.",
    insight: "Positive free cash flow indicates the company can fund operations, pay dividends, and reduce debt. Negative FCF may signal financial stress.",
  },
  {
    icon: Globe,
    title: "GDP (Gross Domestic Product)",
    description: "GDP measures the total value of goods and services produced in a country. It is the broadest measure of economic activity and a key indicator for market direction.",
    formula: "GDP = C + I + G + (X − M)",
    example: "India's GDP growth of 6.5% in a quarter indicates strong economic expansion, which is generally positive for equity markets.",
    insight: "Rising GDP typically supports stock markets, while declining GDP (recession) often leads to bear markets. Track quarterly GDP reports.",
  },
  {
    icon: ThermometerSun,
    title: "Inflation",
    description: "Inflation measures the rate at which the general level of prices for goods and services is rising. It erodes purchasing power and influences central bank policy.",
    formula: "CPI-based: Inflation Rate = ((CPI_current − CPI_previous) ÷ CPI_previous) × 100",
    example: "If CPI rises from 150 to 156, inflation is (6/150) × 100 = 4%.",
    insight: "Moderate inflation (2-6% in India) is normal. High inflation erodes returns and may trigger rate hikes. Low inflation can signal weak demand.",
  },
  {
    icon: Percent,
    title: "Interest Rates",
    description: "Interest rates, set by the Reserve Bank of India (RBI) via the repo rate, influence borrowing costs, investment returns, and market liquidity. They are a primary tool of monetary policy.",
    formula: "Higher Rates → Higher borrowing costs → Lower corporate profits → Bearish for stocks",
    example: "When RBI raises the repo rate from 6.0% to 6.25%, loan costs increase, potentially slowing economic activity and affecting stock prices.",
    insight: "Rate hikes are generally bearish for equities but positive for fixed-income investments. Rate cuts tend to boost stock markets by lowering borrowing costs.",
  },
];

export default function Fundamentals() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Fundamentals</h1>
        <p className="text-muted-foreground mt-1">Core financial metrics and macroeconomic indicators essential for understanding market dynamics.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
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
                <div className="space-y-3 pt-2 border-t border-border/40">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Formula</span>
                    <p className="text-sm font-mono bg-secondary/50 px-3 py-2 rounded-md text-foreground">{topic.formula}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Example</span>
                    <p className="text-sm text-foreground/80 leading-relaxed">{topic.example}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Key Insight</span>
                    <p className="text-sm text-foreground/80 leading-relaxed">{topic.insight}</p>
                  </div>
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
