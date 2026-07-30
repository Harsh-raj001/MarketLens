export type Instrument = "NIFTY 50" | "BANKNIFTY" | "FINNIFTY" | "MIDCPNIFTY" | "Other";
export type Direction = "LONG" | "SHORT";
export type MarketCondition = "TRENDING" | "RANGING" | "VOLATILE" | "EXPIRY_WEEK";
export type Outcome = "WIN" | "LOSS" | "BREAKEVEN";

export interface Trade {
  id: string;
  instrument: Instrument;
  direction: Direction;
  entryPrice: number;
  exitPrice: number;
  stopLoss: number;
  quantity: number;
  entryTime: string; // ISO string
  exitTime: string; // ISO string
  setupTags: string[];
  marketCondition: MarketCondition;
  isExpiryWeek: boolean;
  contextEmotion: string;
  chartNote?: string; // Base64 image data URL
}

export interface TradeMetrics {
  points: number;
  pnl: number;
  riskReward: number;
  outcome: Outcome;
}

export function calculateTradeMetrics(trade: Trade): TradeMetrics {
  const points =
    trade.direction === "LONG"
      ? trade.exitPrice - trade.entryPrice
      : trade.entryPrice - trade.exitPrice;

  const pnl = points * trade.quantity;

  const riskDistance = Math.abs(trade.entryPrice - trade.stopLoss);
  // Prevent division by zero if stop loss is exactly entry
  const riskReward = riskDistance === 0 ? 0 : Math.abs(points) / riskDistance;

  let outcome: Outcome = "BREAKEVEN";
  // Consider within 2 points as breakeven to account for slippage/fees lightly
  if (points > 2) {
    outcome = "WIN";
  } else if (points < -2) {
    outcome = "LOSS";
  }

  return { points, pnl, riskReward, outcome };
}

export const sampleTrades: Trade[] = [
  {
    id: "sample-trade-1",
    instrument: "NIFTY 50",
    direction: "LONG",
    entryPrice: 22000,
    exitPrice: 22040,
    stopLoss: 21980,
    quantity: 50,
    entryTime: new Date("2026-02-10T10:15:00Z").toISOString(),
    exitTime: new Date("2026-02-10T10:45:00Z").toISOString(),
    setupTags: ["RSI Divergence"],
    marketCondition: "TRENDING",
    isExpiryWeek: false,
    contextEmotion: "Exited early out of fear of giving back profits. The chart still looked strong but I saw a small red candle and panicked. Price then ran another 120 points after I exited. Need to trust my original targets.",
  },
  {
    id: "sample-trade-2",
    instrument: "NIFTY 50",
    direction: "SHORT",
    entryPrice: 22150,
    exitPrice: 22200, // Loss
    stopLoss: 22200,
    quantity: 50,
    entryTime: new Date("2026-02-12T11:00:00Z").toISOString(),
    exitTime: new Date("2026-02-12T11:30:00Z").toISOString(),
    setupTags: ["Bollinger Squeeze"],
    marketCondition: "RANGING",
    isExpiryWeek: true,
    contextEmotion: "Stop loss hit on expiry day volatility. I knew ranging markets during expiry week are dangerous for breakouts, but forced the trade anyway out of FOMO.",
  }
];
