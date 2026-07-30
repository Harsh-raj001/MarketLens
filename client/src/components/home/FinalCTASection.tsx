import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { DoodleStar, DoodleUnderline, DoodleArrow, DoodleCircle } from "../ui/Doodles";
import { LensyLogo } from "../ui/LensyLogo";

export function FinalCTASection() {
  const handleLaunchLensy = () => {
    window.dispatchEvent(new CustomEvent('open-lens-ai', { detail: { prompt: "Hi Lensy, I'm ready to learn!" } }));
  };

  return (
    <section className="py-24 md:py-40 bg-background relative overflow-hidden flex justify-center items-center">
      {/* Playful Doodle Canvas Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 md:left-40 opacity-70">
          <DoodleStar className="w-16 h-16 text-amber-400 rotate-12" />
        </div>
        <div className="absolute bottom-20 left-20 md:left-60 opacity-60">
          <DoodleCircle className="w-24 h-24 text-rose-400 -rotate-12" />
        </div>
        <div className="absolute top-20 right-10 md:right-40 opacity-70">
          <DoodleArrow className="w-20 h-20 text-teal-400 rotate-45" />
        </div>
        <div className="absolute bottom-10 right-20 md:right-60 opacity-50">
          <DoodleStar className="w-12 h-12 text-emerald-400 -rotate-12" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="space-y-12"
        >
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
            Markets don't reward people who memorize.
            <br />
            <span className="relative inline-block mt-4">
              <span className="text-teal-600 relative z-10">They reward people who understand.</span>
              <div className="absolute -bottom-6 left-0 w-full pointer-events-none">
                <DoodleUnderline className="w-full text-teal-400 opacity-60" />
              </div>
            </span>
          </h2>
          
          <p className="text-2xl text-slate-500 font-medium font-sans">
            Start building conviction today.
          </p>

          <div className="flex justify-center mt-12">
            <Button 
              size="lg" 
              onClick={handleLaunchLensy}
              className="group relative h-16 px-10 text-xl font-bold rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-all shadow-[0_10px_40px_rgba(20,184,166,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(20,184,166,0.4)] flex items-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <LensyLogo className="w-8 h-8 mr-3 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">Launch Lensy</span>
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform relative z-10" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
