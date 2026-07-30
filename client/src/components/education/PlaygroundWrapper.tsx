import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Brain, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface PlaygroundOption {
  id: string;
  label?: string;
  svgContent: React.ReactNode;
  isCorrect: boolean;
}

interface PlaygroundWrapperProps {
  title: string;
  question: string;
  options: PlaygroundOption[];
  explanation: string;
}

export function PlaygroundWrapper({ title, question, options, explanation }: PlaygroundWrapperProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (id: string) => {
    if (showExplanation) return;
    setSelectedId(id);
    setShowExplanation(true);
  };

  const isCorrect = selectedId && options.find(o => o.id === selectedId)?.isCorrect;

  return (
    <Card className="overflow-hidden border border-border/60 shadow-lg bg-card mt-8">
      <div className="bg-muted/50 px-6 py-4 border-b border-border/50 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <Brain className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">Learning Playground</h3>
          <p className="text-muted-foreground text-sm">{title}</p>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        <h4 className="text-2xl font-display text-foreground text-center">{question}</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((opt) => (
            <motion.div
              key={opt.id}
              whileHover={!showExplanation ? { scale: 1.02 } : {}}
              whileTap={!showExplanation ? { scale: 0.98 } : {}}
            >
              <Card
                onClick={() => handleSelect(opt.id)}
                className={`
                  p-6 cursor-pointer flex flex-col items-center justify-center space-y-4 h-[200px] border-2 transition-all
                  ${!showExplanation ? 'hover:border-primary hover:shadow-md border-border/40' : ''}
                  ${showExplanation && opt.isCorrect ? 'border-emerald-500 bg-emerald-500/5' : ''}
                  ${showExplanation && selectedId === opt.id && !opt.isCorrect ? 'border-red-500 bg-red-500/5' : ''}
                  ${showExplanation && selectedId !== opt.id && !opt.isCorrect ? 'border-border/20 opacity-50' : ''}
                `}
              >
                <div className="flex-1 w-full flex items-center justify-center">
                  {opt.svgContent}
                </div>
                
                {opt.label && (
                  <span className="font-medium text-foreground text-sm">{opt.label}</span>
                )}

                <AnimatePresence>
                  {showExplanation && opt.isCorrect && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-4 right-4 text-emerald-500">
                      <CheckCircle2 className="w-6 h-6" />
                    </motion.div>
                  )}
                  {showExplanation && selectedId === opt.id && !opt.isCorrect && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-4 right-4 text-red-500">
                      <XCircle className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-muted/50 rounded-xl p-6 border border-border/50"
            >
              <div className="flex items-start gap-4">
                <div className={`mt-1 flex-shrink-0 ${isCorrect ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <Brain className="w-6 h-6" />}
                </div>
                <div>
                  <h5 className={`font-semibold mb-2 ${isCorrect ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {isCorrect ? 'Spot On!' : 'Not Quite.'}
                  </h5>
                  <p className="text-muted-foreground leading-relaxed">{explanation}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button variant="outline" className="gap-2" onClick={() => setShowExplanation(false)}>
                  Next Exercise <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
