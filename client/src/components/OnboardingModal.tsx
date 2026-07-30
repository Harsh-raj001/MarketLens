import { useState } from "react";
import { useUser, ExperienceLevel, LearningGoal } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, TrendingUp, Target, ShieldCheck, Sparkles, Sprout, BookOpen, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

export function OnboardingModal() {
  const { profile, updateProfile } = useUser();
  const [step, setStep] = useState<number>(1);
  const [localExp, setLocalExp] = useState<ExperienceLevel>(profile.experienceLevel);
  const [localGoal, setLocalGoal] = useState<LearningGoal>(profile.learningGoal);

  // If already completed, don't render anything
  if (profile.hasCompletedOnboarding) return null;

  const handleComplete = () => {
    updateProfile({
      experienceLevel: localExp || 'new',
      learningGoal: localGoal || 'basics',
      hasCompletedOnboarding: true,
    });
  };

  const expOptions: { id: ExperienceLevel; label: string; icon: any; color: string }[] = [
    { id: 'new', label: "I'm completely new", icon: Sprout, color: "text-emerald-500 bg-emerald-500/10" },
    { id: 'basics', label: "I know the basics", icon: BookOpen, color: "text-blue-500 bg-blue-500/10" },
    { id: 'occasional', label: "I invest occasionally", icon: TrendingUp, color: "text-amber-500 bg-amber-500/10" },
    { id: 'active', label: "I actively trade", icon: BarChart3, color: "text-purple-500 bg-purple-500/10" },
  ];

  const goalOptions: { id: LearningGoal; label: string; icon: any; color: string }[] = [
    { id: 'basics', label: "Learn the stock market basics", icon: Target, color: "text-emerald-500 bg-emerald-500/10" },
    { id: 'investing', label: "Start investing safely", icon: ShieldCheck, color: "text-blue-500 bg-blue-500/10" },
    { id: 'technical', label: "Learn technical analysis", icon: Brain, color: "text-purple-500 bg-purple-500/10" },
    { id: 'retirement', label: "Plan for retirement", icon: Sparkles, color: "text-amber-500 bg-amber-500/10" },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl w-full bg-card border border-border/60 shadow-2xl rounded-3xl p-8 lg:p-12"
          >
            <div className="text-center space-y-4 mb-10">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-display text-foreground">Where are you today?</h2>
              <p className="text-muted-foreground text-lg">Help us personalize your learning journey.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {expOptions.map(opt => (
                <Card 
                  key={opt.id}
                  className={`p-6 cursor-pointer transition-all border-2 hover:border-primary/50 group ${localExp === opt.id ? 'border-primary bg-primary/5' : 'border-border/40'}`}
                  onClick={() => setLocalExp(opt.id)}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${opt.color}`}>
                      <opt.icon className="w-6 h-6" />
                    </div>
                    <span className="font-medium text-foreground">{opt.label}</span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-10 flex justify-end">
              <Button size="lg" onClick={() => setStep(2)} disabled={!localExp} className="px-8 text-lg rounded-full">
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl w-full bg-card border border-border/60 shadow-2xl rounded-3xl p-8 lg:p-12"
          >
            <div className="text-center space-y-4 mb-10">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-display text-foreground">What is your goal?</h2>
              <p className="text-muted-foreground text-lg">We'll build a roadmap specifically for you.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {goalOptions.map(opt => (
                <Card 
                  key={opt.id}
                  className={`p-6 cursor-pointer transition-all border-2 hover:border-primary/50 group ${localGoal === opt.id ? 'border-primary bg-primary/5' : 'border-border/40'}`}
                  onClick={() => setLocalGoal(opt.id)}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${opt.color}`}>
                      <opt.icon className="w-6 h-6" />
                    </div>
                    <span className="font-medium text-foreground">{opt.label}</span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-10 flex justify-between">
              <Button variant="ghost" size="lg" onClick={() => setStep(1)} className="px-8 text-lg rounded-full">
                Back
              </Button>
              <Button size="lg" onClick={handleComplete} disabled={!localGoal} className="px-8 text-lg rounded-full">
                Build My Plan
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
