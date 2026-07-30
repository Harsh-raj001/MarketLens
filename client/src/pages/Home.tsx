import { Link } from "wouter";
import { useState, useEffect } from "react";
import {
  BookOpen,
  MessageSquare,
  TrendingUp,
  BarChart3,
  Search,
  Target,
  Brain,
  Shield,
  LayoutDashboard,
  ArrowRight,
  BookMarked,
  Command,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    icon: MessageSquare,
    title: "AI-Powered Tutor",
    description: "Ask any trading question and get educational answers grounded in verified knowledge. No signals, no advice — just clarity.",
    href: "/ai-tutor",
  },
  {
    icon: BookOpen,
    title: "Structured Lessons",
    description: "Progress through curated learning paths from beginner to advanced. Each lesson includes quizzes to test your understanding.",
    href: "/paths",
  },
  {
    icon: TrendingUp,
    title: "Candlestick Explorer",
    description: "Master 40+ candlestick patterns with interactive visual examples. Practice identification in a hands-on environment.",
    href: "/candlestick-explorer",
  },
  {
    icon: BarChart3,
    title: "Chart Pattern Explorer",
    description: "Study head-and-shoulders, triangles, flags, and 25+ more classical chart formations with real market data overlays.",
    href: "/chart-patterns",
  },
  {
    icon: Search,
    title: "Trading Dictionary",
    description: "Instantly look up any trading term with clear definitions, contextual examples, and cross-references.",
    href: "/dictionary",
  },
  {
    icon: Target,
    title: "Daily Challenge",
    description: "Test your knowledge every day with pattern identification, concept quizzes, and scenario-based exercises.",
    href: "/daily-challenge",
  },
];

const modules = [
  { icon: Brain, label: "Market Psychology", href: "/psychology", desc: "Fear, Greed, FOMO, Bias" },
  { icon: Shield, label: "Risk Management", href: "/risk-management", desc: "Position sizing, Stop losses" },
  { icon: BookOpen, label: "Fundamentals", href: "/fundamentals", desc: "P/E, EPS, ROE, GDP, Inflation" },
  { icon: LayoutDashboard, label: "Progress Dashboard", href: "/progress", desc: "Track your learning journey" },
];

