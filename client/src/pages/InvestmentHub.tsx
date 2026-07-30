import { useState } from "react";
import { 
  LineChart, Wallet, Building2, Coins, Gem, Landmark, ShieldCheck, PieChart, Sparkles, Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Import modules (we will create these next)
import StocksModule from "@/components/education/hub/StocksModule";
import MutualFundsModule from "@/components/education/hub/MutualFundsModule";
import ETFsModule from "@/components/education/hub/ETFsModule";
import BondsModule from "@/components/education/hub/BondsModule";
import GoldModule from "@/components/education/hub/GoldModule";
import DigitalGoldModule from "@/components/education/hub/DigitalGoldModule";
import FDModule from "@/components/education/hub/FDModule";
import PPFModule from "@/components/education/hub/PPFModule";

const TABS = [
  { id: "stocks", label: "Stocks", icon: LineChart },
  { id: "mf", label: "Mutual Funds", icon: PieChart },
  { id: "etf", label: "ETFs", icon: Wallet },
  { id: "bonds", label: "Bonds", icon: Building2 },
  { id: "gold", label: "Physical Gold", icon: Coins },
  { id: "digital-gold", label: "Digital Gold", icon: Gem },
  { id: "fd", label: "Fixed Deposits", icon: Landmark },
  { id: "ppf", label: "PPF / EPF", icon: ShieldCheck },
];

export default function InvestmentHub() {
  const [activeTab, setActiveTab] = useState("stocks");

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mt-8 px-4">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-2 shadow-sm border border-blue-100">
          <Building2 className="w-8 h-8" />
        </div>
        <h1 className="font-display text-4xl lg:text-5xl text-slate-900 tracking-tight font-extrabold">Investment Learning Hub</h1>
        <p className="text-xl text-slate-600 leading-relaxed font-medium">
          Explore every major asset class. Understand the risks, calculate returns, and learn how to build wealth securely.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 grid lg:grid-cols-[280px_1fr] gap-8 mt-12">
        {/* Vertical Sidebar Navigation */}
        <div className="flex flex-col gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 ${
                activeTab === tab.id 
                  ? "bg-slate-900 text-white shadow-md font-bold" 
                  : "hover:bg-slate-100 text-slate-600 hover:text-slate-900 font-semibold"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}

          <div className="mt-8 p-5 bg-purple-50 border border-purple-200 rounded-2xl space-y-3 shadow-sm">
            <h4 className="font-bold text-purple-900 flex items-center gap-2"><Brain className="w-5 h-5" /> Ask Lens AI</h4>
            <p className="text-sm text-purple-800 font-medium leading-relaxed">Select an asset class, then ask Lens AI any question to get contextual answers.</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-6 lg:p-10 shadow-sm min-h-[600px]">
          {activeTab === "stocks" && <StocksModule />}
          {activeTab === "mf" && <MutualFundsModule />}
          {activeTab === "etf" && <ETFsModule />}
          {activeTab === "bonds" && <BondsModule />}
          {activeTab === "gold" && <GoldModule />}
          {activeTab === "digital-gold" && <DigitalGoldModule />}
          {activeTab === "fd" && <FDModule />}
          {activeTab === "ppf" && <PPFModule />}
        </div>
      </div>
    </div>
  );
}
