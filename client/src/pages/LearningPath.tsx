import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { motion } from "framer-motion";

const paths = [
  {
    id: "beginner",
    title: "Trading Foundations",
    description: "Perfect for absolute beginners. Start from zero and build a solid understanding of how markets work.",
    difficulty: "Beginner",
    lessons: 6,
    completed: 0,
    color: "bg-green-500",
    topics: ["Market Basics", "Candlesticks", "Support/Resistance", "Basic Indicators", "Position Sizing", "Trading Psychology Intro"],
  },
  {
    id: "intermediate",
    title: "Technical Analysis Mastery",
    description: "Deepen your understanding of chart patterns, indicators, and analytical frameworks for better decision-making.",
    difficulty: "Intermediate",
    lessons: 8,
    completed: 0,
    color: "bg-primary",
    topics: ["Advanced Candlesticks", "Chart Patterns", "MACD & RSI", "Volume Analysis", "Risk/Reward Mastery", "Emotional Biases", "Diversification", "Drawdown Management"],
  },
  {
    id: "risk",
    title: "Risk Management Essentials",
    description: "Learn how to protect your capital with proven risk management strategies used by professional traders.",
    difficulty: "Beginner",
    lessons: 5,
    completed: 0,
    color: "bg-amber-500",
    topics: ["Position Sizing", "Stop Loss Strategies", "Risk/Reward Ratios", "Diversification Principles", "Understanding Drawdown"],
  },
  {
    id: "psychology",
    title: "Market Psychology 101",
    description: "Master the emotional and cognitive aspects of trading. Understand why traders make irrational decisions.",
    difficulty: "Intermediate",
    lessons: 6,
    completed: 0,
    color: "bg-purple-500",
    topics: ["Fear in Trading", "Greed & Overtrading", "FOMO", "Anchoring Bias", "Confirmation Bias", "Loss Aversion"],
  },
];

export default function LearningPath() {
  return (
    <div className="space-y-8">
      <ScrollReveal direction="down">
        <h1 className="font-display text-3xl text-foreground">Learning Paths</h1>
        <p className="text-muted-foreground mt-1">Choose a structured curriculum and progress at your own pace.</p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6">
        {paths.map((path, i) => (
          <ScrollReveal key={path.id} delay={i * 0.1}>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Card className="border-border/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className={`h-1.5 ${path.color}`} />
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full text-white ${path.color} mb-2 inline-block`}>
                    {path.difficulty}
                  </span>
                  <h3 className="font-display text-xl text-foreground">{path.title}</h3>
                </div>
                <span className="text-sm text-muted-foreground">{path.lessons} lessons</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{path.description}</p>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground font-medium mb-1.5">
                  <span>Course Progress</span>
                  <span>{Math.round((path.completed / path.lessons) * 100)}%</span>
                </div>
                <div className="flex gap-1 h-2.5 w-full">
                  {path.topics.map((topic, i) => (
                    <div 
                      key={i}
                      title={topic}
                      className={`flex-1 rounded-sm ${i < path.completed ? path.color : 'bg-muted/50 border border-border/50'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Topics list */}
              <div className="pt-2 flex flex-wrap gap-x-4 gap-y-2">
                {path.topics.map((topic, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide">
                    {i < path.completed ? (
                      <CheckCircle2 className={`w-3.5 h-3.5 ${path.color.replace('bg-', 'text-')}`} />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-muted-foreground/30" />
                    )}
                    <span className={i < path.completed ? "text-muted-foreground line-through opacity-70" : "text-foreground"}>
                      {topic}
                    </span>
                  </div>
                ))}
              </div>

              <Link href={`/lesson/${path.id === "beginner" ? "1" : path.id === "intermediate" ? "4" : "8"}`}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  {path.completed > 0 ? "Continue Learning" : "Start Path"} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              </CardContent>
              </Card>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
