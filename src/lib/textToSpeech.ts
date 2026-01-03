/**
 * Text-to-Speech utility using Web Speech API
 */

export interface SpeechOptions {
  rate?: number; // 0.1 to 10, default 1
  pitch?: number; // 0 to 2, default 1
  volume?: number; // 0 to 1, default 1
  voice?: SpeechSynthesisVoice;
  lang?: string; // Language code, default 'en-US'
}

/**
 * Check if speech synthesis is supported
 */
export function isSpeechSynthesisSupported(): boolean {
  return 'speechSynthesis' in window;
}

/**
 * Get available voices
 */
export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSynthesisSupported()) return [];
  return window.speechSynthesis.getVoices();
}

/**
 * Find a voice by name or language
 */
export function findVoice(
  name?: string,
  lang: string = 'en-US'
): SpeechSynthesisVoice | null {
  const voices = getAvailableVoices();
  
  if (name) {
    const voice = voices.find(v => v.name.includes(name));
    if (voice) return voice;
  }
  
  // Try to find a voice matching the language
  const langVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
  if (langVoice) return langVoice;
  
  // Fallback to first available voice
  return voices[0] || null;
}

/**
 * Speak text using Web Speech API
 */
export function speakText(
  text: string,
  options: SpeechOptions = {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isSpeechSynthesisSupported()) {
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set options
    utterance.rate = options.rate ?? 1.0;
    utterance.pitch = options.pitch ?? 1.0;
    utterance.volume = options.volume ?? 1.0;
    utterance.lang = options.lang ?? 'en-US';
    
    if (options.voice) {
      utterance.voice = options.voice;
    } else {
      // Try to find a natural, pleasant voice
      // Prefer female voices that sound more natural and warm
      const voices = getAvailableVoices();
      const preferredVoices = [
        'Karen',      // macOS - natural female voice
        'Moira',      // macOS - Irish female voice
        'Tessa',      // macOS - South African female voice
        'Victoria',   // macOS - natural female voice
        'Alex',       // macOS - natural male voice (fallback)
        'Daniel',     // macOS - British male voice
        'Google UK English Female',
        'Google US English Female',
        'Microsoft Zira', // Windows - natural female voice
        'Microsoft Hazel', // Windows - British female voice
      ];
      
      // Try preferred voices first
      let selectedVoice = null;
      for (const preferred of preferredVoices) {
        selectedVoice = voices.find(v => 
          v.name.includes(preferred) && v.lang.startsWith('en')
        );
        if (selectedVoice) break;
      }
      
      // If no preferred voice found, find any natural-sounding English voice
      if (!selectedVoice) {
        selectedVoice = voices.find(v => 
          v.lang.startsWith('en') && 
          !v.name.toLowerCase().includes('compact') &&
          !v.name.toLowerCase().includes('enhanced')
        );
      }
      
      // Last resort: any English voice
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang.startsWith('en'));
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    utterance.onend = () => {
      resolve();
    };

    utterance.onerror = (error) => {
      reject(error);
    };

    window.speechSynthesis.speak(utterance);
  });
}

/**
 * Stop any ongoing speech
 */
export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Check if currently speaking
 */
export function isSpeaking(): boolean {
  if (!isSpeechSynthesisSupported()) return false;
  return window.speechSynthesis.speaking;
}

/**
 * Wait for voices to be loaded (needed on some browsers)
 */
export function waitForVoices(): Promise<void> {
  return new Promise((resolve) => {
    if (!isSpeechSynthesisSupported()) {
      resolve();
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve();
      return;
    }

    // Wait for voices to load
    const checkVoices = () => {
      const loadedVoices = window.speechSynthesis.getVoices();
      if (loadedVoices.length > 0) {
        resolve();
      } else {
        setTimeout(checkVoices, 100);
      }
    };

    window.speechSynthesis.onvoiceschanged = () => {
      checkVoices();
    };

    // Fallback timeout
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

