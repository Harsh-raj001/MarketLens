import { useState } from "react";
import { LessonSpecification } from "@/data/knowledgeBase";
import { Hammer, Doji, Engulfing, MorningStar, EveningStar, ShootingStar, Harami, Marubozu } from "@/components/visuals/Candles";
import { HeadAndShoulders, InverseHeadAndShoulders, Triangle, Flag, DoubleTop, DoubleBottom, CupAndHandle, AscendingTriangle, DescendingTriangle, Pennant, Wedge, Rectangle } from "@/components/visuals/ChartPatterns";
import { RSI, MACD, BollingerBands, VWAP, EMA, SMA, ATR, ADX } from "@/components/visuals/Indicators";
import { HistoricalReplay } from "./HistoricalReplay";
import { TradingCalculator } from "./TradingCalculator";
import { Brain, Star, CheckCircle2, XCircle, AlertTriangle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/contexts/ProgressContext";
import { motion, Variants } from "framer-motion";

interface LessonRendererProps {
  lesson: LessonSpecification;
  onTopicClick?: (topic: string) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function LessonRenderer({ lesson, onTopicClick }: LessonRendererProps) {
  const { completeDailyChallenge } = useProgress();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const renderVisual = () => {
    switch (lesson.visualComponent) {
      // Candles
      case "Hammer": return <Hammer />;
      case "Doji": return <Doji />;
      case "Engulfing": return <Engulfing />;
      case "MorningStar": return <MorningStar />;
      case "EveningStar": return <EveningStar />;
      case "ShootingStar": return <ShootingStar />;
      case "Harami": return <Harami />;
      case "Marubozu": return <Marubozu />;
      // Patterns
      case "HeadAndShoulders": return <HeadAndShoulders />;
      case "InverseHeadAndShoulders": return <InverseHeadAndShoulders />;
      case "Triangle": return <Triangle />;
      case "AscendingTriangle": return <AscendingTriangle />;
      case "DescendingTriangle": return <DescendingTriangle />;
      case "Flag": return <Flag />;
      case "Pennant": return <Pennant />;
      case "Wedge": return <Wedge />;
      case "Rectangle": return <Rectangle />;
      case "DoubleTop": return <DoubleTop />;
      case "DoubleBottom": return <DoubleBottom />;
      case "CupAndHandle": return <CupAndHandle />;
      // Indicators
      case "RSI": return <RSI />;
      case "MACD": return <MACD />;
      case "BollingerBands": return <BollingerBands />;
      case "VWAP": return <VWAP />;
      case "EMA": return <EMA />;
      case "SMA": return <SMA />;
      case "ATR": return <ATR />;
      case "ADX": return <ADX />;
      default: return null;
    }
  };

  const handleQuizSubmit = () => {
    if (selectedAnswer === null || !lesson.quiz) return;
    setQuizSubmitted(true);
    if (selectedAnswer === lesson.quiz.correctAnswer) {
      completeDailyChallenge(5); // Award 5 XP for in-lesson quiz
    }
  };

  return (
    <motion.div 
      className="space-y-8 text-foreground pb-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header & Visual */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex justify-between items-start">
          <h2 className="font-display text-3xl text-foreground">{lesson.topic}</h2>
          {lesson.reliability && (
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < lesson.reliability! ? "fill-amber-400 text-amber-400" : "text-border"}`} />
              ))}
            </div>
          )}
        </div>
        
        {/* VISUAL FIRST: Show visual or calculator before text */}
        {lesson.visualComponent && (
          <div className="bg-card border border-border/60 rounded-xl overflow-visible mt-6 mb-4 shadow-sm relative z-20">
            {renderVisual()}
          </div>
        )}
        
        {lesson.calculator && (
          <div className="mt-6 mb-4 relative z-20">
            <TradingCalculator />
          </div>
        )}

        {/* Text content follows the visual */}
        <p className="text-muted-foreground leading-relaxed text-lg pt-4">
          {lesson.description}
        </p>
      </motion.div>

      {/* Market Story */}
      {lesson.marketStory && (
        <motion.div variants={itemVariants} className="space-y-4 pt-2 pb-4 border-l-2 border-primary/30 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Market Story</h3>
          </div>
          {lesson.marketStory.map((step, i) => (
            <div key={i} className="flex gap-3 items-start text-sm">
              <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold mt-0.5">{i + 1}</span>
              <p className="text-muted-foreground leading-relaxed pt-0.5">{step}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* Psychology */}
      {lesson.psychology && (
        <motion.div variants={itemVariants} className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 space-y-3 relative overflow-hidden">
          <Brain className="absolute -right-4 -bottom-4 w-24 h-24 text-amber-500/10" />
          <div className="flex items-center gap-2 relative z-10">
            <Brain className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-amber-900 dark:text-amber-500">Market Psychology</h3>
          </div>
          <p className="text-amber-800 dark:text-amber-200/80 text-sm leading-relaxed relative z-10">
            {lesson.psychology}
          </p>
        </motion.div>
      )}

      {/* Failure Cases */}
      {lesson.failureCases && (
        <motion.div variants={itemVariants} className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <h3 className="font-semibold text-destructive">When it fails</h3>
          </div>
          <p className="text-destructive/80 text-sm leading-relaxed">
            {lesson.failureCases}
          </p>
        </motion.div>
      )}

      {/* Market Context */}
      {lesson.marketContext && (
        <motion.div variants={itemVariants} className="border-l-4 border-primary pl-4 py-1 space-y-1">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-primary" /> Where to look
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{lesson.marketContext}</p>
        </motion.div>
      )}

      {/* Historical Example */}
      {lesson.historicalExample && (
        <motion.div variants={itemVariants}>
          <HistoricalReplay example={lesson.historicalExample} />
        </motion.div>
      )}

      {/* Embedded Quiz */}
      {lesson.quiz && (
        <motion.div variants={itemVariants} className="bg-card border border-border/60 shadow-sm rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-foreground">Knowledge Check</h3>
          <p className="text-sm text-muted-foreground">{lesson.quiz.question}</p>
          
          <div className="space-y-2">
            {lesson.quiz.options.map((option, i) => (
              <button
                key={i}
                onClick={() => !quizSubmitted && setSelectedAnswer(i)}
                disabled={quizSubmitted}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200 ${
                  quizSubmitted
                    ? i === lesson.quiz!.correctAnswer
                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                      : i === selectedAnswer
                      ? "border-destructive/50 bg-destructive/10 text-destructive"
                      : "border-border text-muted-foreground opacity-60"
                    : selectedAnswer === i
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border hover:border-primary/30 hover:bg-muted text-foreground/80"
                }`}
              >
                <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                {option}
                {quizSubmitted && i === lesson.quiz!.correctAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-500 float-right" />}
                {quizSubmitted && i === selectedAnswer && i !== lesson.quiz!.correctAnswer && <XCircle className="w-4 h-4 text-destructive float-right" />}
              </button>
            ))}
          </div>
          
          {!quizSubmitted && (
            <Button 
              onClick={handleQuizSubmit} 
              disabled={selectedAnswer === null}
              className="w-full transition-all duration-300"
            >
              Submit Answer
            </Button>
          )}
          
          {/* Post-submit animation */}
          {quizSubmitted && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="pt-2 text-center"
            >
              {selectedAnswer === lesson.quiz.correctAnswer ? (
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">+5 XP Earned! Great job.</p>
              ) : (
                <p className="text-sm font-medium text-destructive">Not quite. Review the explanation above.</p>
              )}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Related Topics */}
      {lesson.relatedTopics && lesson.relatedTopics.length > 0 && (
        <motion.div variants={itemVariants} className="pt-8 mt-8 border-t border-border/60">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Continue Learning</p>
          <div className="flex flex-col gap-2">
            {lesson.relatedTopics.map((topic, i) => (
              <button 
                key={i} 
                onClick={() => onTopicClick && onTopicClick(topic)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary text-sm font-medium transition-colors text-left group"
              >
                <Lightbulb className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                {topic}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
