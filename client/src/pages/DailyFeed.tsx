import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Target, Flame, TrendingDown, Quote, CheckCircle2, Circle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/contexts/UserContext";

const MISSIONS = [
  { id: '1', title: 'Complete Market Simulator', xp: 50, completed: false },
  { id: '2', title: 'Find the Hammer Candlestick', xp: 20, completed: true },
  { id: '3', title: 'Read about Tax Drag', xp: 30, completed: true },
];

export default function DailyFeed() {
  const { profile } = useUser();
  const [missions, setMissions] = useState(MISSIONS);
  const [showMistakeLesson, setShowMistakeLesson] = useState(false);

  const completedCount = missions.filter(m => m.completed).length;
  const totalCount = missions.length;
  const progressPercent = (completedCount / totalCount) * 100;

  const toggleMission = (id: string) => {
    setMissions(prev => prev.map(m => m.id === id ? { ...m, completed: !m.completed } : m));
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 py-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Flame className="w-6 h-6 text-orange-500" />
            <span className="font-semibold uppercase tracking-wider text-sm text-orange-500">3 Day Streak</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display text-foreground">
            {profile.learningGoal === 'investing' ? 'Ready to Invest?' : 'Daily Learning Feed'}
          </h1>
          <p className="text-xl text-muted-foreground">Just 5 minutes a day to master the markets.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: Daily Missions & News */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Missions Card */}
          <Card className="p-6 border-border/60 shadow-lg bg-card relative overflow-hidden">
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="font-semibold text-xl flex items-center gap-2"><Target className="w-5 h-5 text-primary" /> Daily Missions</h3>
              <span className="text-sm font-medium text-muted-foreground">{completedCount}/{totalCount} Done</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-6 relative z-10">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>

            <div className="space-y-3 relative z-10">
              {missions.map(mission => (
                <div 
                  key={mission.id} 
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer hover:bg-muted/50 ${mission.completed ? 'border-primary/30 bg-primary/5' : 'border-border/40'}`}
                  onClick={() => toggleMission(mission.id)}
                >
                  <div className="flex items-center gap-3">
                    {mission.completed ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <Circle className="w-5 h-5 text-muted-foreground" />}
                    <span className={`font-medium ${mission.completed ? 'text-foreground line-through opacity-70' : 'text-foreground'}`}>{mission.title}</span>
                  </div>
                  <span className="text-xs font-bold text-primary">+{mission.xp} XP</span>
                </div>
              ))}
            </div>
            
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          </Card>

          {/* Quote of the Day */}
          <Card className="p-8 border-border/60 shadow-md bg-muted/30 text-center space-y-4">
            <Quote className="w-8 h-8 text-primary/40 mx-auto" />
            <p className="font-display text-xl text-foreground italic">"If you aren't willing to own a stock for 10 years, don't even think about owning it for 10 minutes."</p>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">— Warren Buffett</p>
          </Card>

        </div>

        {/* Right Column: Deep Dives */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Mistake of the Day */}
          <Card className="p-0 border-red-500/20 shadow-lg bg-card overflow-hidden">
            <div className="bg-red-500/10 px-6 py-4 border-b border-red-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-600">
                <TrendingDown className="w-5 h-5" />
                <span className="font-semibold uppercase tracking-wider text-sm">Mistake of the Day</span>
              </div>
            </div>
            
            <div className="p-6 md:p-8 space-y-6">
              <h2 className="text-3xl font-display text-foreground">Averaging Down on Losers</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                You buy a stock at ₹100. It falls to ₹80. You buy more to "lower your average cost". It falls to ₹50. Now your portfolio is heavily concentrated in a losing asset.
              </p>
              
              <AnimatePresence>
                {!showMistakeLesson ? (
                  <Button onClick={() => setShowMistakeLesson(true)} className="gap-2 bg-red-600 hover:bg-red-700 text-white">
                    How to fix this <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-muted/50 rounded-xl p-6 border border-border/50 space-y-4"
                  >
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold mb-2">
                      <CheckCircle2 className="w-5 h-5" /> The Fix
                    </div>
                    <p className="text-foreground leading-relaxed">
                      Only add to <strong>winning</strong> positions. If a trade goes against your initial thesis, accept the small loss and move on. "Averaging down" is how small mistakes become catastrophic account-blowers.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>

          {/* Market Event tied to Lesson */}
          <Card className="p-6 border-border/60 shadow-md bg-card">
             <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-xl">RBI holds interest rates steady at 6.5%</h3>
                <span className="text-xs font-semibold px-2 py-1 bg-muted rounded text-muted-foreground">TODAY</span>
             </div>
             <p className="text-muted-foreground mb-6">
               The Reserve Bank of India has decided to keep the repo rate unchanged. How does this actually affect your portfolio?
             </p>
             <div className="flex flex-wrap gap-3">
               <div className="px-3 py-1.5 bg-blue-500/10 text-blue-600 rounded-lg text-sm font-medium flex items-center gap-2">
                 <Brain className="w-4 h-4" /> Why Bank Stocks care
               </div>
               <div className="px-3 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-lg text-sm font-medium flex items-center gap-2">
                 <Brain className="w-4 h-4" /> Impact on Debt Funds
               </div>
             </div>
          </Card>

        </div>

      </div>
    </div>
  );
}
