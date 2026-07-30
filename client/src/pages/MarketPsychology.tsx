import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, AlertTriangle, ArrowRight, CheckCircle2, XCircle, Shield, Heart, Zap, Anchor, Eye, Lock } from "lucide-react";

const topics = [
  {
    icon: Heart,
    title: "Fear",
    description: "Fear is one of the most powerful emotions in trading. It can manifest as fear of losing money (preventing entry into valid setups) or fear of missing out (driving impulsive entries). Both forms lead to irrational decisions.",
    effects: ["Premature exits from winning trades", "Avoiding valid trading opportunities", "Overtrading to 'recover' losses", "Paralysis during high-volatility events"],
    mitigation: "Develop a trading plan and stick to it. Use position sizing rules to ensure no single trade can cause catastrophic loss. Practice with small positions to build confidence.",
  },
  {
    icon: Zap,
    title: "Greed",
    description: "Greed drives traders to hold winning positions too long, take excessive risks, or overtrade in pursuit of more profits. It often leads to giving back gains and taking unnecessary risks.",
    effects: ["Holding winners beyond profit targets", "Increasing position sizes irrationally", "Ignoring stop-loss levels", "Overtrading after a winning streak"],
    mitigation: "Set predefined profit targets and exit rules before entering trades. Track your win rate and understand that consistent small gains outperform sporadic big wins.",
  },
  {
    icon: Eye,
    title: "FOMO (Fear of Missing Out)",
    description: "FOMO occurs when traders enter positions because they see others profiting or a price is rapidly moving. This often leads to buying at peaks and selling at troughs — the exact opposite of profitable trading.",
    effects: ["Chasing rapidly moving prices", "Entering without proper analysis", "Buying breakouts at resistance", "Regret-driven impulsive trades"],
    mitigation: "Remember that there will always be another opportunity. Focus on your own strategy and analysis, not what others are doing. If you miss a move, wait for a pullback or the next setup.",
  },
  {
    icon: Anchor,
    title: "Anchoring Bias",
    description: "Anchoring occurs when traders fixate on a specific price level — often the price they paid for a stock — and make decisions based on that anchor rather than current market conditions.",
    effects: ["Refusing to sell at a loss because 'it was higher before'", "Setting unrealistic profit targets based on purchase price", "Ignoring new information that contradicts the anchor", "Holding losing positions hoping to 'break even'"],
    mitigation: "Focus on current market conditions and your trading plan, not on your entry price. The market doesn't care what you paid. Cut losses quickly based on your predefined stop-loss levels.",
  },
  {
    icon: Shield,
    title: "Confirmation Bias",
    description: "Confirmation bias is the tendency to seek, interpret, and remember information that confirms pre-existing beliefs while ignoring contradictory evidence. In trading, this leads to holding positions despite warning signs.",
    effects: ["Only reading analysis that supports your position", "Ignoring bearish signals when holding long positions", "Dismissing technical breakdowns as 'fakeouts'", "Building a biased information diet"],
    mitigation: "Actively seek out opposing viewpoints. Before entering a trade, write down reasons why the trade might fail. Use checklists to ensure you consider both bullish and bearish factors.",
  },
  {
    icon: Lock,
    title: "Loss Aversion",
    description: "Loss aversion is the psychological phenomenon where the pain of losses is felt 2-3 times more intensely than the pleasure of equivalent gains. This causes traders to hold losers too long and cut winners too early.",
    effects: ["Holding losing positions hoping they'll recover", "Taking profits too early on winning trades", "Doubling down on losing positions", "Avoiding trading after a loss"],
    mitigation: "Accept that losses are part of trading. Focus on your risk/reward ratio rather than individual trade outcomes. A 40% win rate with 2:1 risk/reward is profitable.",
  },
];

export default function MarketPsychology() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Market Psychology</h1>
        <p className="text-muted-foreground mt-1">Understand the emotional and cognitive biases that affect trading decisions. Self-awareness is the foundation of disciplined trading.</p>
      </div>

      {/* Key insight banner */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-5 flex items-start gap-4">
          <Brain className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground">Why Psychology Matters</h3>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Studies show that emotional decision-making accounts for up to 70% of trading mistakes. Understanding your psychological biases is the first step toward developing the discipline needed for consistent trading performance. This module covers the six most impactful biases.
            </p>
          </div>
        </CardContent>
      </Card>

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
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                  <topic.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground">{topic.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{topic.description}</p>

              {expandedTopic === i && (
                <div className="space-y-3 pt-2 border-t border-border/40">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Common Effects
                    </span>
                    <ul className="space-y-1">
                      {topic.effects.map((effect, j) => (
                        <li key={j} className="text-sm text-foreground/80 flex items-start gap-2">
                          <XCircle className="w-3 h-3 text-red-400 flex-shrink-0 mt-1" />
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-500" /> How to Mitigate
                    </span>
                    <p className="text-sm text-foreground/80 leading-relaxed">{topic.mitigation}</p>
                  </div>
                </div>
              )}

              {expandedTopic !== i && (
                <p className="text-xs text-primary font-medium">Click to explore →</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
