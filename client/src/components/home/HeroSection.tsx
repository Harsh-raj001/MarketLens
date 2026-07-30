import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, PlayCircle } from "lucide-react";
import { DoodleUnderline, DoodleStar, DoodleArrow } from "../ui/Doodles";
import { LensyLogo } from "../ui/LensyLogo";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-800 text-sm font-semibold mb-12 border border-slate-200 shadow-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Meet MarketLens
        </motion.div>
        
        <div className="relative inline-block">
          {/* Floating Doodles */}
          <div className="absolute -top-12 -left-16 hidden md:block">
            <DoodleStar className="w-12 h-12 text-amber-400" />
          </div>
          <div className="absolute -bottom-10 -right-20 hidden md:block z-0">
            <DoodleArrow className="w-16 h-16 text-teal-400 -scale-x-100 rotate-45" />
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="relative z-10 font-serif text-6xl md:text-8xl lg:text-[7rem] tracking-tight text-foreground font-extrabold mb-8 leading-[1.05]"
          >
            Don't just trade. <br />
            <span className="relative inline-block text-teal-600">
              Understand.
              <div className="absolute -bottom-6 left-0 w-full pointer-events-none">
                <DoodleUnderline className="w-full text-teal-400 opacity-50" />
              </div>
            </span>
          </motion.h1>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium mb-12 leading-relaxed"
        >
          The interactive learning studio that helps you build true conviction. 
          Master the markets with your own AI companion.
        </motion.p>


      </div>

      {/* Floating Interactive Previews (Miniatures) */}
      <div className="absolute w-full h-full inset-0 pointer-events-none hidden lg:block overflow-hidden">
        {/* Preview 1: Lensy AI Chat */}
        <motion.div 
          initial={{ opacity: 0, x: -50, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-[20%] left-[5%]"
        >
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/50 w-64 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                <LensyLogo className="w-5 h-5" />
              </div>
              <div className="bg-teal-50 p-3 rounded-xl rounded-tl-sm text-sm text-teal-900 font-medium border border-teal-100/50 leading-relaxed shadow-sm">
                A Doji pattern suggests indecision between buyers and sellers.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Preview 2: Live Chart */}
        <motion.div 
          initial={{ opacity: 0, x: 50, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute top-[30%] right-[5%]"
        >
          <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-slate-200/50 w-56 flex flex-col gap-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Simulated Uptrend</div>
            <svg viewBox="0 0 100 50" className="w-full">
              <path d="M0 40 L20 30 L40 35 L60 15 L80 20 L100 5" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="100" cy="5" r="4" fill="#22C55E" className="animate-pulse" />
            </svg>
          </div>
        </motion.div>

        {/* Preview 3: Calculator */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute bottom-[15%] left-[12%]"
        >
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/50 w-48 font-mono text-sm">
            <div className="flex justify-between text-slate-500 mb-1"><span>Gross</span><span>₹500.00</span></div>
            <div className="flex justify-between text-rose-500 mb-2 border-b border-slate-100 pb-2"><span>STT</span><span>-₹15.00</span></div>
            <div className="flex justify-between font-bold text-emerald-600"><span>Net</span><span>₹485.00</span></div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
