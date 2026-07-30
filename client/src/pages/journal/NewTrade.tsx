import { useState } from "react";
import { useLocation } from "wouter";
import { useJournal } from "@/contexts/JournalContext";
import { Trade, Instrument, Direction, MarketCondition, calculateTradeMetrics } from "@/data/tradeJournal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const SETUP_TAGS = ["RSI Divergence", "Fibonacci Retracement", "Bollinger Squeeze", "ADX Trend", "Breakout", "Support/Resistance", "Moving Average"];
const INSTRUMENTS: Instrument[] = ["NIFTY 50", "BANKNIFTY", "FINNIFTY", "MIDCPNIFTY", "Other"];
const MARKET_CONDITIONS: MarketCondition[] = ["TRENDING", "RANGING", "VOLATILE", "EXPIRY_WEEK"];

export default function NewTrade() {
  const [, setLocation] = useLocation();
  const { addTrade } = useJournal();

  const [formData, setFormData] = useState<Partial<Trade>>({
    instrument: "NIFTY 50",
    direction: "LONG",
    entryPrice: 0,
    exitPrice: 0,
    stopLoss: 0,
    quantity: 50,
    entryTime: new Date().toISOString().slice(0, 16),
    exitTime: new Date().toISOString().slice(0, 16),
    setupTags: [],
    marketCondition: "TRENDING",
    isExpiryWeek: false,
    contextEmotion: "",
    chartNote: "",
  });

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => {
      const tags = prev.setupTags || [];
      if (tags.includes(tag)) {
        return { ...prev, setupTags: tags.filter((t) => t !== tag) };
      }
      return { ...prev, setupTags: [...tags, tag] };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image must be smaller than 2MB for MVP limits.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, chartNote: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.entryPrice || !formData.exitPrice || !formData.stopLoss) {
      alert("Please fill in Entry, Exit, and Stop Loss prices.");
      return;
    }
    if ((formData.setupTags?.length || 0) === 0) {
      alert("Please select at least one setup tag.");
      return;
    }

    addTrade({
      ...(formData as Omit<Trade, "id">),
      entryTime: new Date(formData.entryTime!).toISOString(),
      exitTime: new Date(formData.exitTime!).toISOString(),
    });
    setLocation("/journal");
  };

  // Live Metrics Preview
  const tempTrade = { ...formData, id: "temp" } as Trade;
  const metrics = formData.entryPrice && formData.exitPrice ? calculateTradeMetrics(tempTrade) : null;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => setLocation("/journal")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-display text-3xl font-bold">Log New Trade</h1>
      </div>

      <Card className="bg-white">
        <CardContent className="p-6 space-y-8">
          {/* Core Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Instrument</Label>
              <select 
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.instrument}
                onChange={(e) => setFormData({ ...formData, instrument: e.target.value as Instrument })}
              >
                {INSTRUMENTS.map((inst) => <option key={inst} value={inst}>{inst}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Direction</Label>
              <select 
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.direction}
                onChange={(e) => setFormData({ ...formData, direction: e.target.value as Direction })}
              >
                <option value="LONG">LONG</option>
                <option value="SHORT">SHORT</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })} />
            </div>
            <div className="space-y-2 flex items-end pb-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="expiry" checked={formData.isExpiryWeek} onCheckedChange={(c) => setFormData({ ...formData, isExpiryWeek: c as boolean })} />
                <Label htmlFor="expiry" className="font-medium">F&O Expiry Week</Label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Entry Price</Label>
              <Input type="number" value={formData.entryPrice || ""} onChange={(e) => setFormData({ ...formData, entryPrice: Number(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>Exit Price</Label>
              <Input type="number" value={formData.exitPrice || ""} onChange={(e) => setFormData({ ...formData, exitPrice: Number(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>Stop Loss</Label>
              <Input type="number" value={formData.stopLoss || ""} onChange={(e) => setFormData({ ...formData, stopLoss: Number(e.target.value) })} />
            </div>
          </div>

          {/* Live Metrics */}
          {metrics && (
            <div className="bg-slate-50 p-4 rounded-lg flex items-center justify-around border border-slate-100">
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">P&L</p>
                <p className={`font-bold text-lg ${metrics.pnl >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  ₹{metrics.pnl.toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">R:R</p>
                <p className="font-bold text-lg">1:{metrics.riskReward.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Outcome</p>
                <Badge variant={metrics.outcome === "WIN" ? "default" : metrics.outcome === "LOSS" ? "destructive" : "secondary"}>
                  {metrics.outcome}
                </Badge>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="space-y-3">
            <Label>Setup (Select all that apply)</Label>
            <div className="flex flex-wrap gap-2">
              {SETUP_TAGS.map((tag) => (
                <Badge 
                  key={tag} 
                  variant={formData.setupTags?.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80 transition-colors"
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Market Condition</Label>
            <div className="flex flex-wrap gap-2">
              {MARKET_CONDITIONS.map((cond) => (
                <Badge 
                  key={cond} 
                  variant={formData.marketCondition === cond ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setFormData({ ...formData, marketCondition: cond })}
                >
                  {cond}
                </Badge>
              ))}
            </div>
          </div>

          {/* Emotion Context */}
          <div className="space-y-3">
            <Label className="text-base text-primary font-semibold">What were you thinking?</Label>
            <Textarea 
              placeholder="e.g., Exited early out of fear even though RSI still supported continuation..."
              className="min-h-[100px] resize-y bg-amber-50/50 border-amber-100 focus-visible:ring-amber-200"
              value={formData.contextEmotion}
              onChange={(e) => setFormData({ ...formData, contextEmotion: e.target.value })}
            />
          </div>

          <div className="space-y-3 border-t border-border pt-6">
            <Label className="flex items-center gap-2">
              <Upload className="w-4 h-4" /> Attach Chart Screenshot (Optional, Max 2MB)
            </Label>
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
            {formData.chartNote && (
              <img src={formData.chartNote} alt="Chart Note" className="mt-2 rounded-md max-h-48 border border-border" />
            )}
          </div>

          <div className="pt-4">
            <Button size="lg" className="w-full gap-2 text-lg" onClick={handleSave}>
              <Save className="w-5 h-5" /> Save Trade
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
