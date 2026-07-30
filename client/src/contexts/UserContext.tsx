import React, { createContext, useContext, useState, useEffect } from 'react';

export type ExperienceLevel = 'new' | 'basics' | 'occasional' | 'active' | null;
export type LearningGoal = 'basics' | 'investing' | 'technical' | 'retirement' | null;

interface UserProfile {
  experienceLevel: ExperienceLevel;
  learningGoal: LearningGoal;
  hasCompletedOnboarding: boolean;
}

interface UserContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetOnboarding: () => void;
}

const defaultProfile: UserProfile = {
  experienceLevel: null,
  learningGoal: null,
  hasCompletedOnboarding: false,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('marketlens_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse user profile from local storage', e);
      }
    }
    return defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem('marketlens_user_profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const resetOnboarding = () => {
    setProfile(defaultProfile);
  };

  return (
    <UserContext.Provider value={{ profile, updateProfile, resetOnboarding }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
