import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, FastForward, LineChart, History } from "lucide-react";
import { HistoricalChart } from "./HistoricalChart";

interface HistoricalReplayProps {
  example: {
    asset: string;
    date: string;
    setup: string;
    outcome: string;
    explanation: string;
    lesson?: string;
  };
}

export function HistoricalReplay({ example }: HistoricalReplayProps) {
  const [step, setStep] = useState<0 | 1>(0);

  // Dummy OHLC data for demonstration
  const baseData = [
    { time: '2025-02-01', open: 150, high: 155, low: 148, close: 149 },
    { time: '2025-02-02', open: 149, high: 151, low: 145, close: 146 },
    { time: '2025-02-03', open: 146, high: 147, low: 140, close: 142 },
    { time: '2025-02-04', open: 142, high: 144, low: 138, close: 139 },
    { time: '2025-02-05', open: 139, high: 141, low: 135, close: 136 },
    { time: '2025-02-08', open: 136, high: 140, low: 132, close: 139 }, // Hammer
  ];

  const futureData = [
    { time: '2025-02-09', open: 140, high: 145, low: 139, close: 144 },
    { time: '2025-02-10', open: 144, high: 150, low: 143, close: 149 },
    { time: '2025-02-11', open: 149, high: 156, low: 148, close: 155 },
  ];

  const currentData = step === 0 ? baseData : [...baseData, ...futureData];
  const markers = step === 1 ? [{ time: '2025-02-08', position: 'belowBar' as const, color: '#10b981', shape: 'arrowUp' as const, text: 'Pattern Trigger' }] : [];

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-inner border border-border/60 my-4">
      <div className="bg-muted/30 px-4 py-2 border-b border-border/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-primary" />
          <span className="font-semibold text-sm text-foreground">Historical Example</span>
          <span className="text-xs text-muted-foreground">{example.asset} • {example.date}</span>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        {/* Step 0: The Setup */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">1</div>
            <div className="text-sm font-medium text-foreground">The Setup</div>
          </div>
          <p className="text-sm text-muted-foreground pl-8 leading-relaxed mb-4">
            {example.setup}
          </p>
          <div className="pl-8 mb-4">
            <HistoricalChart data={currentData} markers={markers} />
          </div>
        </div>

        {/* Step 1: The Outcome (Hidden initially) */}
        {step === 0 ? (
          <div className="pl-8 pt-2">
            <Button 
              onClick={() => setStep(1)} 
              variant="outline" 
              className="bg-muted border-border/50 text-foreground hover:bg-muted/80 gap-2 w-full sm:w-auto"
            >
              <PlayCircle className="w-4 h-4" /> Play Next Candle
            </Button>
          </div>
        ) : (
          <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-600">2</div>
                <h4 className="text-sm font-semibold text-emerald-600">Outcome</h4>
              </div>
              <p className="text-sm text-muted-foreground pl-8 leading-relaxed">
                {example.outcome}
              </p>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4 ml-8 border border-border/50 space-y-3">
              <div>
                <h5 className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Lens AI Explanation</h5>
                <p className="text-sm text-foreground">
                  {example.explanation}
                </p>
              </div>
              <div className="border-t border-border/50 pt-3">
                <h5 className="text-xs font-bold text-emerald-600 mb-1 uppercase tracking-wider">Lesson</h5>
                <p className="text-sm text-foreground">
                  {example.lesson || example.explanation}
                </p>
              </div>
            </div>
            
            <div className="pl-8 pt-2">
              <Button 
                onClick={() => setStep(0)} 
                variant="ghost" 
                size="sm"
                className="text-slate-500 hover:text-slate-300 p-0 h-auto"
              >
                Reset Replay
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
