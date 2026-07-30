import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Brain, LineChart, Building2, Calculator, Check, ArrowRight } from "lucide-react";
import { DoodleArrow, DoodleStar, DoodleCandlestick } from "../ui/Doodles";
import { LensyLogo } from "../ui/LensyLogo";

interface ShowcaseBlockProps {
  title: string;
  badge: string;
  icon: React.ElementType;
  description: string;
  bullets: string[];
  ctaText: string;
  ctaLink: string;
  reverse?: boolean;
  mockUI: React.ReactNode;
  doodle?: React.ReactNode;
}

function ShowcaseBlock({ title, badge, icon: Icon, description, bullets, ctaText, ctaLink, reverse, mockUI, doodle }: ShowcaseBlockProps) {
  return (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center py-24 relative`}>
      {doodle}
      {/* Content */}
      <div className="flex-1 space-y-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-bold border border-teal-100/50 shadow-sm"
        >
          <Icon className="w-4 h-4" /> {badge}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-[1.1]">{title}</h3>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">{description}</p>
        </motion.div>

        <motion.ul 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="text-lg text-slate-700 font-medium">{bullet}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3 }}
        >
          {ctaLink === 'lensy' ? (
            <Button size="lg" onClick={() => window.dispatchEvent(new CustomEvent('open-lens-ai', { detail: { prompt: "Hi Lensy!" } }))} className="rounded-full h-14 px-8 text-lg group bg-slate-900 hover:bg-teal-600 transition-colors shadow-md text-white">
              {ctaText}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          ) : (
            <Link href={ctaLink}>
              <Button size="lg" className="rounded-full h-14 px-8 text-lg group bg-slate-900 hover:bg-teal-600 transition-colors shadow-md text-white">
                {ctaText}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          )}
        </motion.div>
      </div>

      {/* Mock UI Visual */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex-1 w-full relative z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-50 to-emerald-50 rounded-[2rem] -rotate-3 scale-105 opacity-50" />
        <div className="relative bg-white/80 backdrop-blur-xl border border-white/80 rounded-[2rem] shadow-[0_20px_50px_rgba(15,23,42,0.05)] overflow-hidden min-h-[300px] md:min-h-[400px]">
          {mockUI}
        </div>
      </motion.div>
    </div>
  );
}

export function ShowcaseSection() {
  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <ShowcaseBlock 
          title="Ask anything. Learn everything."
          badge="Lens AI"
          icon={Brain}
          description="A financial tutor that adapts to your knowledge level. From explaining basic terms to diagnosing failed chart patterns, Lensy is always ready."
          bullets={[
            "Adapts explanations based on your experience",
            "Provides interactive quizzes to test knowledge",
            "Explains the psychology behind market moves"
          ]}
          ctaText="Meet Lensy"
          ctaLink="lensy"
          doodle={
            <div className="absolute top-10 left-1/2 hidden lg:block opacity-70">
              <DoodleStar className="w-10 h-10 text-amber-400" />
            </div>
          }
          mockUI={
            <div className="p-8 h-full flex flex-col bg-slate-50/50">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm self-end max-w-[80%] mb-6">
                <p className="text-base font-medium text-slate-800">Why did this Hammer pattern fail?</p>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-white border border-teal-100 rounded-2xl p-6 shadow-sm self-start max-w-[90%] relative"
              >
                <div className="absolute -top-4 -left-4 bg-teal-500 rounded-full p-2 shadow-lg">
                  <LensyLogo className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-3 mt-1">
                  <span className="font-bold text-slate-900">Lensy</span>
                </div>
                <p className="text-base font-medium text-slate-600 leading-relaxed mb-5">
                  Good question! Buyers stepped in, but the preceding downtrend was too strong. A Hammer only works if there is clear support nearby. Let's look at the volume...
                </p>
                <div className="bg-teal-50 rounded-xl p-4 border border-teal-100/50 text-sm font-bold text-teal-700 flex justify-between items-center cursor-pointer hover:bg-teal-100 transition-colors">
                  Check Volume Analysis <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            </div>
          }
        />

        <ShowcaseBlock 
          reverse
          title="See patterns come to life."
          badge="Chart Explorer"
          icon={LineChart}
          description="Stop memorizing static textbook images. Watch how candlesticks form stroke-by-stroke and understand the battle between buyers and sellers."
          bullets={[
            "40+ interactive single and multi-candle patterns",
            "Scrub through formations step-by-step",
            "Visual breakdown of support & resistance"
          ]}
          ctaText="Explore Charts"
          ctaLink="/candlestick-explorer"
          doodle={
            <div className="absolute -top-10 right-1/4 hidden lg:block opacity-60">
              <DoodleCandlestick className="w-16 h-16 text-emerald-400 rotate-12" />
            </div>
          }
          mockUI={
            <div className="p-8 h-full flex items-center justify-center bg-slate-900 relative">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
              <svg viewBox="0 0 200 150" className="w-full max-w-sm relative z-10">
                {/* W Pattern */}
                <motion.path 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  d="M20,50 L60,120 L100,70 L140,120 L180,40" 
                  fill="none" 
                  stroke="#14B8A6" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                {/* Neckline */}
                <motion.line
                  initial={{ opacity: 0, x1: 50, x2: 50 }}
                  whileInView={{ opacity: 1, x1: 20, x2: 180 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2, duration: 0.5 }}
                  y1="70" y2="70" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 6"
                />
                <motion.text
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.5 }}
                  x="100" y="60" fill="#cbd5e1" fontSize="12" fontWeight="bold" textAnchor="middle" className="font-sans"
                >
                  Neckline Breakout
                </motion.text>
              </svg>
            </div>
          }
        />

        <ShowcaseBlock 
          title="Learn where your money goes."
          badge="Investment Hub"
          icon={Building2}
          description="Explore every major asset class. Understand the risks, calculate long-term returns, and learn how to build a diversified portfolio securely."
          bullets={[
            "Compare Stocks, Mutual Funds, ETFs, Gold & more",
            "Calculate SIP vs Lumpsum returns",
            "Understand exactly how inflation eats your wealth"
          ]}
          ctaText="Enter the Hub"
          ctaLink="/investment-hub"
          doodle={
            <div className="absolute bottom-10 left-10 hidden lg:block opacity-60">
              <DoodleArrow className="w-20 h-20 text-teal-400 rotate-90" />
            </div>
          }
          mockUI={
            <div className="p-8 h-full bg-slate-50 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-2 hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-2"><Building2 className="w-6 h-6" /></div>
                  <span className="font-bold text-slate-900">Mutual Funds</span>
                  <span className="text-sm text-slate-500 font-medium">12-15% CAGR</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-2 hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-2"><Building2 className="w-6 h-6" /></div>
                  <span className="font-bold text-slate-900">Physical Gold</span>
                  <span className="text-sm text-slate-500 font-medium">8-9% CAGR</span>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex-1 relative overflow-hidden flex flex-col justify-end">
                <div className="absolute top-4 left-5 text-sm font-bold text-slate-900">Growth Simulator</div>
                <svg viewBox="0 0 100 40" className="w-full mt-8">
                  <path d="M0,40 L0,30 Q25,25 50,15 T100,5 L100,40 Z" fill="#14B8A6" fillOpacity="0.1" />
                  <path d="M0,30 Q25,25 50,15 T100,5" fill="none" stroke="#14B8A6" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          }
        />

      </div>
    </section>
  );
}
