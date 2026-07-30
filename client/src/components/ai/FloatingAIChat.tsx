import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sampleResponses } from "../../data/knowledgeBase";
import { Link } from "wouter";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function FloatingAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hi! I'm your AI Trading Tutor. Ask me about candlesticks, patterns, indicators, or market psychology." }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");

    setTimeout(() => {
      const lowerInput = userMsg.toLowerCase();
      
      // Check for refusals
      if (lowerInput.includes("buy") || lowerInput.includes("sell") || lowerInput.includes("signal") || lowerInput.includes("recommend")) {
        setMessages((prev) => [...prev, { role: "ai", content: "I'm sorry, but I can't provide buy/sell signals or investment recommendations. This platform is strictly for educational purposes." }]);
        return;
      }

      // Check sampleResponses
      let found = false;
      for (const [key, lesson] of Object.entries(sampleResponses)) {
        if (lowerInput.includes(key)) {
          found = true;
          setMessages((prev) => [...prev, { 
            role: "ai", 
            content: `**${lesson.topic}**: ${lesson.description}\n\nI have a full interactive visual lesson on this! Open the Interactive AI Tutor to see the chart, psychology, and historical examples.` 
          }]);
          break;
        }
      }

      if (!found) {
        setMessages((prev) => [...prev, { role: "ai", content: "I'm not sure about that. Try asking about a 'Hammer', 'Doji', 'Engulfing', or 'RSI'." }]);
      }
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80 sm:w-96 h-[500px] flex flex-col shadow-2xl border-primary/20 bg-background overflow-hidden animate-in slide-in-from-bottom-5 fade-in-0 duration-300">
          <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-display">AI Tutor</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-primary/90 hover:text-white">
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted text-foreground rounded-tl-sm"}`}>
                    <span className="text-sm whitespace-pre-wrap">{msg.content}</span>
                    {msg.role === "ai" && msg.content.includes("Interactive AI Tutor") && (
                      <Link href="/ai-tutor">
                        <Button variant="outline" size="sm" className="mt-3 w-full gap-2 text-xs h-8" onClick={() => setIsOpen(false)}>
                          Open Full Lesson <ExternalLink className="w-3 h-3" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-3 bg-muted/50 border-t border-border">
            <div className="text-[10px] text-center text-muted-foreground mb-2">
              Educational only. Not investment advice.
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Ask about RSI, FOMO..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-background"
              />
              <Button size="icon" onClick={handleSend}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="w-14 h-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground animate-in zoom-in-50 duration-300"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
}
