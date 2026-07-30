import { Link } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, BookOpen } from "lucide-react";

const lessons: Record<string, { title: string; content: string[]; quiz: { question: string; options: string[]; correct: number }[] }> = {
  "1": {
    title: "What Are Financial Markets?",
    content: [
      "Financial markets are organized systems where buyers and sellers trade financial assets such as stocks, bonds, currencies, and commodities. These markets serve a critical function in the global economy: they facilitate the transfer of capital from those who have surplus funds (savers) to those who need capital for productive purposes (businesses, governments).",
      "The primary types of financial markets include stock markets (equity), bond markets (debt), foreign exchange markets (currencies), and commodity markets (physical goods). Each market type serves different participants with different objectives — from long-term investors seeking growth to traders looking for short-term price movements.",
      "Markets operate through exchanges (like the NSE or BSE in India) or over-the-counter (OTC) networks. Exchanges provide centralized, regulated venues for trading, while OTC markets allow direct transactions between parties. The choice of venue depends on the asset type, regulatory requirements, and market liquidity.",
      "Understanding market structure is fundamental to any trader. Markets are influenced by supply and demand dynamics, economic indicators, corporate earnings, geopolitical events, and investor sentiment. No single factor determines price movement — it is always a combination of multiple forces.",
    ],
    quiz: [
      {
        question: "What is the primary function of financial markets?",
        options: [
          "To generate profits for brokers",
          "To facilitate capital transfer between savers and businesses",
          "To predict future stock prices",
          "To provide entertainment through trading",
        ],
        correct: 1,
      },
      {
        question: "Which of the following is NOT a type of financial market?",
        options: [
          "Stock market",
          "Bond market",
          "Real estate market",
          "Foreign exchange market",
        ],
        correct: 2,
      },
    ],
  },
  "2": {
    title: "Understanding Candlesticks",
    content: [
      "Candlestick charts are one of the most widely used tools in technical analysis. Each candlestick represents price movement over a specific time period (e.g., 1 minute, 1 day, 1 week) and displays four key data points: the opening price, closing price, highest price, and lowest price.",
      "The body of a candlestick represents the range between the opening and closing prices. If the closing price is higher than the opening price, the candlestick is typically shown as green or white (bullish). If the closing price is lower, it is shown as red or black (bearish).",
      "The wicks (also called shadows) extend above and below the body, showing the highest and lowest prices reached during the period. Long upper wicks indicate selling pressure at higher prices, while long lower wicks suggest buying pressure at lower prices.",
      "The size and shape of candlesticks provide valuable information about market sentiment. Large bodies indicate strong conviction, while small bodies suggest indecision. The relationship between consecutive candlesticks forms patterns that traders use to anticipate future price movements.",
    ],
    quiz: [
      {
        question: "What does a green/white candlestick indicate?",
        options: [
          "Price went down",
          "Price went up (closing > opening)",
          "No price movement",
          "Market is closed",
        ],
        correct: 1,
      },
      {
        question: "What do the wicks of a candlestick represent?",
        options: [
          "Average price",
          "Opening and closing prices",
          "Highest and lowest prices during the period",
          "Volume of trades",
        ],
        correct: 2,
      },
    ],
  },
  "8": {
    title: "Position Sizing Fundamentals",
    content: [
      "Position sizing is the process of determining how much capital to allocate to a single trade. It is arguably the most important skill in risk management, as it directly determines how much you can lose on any given trade and how quickly you can recover from losses.",
      "A common rule of thumb is the 1-2% rule: never risk more than 1-2% of your total trading capital on a single trade. This means if you have a $10,000 account, your maximum loss on any trade should be $100-$200. This approach ensures that even a series of losing trades won't significantly deplete your capital.",
      "To calculate position size, you need three inputs: your account size, the percentage you're willing to risk, and your stop-loss distance. The formula is: Position Size = (Account Size × Risk Percentage) ÷ Stop-Loss Distance. For example, with a $10,000 account, 1% risk ($100), and a 50-pip stop loss, your position size would be 2 mini lots.",
      "Proper position sizing also accounts for correlation between positions. Holding multiple correlated trades simultaneously can effectively multiply your risk exposure. Diversification across uncorrelated assets and sectors helps mitigate this risk.",
    ],
    quiz: [
      {
        question: "What is the commonly recommended maximum risk per trade?",
        options: [
          "5-10% of account",
          "1-2% of account",
          "10-15% of account",
          "50% of account",
        ],
        correct: 1,
      },
      {
        question: "Which three factors are needed to calculate position size?",
        options: [
          "Account size, profit target, and leverage",
          "Account size, risk percentage, and stop-loss distance",
          "Entry price, exit price, and volume",
          "P/E ratio, EPS, and ROE",
        ],
        correct: 1,
      },
    ],
  },
};

