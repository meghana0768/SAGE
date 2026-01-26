'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ClearAccountsPage() {
  const router = useRouter();
  const [status, setStatus] = useState('Clearing all accounts...');

  useEffect(() => {
    // Clear all Sage data
    const clearData = () => {
      try {
        // Clear all localStorage keys that start with 'sage-'
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('sage-')) {
            keysToRemove.push(key);
          }
        }
        
        // Remove all sage-related keys
        keysToRemove.forEach(key => {
          localStorage.removeItem(key);
        });
        
        // Also explicitly remove the main keys
        localStorage.removeItem('sage-users');
        localStorage.removeItem('sage-storage');
        
        // Clear any sessionStorage as well
        sessionStorage.removeItem('sage-users');
        sessionStorage.removeItem('sage-storage');
        
        setStatus('✅ All accounts and data cleared successfully!');
        console.log('✅ All Sage accounts and data cleared');
        
        // Redirect to home after clearing
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } catch (e) {
        console.error('Error clearing accounts:', e);
        setStatus('❌ Error clearing accounts. Please try the browser console method.');
      }
    };
    
    clearData();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-sand)] via-white to-[var(--color-sage-light)]">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8BA888] to-[#5A7A57] rounded-2xl transform rotate-3 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#C4846C] to-[#A66B53] rounded-2xl transform -rotate-3 opacity-60 animate-pulse" />
        </div>
        <p className="text-[#9B918A] font-medium text-lg">{status}</p>
        {status.includes('✅') && (
          <p className="text-sm text-[#9B918A] mt-2">Redirecting to home...</p>
        )}
        {status.includes('❌') && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-600 mb-2">Please open your browser console (F12) and run:</p>
            <code className="text-xs bg-white p-2 rounded block text-left">
              localStorage.removeItem('sage-users');<br/>
              localStorage.removeItem('sage-storage');<br/>
              location.reload();
            </code>
          </div>
        )}
      </div>
    </div>
  );
}
