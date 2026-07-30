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
  quotes: string[];
  philosophy: string;
  famousInvestments: string[];
  mistakesWarned: string;
  recommendedBooks: string[];
}

export function LegendCard({ legend }: { legend: LegendType }) {
  const [expanded, setExpanded] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Rotate quotes every 8 seconds
  useState(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % legend.quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  });

  return (
    <Card className="bg-card border-border/60 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-xl group">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Portrait Placeholder */}
          <div className={`w-32 h-32 shrink-0 rounded-2xl ${legend.imageColor} flex items-center justify-center border border-border/50 shadow-inner overflow-hidden relative group-hover:scale-105 transition-transform duration-500`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span className="text-4xl font-display font-bold text-white relative z-10">{legend.name.charAt(0)}</span>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-3xl font-display text-foreground">{legend.name}</h3>
              <p className="text-primary font-medium">{legend.title}</p>
            </div>

            <div className="bg-primary/5 border border-primary/10 rounded-xl p-5 relative italic h-[100px] flex items-center">
              <Quote className="absolute top-3 left-3 w-8 h-8 text-primary/10" />
              <AnimatePresence mode="wait">
                <motion.p 
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-foreground text-lg relative z-10 pl-6 border-l-2 border-primary/50"
                >
                  "{legend.quotes[quoteIndex]}"
                </motion.p>
              </AnimatePresence>
            </div>
            
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {legend.philosophy}
            </p>

            <Button 
              variant="outline" 
              className="bg-primary/10 border-primary/20 text-primary hover:bg-primary/20"
              onClick={() => {
                const event = new CustomEvent('open-lens-ai', { 
                  detail: { prompt: `Explain ${legend.name}'s philosophy with examples: ${legend.philosophy}` }
                });
                window.dispatchEvent(event);
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" /> Explain this philosophy
            </Button>
          </div>
        </div>
      </div>

      {/* Expandable Section */}
      <div className="border-t border-border/50 bg-muted/30">
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="w-full p-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
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
                  <h4 className="text-foreground font-semibold flex items-center gap-2 border-b border-border/50 pb-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" /> Famous Investments
                  </h4>
                  <ul className="space-y-2">
                    {legend.famousInvestments.map((inv, i) => (
                      <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mt-1.5 shrink-0" />
                        {inv}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-foreground font-semibold flex items-center gap-2 border-b border-border/50 pb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" /> Common Mistakes Warned Against
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {legend.mistakesWarned}
                    </p>
                  </div>

                  {legend.recommendedBooks.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-foreground font-semibold flex items-center gap-2 border-b border-border/50 pb-2">
                        <BookOpen className="w-4 h-4 text-blue-500" /> Recommended Books
                      </h4>
                      <ul className="space-y-2">
                        {legend.recommendedBooks.map((book, i) => (
                          <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
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
