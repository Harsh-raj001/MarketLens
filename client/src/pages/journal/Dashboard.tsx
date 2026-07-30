import { useJournal } from "@/contexts/JournalContext";
import { Link } from "wouter";
import { Plus, TrendingUp, Target, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { calculateTradeMetrics } from "@/data/tradeJournal";

export default function Dashboard() {
  const { trades } = useJournal();

  const totalTrades = trades.length;
  const wins = trades.filter((t) => calculateTradeMetrics(t).outcome === "WIN").length;
  const winRate = totalTrades > 0 ? Math.round((wins / totalTrades) * 100) : 0;
  
  const totalPnl = trades.reduce((acc, t) => acc + calculateTradeMetrics(t).pnl, 0);
  
  const totalRR = trades.reduce((acc, t) => acc + calculateTradeMetrics(t).riskReward, 0);
  const avgRR = totalTrades > 0 ? (totalRR / totalTrades).toFixed(2) : "0.00";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">TradeLog Dashboard</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4" /> Personal journaling only. Data stays in your browser.
          </p>
        </div>
        <Link href="/journal/new">
          <Button size="lg" className="gap-2 shadow-md">
            <Plus className="w-5 h-5" /> Log Trade
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total P&L</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalPnl >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              ₹{totalPnl.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
            <Target className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{winRate}%</div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Trades Logged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTrades}</div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average R:R</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1:{avgRR}</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Recent Trades</h2>
        {trades.length === 0 ? (
          <Card className="bg-card border-border/60 p-10 text-center shadow-sm">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl text-foreground">No trades logged yet</h3>
              <p className="text-muted-foreground leading-relaxed">
                Trading without a journal is just gambling. Start logging your trades honestly to discover your psychological patterns, refine your setups, and find your statistical edge.
              </p>
              <div className="pt-2">
                <Link href="/journal/new">
                  <Button size="lg" className="shadow-md transition-all active:scale-95">Log First Trade</Button>
                </Link>
              </div>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {trades.map((trade) => {
              const metrics = calculateTradeMetrics(trade);
              return (
                <Link key={trade.id} href={`/journal/trade/${trade.id}`}>
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer bg-white group">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant={trade.direction === "LONG" ? "default" : "destructive"} className={trade.direction === "LONG" ? "bg-emerald-500 hover:bg-emerald-600" : ""}>
                          {trade.direction}
                        </Badge>
                        <div>
                          <p className="font-bold">{trade.instrument}</p>
                          <p className="text-xs text-muted-foreground">{new Date(trade.entryTime).toLocaleDateString()}</p>
                        </div>
                        <div className="hidden sm:flex gap-1 ml-4">
                          {trade.setupTags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${metrics.pnl >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                          ₹{metrics.pnl.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">{metrics.outcome}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
