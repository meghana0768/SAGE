'use client';

import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Logo, Settings, TimeOfDayIcon } from '@/components/icons';
import { getTimeOfDay } from '@/lib/speechAnalysis';

export function Header() {
  const { user, isCalmingMode, toggleCalmingMode } = useStore();
  const timeOfDay = getTimeOfDay();
  
  const getGreeting = () => {
    switch (timeOfDay) {
      case 'morning': return 'Good morning';
      case 'afternoon': return 'Good afternoon';
      case 'evening': return 'Good evening';
      case 'night': return 'Good night';
    }
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 px-4 pt-4 pb-2"
    >
      <div className="glass rounded-2xl soft-shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <div>
              <h1 className="text-lg font-display font-semibold text-[var(--color-charcoal)]">
                {getGreeting()}, {user?.preferredName || 'there'}
              </h1>
              <div className="flex items-center gap-1 text-sm text-[var(--color-stone)]">
                <TimeOfDayIcon time={timeOfDay} size={14} />
                <span className="capitalize">{timeOfDay} session</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleCalmingMode}
              className={`p-2 rounded-full transition-all ${
                isCalmingMode 
                  ? 'bg-[var(--color-calm)] text-white' 
                  : 'bg-[var(--color-sand)] text-[var(--color-stone)]'
              }`}
              title={isCalmingMode ? 'Calming mode active' : 'Enable calming mode'}
            >
              <motion.span
                animate={{ scale: isCalmingMode ? [1, 1.1, 1] : 1 }}
                transition={{ repeat: isCalmingMode ? Infinity : 0, duration: 2 }}
              >
                ✨
              </motion.span>
            </button>
            
            <button className="p-2 rounded-full bg-[var(--color-sand)] text-[var(--color-stone)] hover:bg-[var(--color-sage-light)] transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

