import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TrendingUp, TrendingDown, Info, Brain, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

// High-quality mock data for MVP
const MARKET_DATA = [
  { id: "nifty", name: "NIFTY 50", value: 22419.95, change: 1.25, isUp: true, status: "Closed", type: "Index", desc: "The benchmark index of the Indian stock market, representing the weighted average of 50 of the largest Indian companies." },
  { id: "sensex", name: "SENSEX", value: 73961.31, change: 1.18, isUp: true, status: "Closed", type: "Index", desc: "The oldest index in India, tracking 30 well-established and financially sound companies listed on the BSE." },
  { id: "banknifty", name: "BANKNIFTY", value: 48923.55, change: -0.45, isUp: false, status: "Closed", type: "Index", desc: "An index representing the 12 most liquid and large capitalized Indian banking stocks." },
  { id: "vix", name: "India VIX", value: 14.85, change: 5.2, isUp: true, status: "Closed", type: "Volatility", desc: "The volatility index based on the NIFTY Index Option prices. A higher value indicates higher expected market volatility." },
  { id: "gold", name: "Gold (10g)", value: 71250, change: 0.8, isUp: true, status: "Open", type: "Commodity", desc: "A precious metal often used as a safe-haven asset to hedge against inflation and economic uncertainty." },
  { id: "btc", name: "Bitcoin", value: 64230.50, change: -2.1, isUp: false, status: "Open", type: "Crypto", desc: "The world's first decentralized digital currency and the largest cryptocurrency by market capitalization." },
];

export function MarketPulse() {
  const [selectedAsset, setSelectedAsset] = useState<typeof MARKET_DATA[0] | null>(null);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 py-12 relative z-20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-2xl text-foreground flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary" /> Live Market Pulse
        </h3>
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Simulated Feed
        </div>
      </div>

      {/* Marquee / Grid of Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {MARKET_DATA.map((asset) => (
          <motion.div
            key={asset.id}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-card border border-border/60 rounded-xl p-4 cursor-pointer hover:border-primary/50 transition-colors shadow-sm"
            onClick={() => setSelectedAsset(asset)}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{asset.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${asset.status === 'Open' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'}`}>
                {asset.status}
              </span>
            </div>
            
            <div className="text-lg font-bold text-foreground mb-1">
              {asset.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </div>
            
            <div className={`flex items-center gap-1 text-sm font-medium ${asset.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
              {asset.isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {asset.isUp ? '+' : ''}{asset.change}%
            </div>
            
            {/* Fake Sparkline */}
            <div className="mt-4 h-8 w-full">
              <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible">
                <polyline 
                  points={asset.isUp ? "0,15 20,12 40,16 60,8 80,10 100,2" : "0,5 20,8 40,4 60,14 80,12 100,18"} 
                  fill="none" 
                  stroke={asset.isUp ? "#10b981" : "#ef4444"} 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Educational Modal */}
      <Dialog open={!!selectedAsset} onOpenChange={(open) => !open && setSelectedAsset(null)}>
        <DialogContent className="sm:max-w-[500px] bg-card border-border/60 text-foreground">
          {selectedAsset && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl font-display">
                  {selectedAsset.name}
                  <span className="text-xs font-mono px-2 py-1 bg-muted rounded-full text-muted-foreground font-normal">
                    {selectedAsset.type}
                  </span>
                </DialogTitle>
              </DialogHeader>
              
              <div className="py-6 space-y-6">
                <div className="flex justify-between items-end border-b border-border/50 pb-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Current Value</div>
                    <div className="text-4xl font-bold font-mono">
                      {selectedAsset.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className={`text-xl font-medium flex items-center gap-1 ${selectedAsset.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                    {selectedAsset.isUp ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                    {selectedAsset.isUp ? '+' : ''}{selectedAsset.change}%
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Brain className="w-24 h-24" />
                  </div>
                  <h4 className="text-primary font-semibold mb-2 flex items-center gap-2 relative z-10">
                    <Info className="w-4 h-4" /> What is this?
                  </h4>
                  <p className="text-muted-foreground leading-relaxed relative z-10">
                    {selectedAsset.desc}
                  </p>
                  
                  <div className="mt-6 pt-4 border-t border-primary/20 relative z-10">
                    <Button 
                      variant="outline" 
                      className="w-full bg-background/50 border-primary/30 hover:bg-primary/10 text-primary"
                      onClick={() => {
                        const event = new CustomEvent('open-lens-ai', { 
                          detail: { prompt: `What is ${selectedAsset.name} and why is it important to track?` }
                        });
                        window.dispatchEvent(event);
                      }}
                    >
                      <Brain className="w-4 h-4 mr-2" /> Ask Lens AI to explain {selectedAsset.name} deeper
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
