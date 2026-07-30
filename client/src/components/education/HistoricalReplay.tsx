import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, FastForward } from "lucide-react";

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
            <h4 className="text-sm font-semibold text-slate-200">The Setup</h4>
          </div>
          <p className="text-sm text-slate-400 pl-8 leading-relaxed">
            {example.setup}
          </p>
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
                <h4 className="text-sm font-semibold text-emerald-400">The Outcome</h4>
              </div>
              <p className="text-sm text-emerald-100/70 pl-8 leading-relaxed">
                {example.outcome}
              </p>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-4 ml-8 border border-slate-700/50">
              <h5 className="text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">Why it worked</h5>
              <p className="text-sm text-slate-400 italic">
                {example.explanation}
              </p>
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
