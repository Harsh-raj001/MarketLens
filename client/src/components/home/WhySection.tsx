import { motion } from "framer-motion";
import { XCircle, CheckCircle2 } from "lucide-react";

const oldWay = [
  "Watch random YouTube videos",
  "Read confusing finance blogs",
  "Memorize static chart patterns",
  "Guess where to invest",
  "Get surprised by hidden taxes"
];

const newWay = [
  "Learn visually with interactive charts",
  "Ask Lens AI any trading question",
  "Understand the psychology behind patterns",
  "Compare investments in the Hub",
  "Calculate exact taxes before trading"
];

export function WhySection() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 mb-4"
          >
            Why MarketLens?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto font-medium"
          >
            Stop wasting time on scattered tutorials. Start building real conviction.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* The Old Way */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200" />
            <h3 className="text-2xl font-bold text-slate-400 mb-8 font-display">The Old Way</h3>
            <div className="space-y-6">
              {oldWay.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <XCircle className="w-6 h-6 text-slate-300 shrink-0" />
                  <span className="text-lg text-slate-500 font-medium line-through decoration-slate-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* MarketLens Way */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-xl relative overflow-hidden text-white">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-emerald-500" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
            <h3 className="text-3xl font-bold text-white mb-8 font-display">MarketLens</h3>
            <div className="space-y-6 relative z-10">
              {newWay.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="flex items-center gap-4"
                >
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <span className="text-lg font-semibold">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
