import { Link } from "wouter";
import { useState, useEffect } from "react";
import {
  BookOpen, MessageSquare, TrendingUp, BarChart3, Search,
  Target, Brain, Shield, ArrowRight, BookMarked, Command, Sparkles, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const features = [
  { icon: MessageSquare, title: "Lens AI", description: "Ask any trading question and get educational answers grounded in verified knowledge. No signals, no advice — just clarity.", href: "/ai-tutor" },
  { icon: BookOpen, title: "Structured Lessons", description: "Progress through curated learning paths from beginner to advanced. Each lesson includes quizzes to test your understanding.", href: "/paths" },
  { icon: TrendingUp, title: "Candlestick Explorer", description: "Master 40+ candlestick patterns with interactive visual examples. Practice identification in a hands-on environment.", href: "/candlestick-explorer" },
  { icon: BarChart3, title: "Chart Pattern Explorer", description: "Study head-and-shoulders, triangles, flags, and 25+ more classical chart formations with real market data overlays.", href: "/chart-patterns" },
  { icon: Search, title: "Trading Dictionary", description: "Instantly look up any trading term with clear definitions, contextual examples, and cross-references.", href: "/dictionary" },
  { icon: Target, title: "Daily Challenge", description: "Test your knowledge every day with pattern identification, concept quizzes, and scenario-based exercises.", href: "/daily-challenge" },
];

const tools = [
  { icon: Target, label: "Trading Cost Calculator", href: "/calculator", desc: "See exactly how much STT, GST, and broker fees eat into your profits.", checks: ["SEBI Charges", "GST & STT", "Exchange Fees"] },
  { icon: Shield, label: "Position Size Calculator", href: "/calculator-stub", desc: "Never risk more than 1% again. Calculate exact shares to buy based on your stop loss.", checks: ["Risk % Input", "Account Size", "Exact Quantities"] },
  { icon: TrendingUp, label: "Risk Reward Calculator", href: "/calculator-stub", desc: "Visualize your R:R ratio and find your statistical break-even win rate.", checks: ["Visual R:R Scale", "Break-even Rate", "Profit Targets"] },
];

const topics = ["Hammer", "RSI", "Risk", "Psychology"];

export default function Home() {
  const [demoTopic, setDemoTopic] = useState<string | null>(null);
  const [demoStep, setDemoStep] = useState(0);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);

  // Demo sequence player
  useEffect(() => {
    if (!demoTopic) {
      setDemoStep(0);
      return;
    }
    setDemoStep(1); // Start analyzing
    
    const sequence = [
      setTimeout(() => setDemoStep(2), 1500), // Finding examples
      setTimeout(() => setDemoStep(3), 3000), // Generating visual
      setTimeout(() => setDemoStep(4), 4500), // Lesson Ready
    ];
    
    return () => sequence.forEach(clearTimeout);
  }, [demoTopic]);

  return (
    <div className="space-y-0 pb-16">
      {/* Interactive Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-10 pb-20 overflow-hidden bg-background">
        
        {/* Parallax Background Elements */}
        <motion.div style={{ y: y1 }} className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
        <motion.div style={{ y: y2 }} className="absolute bottom-10 -left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl -z-10" />
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full max-w-[1600px] mx-auto px-6 lg:px-12">
          
          <ScrollReveal direction="left" className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <Sparkles className="w-4 h-4" />
              Premium AI Learning
            </div>
            
            <h1 className="font-display text-5xl lg:text-6xl xl:text-[4.5rem] leading-[1.1] text-foreground tracking-tight">
              Every chart tells a story.<br />
              <span className="text-primary relative inline-block mt-2">
                Lens AI helps you read it.
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Stop memorizing static patterns. Ask any question and our AI instantly assembles an interactive lesson with real market data, psychology, and historical replays.
            </p>
            
            <div className="pt-2 space-y-4">
              <p className="text-sm font-semibold text-foreground uppercase tracking-widest">What would you like to learn today?</p>
              <div className="flex flex-wrap gap-3">
                {topics.map(topic => (
                  <button 
                    key={topic}
                    onClick={() => setDemoTopic(topic)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${demoTopic === topic ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30 scale-105" : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-primary/5"}`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Dynamic Hero Demo Workspace */}
          <ScrollReveal direction="right" className="relative h-[500px]">
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-card border border-border/60 flex flex-col z-10">
               {/* Window Header */}
               <div className="h-12 border-b border-border/50 bg-muted/30 flex items-center px-4 gap-2 backdrop-blur-md">
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-border" />
                   <div className="w-3 h-3 rounded-full bg-border" />
                   <div className="w-3 h-3 rounded-full bg-border" />
                 </div>
                 <div className="ml-4 flex-1">
                   <div className="mx-auto w-3/4 bg-background border border-border/50 rounded-md h-7 flex items-center px-3 gap-2">
                     <Command className="w-3 h-3 text-muted-foreground" />
                     <span className="text-xs text-muted-foreground font-mono">
                       {demoTopic ? `Explain ${demoTopic} in trading` : "Select a topic to begin..."}
                     </span>
                     {!demoTopic && (
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
                   {!demoTopic && (
                     <motion.div
                       key="empty"
                       initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                       className="flex flex-col items-center justify-center text-muted-foreground mt-20 h-full opacity-50"
                     >
                       <Brain className="w-16 h-16 mb-4 opacity-20" />
                       <p className="text-sm font-medium">Waiting for your question...</p>
                     </motion.div>
                   )}
                   
                   {demoTopic && demoStep > 0 && demoStep < 4 && (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
                        className="flex flex-col items-center justify-center text-muted-foreground mt-24 space-y-8 w-full max-w-sm mx-auto"
                      >
                        <div className="relative w-16 h-16">
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute inset-0 border-4 border-primary/20 border-t-primary rounded-full" />
                          <Brain className="absolute inset-0 m-auto w-6 h-6 text-primary" />
                        </div>
                        
                        <div className="w-full space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-mono">
                              <span className={demoStep >= 1 ? "text-primary" : "text-muted-foreground"}>Analyzing psychology...</span>
                              {demoStep >= 1 && <span className="text-primary">Done</span>}
                            </div>
                            <div className="h-1.5 w-full bg-muted overflow-hidden rounded-full"><motion.div initial={{ width: "0%" }} animate={{ width: demoStep >= 1 ? "100%" : "0%" }} className="h-full bg-primary" transition={{ duration: 0.5 }} /></div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-mono">
                              <span className={demoStep >= 2 ? "text-primary" : "text-muted-foreground"}>Finding historical examples...</span>
                              {demoStep >= 2 && <span className="text-primary">Done</span>}
                            </div>
                            <div className="h-1.5 w-full bg-muted overflow-hidden rounded-full"><motion.div initial={{ width: "0%" }} animate={{ width: demoStep >= 2 ? "100%" : "0%" }} className="h-full bg-primary" transition={{ duration: 0.5 }} /></div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-mono">
                              <span className={demoStep >= 3 ? "text-primary" : "text-muted-foreground"}>Generating visuals...</span>
                              {demoStep >= 3 && <span className="text-primary">Done</span>}
                            </div>
                            <div className="h-1.5 w-full bg-muted overflow-hidden rounded-full"><motion.div initial={{ width: "0%" }} animate={{ width: demoStep >= 3 ? "100%" : "0%" }} className="h-full bg-primary" transition={{ duration: 0.5 }} /></div>
                          </div>
                        </div>
                      </motion.div>
                   )}

                   {demoTopic && demoStep === 4 && (
                     <motion.div
                       key="lesson"
                       initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, staggerChildren: 0.2 }}
                       className="w-full space-y-6 pb-4"
                     >
                       <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-2xl text-foreground">
                         {demoTopic} Explained
                       </motion.h3>
                       
                       {/* Animated SVG Visual */}
                       <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-background border border-border rounded-xl p-6 shadow-sm flex flex-col items-center relative overflow-hidden">
                         <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />
                         <svg width="120" height="120" viewBox="0 0 100 100" className="relative z-10">
                            <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: "easeOut" }} x1="50" y1="20" x2="50" y2="90" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
                            <motion.rect initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.5, delay: 0.8 }} style={{ originY: 0 }} x="35" y="25" width="30" height="20" fill="#10b981" rx="2" stroke="#047857" strokeWidth="2" />
                         </svg>
                         <p className="text-xs text-muted-foreground mt-4 font-mono uppercase tracking-widest">Live rendering</p>
                       </motion.div>

                       {/* Psychology Box */}
                       <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2 }} className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                         <div className="flex items-center gap-2 mb-2">
                           <Brain className="w-4 h-4 text-amber-600" />
                           <span className="text-sm font-semibold text-amber-900 dark:text-amber-500">Market Psychology</span>
                         </div>
                         <p className="text-xs text-amber-800/80 dark:text-amber-200/80 leading-relaxed">
                           Bears pushed the price down significantly, but bulls stepped in and completely overpowered them before the close, creating the long lower wick.
                         </p>
                       </motion.div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Grid (bg-muted) */}
      <section className="bg-muted/30 py-24 border-y border-border/50">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 space-y-12">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-tight">Everything you need to build market literacy</h2>
            <p className="text-muted-foreground text-lg">A complete ecosystem designed to take you from basic concepts to advanced pattern recognition.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <Link href={f.href}>
                  <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                    <Card className="h-full border-border/60 bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer group">
                      <CardContent className="p-8 space-y-5">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                          <f.icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-foreground text-xl tracking-tight">{f.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{f.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Toolkit */}
      <section className="py-24 bg-background">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 space-y-12">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-tight">Educational Calculators</h2>
            <p className="text-muted-foreground text-lg">Understand exactly what you risk and what you pay, with deep educational breakdowns.</p>
          </ScrollReveal>
          <div className="grid lg:grid-cols-3 gap-6">
            {tools.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="up">
                <Link href={t.href}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card className="h-full border-border/50 bg-secondary/10 hover:bg-secondary/30 hover:border-primary/30 transition-all duration-300 cursor-pointer group">
                      <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-foreground group-hover:border-primary/50 group-hover:text-primary transition-all duration-300 shadow-sm">
                            <t.icon className="w-6 h-6" />
                          </div>
                          <h3 className="font-semibold text-foreground text-xl">{t.label}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                        <div className="pt-4 border-t border-border/50 space-y-2">
                          {t.checks.map((chk, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm font-medium text-foreground">
                              <Check className="w-4 h-4 text-emerald-500" /> {chk}
                            </div>
                          ))}
                        </div>
                        <div className="pt-2 flex items-center text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300">
                          Open Calculator <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
