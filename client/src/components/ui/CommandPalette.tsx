import * as React from "react"
import {
  BookOpen,
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  LineChart,
  Search,
  BookMarked,
  Brain,
  Shield,
  TrendingUp,
  MessageSquare
} from "lucide-react"
import { useLocation } from "wouter"
import { Command } from "cmdk"
import { useEffect, useState } from "react"

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [, setLocation] = useLocation()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      if (e.key === "Escape") {
        setOpen(false)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  if (!open) return null

  return (
    <div 
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-in fade-in flex items-start justify-center pt-[15vh]"
      onClick={() => setOpen(false)}
    >
      <Command
        className="w-full max-w-lg bg-card rounded-xl border border-border shadow-2xl overflow-hidden"
        label="Global Command Menu"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-border px-3">
          <Search className="w-5 h-5 text-muted-foreground mr-2" />
          <Command.Input
            autoFocus
            placeholder="Search concepts, tools, or jump to..."
            className="flex-1 h-12 bg-transparent border-none outline-none focus:ring-0 text-sm text-foreground placeholder:text-muted-foreground"
          />
          <div className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded-md border border-border/50">ESC</div>
        </div>
        <Command.List className="max-h-[300px] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
            No results found.
          </Command.Empty>

          <Command.Group heading={<div className="px-2 py-1 text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Features</div>}>
            <Command.Item
              onSelect={() => runCommand(() => setLocation("/ai-tutor"))}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-foreground cursor-pointer hover:bg-primary/5 hover:text-primary data-[selected=true]:bg-primary/5 data-[selected=true]:text-primary"
            >
              <MessageSquare className="w-4 h-4" /> Lens AI
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => setLocation("/journal"))}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-foreground cursor-pointer hover:bg-primary/5 hover:text-primary data-[selected=true]:bg-primary/5 data-[selected=true]:text-primary"
            >
              <BookMarked className="w-4 h-4" /> TradeLog Journal
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => setLocation("/progress"))}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-foreground cursor-pointer hover:bg-primary/5 hover:text-primary data-[selected=true]:bg-primary/5 data-[selected=true]:text-primary"
            >
              <LineChart className="w-4 h-4" /> Progress Dashboard
            </Command.Item>
          </Command.Group>

          <Command.Group heading={<div className="px-2 py-1 text-xs font-semibold text-muted-foreground mb-1 mt-2 uppercase tracking-wider">Learning Modules</div>}>
            <Command.Item
              onSelect={() => runCommand(() => setLocation("/paths"))}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-foreground cursor-pointer hover:bg-primary/5 hover:text-primary data-[selected=true]:bg-primary/5 data-[selected=true]:text-primary"
            >
              <BookOpen className="w-4 h-4" /> Learning Paths
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => setLocation("/psychology"))}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-foreground cursor-pointer hover:bg-primary/5 hover:text-primary data-[selected=true]:bg-primary/5 data-[selected=true]:text-primary"
            >
              <Brain className="w-4 h-4" /> Market Psychology
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => setLocation("/risk-management"))}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-foreground cursor-pointer hover:bg-primary/5 hover:text-primary data-[selected=true]:bg-primary/5 data-[selected=true]:text-primary"
            >
              <Shield className="w-4 h-4" /> Risk Management
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  )
}
