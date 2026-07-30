import { BookOpen } from "lucide-react";
import { LegendCard, LegendType } from "@/components/education/LegendCard";

const LEGENDS: LegendType[] = [
  {
    id: "warren-buffett",
    name: "Warren Buffett",
    title: "The Oracle of Omaha",
    imageColor: "bg-blue-900",
    quotes: [
      "Be fearful when others are greedy, and greedy when others are fearful.",
      "Rule No. 1: Never lose money. Rule No. 2: Never forget rule No. 1.",
      "Price is what you pay. Value is what you get."
    ],
    philosophy: "Value Investing. Buffett looks for companies with strong fundamentals, a competitive advantage (a 'moat'), and competent management. He buys them when their intrinsic value is higher than their market price and holds them for the long term.",
    famousInvestments: ["Coca-Cola (Bought heavily after the 1987 crash)", "Apple (Massive position acquired starting in 2016)", "American Express", "Bank of America"],
    mistakesWarned: "He warns against over-diversification (which he calls 'protection against ignorance'), trading too frequently, and buying businesses you don't fully understand.",
    recommendedBooks: ["The Intelligent Investor by Benjamin Graham", "Security Analysis by Benjamin Graham and David Dodd"]
  },
  {
    id: "peter-lynch",
    name: "Peter Lynch",
    title: "The King of Growth at a Reasonable Price (GARP)",
    imageColor: "bg-emerald-900",
    quotes: [
      "Invest in what you know.",
      "In the stock market, the most important organ is the stomach. It's not the brain.",
      "Behind every stock is a company. Find out what it's doing."
    ],
    philosophy: "Lynch famously managed the Magellan Fund to a 29% average annual return. He believes average investors can beat Wall Street professionals by using their everyday knowledge to identify great consumer companies before Wall Street discovers them.",
    famousInvestments: ["Dunkin' Donuts", "Fannie Mae", "Ford", "Philip Morris"],
    mistakesWarned: "Selling winners too early and holding onto losers (which he calls 'cutting the flowers and watering the weeds').",
    recommendedBooks: ["One Up On Wall Street by Peter Lynch", "Beating the Street by Peter Lynch"]
  },
  {
    id: "rakesh-jhunjhunwala",
    name: "Rakesh Jhunjhunwala",
    title: "The Big Bull of India",
    imageColor: "bg-amber-900",
    quotes: [
      "Respect the market. Have an open mind. Know what to stake. Know when to take a loss. Be responsible.",
      "Anticipate trend and benefit from it. Traders should go against human nature.",
      "Buy right and hold tight."
    ],
    philosophy: "A mix of value investing and trading. He heavily researched Indian growth stories, bought them cheap, and held them for decades while using trading profits to build his long-term portfolio.",
    famousInvestments: ["Titan Company (Bought at ₹3, became his biggest wealth creator)", "Lupin", "CRISIL", "Star Health"],
    mistakesWarned: "He always warned against averaging down on losing positions. He believed in taking the loss and moving on rather than holding onto ego.",
    recommendedBooks: []
  },
  {
    id: "charlie-munger",
    name: "Charlie Munger",
    title: "The Master of Mental Models",
    imageColor: "bg-slate-800",
    quotes: [
      "A great business at a fair price is superior to a fair business at a great price.",
      "Show me the incentive and I will show you the outcome.",
      "The big money is not in the buying or the selling, but in the waiting."
    ],
    philosophy: "Munger relies on a 'latticework of mental models' from various disciplines (psychology, history, physics, mathematics) to make rational investment decisions. He pushed Buffett to focus on high-quality businesses rather than 'cigar butt' cheap stocks.",
    famousInvestments: ["Costco", "See's Candies", "BYD"],
    mistakesWarned: "He frequently warned against the psychological biases that cloud judgment, such as FOMO (Fear Of Missing Out), confirmation bias, and the tendency to gamble.",
    recommendedBooks: ["Poor Charlie's Almanack", "Influence by Robert Cialdini"]
  }
];

export default function MarketLegends() {
  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mt-8">
        <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-2">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="font-display text-4xl lg:text-5xl text-foreground tracking-tight">Learn from Market Legends</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Don't just idolize personalities—study their frameworks. Explore the philosophies that built the greatest fortunes in market history.
        </p>
      </div>

      <div className="grid gap-8 max-w-5xl mx-auto px-4">
        {LEGENDS.map(legend => (
          <LegendCard key={legend.id} legend={legend} />
        ))}
      </div>
    </div>
  );
}
