import { sampleResponses, LessonSpecification } from "../data/knowledgeBase";

export type MessageContent = string | LessonSpecification;

export interface Message {
  id?: number;
  role: "user" | "ai" | "assistant";
  content: MessageContent;
}

export function generateMockResponse(messages: Message[], profileLevel?: string): MessageContent {
  if (!messages || messages.length === 0) {
    return "Hi! I'm Lensy. Ask me about candlesticks, patterns, indicators, or market psychology.";
  }

  const lastUserMsg = messages[messages.length - 1];
  if (lastUserMsg.role !== "user") {
    return "I'm here to help! What's your question?";
  }

  const query = (lastUserMsg.content as string).toLowerCase();

  // Safety checks
  if (query.includes("buy") || query.includes("sell") || query.includes("signal") || query.includes("recommend")) {
    return "I'm sorry, but I can't provide buy/sell signals or investment recommendations. This platform is strictly for educational purposes.";
  }

  // Cost calculator
  if (query.includes("profit") || query.includes("cost") || query.includes("brokerage") || query.includes("tax") || query.includes("charges")) {
    return sampleResponses["trading costs"];
  }

  // ---------------------------------------------------------
  // CONTEXT AWARENESS & REPETITION AVOIDANCE
  // ---------------------------------------------------------
  
  // Extract previous topics discussed
  const previousTopics = messages.slice(0, -1).map(m => {
    if (typeof m.content === "string") return m.content.toLowerCase();
    return (m.content as LessonSpecification).topic.toLowerCase();
  });
  const conversationHistory = previousTopics.join(" ");

  // Check if it's a follow-up asking for an example or more detail
  const isFollowUp = query.includes("example") || query.includes("explain more") || query.includes("what about") || query.includes("tell me more");
  
  if (isFollowUp) {
    // Determine the last discussed topic
    for (const [key, lesson] of Object.entries(sampleResponses)) {
      if (conversationHistory.includes(key.toLowerCase()) || conversationHistory.includes(lesson.topic.toLowerCase())) {
        if (query.includes("example") && lesson.historicalExample) {
          return `Sure, here is an example of a **${lesson.topic}** in action:\n\n**Asset:** ${lesson.historicalExample.asset} (${lesson.historicalExample.date})\n**Setup:** ${lesson.historicalExample.setup}\n**Outcome:** ${lesson.historicalExample.outcome}\n\n*Why it worked:* ${lesson.historicalExample.explanation}`;
        }
        if (lesson.psychology) {
          return `To expand on the **${lesson.topic}**, the psychology behind it is fascinating:\n\n${lesson.psychology}\n\nWould you like to take a quick quiz on this?`;
        }
        return `We were talking about **${lesson.topic}**. It generally indicates ${lesson.marketContext}. What else would you like to know?`;
      }
    }
  }

  // ---------------------------------------------------------
  // TOPIC MATCHING
  // ---------------------------------------------------------
  
  // Pseudo-semantic intent map
  const intentMap: Record<string, string> = {
    "fake breakout": "head and shoulders",
    "fake breakdown": "head and shoulders",
    "indecision": "doji",
    "momentum": "rsi",
    "reversal": "hammer",
    "trend following": "macd",
  };
  
  for (const [intent, key] of Object.entries(intentMap)) {
    if (query.includes(intent)) {
      return sampleResponses[key];
    }
  }

  // Direct keyword matching
  for (const [key, lesson] of Object.entries(sampleResponses)) {
    if (query.includes(key.toLowerCase())) {
      // Add slight variety based on profile experience
      if (profileLevel && typeof lesson !== "string") {
        const prefix = (profileLevel === 'new' || profileLevel === 'basics') 
          ? `Since you're learning the basics, let's keep this simple:\n\n`
          : `Looking at this from a technical perspective:\n\n`;
        
        return {
          ...lesson,
          description: prefix + lesson.description
        };
      }
      return lesson;
    }
  }

  // Unhandled query fallback with randomization to prevent repetitive "I don't know"
  const fallbacks = [
    "I'm not completely sure about that. I specialize in topics like the 'Hammer', 'Doji', 'Engulfing', 'RSI', or 'Trading Costs'. Could you ask about one of those?",
    "That's an interesting question! While I don't have a specific visual lesson for this exact query yet, you can try asking me to explain a 'Hammer' or 'RSI'.",
    "I'm still learning about that topic. Would you like me to explain how a 'Morning Star' or 'Head and Shoulders' pattern works instead?"
  ];
  
  // Hash the query to consistently return the same fallback for the exact same unknown question, but different for others.
  const hash = query.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return fallbacks[hash % fallbacks.length];
}
