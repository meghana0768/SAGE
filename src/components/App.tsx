'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { Onboarding } from '@/components/onboarding/Onboarding';
import { AuthHome } from '@/components/auth/AuthHome';
import { Login } from '@/components/auth/Login';
import { SignUp } from '@/components/auth/SignUp';
import { HomePage } from '@/components/features/HomePage';
import { BrainGames } from '@/components/features/BrainGames';
import { FamilyHub } from '@/components/features/FamilyHub';
import { InsightsDashboard } from '@/components/features/InsightsDashboard';
import { BiographyCapture } from '@/components/features/BiographyCapture';
import { Timeline } from '@/components/features/Timeline';
import { HealthScribe } from '@/components/features/HealthScribe';
import { motion, AnimatePresence } from 'framer-motion';

function MainContent() {
  const { activeTab } = useStore();
  
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
        className="px-4 pb-32"
      >
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'games' && <BrainGames />}
        {activeTab === 'family' && <FamilyHub />}
        {activeTab === 'insights' && <InsightsDashboard />}
        {activeTab === 'biography' && <BiographyCapture />}
        {activeTab === 'timeline' && <Timeline />}
        {activeTab === 'health' && <HealthScribe />}
      </motion.div>
    </AnimatePresence>
  );
}

export function App() {
  const { isAuthenticated, isOnboarded, currentUserId } = useStore();
  const [authView, setAuthView] = useState<'home' | 'login' | 'signup'>('home');

  // Save user data periodically (on state changes)
  useEffect(() => {
    if (isAuthenticated && currentUserId) {
      const saveUserData = () => {
        const state = useStore.getState();
        const storedUsers = JSON.parse(localStorage.getItem('voicesense-users') || '{}');
        if (storedUsers[currentUserId]) {
          storedUsers[currentUserId] = {
            ...storedUsers[currentUserId],
            user: state.user,
            isOnboarded: state.isOnboarded,
            speechAnalyses: state.speechAnalyses,
            gameResults: state.gameResults,
            insights: state.insights,
            memorySessions: state.memorySessions,
            biography: state.biography,
            medicalJournal: state.medicalJournal
          };
          localStorage.setItem('voicesense-users', JSON.stringify(storedUsers));
        }
      };

      // Save on unmount
      return () => {
        saveUserData();
      };
    }
  }, [isAuthenticated, currentUserId]);

  // Check authentication first
  if (!isAuthenticated) {
    if (authView === 'login') {
      return <Login onBack={() => setAuthView('home')} />;
    }
    if (authView === 'signup') {
      return <SignUp onBack={() => setAuthView('home')} />;
    }
    return (
      <AuthHome
        onLogin={() => setAuthView('login')}
        onSignUp={() => setAuthView('signup')}
      />
    );
  }

  // Then check onboarding
  if (!isOnboarded) {
    return <Onboarding />;
  }

  return (
    <div className="min-h-screen pb-24">
      <Header />
      <main className="pt-2">
        <MainContent />
      </main>
      <Navigation />
    </div>
  );
}

