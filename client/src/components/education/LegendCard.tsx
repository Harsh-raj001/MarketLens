import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Brain, Quote, BookOpen, AlertTriangle, TrendingUp, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface LegendType {
  id: string;
  name: string;
  title: string;
  imageColor: string; // Tailwind class
  quote: string;
  philosophy: string;
  famousInvestments: string[];
  mistakesWarned: string;
  recommendedBooks: string[];
}

export function LegendCard({ legend }: { legend: LegendType }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="bg-slate-900 border-slate-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-xl group">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Portrait Placeholder */}
          <div className={`w-32 h-32 shrink-0 rounded-2xl ${legend.imageColor} flex items-center justify-center border-4 border-slate-800 shadow-inner overflow-hidden relative group-hover:scale-105 transition-transform duration-500`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span className="text-4xl font-display font-bold text-white/80 relative z-10">{legend.name.charAt(0)}</span>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-3xl font-display text-white">{legend.name}</h3>
              <p className="text-primary font-medium">{legend.title}</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 relative italic">
              <Quote className="absolute top-3 left-3 w-8 h-8 text-slate-600 opacity-20" />
              <p className="text-slate-300 text-lg relative z-10 pl-6 border-l-2 border-primary/50">"{legend.quote}"</p>
            </div>
            
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              {legend.philosophy}
            </p>

            <Button 
              variant="outline" 
              className="bg-primary/10 border-primary/20 text-primary hover:bg-primary/20"
              onClick={() => {
                // Here we would trigger the Lens AI context
                alert(`Lens AI: Let me break down ${legend.name}'s philosophy into actionable steps...`);
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" /> Explain this philosophy
            </Button>
          </div>
        </div>
      </div>

      {/* Expandable Section */}
      <div className="border-t border-slate-800 bg-slate-900/50">
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="w-full p-4 flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
        >
          {expanded ? <><ChevronUp className="w-4 h-4" /> Hide details</> : <><ChevronDown className="w-4 h-4" /> View Famous Investments & Warnings</>}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: "auto", opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-6 md:p-8 pt-0 grid md:grid-cols-2 gap-8">
                
                <div className="space-y-4">
                  <h4 className="text-white font-semibold flex items-center gap-2 border-b border-slate-800 pb-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" /> Famous Investments
                  </h4>
                  <ul className="space-y-2">
                    {legend.famousInvestments.map((inv, i) => (
                      <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mt-1.5 shrink-0" />
                        {inv}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold flex items-center gap-2 border-b border-slate-800 pb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" /> Common Mistakes Warned Against
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {legend.mistakesWarned}
                    </p>
                  </div>

                  {legend.recommendedBooks.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-white font-semibold flex items-center gap-2 border-b border-slate-800 pb-2">
                        <BookOpen className="w-4 h-4 text-blue-400" /> Recommended Books
                      </h4>
                      <ul className="space-y-2">
                        {legend.recommendedBooks.map((book, i) => (
                          <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 shrink-0" />
                            <span className="italic">{book}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
