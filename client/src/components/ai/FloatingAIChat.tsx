import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "wouter";
import { useUser } from "@/contexts/UserContext";
import { LensyLogo } from "../ui/LensyLogo";
import { generateMockResponse, Message } from "../../lib/mockAI";
import ReactMarkdown from "react-markdown";

export default function FloatingAIChat() {
  const { profile } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hi! I'm Lensy. Ask me about candlesticks, patterns, indicators, or market psychology." }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpenLensAi = (e: any) => {
      setIsOpen(true);
      if (e.detail?.prompt) {
        // Delay slightly for animation
        setTimeout(() => {
          const newMessages: Message[] = [...messages, { role: "user", content: e.detail.prompt }];
          setMessages(newMessages);
          
          setTimeout(() => {
            const responseContent = generateMockResponse(newMessages, profile?.experienceLevel);
            setMessages(prev => [...prev, { 
              role: "ai", 
              content: responseContent
            }]);
          }, 600);
        }, 300);
      }
    };

    window.addEventListener('open-lens-ai', handleOpenLensAi);
    return () => window.removeEventListener('open-lens-ai', handleOpenLensAi);
  }, [messages, profile?.experienceLevel]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      const responseContent = generateMockResponse(newMessages, profile?.experienceLevel);
      setMessages(prev => [...prev, { role: "ai", content: responseContent }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80 sm:w-96 h-[500px] flex flex-col shadow-2xl border-primary/20 bg-background overflow-hidden animate-in slide-in-from-bottom-5 fade-in-0 duration-300">
          <div className="flex items-center justify-between p-4 bg-teal-500 text-white border-b border-teal-600">
            <div className="flex items-center gap-2">
              <div className="bg-white rounded-full p-1 shadow-sm">
                <LensyLogo className="w-5 h-5" />
              </div>
              <span className="font-display font-bold">Lensy</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-teal-50 hover:bg-teal-600 hover:text-white rounded-full">
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <ScrollArea className="flex-1 p-4" ref={scrollContainerRef}>
            <div className="space-y-4 pb-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${msg.role === "user" ? "bg-teal-500 text-white rounded-br-sm shadow-sm" : "bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm"}`}>
                    <div className="text-sm">
                      {typeof msg.content === "string" ? (
                        <div className="prose prose-sm prose-teal max-w-none dark:prose-invert">
                          <ReactMarkdown>
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="font-bold">{msg.content.topic}</p>
                          <div className="prose prose-sm prose-teal max-w-none dark:prose-invert">
                            <ReactMarkdown>
                              {msg.content.description}
                            </ReactMarkdown>
                          </div>
                        </div>
                      )}
                    </div>
                    {msg.role === "ai" && (typeof msg.content !== "string" || msg.content.includes("Interactive Lens AI") || msg.content.includes("visual lesson")) && (
                      <Link href="/ai-tutor">
                        <Button variant="outline" size="sm" className="mt-3 w-full gap-2 text-xs h-8" onClick={() => setIsOpen(false)}>
                          Open Full Lesson <ExternalLink className="w-3 h-3" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
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
          className="w-14 h-14 rounded-full shadow-[0_8px_30px_rgb(20,184,166,0.3)] bg-teal-500 hover:bg-teal-600 border border-teal-400 text-white animate-in zoom-in-50 duration-300 group"
        >
          <LensyLogo className="w-7 h-7 group-hover:-rotate-12 transition-transform duration-300" animated />
        </Button>
      )}
    </div>
  );
}
