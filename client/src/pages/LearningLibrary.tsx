import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock, Award } from "lucide-react";

const lessons = [
  { id: "1", title: "What Are Financial Markets?", category: "Basics", duration: "8 min", difficulty: "Beginner" },
  { id: "2", title: "Understanding Candlesticks", category: "Technical Analysis", duration: "12 min", difficulty: "Beginner" },
  { id: "3", title: "Support and Resistance", category: "Technical Analysis", duration: "10 min", difficulty: "Beginner" },
  { id: "4", title: "Introduction to Moving Averages", category: "Indicators", duration: "15 min", difficulty: "Intermediate" },
  { id: "5", title: "The Role of Volume", category: "Technical Analysis", duration: "10 min", difficulty: "Intermediate" },
  { id: "6", title: "RSI: Relative Strength Index", category: "Indicators", duration: "12 min", difficulty: "Intermediate" },
  { id: "7", title: "MACD Explained", category: "Indicators", duration: "14 min", difficulty: "Intermediate" },
  { id: "8", title: "Position Sizing Fundamentals", category: "Risk Management", duration: "11 min", difficulty: "Beginner" },
  { id: "9", title: "Understanding Stop Losses", category: "Risk Management", duration: "9 min", difficulty: "Beginner" },
  { id: "10", title: "Fear and Greed in Trading", category: "Psychology", duration: "10 min", difficulty: "Beginner" },
  { id: "11", title: "The Fear of Missing Out (FOMO)", category: "Psychology", duration: "8 min", difficulty: "Intermediate" },
  { id: "12", title: "Risk/Reward Ratio", category: "Risk Management", duration: "12 min", difficulty: "Intermediate" },
];

const categories = ["All", "Basics", "Technical Analysis", "Indicators", "Risk Management", "Psychology"];

import { useState } from "react";

export default function LearningLibrary() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? lessons
    : lessons.filter((l) => l.category === activeCategory);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Learning Library</h1>
        <p className="text-muted-foreground mt-1">Browse all structured lessons organized by topic and difficulty.</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lessons grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((lesson) => (
          <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
            <Card className="group hover:shadow-md transition-shadow duration-200 border-border/60 cursor-pointer h-full">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {lesson.category}
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    lesson.difficulty === "Beginner"
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {lesson.difficulty}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground leading-snug">{lesson.title}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {lesson.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3 h-3" /> Quiz included
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
