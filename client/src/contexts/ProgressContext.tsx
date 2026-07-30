import React, { createContext, useContext, useEffect, useState } from "react";

interface ProgressState {
  xp: number;
  streak: number;
  lastChallengeDate: string | null;
  completedLessons: string[];
}

interface ProgressContextType extends ProgressState {
  addXp: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  completeDailyChallenge: (xpReward: number) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      let stored = localStorage.getItem("marketlens_progress");
      if (!stored) {
        stored = localStorage.getItem("tradeacademy_progress");
        if (stored) {
          localStorage.setItem("marketlens_progress", stored);
          localStorage.removeItem("tradeacademy_progress");
        }
      }
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse progress from local storage");
    }
    return {
      xp: 0,
      streak: 0,
      lastChallengeDate: null,
      completedLessons: [],
    };
  });

  useEffect(() => {
    localStorage.setItem("marketlens_progress", JSON.stringify(progress));
  }, [progress]);

  const addXp = (amount: number) => {
    setProgress((prev) => ({ ...prev, xp: prev.xp + amount }));
  };

  const completeLesson = (lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        xp: prev.xp + 50,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  };

  const completeDailyChallenge = (xpReward: number) => {
    const today = new Date().toISOString().split("T")[0];
    setProgress((prev) => {
      if (prev.lastChallengeDate === today) return prev;
      
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      const isStreakMaintained = prev.lastChallengeDate === yesterday;

      return {
        ...prev,
        xp: prev.xp + xpReward,
        streak: isStreakMaintained ? prev.streak + 1 : 1,
        lastChallengeDate: today,
      };
    });
  };

  return (
    <ProgressContext.Provider
      value={{ ...progress, addXp, completeLesson, completeDailyChallenge }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
