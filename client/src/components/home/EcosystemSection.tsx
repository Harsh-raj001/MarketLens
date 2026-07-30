import { motion } from "framer-motion";
import { Brain, LineChart, Building2, Calculator, Target, BookOpen, Trophy } from "lucide-react";
import { LensyLogo } from "../ui/LensyLogo";
import { useLocation } from "wouter";

export function EcosystemSection() {
  const [, setLocation] = useLocation();

  const handleNodeClick = (href: string) => {
    if (href === 'lensy') {
      window.dispatchEvent(new CustomEvent('open-lens-ai', { detail: { prompt: "Hi Lensy!" } }));
    } else {
      setLocation(href);
    }
  };

  const nodes = [
    { icon: Brain, label: "Lensy AI", x: "15%", y: "20%", delay: 0.2, href: "lensy" },
    { icon: Building2, label: "Hub", x: "85%", y: "15%", delay: 0.3, href: "/investment-hub" },
    { icon: Calculator, label: "Taxes", x: "88%", y: "50%", delay: 0.4, href: "/calculator" },
    { icon: Target, label: "Simulator", x: "78%", y: "85%", delay: 0.5, href: "/simulator" },
    { icon: BookOpen, label: "Library", x: "50%", y: "90%", delay: 0.6, href: "/library" },
    { icon: Trophy, label: "Legends", x: "22%", y: "80%", delay: 0.7, href: "/legends" },
    { icon: LineChart, label: "Explorer", x: "10%", y: "50%", delay: 0.8, href: "/candlestick-explorer" },
  ];

  return (
    <section className="py-32 bg-[#FDFCF8] overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-7xl font-extrabold text-slate-900 mb-6"
          >
            The Learning Galaxy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto font-medium"
          >
            Everything connects. Learn, practice, and track in one beautifully unified space.
          </motion.p>
        </div>

        <div className="relative w-full h-[600px] mx-auto mt-12 hidden md:block">
          
          {/* Hand-drawn Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-40">
            {nodes.map((node, i) => (
              <motion.line 
                key={i}
                x1="50%" y1="50%" 
                x2={node.x} y2={node.y}
                stroke="#14B8A6" 
                strokeWidth="4"
                strokeDasharray="12 12"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: node.delay }}
              />
            ))}
          </svg>

          <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            onClick={() => handleNodeClick('lensy')}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-teal-500 rounded-[3rem] flex flex-col items-center justify-center text-white shadow-[0_20px_50px_rgba(20,184,166,0.3)] z-20 border-[6px] border-white cursor-pointer hover:scale-105 transition-transform"
          >
            <LensyLogo className="w-16 h-16 text-white mb-2" animated />
            <span className="font-serif font-bold text-2xl tracking-wide">MarketLens</span>
          </motion.div>

          {/* Orbiting Nodes */}
          {nodes.map((node, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: node.delay, type: "spring", stiffness: 100 }}
              style={{ top: node.y, left: node.x }}
              onClick={() => handleNodeClick(node.href)}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-white border-2 border-slate-100 rounded-[2rem] flex flex-col items-center justify-center gap-3 text-slate-700 shadow-xl z-10 hover:-translate-y-2 hover:shadow-2xl hover:border-teal-200 transition-all cursor-pointer"
            >
              <div className="bg-teal-50/50 p-3 rounded-xl text-teal-600">
                <node.icon className="w-7 h-7" />
              </div>
              <span className="text-sm font-bold">{node.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Mobile View (Grid Fallback) */}
        <div className="md:hidden mt-8 grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => handleNodeClick('lensy')}
            className="col-span-2 bg-teal-500 rounded-[2rem] p-6 flex items-center gap-4 text-white shadow-lg cursor-pointer"
          >
            <LensyLogo className="w-12 h-12 text-white shrink-0" animated />
            <div>
              <div className="font-serif font-bold text-xl">MarketLens</div>
              <div className="text-teal-100 text-sm">Your AI Companion</div>
            </div>
          </motion.div>
          
          {nodes.filter(n => n.href !== 'lensy').map((node, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              onClick={() => handleNodeClick(node.href)}
              className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-slate-700 shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="bg-teal-50/50 p-2.5 rounded-xl text-teal-600">
                <node.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-center">{node.label}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
