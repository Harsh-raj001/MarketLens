import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Brain, Calculator, Target, History, TrendingUp } from "lucide-react";

const steps = [
  { title: "Learn the Basics", desc: "Start with visual, interactive lessons.", icon: BookOpen },
  { title: "Ask Lens AI", desc: "Clarify doubts instantly.", icon: Brain },
  { title: "Use Calculators", desc: "Understand exactly what you're paying.", icon: Calculator },
  { title: "Simulate Trades", desc: "Practice without risking capital.", icon: Target },
  { title: "Journal Mistakes", desc: "Log your emotions and errors.", icon: History },
  { title: "Become Confident", desc: "Build real conviction in your strategies.", icon: TrendingUp }
];

export function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 mb-16"
        >
          Your Journey to Mastery
        </motion.h2>

        <div className="relative">
          {/* Background Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-slate-100 rounded-full" />
          
          {/* Animated Fill Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-blue-600 rounded-full origin-top"
          />

          <div className="space-y-24 relative z-10 py-12">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`flex items-center justify-between w-full ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                  
                  {/* Content Box */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`w-5/12 ${isEven ? 'text-right' : 'text-left'}`}
                  >
                    <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-500 font-medium">{step.desc}</p>
                    </div>
                  </motion.div>

                  {/* Center Node */}
                  <div className="w-2/12 flex justify-center relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="w-12 h-12 rounded-full bg-white border-4 border-blue-600 flex items-center justify-center shadow-lg z-10"
                    >
                      <step.icon className="w-5 h-5 text-blue-600" />
                    </motion.div>
                  </div>

                  {/* Empty space for alignment */}
                  <div className="w-5/12" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
