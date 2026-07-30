import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, Flame, Target, Trophy, TrendingUp, Brain, Shield, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useProgress } from "@/contexts/ProgressContext";

const weeklyData = [
  { day: "Mon", lessons: 2, quizzes: 1 },
  { day: "Tue", lessons: 3, quizzes: 2 },
  { day: "Wed", lessons: 1, quizzes: 1 },
  { day: "Thu", lessons: 4, quizzes: 3 },
  { day: "Fri", lessons: 2, quizzes: 2 },
  { day: "Sat", lessons: 1, quizzes: 1 },
  { day: "Sun", lessons: 0, quizzes: 0 },
];

const moduleProgress = [
  { name: "Technical Analysis", completed: 8, total: 15, icon: TrendingUp },
  { name: "Risk Management", completed: 4, total: 5, icon: Shield },
  { name: "Market Psychology", completed: 2, total: 6, icon: Brain },
  { name: "Chart Patterns", completed: 5, total: 12, icon: BarChart3 },
];

const achievements = [
  { name: "First Lesson", icon: BookOpen, unlocked: true },
  { name: "7-Day Streak", icon: Flame, unlocked: true },
  { name: "Quiz Master", icon: Target, unlocked: true },
  { name: "Pattern Pro", icon: BarChart3, unlocked: false },
  { name: "Risk Manager", icon: Shield, unlocked: false },
  { name: "Perfect Score", icon: Trophy, unlocked: false },
];

export default function ProgressDashboard() {
  const { xp, streak, completedLessons } = useProgress();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Progress Dashboard</h1>
        <p className="text-muted-foreground mt-1">Track your learning journey and achievements.</p>
      </div>

      {completedLessons.length === 0 && (
        <Card className="border-border bg-primary/5 shadow-sm">
          <CardContent className="p-8 text-center max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-2xl text-foreground">Welcome to TradeAcademy</h2>
            <p className="text-muted-foreground">
              You haven't completed any lessons yet. Start with Candlesticks or Market Psychology to build your first learning streak.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <Button onClick={() => window.location.href = "/paths"} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Start Learning Path
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overview stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/60">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Lessons Completed</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{completedLessons.length}</div>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Total XP</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{xp}</div>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-muted-foreground">Day Streak</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{streak}</div>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Achievements</span>
            </div>
            <div className="text-2xl font-bold text-foreground">3/6</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly activity chart */}
      <Card className="border-border/60">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Weekly Activity</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#a8a29e" />
                <YAxis tick={{ fontSize: 12 }} stroke="#a8a29e" />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e5e5" }} />
                <Bar dataKey="lessons" fill="#0d9488" radius={[4, 4, 0, 0]} name="Lessons" />
                <Bar dataKey="quizzes" fill="#d97706" radius={[4, 4, 0, 0]} name="Quizzes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Module progress */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Module Progress</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {moduleProgress.map((mod, i) => (
            <Card key={i} className="border-border/60">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <mod.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{mod.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{mod.completed}/{mod.total}</span>
                </div>
                <Progress value={(mod.completed / mod.total) * 100} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{Math.round((mod.completed / mod.total) * 100)}% complete</span>
                  <span>{mod.total - mod.completed} remaining</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Achievements</h3>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
          {achievements.map((ach, i) => (
            <Card key={i} className={`border-border/60 text-center ${!ach.unlocked ? "opacity-50" : ""}`}>
              <CardContent className="p-3 space-y-2">
                <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center ${
                  ach.unlocked ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                }`}>
                  <ach.icon className="w-5 h-5" />
                </div>
                <p className="text-xs font-medium text-foreground">{ach.name}</p>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  ach.unlocked ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                }`}>
                  {ach.unlocked ? "Unlocked" : "Locked"}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
