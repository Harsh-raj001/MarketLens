import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info, Brain, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EXPLANATIONS: Record<string, { title: string, collector: string, why: string, when: string }> = {
  grossProfit: {
    title: "Gross Profit",
    collector: "You (Temporarily)",
    why: "This is the raw difference between your buy and sell price multiplied by quantity.",
    when: "Always calculated first, before any taxes, fees, or broker charges are deducted."
  },
  brokerage: {
    title: "Brokerage Fee",
    collector: "Your Broker (e.g., Zerodha, Upstox)",
    why: "This is the service fee your broker charges for providing the trading platform and executing your order.",
    when: "Usually ₹20 flat or 0.03% (whichever is lower) for Intraday/F&O. Most discount brokers charge ₹0 for Equity Delivery."
  },
  stt: {
    title: "Securities Transaction Tax (STT)",
    collector: "Government of India",
    why: "A direct tax levied on every purchase and sale of securities listed on recognized stock exchanges in India.",
    when: "Applies heavily to Equity Delivery (0.1% on both buy and sell). For Intraday/F&O, it only applies to the sell side."
  },
  exchangeTxn: {
    title: "Exchange Transaction Charges",
    collector: "Stock Exchange (NSE / BSE)",
    why: "The fee charged by the exchange for matching your buy and sell orders on their infrastructure.",
    when: "Applies to every single executed order (both buy and sell) across all segments."
  },
  dpCharges: {
    title: "Depository Participant (DP) Charges",
    collector: "Depository (CDSL / NSDL) & Broker",
    why: "Charged when shares are debited (removed) from your Demat account.",
    when: "Only applies when you SELL shares in Equity Delivery. Never applies to Intraday or F&O because shares never enter your Demat account."
  },
  stampDuty: {
    title: "Stamp Duty",
    collector: "State Government",
    why: "A tax levied by the state on the transfer of financial instruments.",
    when: "Only applies to the BUY side of the transaction. Never charged on selling."
  },
  gst: {
    title: "Goods and Services Tax (GST)",
    collector: "Government of India",
    why: "Standard 18% service tax applied to financial services.",
    when: "Calculated as 18% of the sum of (Brokerage + Exchange Charges + SEBI Charges)."
  },
  sebiCharges: {
    title: "SEBI Turnover Fees",
    collector: "Securities and Exchange Board of India (SEBI)",
    why: "Used to fund the regulatory body that monitors and protects the Indian stock markets.",
    when: "Applies to all trades at a flat rate of ₹10 per crore of turnover."
  },
  netProfit: {
    title: "Net Profit",
    collector: "You (Permanently)",
    why: "The actual money that hits your bank account after the government, the exchange, and your broker have all taken their cut.",
    when: "This is the only number that matters for your trading journal and tax returns."
  }
};

