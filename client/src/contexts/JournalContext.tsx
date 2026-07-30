import React, { createContext, useContext, useEffect, useState } from "react";
import { Trade, sampleTrades } from "../data/tradeJournal";

interface JournalContextType {
  trades: Trade[];
  addTrade: (trade: Omit<Trade, "id">) => void;
  updateTrade: (id: string, trade: Partial<Trade>) => void;
  deleteTrade: (id: string) => void;
  weeklyReflection: string;
  setWeeklyReflection: (reflection: string) => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [trades, setTrades] = useState<Trade[]>(() => {
    try {
      const stored = localStorage.getItem("tradelog_trades");
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse trades from local storage");
    }
    return sampleTrades;
  });

  const [weeklyReflection, setWeeklyReflection] = useState(() => {
    return localStorage.getItem("tradelog_weekly_reflection") || "";
  });

  useEffect(() => {
    localStorage.setItem("tradelog_trades", JSON.stringify(trades));
  }, [trades]);

  useEffect(() => {
    localStorage.setItem("tradelog_weekly_reflection", weeklyReflection);
  }, [weeklyReflection]);

  const addTrade = (tradeData: Omit<Trade, "id">) => {
    const newTrade: Trade = {
      ...tradeData,
      id: crypto.randomUUID(),
    };
    setTrades((prev) => [newTrade, ...prev]);
  };

  const updateTrade = (id: string, updates: Partial<Trade>) => {
    setTrades((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTrade = (id: string) => {
    setTrades((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <JournalContext.Provider
      value={{ trades, addTrade, updateTrade, deleteTrade, weeklyReflection, setWeeklyReflection }}
    >
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error("useJournal must be used within a JournalProvider");
  }
  return context;
}
