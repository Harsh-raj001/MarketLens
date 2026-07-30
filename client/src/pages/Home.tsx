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
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const features = [
  {
    icon: MessageSquare,
    title: "Lens AI",
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

const tools = [
  { icon: Target, label: "Trading Cost Calculator", href: "/calculator", desc: "Calculate exact fees & taxes" },
  { icon: Shield, label: "Position Size Calculator", href: "/calculator-stub", desc: "Calculate shares based on risk" },
  { icon: TrendingUp, label: "Risk Reward Calculator", href: "/calculator-stub", desc: "R:R ratio & break-even" },
  { icon: BarChart3, label: "Compounding Calculator", href: "/calculator-stub", desc: "Long-term portfolio growth" },
  { icon: BookMarked, label: "Pip Calculator", href: "/calculator-stub", desc: "Calculate pip value" },
  { icon: Search, label: "Margin Calculator", href: "/calculator-stub", desc: "Calculate required margin" },
];

export default function Home() {
  const [demoStep, setDemoStep] = useState(0);

  // Auto-play the hero demo (0 to 5)
  useEffect(() => {
    const timer = setInterval(() => {
      setDemoStep((prev) => (prev >= 5 ? 0 : prev + 1));
    }, 2500); // Faster sequence so they don't wait too long
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-24 lg:space-y-32 pb-16">
      {/* Interactive Hero Section */}
      <section className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">
        <ScrollReveal direction="left" className="space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            AI-Powered Trading Education
          </div>
          <h1 className="font-display text-5xl lg:text-6xl xl:text-[4.5rem] leading-[1.1] text-foreground tracking-tight">
            Learn Markets.<br />
            <span className="text-primary relative inline-block mt-2">
              Build Confidence.
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
                Try Lens AI <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground px-4 py-2 bg-muted/50 rounded-xl border border-border/50">
              Press <kbd className="font-sans px-1.5 py-0.5 bg-background rounded border border-border shadow-sm text-xs">⌘</kbd> <kbd className="font-sans px-1.5 py-0.5 bg-background rounded border border-border shadow-sm text-xs">K</kbd> anywhere
            </div>
          </div>
        </ScrollReveal>

        {/* Dynamic Hero Demo Workspace */}
        <ScrollReveal direction="right" className="relative">
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
                     {demoStep === 0 ? "Type a question..." : "Why did this Hammer fail?"}
                   </span>
                   {demoStep === 0 && (
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
             <div className="flex-1 p-6 relative overflow-hidden bg-gradient-to-b from-background to-muted/10 flex flex-col items-center justify-start overflow-y-auto no-scrollbar">
               <AnimatePresence mode="wait">
                 {demoStep === 0 && (
                   <motion.div
                     key="waiting"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     className="flex flex-col items-center justify-center text-muted-foreground mt-20"
                   >
                     <Brain className="w-12 h-12 mb-4 opacity-20 animate-pulse" />
                     <p className="text-sm">Listening...</p>
                   </motion.div>
                 )}
                 {demoStep > 0 && demoStep < 5 && (
                    <motion.div
                      key={`loading-${demoStep}`}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col items-center justify-center text-muted-foreground mt-20 space-y-6"
                    >
                      <Brain className="w-12 h-12 text-primary animate-pulse" />
                      <div className="flex flex-col items-center gap-2">
                        {demoStep >= 1 && <span className="text-sm font-mono text-primary">Thinking...</span>}
                        {demoStep >= 2 && <span className="text-sm font-mono">Finding lesson...</span>}
                        {demoStep >= 3 && <span className="text-sm font-mono">Loading historical example...</span>}
                        {demoStep >= 4 && <span className="text-sm font-mono">Building visualization...</span>}
                      </div>
                    </motion.div>
                  )}
                 {demoStep === 5 && (
                   <motion.div
                     key="lesson"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, staggerChildren: 0.2 }}
                     className="w-full space-y-4 pb-4"
                   >
                     <motion.h3 
                       initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                       className="font-display text-xl text-foreground"
                     >
                       Hammer Candlestick
                     </motion.h3>
                     
                     {/* SVG Visual */}
                     <motion.div 
                       initial={{ scale: 0.95, opacity: 0 }} 
                       animate={{ scale: 1, opacity: 1 }} 
                       className="bg-background border border-border rounded-xl p-4 shadow-sm flex flex-col items-center"
                     >
                       <svg width="100" height="100" viewBox="0 0 100 100">
                          <line x1="50" y1="20" x2="50" y2="90" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
                          <rect x="35" y="25" width="30" height="20" fill="#10b981" rx="2" stroke="#047857" strokeWidth="2" />
                       </svg>
                       <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full mt-2 font-semibold">Hover to highlight</span>
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
                         Bears pushed the price down significantly, but bulls stepped in and completely overpowered them before the close, creating the long lower wick.
                       </p>
                     </motion.div>

                     {/* Historical Box Stub */}
                     <motion.div 
                       initial={{ y: 10, opacity: 0 }} 
                       animate={{ y: 0, opacity: 1 }} 
                       className="bg-card border border-border/60 rounded-lg p-3 flex gap-3 items-center shadow-sm"
                     >
                       <div className="w-10 h-10 rounded bg-emerald-500/10 flex items-center justify-center shrink-0">
                         <TrendingUp className="w-5 h-5 text-emerald-500" />
                       </div>
                       <div>
                         <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">NIFTY • 12 Feb 2025</p>
                         <p className="text-xs font-semibold">Price rallied +4% after Hammer</p>
                       </div>
                     </motion.div>
                     
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </div>
          {/* Decorative glow */}
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
          <div className="absolute -top-8 -left-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -z-10" />
        </ScrollReveal>
      </section>

      {/* Features Grid */}
      <section className="space-y-10">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-tight">Everything you need to build market literacy</h2>
          <p className="text-muted-foreground text-lg">A complete ecosystem designed to take you from basic concepts to advanced pattern recognition.</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Link href={f.href}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Card className="h-full border-border/60 bg-card hover:border-primary/30 transition-all duration-300 card-hover cursor-pointer group">
                    <CardContent className="p-8 space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                        <f.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-foreground text-lg">{f.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{f.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </ScrollReveal>
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

      {/* Trading Toolkit */}
      <section className="space-y-10">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-tight">Trading Toolkit</h2>
          <p className="text-muted-foreground text-lg">Calculate exactly what you risk and what you pay.</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {tools.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.05} direction="up">
              <Link href={t.href}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card className="h-full border-border/50 bg-secondary/20 hover:bg-secondary/40 hover:border-primary/30 transition-all duration-300 card-hover cursor-pointer group text-center py-6">
                    <CardContent className="p-0 space-y-3 flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <t.icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm">{t.label}</h3>
                      <p className="text-[10px] text-muted-foreground leading-tight px-2">{t.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
