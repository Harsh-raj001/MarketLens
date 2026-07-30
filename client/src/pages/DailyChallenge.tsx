import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Flame, Calendar, CheckCircle2, XCircle, RotateCcw, Zap } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";

interface Challenge {
  id: number;
  date: string;
  type: "pattern" | "concept" | "scenario";
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const challenges: Challenge[] = [
  { id: 1, date: "Today", type: "pattern", question: "Which candlestick pattern is characterized by a small body at the top and a long lower wick, appearing after a downtrend?", options: ["Shooting Star", "Hammer", "Doji", "Marubozu"], correct: 1, explanation: "A Hammer appears after a downtrend with a small body at the top and a long lower wick (at least 2x the body). It signals a potential bullish reversal." },
  { id: 2, date: "Today", type: "concept", question: "What is the recommended maximum risk per trade according to the 1-2% rule?", options: ["5% of account", "1-2% of account", "10% of account", "No limit"], correct: 1, explanation: "The 1-2% rule states you should never risk more than 1-2% of your total trading capital on a single trade. This protects against catastrophic losses." },
  { id: 3, date: "Today", type: "scenario", question: "A trader sees a stock has been rising rapidly for 3 days and feels compelled to buy immediately. What psychological bias is at play?", options: ["Anchoring Bias", "Loss Aversion", "FOMO", "Confirmation Bias"], correct: 2, explanation: "FOMO (Fear of Missing Out) drives traders to enter positions because they see others profiting or a price is rapidly moving, often leading to buying at peaks." },
  { id: 4, date: "Today", type: "concept", question: "What does RSI stand for and what does a reading above 70 typically indicate?", options: ["Relative Strength Index; overbought", "Risk Size Indicator; high risk", "Relative Selling Index; oversold", "Return on Sales Index; profitable"], correct: 0, explanation: "RSI stands for Relative Strength Index. A reading above 70 typically indicates overbought conditions, suggesting the asset may be due for a pullback." },
  { id: 5, date: "Today", type: "pattern", question: "What chart pattern consists of two roughly equal peaks at a resistance level with a break below the support between them?", options: ["Double Bottom", "Head and Shoulders", "Double Top", "Ascending Triangle"], correct: 2, explanation: "A Double Top is a bearish reversal pattern where price reaches a resistance level twice but fails to break through. A break below the support between the peaks confirms the pattern." },
];

export default function DailyChallenge() {
  const { streak, completeDailyChallenge } = useProgress();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const challenge = challenges[currentChallenge];

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setSubmitted(true);
    if (selectedAnswer === challenge.correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge((c) => c + 1);
      setSelectedAnswer(null);
      setSubmitted(false);
    } else {
      setCompleted(true);
      // Reward XP based on score
      completeDailyChallenge(score * 10);
    }
  };

  const handleRestart = () => {
    setCurrentChallenge(0);
    setSelectedAnswer(null);
    setSubmitted(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Daily Challenge</h1>
        <p className="text-muted-foreground mt-1">Test your knowledge with today's challenges. Build your streak!</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border/60">
          <CardContent className="p-4 flex items-center gap-3">
            <Flame className="w-5 h-5 text-amber-500" />
            <div>
              <div className="text-lg font-bold text-foreground">{streak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-4 flex items-center gap-3">
            <Trophy className="w-5 h-5 text-primary" />
            <div>
              <div className="text-lg font-bold text-foreground">{currentChallenge > 0 ? Math.round((score / currentChallenge) * 100) : 0}%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-4 flex items-center gap-3">
            <Zap className="w-5 h-5 text-amber-500" />
            <div>
              <div className="text-lg font-bold text-foreground">{score * 10}</div>
              <div className="text-xs text-muted-foreground">Today's XP</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentChallenge + 1} of {challenges.length}</span>
          <span>Score: {score}</span>
        </div>
        <Progress value={((currentChallenge + (submitted ? 1 : 0)) / challenges.length) * 100} className="h-2" />
      </div>

      {!completed ? (
        <Card className="border-border/60">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                challenge.type === "pattern" ? "bg-green-100 text-green-700" :
                challenge.type === "concept" ? "bg-blue-100 text-blue-700" :
                "bg-purple-100 text-purple-700"
              }`}>
                {challenge.type === "pattern" ? "Pattern ID" : challenge.type === "concept" ? "Concept" : "Scenario"}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-foreground leading-snug">{challenge.question}</h3>

            <div className="space-y-2">
              {challenge.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => !submitted && setSelectedAnswer(i)}
                  disabled={submitted}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-150 ${
                    submitted
                      ? i === challenge.correct
                        ? "border-green-500 bg-green-50 text-green-800"
                        : i === selectedAnswer
                        ? "border-red-400 bg-red-50 text-red-800"
                        : "border-border text-muted-foreground opacity-60"
                      : selectedAnswer === i
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border hover:border-primary/30 hover:bg-secondary/50 text-foreground/80"
                  }`}
                >
                  <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                  {option}
                  {submitted && i === challenge.correct && <CheckCircle2 className="w-4 h-4 text-green-600 float-right" />}
                  {submitted && i === selectedAnswer && i !== challenge.correct && <XCircle className="w-4 h-4 text-red-600 float-right" />}
                </button>
              ))}
            </div>

            {submitted && (
              <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
                <p className="text-sm font-medium text-foreground">Explanation:</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{challenge.explanation}</p>
              </div>
            )}

            <div className="flex gap-2">
              {!submitted && (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
                >
                  Submit Answer
                </Button>
              )}
              {submitted && (
                <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1 gap-2">
                  {currentChallenge < challenges.length - 1 ? "Next Question" : "See Results"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border/60">
          <CardContent className="p-8 text-center space-y-4">
            <Trophy className="w-12 h-12 text-primary mx-auto" />
            <h3 className="font-display text-2xl text-foreground">Challenge Complete!</h3>
            <p className="text-lg text-muted-foreground">
              You scored <span className="font-bold text-foreground">{score}</span> out of <span className="font-bold text-foreground">{challenges.length}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {score === challenges.length ? "Perfect score! Outstanding work." : score >= 3 ? "Great job! Keep learning." : "Keep practicing to improve your knowledge."}
            </p>
            <p className="text-sm font-bold text-emerald-600">
              +{score * 10} XP Earned
            </p>
            <Button onClick={handleRestart} className="gap-2 mt-4" variant="outline">
              <RotateCcw className="w-4 h-4" /> Try Again
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
