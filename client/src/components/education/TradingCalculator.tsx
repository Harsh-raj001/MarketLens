import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";

export function TradingCalculator() {
  const [buyPrice, setBuyPrice] = useState<number | "">(100);
  const [sellPrice, setSellPrice] = useState<number | "">(105);
  const [quantity, setQuantity] = useState<number | "">(100);
  const [segment, setSegment] = useState("delivery"); // delivery, intraday, futures, options

  const bp = buyPrice === "" ? 0 : buyPrice;
  const sp = sellPrice === "" ? 0 : sellPrice;
  const qty = quantity === "" ? 0 : quantity;

  // Basic MVP Indian market calculator logic (Discount broker rates)
  const turnover = (bp + sp) * qty;
  const grossProfit = (sp - bp) * qty;

  let brokerage = 0;
  let stt = 0;
  let exchangeTxn = 0;
  let dpCharges = 0;
  let stampDuty = 0;

  if (segment === "delivery") {
    brokerage = 0; // Discount brokers usually 0 for delivery
    stt = Math.round(turnover * 0.001); // 0.1% on both buy and sell
    exchangeTxn = turnover * 0.0000345;
    stampDuty = (bp * qty) * 0.00015; // 0.015% only on buy side
    dpCharges = 15.93; // Flat ₹13.5 + 18% GST on sell side only
  } else if (segment === "intraday") {
    brokerage = Math.min(20, turnover * 0.0003) * 2; // Flat 20 or 0.03% (buy & sell)
    stt = Math.round((sp * qty) * 0.00025); // 0.025% on sell side only
    exchangeTxn = turnover * 0.0000345;
    stampDuty = (bp * qty) * 0.00003; // 0.003% on buy side
    dpCharges = 0; // No DP charges for intraday
  } else if (segment === "futures") {
    brokerage = Math.min(20, turnover * 0.0003) * 2;
    stt = Math.round((sp * qty) * 0.000125);
    exchangeTxn = turnover * 0.00002;
    stampDuty = (bp * qty) * 0.00002;
    dpCharges = 0;
  } else if (segment === "options") {
    brokerage = 40; // Flat ₹20 per executed order (buy + sell)
    stt = Math.round((sp * qty) * 0.000625); // on premium
    exchangeTxn = turnover * 0.00053;
    stampDuty = (bp * qty) * 0.00003;
    dpCharges = 0;
  }

  const sebiCharges = turnover * 0.000001; // ₹10 per crore
  const gst = (brokerage + exchangeTxn + sebiCharges) * 0.18; // 18% on brokerage + txn + sebi

  // DP charges already include GST in our simple calculation above.
  const totalTaxesAndCharges = brokerage + stt + exchangeTxn + sebiCharges + stampDuty + gst + (segment === "delivery" && grossProfit !== 0 ? dpCharges : 0);
  const netProfit = grossProfit - totalTaxesAndCharges;

  const formatCurrency = (val: number) => `₹${val.toFixed(2)}`;

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 my-6 text-slate-100 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50" />
      
      <div className="relative z-10 grid md:grid-cols-2 gap-8">
        
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-display text-white mb-2">Real Trading Costs</h3>
            <p className="text-slate-400 text-sm">Most beginners only think about brokerage. Discover the hidden costs of trading in Indian markets.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300 text-xs uppercase tracking-wider">Buy Price</Label>
              <Input 
                type="number" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300 text-xs uppercase tracking-wider">Sell Price</Label>
              <Input 
                type="number" value={sellPrice} onChange={(e) => setSellPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300 text-xs uppercase tracking-wider">Quantity</Label>
              <Input 
                type="number" value={quantity} onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300 text-xs uppercase tracking-wider">Segment</Label>
              <Select value={segment} onValueChange={setSegment}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delivery">Equity Delivery</SelectItem>
                  <SelectItem value="intraday">Equity Intraday</SelectItem>
                  <SelectItem value="futures">Futures</SelectItem>
                  <SelectItem value="options">Options</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3 flex gap-3 text-blue-200 text-xs">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" />
            <p>Calculations use standard discount broker rates (e.g., Zerodha) and current government/exchange rates. Actual charges may vary.</p>
          </div>
        </div>

        {/* Output Section (Receipt Style) */}
        <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-6 font-mono text-sm">
          <div className="text-center pb-4 border-b border-slate-800 border-dashed mb-4">
            <h4 className="text-slate-400 uppercase tracking-widest text-xs mb-1">Contract Note Breakdown</h4>
            <div className={`text-2xl font-bold ${grossProfit >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {grossProfit >= 0 ? "+" : ""}{formatCurrency(grossProfit)}
            </div>
            <div className="text-slate-500 text-xs">Gross P&L</div>
          </div>

          <div className="space-y-3">
            <ChargeRow label="Brokerage" value={brokerage} tooltip="Fee charged by your broker for facilitating the trade." />
            <ChargeRow label="STT/CTT" value={stt} tooltip="Securities Transaction Tax collected by the Government of India." />
            <ChargeRow label="Exchange Txn Chg" value={exchangeTxn} tooltip="Fee charged by NSE/BSE." />
            <ChargeRow label="SEBI Charges" value={sebiCharges} tooltip="Fee collected by the regulatory body, SEBI." />
            <ChargeRow label="Stamp Duty" value={stampDuty} tooltip="State government tax on buying securities." />
            <ChargeRow label="GST" value={gst} tooltip="18% tax on Brokerage, Exchange & SEBI charges." />
            {segment === "delivery" && (
              <ChargeRow label="DP Charges" value={dpCharges} tooltip="Charged by Depository (CDSL/NSDL) when selling delivery shares." />
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 border-dashed">
            <div className="flex justify-between items-center text-slate-300">
              <span>Total Charges:</span>
              <span className="text-red-400">-{formatCurrency(totalTaxesAndCharges)}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center text-lg">
            <span className="font-sans font-bold text-white">Net P&L:</span>
            <span className={`font-bold ${netProfit >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {netProfit >= 0 ? "+" : ""}{formatCurrency(netProfit)}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

function ChargeRow({ label, value, tooltip }: { label: string, value: number, tooltip: string }) {
  return (
    <div className="flex justify-between items-center group relative cursor-help">
      <span className="text-slate-400 border-b border-dotted border-slate-600">{label}</span>
      <span className="text-slate-300">{value.toFixed(2)}</span>
      
      {/* Tooltip on hover */}
      <div className="absolute left-0 -top-10 hidden group-hover:block z-20 w-48 bg-slate-800 text-slate-200 text-[10px] p-2 rounded shadow-xl border border-slate-700 font-sans">
        {tooltip}
      </div>
    </div>
  );
}