export function TradingCalculator() {
  const [buyPrice, setBuyPrice] = useState<number | "">(100);
  const [sellPrice, setSellPrice] = useState<number | "">(105);
  const [quantity, setQuantity] = useState<number | "">(100);
  const [segment, setSegment] = useState("delivery"); 
  const [activeCharge, setActiveCharge] = useState<string>("stt");

  const bp = buyPrice === "" ? 0 : buyPrice;
  const sp = sellPrice === "" ? 0 : sellPrice;
  const qty = quantity === "" ? 0 : quantity;

  const turnover = (bp + sp) * qty;
  const grossProfit = (sp - bp) * qty;

  let brokerage = 0;
  let stt = 0;
  let exchangeTxn = 0;
  let dpCharges = 0;
  let stampDuty = 0;

  if (segment === "delivery") {
    brokerage = 0; 
    stt = Math.round(turnover * 0.001); 
    exchangeTxn = turnover * 0.0000345;
    stampDuty = (bp * qty) * 0.00015; 
    dpCharges = 15.93; 
  } else if (segment === "intraday") {
    brokerage = Math.min(20, turnover * 0.0003) * 2; 
    stt = Math.round((sp * qty) * 0.00025); 
    exchangeTxn = turnover * 0.0000345;
    stampDuty = (bp * qty) * 0.00003; 
    dpCharges = 0; 
  } else if (segment === "futures") {
    brokerage = Math.min(20, turnover * 0.0003) * 2;
    stt = Math.round((sp * qty) * 0.000125);
    exchangeTxn = turnover * 0.00002;
    stampDuty = (bp * qty) * 0.00002;
    dpCharges = 0;
  } else if (segment === "options") {
    brokerage = 40; 
    stt = Math.round((sp * qty) * 0.000625); 
    exchangeTxn = turnover * 0.00053;
    stampDuty = (bp * qty) * 0.00003;
    dpCharges = 0;
  }

  const sebiCharges = turnover * 0.000001; 
  const gst = (brokerage + exchangeTxn + sebiCharges) * 0.18; 

  const totalTaxesAndCharges = brokerage + stt + exchangeTxn + sebiCharges + stampDuty + gst + (segment === "delivery" && grossProfit !== 0 ? dpCharges : 0);
  const netProfit = grossProfit - totalTaxesAndCharges;

  const formatCurrency = (val: number) => `₹${val.toFixed(2)}`;

  const getChargeValue = (id: string): number => {
    switch (id) {
      case "brokerage": return brokerage;
      case "stt": return stt;
      case "exchangeTxn": return exchangeTxn;
      case "sebiCharges": return sebiCharges;
      case "stampDuty": return stampDuty;
      case "gst": return gst;
      case "dpCharges": return dpCharges;
      default: return 0;
    }
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-6 md:p-8 my-6 text-slate-900 shadow-sm relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-80" />
      
      <div className="relative z-10 grid lg:grid-cols-2 gap-8">
        
        {/* Left Column: Inputs & Receipt */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-display text-slate-900 font-extrabold mb-2">Real Trading Costs</h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">Most beginners only think about brokerage. Discover the hidden costs of trading in Indian markets.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-600 font-bold text-xs uppercase tracking-wider">Buy Price</Label>
              <Input 
                type="number" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="bg-slate-50 border-slate-200 text-slate-900 font-medium h-11 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600 font-bold text-xs uppercase tracking-wider">Sell Price</Label>
              <Input 
                type="number" value={sellPrice} onChange={(e) => setSellPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="bg-slate-50 border-slate-200 text-slate-900 font-medium h-11 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600 font-bold text-xs uppercase tracking-wider">Quantity</Label>
              <Input 
                type="number" value={quantity} onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
                className="bg-slate-50 border-slate-200 text-slate-900 font-medium h-11 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600 font-bold text-xs uppercase tracking-wider">Segment</Label>
              <Select value={segment} onValueChange={setSegment}>
                <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-900 font-medium h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  <SelectItem value="delivery">Equity Delivery</SelectItem>
                  <SelectItem value="intraday">Equity Intraday</SelectItem>
                  <SelectItem value="futures">Futures</SelectItem>
                  <SelectItem value="options">Options</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Interactive Receipt */}
          <div className="bg-slate-50 shadow-sm rounded-2xl border border-slate-200 p-6 font-mono text-sm relative">
            <div className="text-center pb-4 border-b border-slate-300 border-dashed mb-4">
              <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-1">Contract Note Breakdown</h4>
              <div 
                className={`text-2xl font-bold cursor-pointer transition-colors ${activeCharge === 'grossProfit' ? 'text-blue-600' : grossProfit >= 0 ? "text-emerald-600" : "text-red-500"}`}
                onClick={() => setActiveCharge('grossProfit')}
              >
                {grossProfit >= 0 ? "+" : ""}{formatCurrency(grossProfit)}
              </div>
              <div className="text-slate-400 font-medium text-xs mt-1">Click any row for AI explanation ↗</div>
            </div>

            <div className="space-y-1">
              <ChargeRow id="brokerage" label="Brokerage" value={brokerage} active={activeCharge} onClick={setActiveCharge} />
              <ChargeRow id="stt" label="STT/CTT" value={stt} active={activeCharge} onClick={setActiveCharge} />
              <ChargeRow id="exchangeTxn" label="Exchange Txn Chg" value={exchangeTxn} active={activeCharge} onClick={setActiveCharge} />
              <ChargeRow id="sebiCharges" label="SEBI Charges" value={sebiCharges} active={activeCharge} onClick={setActiveCharge} />
              <ChargeRow id="stampDuty" label="Stamp Duty" value={stampDuty} active={activeCharge} onClick={setActiveCharge} />
              <ChargeRow id="gst" label="GST" value={gst} active={activeCharge} onClick={setActiveCharge} />
              {segment === "delivery" && (
                <ChargeRow id="dpCharges" label="DP Charges" value={dpCharges} active={activeCharge} onClick={setActiveCharge} />
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-300 border-dashed flex justify-between items-center text-slate-500 font-medium px-2">
              <span>Total Taxes & Fees:</span>
              <span className="text-red-500 font-bold">-{formatCurrency(totalTaxesAndCharges)}</span>
            </div>

            <div 
              className={`mt-4 pt-4 border-t border-slate-300 flex justify-between items-center text-lg px-2 cursor-pointer rounded-lg p-2 transition-colors ${activeCharge === 'netProfit' ? 'bg-blue-50 ring-1 ring-blue-200' : 'hover:bg-slate-100'}`}
              onClick={() => setActiveCharge('netProfit')}
            >
              <span className="font-sans font-bold text-slate-800">Net P&L:</span>
              <span className={`font-bold ${netProfit >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                {netProfit >= 0 ? "+" : ""}{formatCurrency(netProfit)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: AI Explainer Module */}
        <div className="flex flex-col h-full">
          <div className="flex-1 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col">
            <div className="h-12 border-b border-slate-200 bg-slate-50 flex items-center px-4 gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-300" />
                <div className="w-3 h-3 rounded-full bg-slate-300" />
                <div className="w-3 h-3 rounded-full bg-slate-300" />
              </div>
              <div className="flex-1 bg-white border border-slate-200 rounded-md h-7 flex items-center px-3 gap-2">
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span className="text-xs text-slate-500 font-mono font-medium">Lens AI Explainer</span>
              </div>
            </div>

            <div className="flex-1 p-8 relative overflow-hidden bg-white">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeCharge}
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                      <Brain className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-display text-slate-900 font-bold">{EXPLANATIONS[activeCharge].title}</h4>
                      <p className="text-sm font-medium text-slate-500 mt-1">Collected by: <span className="text-blue-600">{EXPLANATIONS[activeCharge].collector}</span></p>
                    </div>
                  </div>

                  <div className="space-y-6 flex-1">
                    <div className="space-y-2">
                      <h5 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <Info className="w-4 h-4" /> Why does this exist?
                      </h5>
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {EXPLANATIONS[activeCharge].why}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <Info className="w-4 h-4" /> When does it apply?
                      </h5>
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {EXPLANATIONS[activeCharge].when}
                      </p>
                    </div>
                  </div>
                  
                  {activeCharge !== 'netProfit' && activeCharge !== 'grossProfit' && (
                    <div className="mt-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm text-amber-700 dark:text-amber-300">
                      <strong>AI Tip:</strong> This charge ate <span className="font-bold">{formatCurrency(getChargeValue(activeCharge))}</span> of your profit on this specific trade setup. 
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function ChargeRow({ id, label, value, active, onClick }: { id: string, label: string, value: number, active: string, onClick: (id: string) => void }) {
  const isActive = active === id;
  
  return (
    <div 
      onClick={() => onClick(id)}
      className={`flex justify-between items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isActive ? 'bg-blue-50 ring-1 ring-blue-200' : 'hover:bg-slate-100'}`}
    >
      <span className={`border-b border-dotted font-medium ${isActive ? 'text-blue-900 border-transparent' : 'text-slate-600 border-slate-300'}`}>{label}</span>
      <span className={isActive ? 'text-blue-900 font-bold' : 'text-slate-700 font-medium'}>{value.toFixed(2)}</span>
    </div>
  );
}
