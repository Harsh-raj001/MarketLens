export interface LessonSpecification {
  topic: string;
  description: string;
  visualComponent?: string; // E.g., "Hammer", "RSI", "HeadAndShoulders"
  reliability?: number; // 1-5
  marketContext?: string;
  psychology?: string;
  failureCases?: string;
  historicalExample?: {
    asset: string;
    date: string;
    setup: string;
    outcome: string;
    explanation: string;
  };
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
  };
  relatedTopics?: string[];
}

export const sampleResponses: Record<string, LessonSpecification> = {
  "hammer": {
    topic: "Hammer Candlestick",
    description: "A Hammer is a bullish reversal candlestick pattern that forms after a decline. It has a small real body at the top and a long lower wick (at least twice the length of the body).",
    visualComponent: "Hammer",
    reliability: 4,
    marketContext: "Must appear after a confirmed downtrend.",
    psychology: "Sellers pushed the price down significantly during the session, but buyers stepped in aggressively, absorbing all the selling pressure and pushing the price back up near the open. This shows a massive shift in momentum from bears to bulls.",
    failureCases: "A Hammer can fail if the overall market context is in a strong, high-volume downtrend, or if the next candle gaps down and breaks below the wick low.",
    historicalExample: {
      asset: "NIFTY 50",
      date: "12 Feb 2025",
      setup: "NIFTY had fallen 400 points over 3 days. A hammer formed at a major support level (21,500).",
      outcome: "Price reversed and rallied 250 points over the next two sessions.",
      explanation: "The long lower wick showed complete rejection of lower prices by institutional buyers."
    },
    quiz: {
      question: "Which characteristic is essential for a valid Hammer pattern?",
      options: ["It must have a long upper wick.", "The lower wick must be at least twice the length of the real body.", "It must appear after an uptrend.", "It must be a green candle."],
      correctAnswer: 1
    },
    relatedTopics: ["Doji", "Engulfing", "Support and Resistance"]
  },
  "doji": {
    topic: "Doji Candlestick",
    description: "A Doji is a transitional candlestick pattern where the opening and closing prices are virtually equal, resulting in a cross or plus shape.",
    visualComponent: "Doji",
    reliability: 3,
    marketContext: "Can appear anywhere, but is most significant after an extended uptrend or downtrend.",
    psychology: "A Doji represents total market indecision. Neither buyers nor sellers were able to gain control by the end of the session. The prior trend is losing momentum.",
    failureCases: "A Doji in the middle of a sideways market is meaningless noise. It only holds weight after a strong trend.",
    historicalExample: {
      asset: "BANKNIFTY",
      date: "05 Jan 2025",
      setup: "BankNifty rallied for 5 straight days. A Doji formed at the top of the rally.",
      outcome: "The trend paused, and the index consolidated for a week before reversing.",
      explanation: "The Doji signaled that the bulls were exhausted."
    },
    quiz: {
      question: "What does a Doji primarily indicate about market sentiment?",
      options: ["Strong buying pressure", "Strong selling pressure", "Indecision and equilibrium", "A guaranteed reversal"],
      correctAnswer: 2
    },
    relatedTopics: ["Hammer", "Morning Star", "Trend Analysis"]
  },
  "engulfing": {
    topic: "Bullish Engulfing",
    description: "A Bullish Engulfing pattern is a two-candle reversal pattern. The first is a small red candle, followed by a larger green candle that completely 'engulfs' the real body of the first candle.",
    visualComponent: "Engulfing",
    reliability: 4,
    marketContext: "Appears at the bottom of a downtrend.",
    psychology: "Sellers were initially in control (small red candle). However, the next period opens lower but then sees a massive surge of buying pressure that completely overwhelms the previous day's selling, closing higher than the previous open.",
    failureCases: "Fails when the engulfing candle occurs on lower volume than the prior selling candles, indicating weak conviction from buyers.",
    quiz: {
      question: "In a Bullish Engulfing pattern, the second candle must:",
      options: ["Be smaller than the first candle", "Be red", "Completely cover the real body of the first candle", "Have long wicks"],
      correctAnswer: 2
    },
    relatedTopics: ["Hammer", "Support and Resistance", "Volume Analysis"]
  },
  "morning star": {
    topic: "Morning Star",
    description: "A Morning Star is a bullish, three-candle reversal pattern that occurs at the bottom of a downtrend.",
    visualComponent: "MorningStar",
    reliability: 5,
    marketContext: "Appears after a sustained downtrend.",
    psychology: "The first large red candle shows bears are in control. The second small candle (star) indicates indecision and a slowing of selling momentum. The third large green candle confirms that bulls have taken over.",
    failureCases: "If the third candle fails to close at least halfway up the body of the first red candle, the reversal is considered weak and may fail.",
    quiz: {
      question: "The second candle in a Morning Star pattern typically represents:",
      options: ["Strong buying", "Strong selling", "Indecision", "A breakout"],
      correctAnswer: 2
    }
  },
  "head and shoulders": {
    topic: "Head and Shoulders",
    description: "The Head and Shoulders pattern is a major reversal pattern composed of three peaks, with the middle peak (the head) being the highest.",
    visualComponent: "HeadAndShoulders",
    reliability: 4,
    marketContext: "Forms at the top of an uptrend.",
    psychology: "Buyers create a new high (left shoulder), then push even higher (head), but fail to maintain the momentum. The final push (right shoulder) fails to reach the head's peak, showing severe exhaustion before a breakdown below the neckline.",
    failureCases: "A 'fake breakdown' where price drops just below the neckline to stop out traders, then immediately surges back into an uptrend.",
    quiz: {
      question: "What must happen to confirm a Head and Shoulders pattern?",
      options: ["The right shoulder must be higher than the left", "Price must break below the neckline", "Volume must decrease on the breakdown", "The head must be a Doji"],
      correctAnswer: 1
    }
  },
  "rsi": {
    topic: "Relative Strength Index (RSI)",
    description: "The RSI is a momentum oscillator that measures the speed and magnitude of recent price changes to evaluate overbought or oversold conditions.",
    visualComponent: "RSI",
    reliability: 4,
    marketContext: "Used to identify potential reversal points or confirm trends.",
    psychology: "When RSI is above 70, the market is broadly considered 'overbought' (buyers might be exhausted). Below 30 is considered 'oversold' (panic selling might be ending). Divergence between RSI and price often signals a change in trader psychology.",
    failureCases: "In a very strong, sustained trend (like a massive bull run), RSI can remain 'overbought' (above 70) for weeks. Shorting simply because RSI is 80 is a common mistake that leads to heavy losses.",
    historicalExample: {
      asset: "NIFTY 50",
      date: "15 Oct 2024",
      setup: "NIFTY made a higher high in price, but the RSI made a lower high (Bearish Divergence).",
      outcome: "A sharp 500-point correction followed within 3 days.",
      explanation: "The divergence showed that while price was rising, the actual momentum (buying enthusiasm) was fading."
    },
    quiz: {
      question: "What does an RSI reading of 85 typically suggest?",
      options: ["The asset is heavily oversold.", "The asset is heavily overbought.", "The trend is neutral.", "It's a guaranteed sell signal."],
      correctAnswer: 1
    },
    relatedTopics: ["MACD", "Divergence", "Momentum"]
  },
  "macd": {
    topic: "MACD (Moving Average Convergence Divergence)",
    description: "MACD is a trend-following momentum indicator that shows the relationship between two moving averages of a security's price.",
    visualComponent: "MACD",
    reliability: 4,
    marketContext: "Best used in trending markets to identify entry points and trend strength.",
    psychology: "When the faster MACD line crosses above the slower Signal line, it shows short-term momentum is accelerating faster than long-term momentum, indicating rising bullish sentiment.",
    failureCases: "In choppy or sideways markets, MACD will produce frequent 'whipsaws' (false signals), causing traders to enter and exit at a loss.",
    quiz: {
      question: "A bullish MACD signal occurs when:",
      options: ["The MACD line crosses below the Signal line", "The MACD line crosses above the Signal line", "The histogram is red", "The RSI is above 70"],
      correctAnswer: 1
    }
  }
};
