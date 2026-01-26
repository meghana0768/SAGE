// Clear all Sage accounts from localStorage
// Run this in browser console or use: node clear-accounts.js (if running in Node with jsdom)

console.log('Clearing all Sage accounts and data...');

// Check if we're in browser environment
if (typeof window !== 'undefined' && window.localStorage) {
  // Browser environment
  try {
    localStorage.removeItem('sage-users');
    localStorage.removeItem('sage-storage');
    console.log('✅ All Sage accounts and data cleared from localStorage!');
    console.log('Please refresh the page to see the changes.');
  } catch (e) {
    console.error('❌ Error clearing accounts:', e);
  }
} else {
  // Node environment - provide instructions
  console.log('This script needs to be run in a browser console.');
  console.log('To clear accounts:');
  console.log('1. Open your browser Developer Tools (F12 or Cmd+Option+I)');
  console.log('2. Go to the Console tab');
  console.log('3. Run: localStorage.removeItem("sage-users"); localStorage.removeItem("sage-storage");');
  console.log('4. Refresh the page');
}
