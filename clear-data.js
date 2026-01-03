// Clear all VoiceSense data from localStorage
// Run this in browser console: copy and paste the code below

console.log('Clearing VoiceSense data...');

// Remove user accounts
localStorage.removeItem('voicesense-users');

// Remove Zustand storage
localStorage.removeItem('voicesense-storage');

console.log('✅ All VoiceSense accounts and data have been deleted!');
console.log('Please refresh the page.');
