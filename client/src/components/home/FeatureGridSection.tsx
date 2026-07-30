import { motion } from "framer-motion";
import { Brain, LineChart, BookOpen, Building2, Calculator, Target } from "lucide-react";

const features = [
  {
    title: "Adaptive AI Tutor",
    description: "Lens AI explains complex financial concepts at your exact level of understanding.",
    icon: Brain,
    colSpan: "lg:col-span-2",
    gradient: "from-purple-500/20 to-indigo-500/20",
    border: "group-hover:border-purple-500/50",
    iconColor: "text-purple-600"
  },
  {
    title: "Interactive Charts",
    description: "Hover over any candle to see the buyers vs sellers battle in real-time.",
    icon: LineChart,
    colSpan: "lg:col-span-1",
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "group-hover:border-blue-500/50",
    iconColor: "text-blue-600"
  },
  {
    title: "Structured Learning",
    description: "Follow curated roadmaps from zero to advanced trading.",
    icon: BookOpen,
    colSpan: "lg:col-span-1",
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "group-hover:border-emerald-500/50",
    iconColor: "text-emerald-600"
  },
  {
    title: "Investment Hub",
    description: "Compare PPF, Mutual Funds, ETFs, Gold, and Bonds side-by-side.",
    icon: Building2,
    colSpan: "lg:col-span-2",
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "group-hover:border-amber-500/50",
    iconColor: "text-amber-600"
  },
  {
    title: "Tax Calculator",
    description: "Calculate STT, GST, and broker fees for Indian markets.",
    icon: Calculator,
    colSpan: "lg:col-span-2",
    gradient: "from-rose-500/20 to-pink-500/20",
    border: "group-hover:border-rose-500/50",
    iconColor: "text-rose-600"
  },
  {
    title: "Market Simulator",
    description: "Learn by doing without risking real capital.",
    icon: Target,
    colSpan: "lg:col-span-1",
    gradient: "from-slate-500/20 to-slate-400/20",
    border: "group-hover:border-slate-500/50",
    iconColor: "text-slate-600"
  }
];

export function FeatureGridSection() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 mb-4"
          >
            A Complete Learning Ecosystem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto font-medium"
          >
            Everything you need to go from absolute beginner to confident investor.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className={`group relative bg-white border border-slate-200 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden ${feature.colSpan}`}
            >
              {/* Background Gradient Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
