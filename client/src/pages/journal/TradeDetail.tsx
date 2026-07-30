import { useJournal } from "@/contexts/JournalContext";
import { calculateTradeMetrics } from "@/data/tradeJournal";
import { Link } from "wouter";
import { ArrowLeft, Trash2, Calendar, Target, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TradeDetail({ id }: { id: string }) {
  const { trades, deleteTrade } = useJournal();
  const trade = trades.find((t) => t.id === id);

  if (!trade) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Trade not found</h2>
        <Link href="/journal">
          <Button variant="outline">Back to Journal</Button>
        </Link>
      </div>
    );
  }

  const metrics = calculateTradeMetrics(trade);
  
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/journal">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="font-display text-3xl font-bold">{trade.instrument} Trade</h1>
          <Badge variant={trade.direction === "LONG" ? "default" : "destructive"} className={trade.direction === "LONG" ? "bg-emerald-500 hover:bg-emerald-600" : ""}>
            {trade.direction}
          </Badge>
        </div>
        <Link href="/journal">
          <Button variant="destructive" size="icon" onClick={() => deleteTrade(trade.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Structured Data */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="bg-white">
            <CardHeader className="bg-slate-50 border-b border-border py-4">
              <CardTitle className="text-lg">Trade Details</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                <div className="p-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">P&L</span>
                  <span className={`font-bold ${metrics.pnl >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    ₹{metrics.pnl.toLocaleString()}
                  </span>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">R:R</span>
                  <span className="font-bold">1:{metrics.riskReward.toFixed(2)}</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Entry</span>
                  <span>{trade.entryPrice}</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Exit</span>
                  <span>{trade.exitPrice}</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Stop Loss</span>
                  <span>{trade.stopLoss}</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Quantity</span>
                  <span>{trade.quantity}</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Outcome</span>
                  <Badge variant="outline">{metrics.outcome}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-5 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2"><Target className="w-4 h-4"/> Setups</p>
                <div className="flex flex-wrap gap-2">
                  {trade.setupTags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2"><Calendar className="w-4 h-4"/> Condition</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{trade.marketCondition}</Badge>
                  {trade.isExpiryWeek && <Badge variant="destructive">Expiry Week</Badge>}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Context & Emotion */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-paper border-primary/20 shadow-sm h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary font-display text-2xl">
                <AlertTriangle className="w-6 h-6" /> What were you thinking?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap font-medium">
                {trade.contextEmotion || "No emotional context recorded."}
              </p>
              
              {trade.chartNote && (
                <div className="mt-8">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Attached Chart</h4>
                  <img src={trade.chartNote} alt="Trade Chart" className="rounded-md border border-border max-w-full shadow-sm" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