const defaultLesson = {
  title: "Lesson Content",
  content: [
    "This lesson covers important concepts in trading education. The content is designed to build your understanding progressively, starting from foundational concepts and moving toward more advanced topics.",
    "Each lesson includes real-world examples drawn from historical market data, practical exercises, and knowledge-check quizzes to reinforce your learning.",
    "Take your time with each section. Trading education is a marathon, not a sprint. The goal is to develop deep understanding, not to rush through material.",
  ],
  quiz: [
    {
      question: "What is the most important principle in trading education?",
      options: ["Speed", "Understanding", "Luck", "Following tips"],
      correct: 1,
    },
  ],
};

export default function Lesson({ id }: { id: string }) {
  const lesson = lessons[id] || defaultLesson;
  const [quizStarted, setQuizStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const score = quizSubmitted
    ? lesson.quiz.filter((q, i) => answers[i] === q.correct).length
    : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Link href="/library">
        <Button variant="ghost" className="gap-2 text-muted-foreground">
          <ArrowLeft className="w-4 h-4" /> Back to Library
        </Button>
      </Link>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="w-4 h-4" />
          <span>Lesson</span>
        </div>
        <h1 className="font-display text-3xl text-foreground">{lesson.title}</h1>
      </div>

      {/* Content */}
      <div className="space-y-5">
        {lesson.content.map((paragraph, i) => (
          <p key={i} className="text-foreground/90 leading-relaxed text-base">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Quiz Section */}
      {!quizStarted && !quizSubmitted && (
        <Card className="border-border/60">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-display text-xl text-foreground">Knowledge Check</h3>
            <p className="text-sm text-muted-foreground">
              Test your understanding of this lesson with a short quiz.
            </p>
            <Button onClick={() => setQuizStarted(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              Start Quiz <ArrowRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {quizStarted && !quizSubmitted && (
        <Card className="border-border/60">
          <CardContent className="p-6 space-y-6">
            <h3 className="font-display text-xl text-foreground">Quiz</h3>
            {lesson.quiz.map((q, qi) => (
              <div key={qi} className="space-y-3">
                <p className="font-medium text-foreground">{qi + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => (
                    <button
                      key={oi}
                      onClick={() => setAnswers((prev) => ({ ...prev, [qi]: oi }))}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 text-sm ${
                        answers[qi] === oi
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border hover:border-primary/30 hover:bg-secondary/50 text-foreground/80"
                      }`}
                    >
                      {String.fromCharCode(65 + oi)}. {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <Button
              onClick={handleQuizSubmit}
              disabled={Object.keys(answers).length < lesson.quiz.length}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full"
            >
              Submit Answers
            </Button>
          </CardContent>
        </Card>
      )}

      {quizSubmitted && (
        <Card className="border-border/60">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-display text-xl text-foreground">Quiz Results</h3>
            <div className="flex items-center gap-3">
              <div className={`text-2xl font-bold ${score === lesson.quiz.length ? "text-green-600" : "text-amber-600"}`}>
                {score}/{lesson.quiz.length}
              </div>
              <span className="text-muted-foreground">
                {score === lesson.quiz.length ? "Perfect score!" : "Good effort! Review the material and try again."}
              </span>
            </div>
            {lesson.quiz.map((q, qi) => (
              <div key={qi} className="flex items-start gap-2">
                {answers[qi] === q.correct ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-sm font-medium text-foreground">{q.question}</p>
                  <p className="text-xs text-muted-foreground">
                    Correct: {q.options[q.correct]}
                  </p>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => { setQuizStarted(false); setQuizSubmitted(false); setAnswers({}); }}
              className="gap-2"
            >
              Retake Quiz <ArrowRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
