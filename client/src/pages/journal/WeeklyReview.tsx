import { useJournal } from "@/contexts/JournalContext";
import { calculateTradeMetrics } from "@/data/tradeJournal";
import { Link } from "wouter";
import { BookOpen, Target, Brain, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function WeeklyReview() {
  const { trades, weeklyReflection, setWeeklyReflection } = useJournal();

  // Filter to last 7 days (or just all for MVP if low volume)
  const last7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentTrades = trades.filter((t) => new Date(t.entryTime) >= last7Days);

  const wins = recentTrades.filter((t) => calculateTradeMetrics(t).outcome === "WIN").length;
  const winRate = recentTrades.length > 0 ? Math.round((wins / recentTrades.length) * 100) : 0;
  const totalPnl = recentTrades.reduce((acc, t) => acc + calculateTradeMetrics(t).pnl, 0);

  const handleSaveReflection = () => {
    // Already synced to context on change, just show toast/alert
    alert("Weekly reflection saved!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="font-display text-4xl font-bold text-foreground">Weekly Deep Review</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Focus on process, not just outcomes. Normalizing losses is the first step to discipline.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-emerald-50/50 border-emerald-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-emerald-800 text-sm font-semibold uppercase tracking-wider">7-Day P&L</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${totalPnl >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              ₹{totalPnl.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50/50 border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-800 text-sm font-semibold uppercase tracking-wider">7-Day Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">{winRate}%</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50/50 border-purple-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-800 text-sm font-semibold uppercase tracking-wider">Trades Logged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700">{recentTrades.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" /> Psychological Patterns
          </h2>
          {recentTrades.length === 0 ? (
            <Card className="bg-white border-dashed">
              <CardContent className="p-8 text-center text-muted-foreground">
                No trades logged in the last 7 days.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {recentTrades.map((trade) => (
                <Card key={trade.id} className="bg-white shadow-sm border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold">{trade.setupTags.join(", ")}</div>
                      <div className={`font-bold text-sm ${calculateTradeMetrics(trade).pnl >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        ₹{calculateTradeMetrics(trade).pnl.toLocaleString()}
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 italic bg-amber-50 p-3 rounded-md">
                      "{trade.contextEmotion || "No context recorded."}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" /> Overall Reflection
          </h2>
          <Card className="bg-paper shadow-md">
            <CardContent className="p-6 space-y-4">
              <p className="text-sm font-semibold text-muted-foreground">
                What went well? What didn't? What is ONE thing you will improve next week?
              </p>
              <Textarea 
                placeholder="I noticed a tendency to exit too early on ranging days..."
                className="min-h-[250px] text-base leading-relaxed bg-white/50 resize-y"
                value={weeklyReflection}
                onChange={(e) => setWeeklyReflection(e.target.value)}
              />
              <Button size="lg" className="w-full gap-2" onClick={handleSaveReflection}>
                <Save className="w-5 h-5" /> Save Reflection
              </Button>
            </CardContent>
          </Card>
          
          <div className="pt-4">
            <Link href="/psychology">
              <Card className="bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-colors border-primary/20 cursor-pointer group">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-primary group-hover:underline">Study Market Psychology</h3>
                    <p className="text-sm text-muted-foreground">Learn how to overcome fear, FOMO, and overtrading.</p>
                  </div>
                  <BookOpen className="text-primary w-6 h-6" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
