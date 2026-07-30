import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  MessageSquare, Brain, Target, Shield, TrendingUp, Sparkles, Command, BookOpen, BarChart3, Search, Check, ArrowRight, Calculator
} from "lucide-react";

// --- Custom 3D Card Wrapper ---
function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 2; // -1 to 1
    const yPct = (mouseY / height - 0.5) * 2; // -1 to 1
    x.set(xPct * 8); // Max 8 deg rotation
    y.set(yPct * -8);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: y, rotateY: x, transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}
    >
      <div style={{ transform: "translateZ(30px)" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

// --- Background ---
function PremiumBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]"
      />
    </div>
  );
}

// --- Sections ---
export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Smooth scroll springs
  const smoothY = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });

  // Section 1: Hero [0 to 0.25]
  const s1Scale = useTransform(smoothY, [0, 0.2], [1, 0.95]);
  const s1Opacity = useTransform(smoothY, [0.15, 0.25], [1, 0]);
  const s1Blur = useTransform(smoothY, [0.15, 0.25], ["blur(0px)", "blur(10px)"]);

  // Section 2: Visual Learning [0.15 to 0.5]
  const s2Y = useTransform(smoothY, [0.15, 0.25], ["100vh", "0vh"]);
  const s2Scale = useTransform(smoothY, [0.25, 0.45], [1, 0.95]);
  const s2Opacity = useTransform(smoothY, [0.4, 0.5], [1, 0]);

  // Section 3: Toolkit [0.4 to 0.75]
  const s3Y = useTransform(smoothY, [0.4, 0.5], ["100vh", "0vh"]);
  const s3Scale = useTransform(smoothY, [0.5, 0.7], [1, 0.95]);
  const s3Opacity = useTransform(smoothY, [0.65, 0.75], [1, 0]);

  // Section 4: Learning [0.65 to 1.0]
  const s4Y = useTransform(smoothY, [0.65, 0.75], ["100vh", "0vh"]);

  return (
    <div ref={containerRef} className="h-[250vh] bg-background">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <PremiumBackground />

        {/* --- SECTION 1: HERO --- */}
        <motion.div style={{ scale: s1Scale, opacity: s1Opacity, filter: s1Blur }} className="absolute inset-0 flex items-center z-10">
          <HeroSection />
        </motion.div>

        {/* --- SECTION 2: VISUAL LEARNING --- */}
        <motion.div style={{ y: s2Y, scale: s2Scale, opacity: s2Opacity }} className="absolute inset-0 flex items-center bg-background/80 backdrop-blur-3xl z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] border-t border-border/50">
          <VisualSection />
        </motion.div>

        {/* --- SECTION 3: TOOLKIT --- */}
        <motion.div style={{ y: s3Y, scale: s3Scale, opacity: s3Opacity }} className="absolute inset-0 flex items-center bg-background/90 backdrop-blur-3xl z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] border-t border-border/50">
          <ToolkitSection />
        </motion.div>

        {/* --- SECTION 4: LEARNING & LOG --- */}
        <motion.div style={{ y: s4Y }} className="absolute inset-0 flex items-center bg-background z-40 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] border-t border-border/50">
          <LearningSection />
        </motion.div>
      </div>
    </div>
  );
}

// --- Hero Sequence ---
function HeroSection() {
  const [demoStep, setDemoStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        setDemoStep(0);
        await new Promise(r => setTimeout(r, 2000));
        setDemoStep(1); // Typing
        await new Promise(r => setTimeout(r, 1500));
        setDemoStep(2); // Search
        await new Promise(r => setTimeout(r, 1000));
        setDemoStep(3); // Chart
        await new Promise(r => setTimeout(r, 2000));
        setDemoStep(4); // Psychology
        await new Promise(r => setTimeout(r, 2000));
        setDemoStep(5); // Quiz
        await new Promise(r => setTimeout(r, 4000));
      }
    };
    sequence();
  }, []);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
          <Sparkles className="w-4 h-4" /> Premium AI Learning
        </div>
        <h1 className="font-display text-5xl lg:text-7xl leading-[1.1] text-foreground tracking-tight">
          Every chart tells a story.<br />
          <span className="text-primary relative">Lens AI helps you read it.</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
          Stop memorizing static patterns. Ask any question and our AI instantly assembles an interactive lesson.
        </p>
      </div>

      <TiltCard className="h-[500px]">
        <div className="w-full h-full bg-card rounded-2xl border border-border/60 shadow-2xl flex flex-col overflow-hidden relative">
          <div className="h-12 border-b border-border/50 bg-muted/30 flex items-center px-4 backdrop-blur-md gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
            </div>
            <div className="flex-1 max-w-md mx-auto bg-background border border-border/50 rounded-md h-7 flex items-center px-3 gap-2">
              <Command className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-mono">
                {demoStep >= 1 ? "Why did this Hammer fail?" : "Ask a trading question..."}
              </span>
              {demoStep === 1 && (
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1.5 h-3 bg-primary" />
              )}
            </div>
          </div>

          <div className="flex-1 p-6 flex flex-col relative overflow-hidden bg-gradient-to-b from-background to-muted/10">
            <AnimatePresence mode="popLayout">
              {demoStep === 2 && (
                 <motion.div key="s2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="m-auto flex flex-col items-center opacity-50">
                   <Brain className="w-12 h-12 text-primary animate-pulse mb-4" />
                   <p className="text-sm font-mono text-primary">Analyzing pattern context...</p>
                 </motion.div>
              )}
              {demoStep >= 3 && (
                 <motion.div key="s3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-4">
                    {/* SVG Chart */}
                    <div className="h-32 bg-background rounded-lg border border-border shadow-sm flex items-center justify-center relative overflow-hidden">
                       <div className="absolute inset-0 bg-grid-white/5 bg-[size:10px_10px]" />
                       <svg viewBox="0 0 100 50" className="w-full h-full relative z-10 px-4">
                         <motion.polyline initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} points="10,40 30,20 50,45 70,10 90,30" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                         <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} cx="50" cy="45" r="3" fill="#ef4444" />
                       </svg>
                    </div>
                    
                    {demoStep >= 4 && (
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                        <p className="text-xs text-amber-700 dark:text-amber-300"><strong>Psychology:</strong> Buyers stepped in, but the preceding downtrend was too strong. This is a false reversal.</p>
                      </motion.div>
                    )}
                    
                    {demoStep >= 5 && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-between">
                        <span className="text-sm font-medium text-primary">Knowledge Check Ready</span>
                        <Button size="sm">Start Quiz</Button>
                      </motion.div>
                    )}
                 </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}

