'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';

export default function ForceClearPage() {
  const router = useRouter();
  const { clearAllAccounts, debugStorage } = useStore();
  const [status, setStatus] = useState('Clearing all data...');

  useEffect(() => {
    // First, debug what's in storage
    console.log('=== BEFORE CLEAR ===');
    debugStorage();
    
    // Clear everything
    clearAllAccounts();
    
    // Wait a bit then verify
    setTimeout(() => {
      console.log('=== AFTER CLEAR ===');
      debugStorage();
      
      const checkUsers = localStorage.getItem('sage-users');
      const checkStorage = localStorage.getItem('sage-storage');
      const allKeys = Object.keys(localStorage);
      
      console.log('Final check - sage-users:', checkUsers);
      console.log('Final check - sage-storage:', checkStorage);
      console.log('Final check - all keys:', allKeys);
      
      if (!checkUsers && !checkStorage) {
        setStatus('✅ ALL DATA CLEARED! Redirecting...');
        setTimeout(() => {
          // Hard reload
          window.location.href = 'http://localhost:3000';
        }, 2000);
      } else {
        setStatus('⚠️ Data still exists. See console for details. Try clearing browser cache.');
        // Try one more aggressive clear
        setTimeout(() => {
          localStorage.clear();
          sessionStorage.clear();
          for (let i = 0; i < 100; i++) {
            localStorage.removeItem('sage-users');
            localStorage.removeItem('sage-storage');
          }
          console.log('Attempted final clear. Reloading...');
          window.location.href = 'http://localhost:3000';
        }, 3000);
      }
    }, 1000);
  }, [router, clearAllAccounts, debugStorage]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-sand)] via-white to-[var(--color-sage-light)]">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8BA888] to-[#5A7A57] rounded-2xl transform rotate-3 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#C4846C] to-[#A66B53] rounded-2xl transform -rotate-3 opacity-60 animate-pulse" />
        </div>
        <p className="text-[#9B918A] font-medium text-lg">{status}</p>
        <p className="text-sm text-[#9B918A] mt-2">Check browser console for details</p>
      </div>
    </div>
  );
}