export default function Home() {
  const [demoStep, setDemoStep] = useState(0);

  // Auto-play the hero demo
  useEffect(() => {
    const timer = setInterval(() => {
      setDemoStep((prev) => (prev >= 2 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-24 lg:space-y-32 pb-16">
      {/* Interactive Hero Section */}
      <section className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">
        <div className="space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            AI-Native Learning Platform
          </div>
          <h1 className="font-display text-5xl lg:text-6xl xl:text-[4.5rem] leading-[1.1] text-foreground tracking-tight">
            Learn to trade. <br />
            <span className="text-primary relative inline-block mt-2">
              Visually.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 15 100 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
            Ask any question. Our AI instantly assembles a custom, interactive lesson with precise charting visuals, market psychology, and historical replays.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/ai-tutor">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-base shadow-lg shadow-primary/20 transition-all card-hover">
                Try the AI Tutor <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground px-4 py-2 bg-muted/50 rounded-xl border border-border/50">
              Press <kbd className="font-sans px-1.5 py-0.5 bg-background rounded border border-border shadow-sm text-xs">⌘</kbd> <kbd className="font-sans px-1.5 py-0.5 bg-background rounded border border-border shadow-sm text-xs">K</kbd> anywhere
            </div>
          </div>
        </div>

        {/* Dynamic Hero Demo Workspace */}
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-card border border-border/60 flex flex-col relative z-10">
             {/* Window Header */}
             <div className="h-12 border-b border-border/50 bg-muted/30 flex items-center px-4 gap-2">
               <div className="flex gap-1.5">
                 <div className="w-3 h-3 rounded-full bg-border" />
                 <div className="w-3 h-3 rounded-full bg-border" />
                 <div className="w-3 h-3 rounded-full bg-border" />
               </div>
               <div className="ml-4 flex-1">
                 <div className="mx-auto w-3/4 bg-background border border-border/50 rounded-md h-7 flex items-center px-3 gap-2">
                   <Command className="w-3 h-3 text-muted-foreground" />
                   <span className="text-xs text-muted-foreground font-mono">
                     {demoStep === 0 ? "Type a question..." : "Explain Head and Shoulders"}
                   </span>
                   {demoStep === 1 && (
                     <motion.span 
                       initial={{ opacity: 0 }} 
                       animate={{ opacity: [0, 1, 0] }} 
                       transition={{ repeat: Infinity, duration: 0.8 }} 
                       className="w-1.5 h-3 bg-primary"
                     />
                   )}
                 </div>
               </div>
             </div>

             {/* Dynamic Content Area */}
             <div className="flex-1 p-6 relative overflow-hidden bg-gradient-to-b from-background to-muted/10 flex flex-col items-center justify-center">
               <AnimatePresence mode="wait">
                 {demoStep < 2 ? (
                   <motion.div
                     key="waiting"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     className="flex flex-col items-center justify-center text-muted-foreground"
                   >
                     <Brain className="w-12 h-12 mb-4 opacity-20" />
                     <p className="text-sm">AI is ready to teach.</p>
                   </motion.div>
                 ) : (
                   <motion.div
                     key="lesson"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, staggerChildren: 0.1 }}
                     className="w-full max-w-sm space-y-4"
                   >
                     {/* Topic */}
                     <motion.h3 
                       initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                       className="font-display text-xl text-foreground text-center"
                     >
                       Head and Shoulders
                     </motion.h3>
                     
                     {/* SVG Visual */}
                     <motion.div 
                       initial={{ scale: 0.9, opacity: 0 }} 
                       animate={{ scale: 1, opacity: 1 }} 
                       className="bg-background border border-border rounded-xl p-4 shadow-sm flex justify-center"
                     >
                       <svg width="200" height="120" viewBox="0 0 150 100">
                          <line x1="10" y1="75" x2="140" y2="75" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
                          <path d="M 10 85 L 30 40 L 45 70 L 75 15 L 105 70 L 120 40 L 140 85" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          <text x="70" y="10" fontSize="5" fill="#4f46e5" fontWeight="bold">Head</text>
                       </svg>
                     </motion.div>

                     {/* Psychology Box */}
                     <motion.div 
                       initial={{ y: 10, opacity: 0 }} 
                       animate={{ y: 0, opacity: 1 }} 
                       className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3"
                     >
                       <div className="flex items-center gap-2 mb-1">
                         <Brain className="w-3.5 h-3.5 text-amber-600" />
                         <span className="text-xs font-semibold text-amber-900 dark:text-amber-500">Psychology</span>
                       </div>
                       <p className="text-[10px] text-amber-800/80 dark:text-amber-200/80 leading-relaxed">
                         The final push (right shoulder) fails to reach the head's peak, showing severe exhaustion before a breakdown.
                       </p>
                     </motion.div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </div>
          {/* Decorative glow */}
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
          <div className="absolute -top-8 -left-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -z-10" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-tight">Everything you need to build market literacy</h2>
          <p className="text-muted-foreground text-lg">A complete ecosystem designed to take you from basic concepts to advanced pattern recognition.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Link key={i} href={f.href}>
              <Card className="h-full border-border/60 bg-card hover:border-primary/30 transition-all duration-300 card-hover cursor-pointer group">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                    <f.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* TradeLog Highlight Section */}
      <section className="bg-slate-900 rounded-[2.5rem] p-10 lg:p-16 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium border border-white/20">
              <BookMarked className="w-4 h-4" /> Practice Layer
            </div>
            <h2 className="font-display text-4xl lg:text-5xl leading-tight text-white tracking-tight">
              TradeLog — NIFTY 50 Swing Trade Journal
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
              Learning is just theory until you track it. Built specifically for Indian retail traders, TradeLog reduces the friction of journaling to under 3 minutes.
            </p>
            <ul className="space-y-4 pb-4">
              {[
                "India-specific tags (RSI Divergence, Bollinger Squeeze)",
                "F&O Expiry week awareness",
                "Dedicated 'What were you thinking?' emotion tracking",
                "100% Private (Data stays in your browser's localStorage)"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-200 text-sm">
                  <div className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/journal">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-semibold gap-2 border-0 h-14 px-8 text-base transition-transform active:scale-95">
                Open Your Journal <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          
          {/* Glass Mockup */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-md shadow-2xl relative">
             <div className="absolute -left-4 -top-4 w-20 h-20 bg-primary/30 rounded-full blur-2xl" />
             <div className="space-y-6 relative z-10">
               <div className="flex items-center justify-between border-b border-white/10 pb-4">
                 <span className="font-semibold text-white">Recent Entry</span>
                 <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded font-mono">+40 points</span>
               </div>
               <div className="space-y-3">
                 <div className="flex gap-2">
                   <span className="px-2 py-1 rounded text-[10px] bg-white/5 border border-white/10 text-white/80 uppercase tracking-widest font-semibold">RSI Divergence</span>
                   <span className="px-2 py-1 rounded text-[10px] bg-white/5 border border-white/10 text-white/80 uppercase tracking-widest font-semibold">Trending</span>
                 </div>
                 <p className="text-sm italic text-slate-300 leading-relaxed font-serif">
                   "Exited early out of fear of giving back profits. The chart still looked strong but I saw a small red candle and panicked. Price then ran another 120 points..."
                 </p>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