// --- Visual Learning Section ---
function VisualSection() {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="font-display text-4xl lg:text-5xl text-foreground">Interactive Visual Explorers</h2>
        <p className="text-xl text-muted-foreground">Study exact shapes, watch lines form, and learn patterns organically instead of reading textbooks.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {[
          { title: "Candlestick Explorer", desc: "40+ single and multi-candle patterns drawn stroke-by-stroke.", href: "/candlestick-explorer", svg: <rect x="30" y="20" width="40" height="60" fill="#10b981" rx="4" /> },
          { title: "Chart Patterns", desc: "W-bottoms, M-tops, and Triangles animated with price lines.", href: "/chart-patterns", svg: <polyline points="10,80 30,30 50,70 70,20 90,50" fill="none" stroke="#6366f1" strokeWidth="6" /> },
          { title: "Indicators", desc: "MACD, RSI, and moving averages simplified visually.", href: "/indicator-explorer", svg: <circle cx="50" cy="50" r="30" fill="none" stroke="#ef4444" strokeWidth="6" strokeDasharray="10 10" /> }
        ].map((item, i) => (
          <Link key={i} href={item.href}>
            <TiltCard>
              <div className="bg-card border border-border/60 rounded-2xl p-8 h-full shadow-lg group cursor-pointer">
                <div className="h-40 bg-background rounded-xl border border-border/50 mb-6 flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-20 h-20 opacity-80 group-hover:scale-110 transition-transform duration-500">
                    {item.svg}
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-2 flex items-center gap-2">{item.title} <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </TiltCard>
          </Link>
        ))}
      </div>
    </div>
  );
}

// --- Toolkit Section ---
function ToolkitSection() {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-6">
        <h2 className="font-display text-4xl lg:text-5xl text-foreground">Trading Toolkit</h2>
        <p className="text-xl text-muted-foreground">See exactly how much STT, GST, and broker fees eat into your profits before you even place a trade.</p>
        <ul className="space-y-4 pt-4">
          {["Brokerage & SEBI Charges", "Stop Loss Sizing", "Risk/Reward Ratio Check"].map((t, i) => (
            <li key={i} className="flex items-center gap-3 text-lg font-medium">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center"><Check className="w-3 h-3" /></div>
              {t}
            </li>
          ))}
        </ul>
        <Link href="/calculator">
          <Button className="mt-8 rounded-full" size="lg">Open True Cost Calculator</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {[
          { title: "True Cost Calculator", desc: "See exactly how much you pay in taxes & fees", href: "/calculator", icon: Calculator },
          { title: "Position Sizing", desc: "Calculate exact shares based on risk", href: "/calculator-stub", icon: Target }
        ].map((item, i) => (
          <Link key={i} href={item.href}>
            <motion.div whileHover={{ x: 10 }} className="bg-card border border-border/60 rounded-xl p-6 flex items-center justify-between shadow-sm cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// --- Learning Section ---
function LearningSection() {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col items-center justify-center space-y-12">
      <div className="text-center space-y-4 max-w-2xl">
        <h2 className="font-display text-4xl lg:text-5xl text-foreground">The Complete Journey</h2>
        <p className="text-xl text-muted-foreground">From a beginner learning candlesticks to advanced daily journaling and habit building.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Link href="/paths">
          <TiltCard>
            <div className="bg-card p-10 rounded-2xl border border-border/60 text-center space-y-4 shadow-lg group cursor-pointer h-full">
              <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl flex items-center justify-center gap-2">Learning Paths <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" /></h3>
              <p className="text-muted-foreground">Structured courses with progress tracking and quizzes.</p>
            </div>
          </TiltCard>
        </Link>
        <Link href="/journal">
          <TiltCard>
            <div className="bg-card p-10 rounded-2xl border border-border/60 text-center space-y-4 shadow-lg group cursor-pointer h-full">
              <div className="w-16 h-16 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl flex items-center justify-center gap-2">Trade Log <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" /></h3>
              <p className="text-muted-foreground">Track mistakes, emotions, and daily insights.</p>
            </div>
          </TiltCard>
        </Link>
      </div>
    </div>
  );
}

