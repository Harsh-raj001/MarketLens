import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, FastForward, LineChart } from "lucide-react";
import { HistoricalChart } from "./HistoricalChart";

interface HistoricalReplayProps {
  example: {
    asset: string;
    date: string;
    setup: string;
    outcome: string;
    explanation: string;
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
    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-inner border border-slate-800 my-4">
      <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-wide">Historical Replay</span>
          <span className="text-xs text-slate-400">{example.asset} • {example.date}</span>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        {/* Step 0: The Setup */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">1</div>
            <h4 className="text-sm font-semibold text-slate-200">Formation</h4>
          </div>
          <p className="text-sm text-slate-400 pl-8 leading-relaxed mb-4">
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
              className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white gap-2 w-full sm:w-auto"
            >
              <PlayCircle className="w-4 h-4" /> Play Next Candle
            </Button>
          </div>
        ) : (
          <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-900/50 flex items-center justify-center text-xs font-bold text-emerald-400">2</div>
                <h4 className="text-sm font-semibold text-emerald-400">Outcome</h4>
              </div>
              <p className="text-sm text-emerald-100/70 pl-8 leading-relaxed">
                {example.outcome}
              </p>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-4 ml-8 border border-slate-700/50 space-y-3">
              <div>
                <h5 className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Lens AI Explanation</h5>
                <p className="text-sm text-slate-400">
                  {example.explanation}
                </p>
              </div>
              <div className="border-t border-slate-700/50 pt-3">
                <h5 className="text-xs font-bold text-amber-500 mb-1 uppercase tracking-wider">Key Takeaway</h5>
                <p className="text-sm text-slate-400 italic">
                  Always wait for the market to confirm the pattern before committing capital.
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
