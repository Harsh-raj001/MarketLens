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
import { motion, AnimatePresence } from "framer-motion"

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
    const handleOpen = () => setOpen(true)
    document.addEventListener("keydown", down)
    window.addEventListener("open-command-palette", handleOpen)
    return () => {
      document.removeEventListener("keydown", down)
      window.removeEventListener("open-command-palette", handleOpen)
    }
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-background/60 flex items-start justify-center pt-[15vh]"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Command
              className="w-full bg-card/90 backdrop-blur-xl rounded-2xl border border-border/60 shadow-2xl overflow-hidden"
              label="Global Command Menu"
            >
              <div className="flex items-center border-b border-border/50 px-4 py-1">
                <Search className="w-5 h-5 text-muted-foreground mr-2" />
                <Command.Input
                  autoFocus
                  placeholder="Search concepts, tools, or jump to..."
                  className="flex-1 h-12 bg-transparent border-none outline-none focus:ring-0 text-sm text-foreground placeholder:text-muted-foreground"
                />
                <div className="text-[10px] font-semibold text-muted-foreground px-2 py-1 bg-muted/50 rounded flex items-center gap-1 border border-border/50">ESC</div>
              </div>
              <Command.List className="max-h-[350px] overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                <Command.Group heading={<div className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground/70 mb-1 uppercase tracking-widest">Features</div>}>
                  <Command.Item
                    onSelect={() => runCommand(() => setLocation("/ai-tutor"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground cursor-pointer hover:bg-primary/10 hover:text-primary data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" /> Lens AI
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => setLocation("/journal"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground cursor-pointer hover:bg-primary/10 hover:text-primary data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary transition-colors"
                  >
                    <BookMarked className="w-4 h-4" /> TradeLog Journal
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => setLocation("/progress"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground cursor-pointer hover:bg-primary/10 hover:text-primary data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary transition-colors"
                  >
                    <LineChart className="w-4 h-4" /> Progress Dashboard
                  </Command.Item>
                </Command.Group>

                <Command.Group heading={<div className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground/70 mb-1 mt-2 uppercase tracking-widest">Learning Modules</div>}>
                  <Command.Item
                    onSelect={() => runCommand(() => setLocation("/paths"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground cursor-pointer hover:bg-primary/10 hover:text-primary data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary transition-colors"
                  >
                    <BookOpen className="w-4 h-4" /> Learning Paths
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => setLocation("/psychology"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground cursor-pointer hover:bg-primary/10 hover:text-primary data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary transition-colors"
                  >
                    <Brain className="w-4 h-4" /> Market Psychology
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => setLocation("/risk-management"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground cursor-pointer hover:bg-primary/10 hover:text-primary data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary transition-colors"
                  >
                    <Shield className="w-4 h-4" /> Risk Management
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
