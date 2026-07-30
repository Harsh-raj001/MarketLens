import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, FastForward, Brain, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { HistoricalChart } from "@/components/education/HistoricalChart";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

// Generate some dummy OHLC data that forms a story
const generateMarketData = () => {
  let basePrice = 1500;
  const data = [];
  const startDate = new Date('2022-01-01');
  
  for (let i = 0; i < 60; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const time = date.toISOString().split('T')[0];

    // Phase 1: Uptrend (0-15)
    // Phase 2: Consolidation (16-30)
    // Phase 3: Fakeout Breakdown (31-35)
    // Phase 4: Massive Reversal/Uptrend (36-60)
    
    let open, high, low, close;
    
    if (i <= 15) {
      // Uptrend
      open = basePrice;
      close = basePrice + Math.random() * 20 + 5;
      high = close + Math.random() * 10;
      low = open - Math.random() * 5;
      basePrice = close;
    } else if (i <= 30) {
      // Consolidation
      open = basePrice;
      close = basePrice + (Math.random() * 30 - 15);
      high = Math.max(open, close) + Math.random() * 15;
      low = Math.min(open, close) - Math.random() * 15;
      basePrice = close;
    } else if (i <= 35) {
      // Fakeout Breakdown
      open = basePrice;
      close = basePrice - Math.random() * 30 - 10;
      high = open + Math.random() * 5;
      low = close - Math.random() * 20;
      basePrice = close;
    } else {
      // Massive Reversal
      open = basePrice;
      close = basePrice + Math.random() * 40 + 10;
      high = close + Math.random() * 15;
      low = open - Math.random() * 10;
      basePrice = close;
    }

    data.push({ time, open, high, low, close });
  }
  return data;
};

const fullData = generateMarketData();

const QUESTION_INDEX = 35; // Pause at the bottom of the fakeout

export default function MarketSimulator() {
  const [currentIndex, setCurrentIndex] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPausedForQuestion, setIsPausedForQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && !isPausedForQuestion && currentIndex < fullData.length) {
      interval = setInterval(() => {
        setCurrentIndex(prev => {
          const next = prev + 1;
          if (next === QUESTION_INDEX) {
            setIsPlaying(false);
            setIsPausedForQuestion(true);
          }
          if (next >= fullData.length) {
            setIsPlaying(false);
            return fullData.length;
          }
          return next;
        });
      }, 500); // 500ms per candle
    }

    return () => clearInterval(interval);
  }, [isPlaying, isPausedForQuestion, currentIndex]);

  const visibleData = fullData.slice(0, currentIndex);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
  };

  const handleContinue = () => {
    setIsPausedForQuestion(false);
    setIsPlaying(true);
  };

  const reset = () => {
    setCurrentIndex(10);
    setIsPlaying(false);
    setIsPausedForQuestion(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 py-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Brain className="w-6 h-6" />
            <span className="font-semibold uppercase tracking-wider text-sm">Interactive Lab</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display text-foreground">Market Simulator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Watch the market unfold candle by candle. Make decisions in real-time, just like a live trading environment.
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-card border border-border/60 p-2 rounded-xl shadow-sm">
          <Button 
            variant={isPlaying ? "secondary" : "default"} 
            size="icon" 
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={isPausedForQuestion || currentIndex >= fullData.length}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
          <Button variant="outline" size="icon" onClick={() => setCurrentIndex(fullData.length)} disabled={isPlaying || isPausedForQuestion}>
            <FastForward className="w-5 h-5" />
          </Button>
          <div className="w-px h-8 bg-border/60 mx-2" />
          <Button variant="ghost" onClick={reset}>Reset</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Chart Area */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-4 h-[500px] flex flex-col shadow-lg border-border/60">
            <div className="flex justify-between items-center mb-4 px-2">
              <span className="font-semibold text-foreground">NIFTY 50 (Simulated)</span>
              <span className="text-sm text-muted-foreground">Candle {currentIndex} / {fullData.length}</span>
            </div>
            <div className="flex-1 min-h-0 relative rounded-lg overflow-hidden">
              <HistoricalChart data={visibleData} />
              
              {/* Overlay when paused */}
              <AnimatePresence>
                {isPausedForQuestion && !showExplanation && (
                  <motion.div 
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
                    className="absolute inset-0 bg-background/20 flex items-center justify-center"
                  >
                    <div className="bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-semibold shadow-xl flex items-center gap-2">
                      <Pause className="w-5 h-5" /> Simulation Paused
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </div>

        {/* AI Mentor Panel */}
        <div className="space-y-6">
          <Card className="p-6 h-full shadow-lg border-border/60 flex flex-col relative overflow-hidden">
            {/* Background decorative element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            {!isPausedForQuestion && !showExplanation && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
                <Brain className="w-12 h-12 text-muted-foreground" />
                <p className="text-muted-foreground">
                  {isPlaying ? "Watching the market..." : "Press play to start the simulation."}
                </p>
              </div>
            )}

            <AnimatePresence mode="wait">
              {isPausedForQuestion && (
                <motion.div 
                  key="question"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col h-full space-y-6"
                >
                  <div>
                    <div className="flex items-center gap-2 text-primary mb-3">
                      <Brain className="w-5 h-5" />
                      <span className="font-semibold text-sm tracking-wide uppercase">Lens AI</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">What do you think is happening?</h3>
                    <p className="text-muted-foreground text-sm">
                      The price just broke below the consolidation zone on heavy volume. What is the most likely next move?
                    </p>
                  </div>

                  <div className="space-y-3 flex-1">
                    {[
                      { id: 'continuation', label: "Breakdown Continuation (Bearish)" },
                      { id: 'reversal', label: "Fakeout / Reversal (Bullish)" },
                      { id: 'consolidation', label: "More Consolidation (Neutral)" }
                    ].map(opt => (
                      <Button
                        key={opt.id}
                        variant={selectedAnswer === opt.id ? "default" : "outline"}
                        className={`w-full justify-start text-left h-auto py-4 px-4 ${showExplanation && opt.id === 'reversal' ? 'border-emerald-500 bg-emerald-500/10' : ''}`}
                        onClick={() => handleAnswer(opt.id)}
                        disabled={showExplanation}
                      >
                        {opt.label}
                        {showExplanation && opt.id === 'reversal' && <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto" />}
                        {showExplanation && selectedAnswer === opt.id && opt.id !== 'reversal' && <XCircle className="w-5 h-5 text-red-500 ml-auto" />}
                      </Button>
                    ))}
                  </div>

                  {showExplanation && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-muted/50 p-4 rounded-xl border border-border/50 space-y-3 mt-auto"
                    >
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        {selectedAnswer === 'reversal' ? "Correct!" : "Not quite."}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        This is a classic "Fakeout" or "Spring". Institutional algorithms often push price below obvious support to trigger retail stop-losses (creating liquidity), before heavily buying the reversal.
                      </p>
                      <Button onClick={handleContinue} className="w-full mt-2 gap-2">
                        Resume Simulation <ArrowRight className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!isPausedForQuestion && currentIndex >= fullData.length && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Simulation Complete</h3>
                <p className="text-muted-foreground text-sm max-w-[250px]">
                  You successfully identified the fakeout. The trend reversed powerfully just as institutional logic dictated.
                </p>
                <Button variant="outline" onClick={reset} className="mt-4">Run Another Scenario</Button>
              </motion.div>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
}
