import { Link, useLocation } from "wouter";
import { useState } from "react";
import {
  BookOpen,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Search,
  Target,
  LayoutDashboard,
  Brain,
  Shield,
  GraduationCap,
  Menu,
  X,
  Home,
  BookMarked,
  Calculator
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useMobile";
import FloatingAIChat from "./ai/FloatingAIChat";
import { CommandPalette } from "./ui/CommandPalette";
import { AnimatePresence, motion } from "framer-motion";

const navGroups = [
  {
    title: "Learn",
    items: [
      { label: "Home", href: "/", icon: Home },
      { label: "Learning Paths", href: "/paths", icon: GraduationCap },
      { label: "Learning Library", href: "/library", icon: BookOpen },
    ]
  },
  {
    title: "Visual Explorers",
    items: [
      { label: "Candlestick Explorer", href: "/candlestick-explorer", icon: TrendingUp },
      { label: "Chart Patterns", href: "/chart-patterns", icon: BarChart3 },
      { label: "Indicators", href: "/indicators", icon: TrendingUp },
      { label: "Dictionary", href: "/dictionary", icon: Search },
    ]
  },
  {
    title: "Topics",
    items: [
      { label: "Fundamentals", href: "/fundamentals", icon: BookOpen },
      { label: "Market Psychology", href: "/psychology", icon: Brain },
      { label: "Risk Management", href: "/risk-management", icon: Shield },
    ]
  },
  {
    title: "Journal (TradeLog)",
    items: [
      { label: "Dashboard", href: "/journal", icon: LayoutDashboard },
      { label: "Log Trade", href: "/journal/new", icon: BookMarked },
      { label: "Weekly Review", href: "/journal/review", icon: Target },
      { label: "Trading Calculator", href: "/calculator", icon: Calculator },
    ]
  },
  {
    title: "Engage",
    items: [
      { label: "Lens AI", href: "/ai-tutor", icon: MessageSquare },
      { label: "Daily Challenge", href: "/daily-challenge", icon: Target },
      { label: "Progress", href: "/progress", icon: LayoutDashboard },
    ]
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex bg-background">
      <CommandPalette />
      
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen z-50 lg:z-10 w-72 bg-card border-r border-border flex flex-col transition-transform duration-300 ease-out shadow-sm ${
          isMobile
            ? sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border/50">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 shrink-0 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 relative">
              <Search className="w-5 h-5 absolute" />
              <TrendingUp className="w-3 h-3 absolute mt-2 ml-2" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground leading-tight tracking-tight">
                MarketLens
              </h1>
              <p className="text-[11px] text-muted-foreground font-semibold tracking-wider mt-0.5">
                Learn Markets. Build Confidence.
              </p>
            </div>
          </Link>
          {/* Cmd K hint */}
          <div className="mt-6 flex items-center justify-between px-3 py-2 bg-muted/50 rounded-lg border border-border/50 text-xs text-muted-foreground font-medium">
            <span>Search</span>
            <div className="flex gap-1">
              <kbd className="px-1.5 py-0.5 bg-background rounded border border-border/60 shadow-sm font-sans">⌘</kbd>
              <kbd className="px-1.5 py-0.5 bg-background rounded border border-border/60 shadow-sm font-sans">K</kbd>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-8">
            {navGroups.map((group) => (
              <div key={group.title}>
                <h3 className="px-2 text-xs font-bold text-muted-foreground/70 tracking-widest uppercase mb-3">
                  {group.title}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = location === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => isMobile && setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        <item.icon className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                        <span className="truncate">{item.label}</span>
                        {isActive && (
                          <motion.div 
                            layoutId="activeNav"
                            className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* Bottom disclaimer */}
        <div className="p-5 border-t border-border/50 bg-muted/20">
          <p className="text-xs text-muted-foreground leading-relaxed">
            This platform is strictly educational. No buy/sell signals, no investment advice.
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Mobile header */}
        {isMobile && (
          <header className="sticky top-0 z-30 bg-card/90 backdrop-blur-xl border-b border-border/50 px-4 py-3 flex items-center gap-3 shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 shrink-0 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-sm relative">
                <Search className="w-4 h-4 absolute" />
                <TrendingUp className="w-2.5 h-2.5 absolute mt-1.5 ml-1.5" />
              </div>
              <span className="font-display text-lg font-bold">MarketLens</span>
            </div>
          </header>
        )}
        <div className="flex-1 p-6 lg:p-12 lg:px-16 max-w-[1600px] w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Global AI Chat */}
      <FloatingAIChat />
    </div>
  );
}
