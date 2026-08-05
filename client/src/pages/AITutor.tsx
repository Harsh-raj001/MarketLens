import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, AlertTriangle } from "lucide-react";
import { LessonRenderer } from "@/components/education/LessonRenderer";
import { generateMockResponse, Message } from "@/lib/mockAI";
import ReactMarkdown from "react-markdown";

const suggestedQuestions = [
  "Explain the Hammer candlestick",
  "What does a Doji mean?",
  "How does a Bullish Engulfing work?",
  "Explain the RSI indicator",
];

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content: "Welcome to Lens AI! I am an AI-native learning platform. Ask me about a trading concept, and I'll generate a complete interactive lesson for you. Try asking about a 'Hammer' or 'RSI'.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responseContent = generateMockResponse(newMessages);
      const response: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: responseContent,
      };
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1200); // slightly longer delay to simulate "assembling" the lesson
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 h-[calc(100vh-6rem)]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl text-foreground">Interactive Lens AI</h1>
          <p className="text-sm text-muted-foreground">Dynamic visual learning platform</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200">
        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800">
          Lens AI is for educational purposes only. It does not provide buy/sell signals or investment advice.
        </p>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto space-y-6 pb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-5 h-5 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[90%] md:max-w-[85%] ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground px-5 py-3 rounded-2xl rounded-tr-sm text-sm"
                  : "bg-card border border-border/60 text-foreground p-6 rounded-2xl rounded-tl-sm shadow-sm w-full"
              }`}
            >
              {typeof msg.content === "string" ? (
                <div className="text-sm">
                  <div className={`prose prose-sm max-w-none ${msg.role === "user" ? "prose-invert text-primary-foreground" : "dark:prose-invert prose-teal"}`}>
                    <ReactMarkdown>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <LessonRenderer lesson={msg.content} onTopicClick={handleSend} />
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-5 h-5 text-foreground" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-4 justify-start">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="px-6 py-4 rounded-2xl rounded-tl-sm bg-card border border-border/60 shadow-sm">
              <div className="flex gap-1.5 items-center h-4">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                <span className="text-xs text-muted-foreground ml-2">Assembling visual lesson...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="px-4 py-2 rounded-full text-xs font-medium border border-border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          placeholder="Ask about a candlestick, pattern, or indicator..."
          className="flex-1 rounded-xl h-12 px-4 bg-background"
        />
        <Button
          onClick={() => handleSend(input)}
          disabled={!input.trim() || isTyping}
          className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-12 rounded-xl"
          size="icon"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
