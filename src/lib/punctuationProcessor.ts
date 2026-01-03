/**
 * Adds proper punctuation to speech-to-text transcripts
 * Detects natural pauses, sentence endings, and question patterns
 */

/**
 * Detects if a sentence is a question
 */
function isQuestion(sentence: string): boolean {
  const trimmed = sentence.trim().toLowerCase();
  
  // Question words at the start
  if (/^(what|where|when|who|why|how|which|whose|whom)\b/i.test(trimmed)) {
    return true;
  }
  
  // Question patterns: "is it", "are you", "did you", etc.
  if (/^(is|are|was|were|do|does|did|can|could|would|should|will|have|has|had)\s+\w+/i.test(trimmed)) {
    return true;
  }
  
  // Ends with question tag
  if (/\b(right|correct|okay|ok|huh|eh)\s*$/i.test(trimmed)) {
    return true;
  }
  
  return false;
}

/**
 * Detects sentence boundaries based on natural language patterns
 * More conservative - only splits on clear indicators
 */
function detectSentenceBoundaries(text: string): number[] {
  const boundaries: number[] = [];
  const words = text.split(/\s+/);
  
  if (words.length < 10) {
    // Too short to split into multiple sentences
    return [];
  }
  
  // Strong sentence break indicators (these usually start new sentences)
  const sentenceStarters = /\b(but|however|therefore|meanwhile|furthermore|moreover|nevertheless|consequently|additionally|then|next|finally|afterward|later|first|second|third|last|also|furthermore)\b/i;
  
  // Words that often end sentences
  const sentenceEnders = /\b(and|but|so|then|now|well|okay|yes|no|sure|right|alright)\b/i;
  
  for (let i = 5; i < words.length - 3; i++) {
    const word = words[i];
    const nextWord = words[i + 1];
    
    // Strong indicator: next word is capitalized AND is a sentence starter
    if (/^[A-Z]/.test(nextWord) && sentenceStarters.test(nextWord)) {
      boundaries.push(i);
      continue;
    }
    
    // Moderate indicator: current word ends sentence pattern AND next word is capitalized
    if (sentenceEnders.test(word) && /^[A-Z]/.test(nextWord)) {
      // Make sure we have enough words before this (at least 5)
      if (i >= 5) {
        boundaries.push(i);
      }
    }
  }
  
  return boundaries;
}

/**
 * Adds proper punctuation to speech-to-text transcripts
 */
export function addPunctuationToTranscript(text: string): string {
  if (!text || text.trim().length === 0) return text;

  let processed = text.trim();

  // Remove any existing punctuation at the end (we'll add it back properly)
  processed = processed.replace(/[.!?]+$/, '');

  // Capitalize first letter
  if (processed.length > 0 && /^[a-z]/.test(processed)) {
    processed = processed[0].toUpperCase() + processed.slice(1);
  }

  // Split into words
  const words = processed.split(/\s+/);
  
  if (words.length === 0) return processed;

  // Detect sentence boundaries
  const boundaries = detectSentenceBoundaries(processed);
  
  // If we have boundaries, split into sentences
  if (boundaries.length > 0) {
    const sentences: string[] = [];
    let start = 0;
    
    for (const boundary of boundaries) {
      const sentence = words.slice(start, boundary + 1).join(' ');
      if (sentence.trim().length > 0) {
        sentences.push(sentence.trim());
      }
      start = boundary + 1;
    }
    
    // Add remaining words as last sentence
    if (start < words.length) {
      const remaining = words.slice(start).join(' ').trim();
      if (remaining.length > 0) {
        sentences.push(remaining);
      }
    }
    
    // Process each sentence
    const processedSentences = sentences.map((sentence, index) => {
      let s = sentence.trim();
      
      if (s.length === 0) return s;
      
      // Capitalize first word of each sentence (except first one, already capitalized)
      if (index > 0 && /^[a-z]/.test(s)) {
        s = s[0].toUpperCase() + s.slice(1);
      }
      
      // Determine punctuation
      if (isQuestion(s)) {
        if (!s.endsWith('?')) {
          s = s.replace(/\s*$/, '?');
        }
      } else {
        if (!s.match(/[.!?]$/)) {
          s = s.replace(/\s*$/, '.');
        }
      }
      
      return s;
    }).filter(s => s.length > 0);
    
    processed = processedSentences.join(' ');
  } else {
    // Single sentence - just add ending punctuation
    if (isQuestion(processed)) {
      if (!processed.endsWith('?')) {
        processed = processed.replace(/\s*$/, '?');
      }
    } else {
      if (!processed.match(/[.!?]$/)) {
        processed = processed.replace(/\s*$/, '.');
      }
    }
  }

  // Clean up spacing
  processed = processed.replace(/\s+/g, ' ');
  
  // Fix spacing before punctuation
  processed = processed.replace(/\s+([.!?,:;])/g, '$1');
  
  // Ensure space after sentence-ending punctuation
  processed = processed.replace(/([.!?])([A-Za-z])/g, (match, punct, letter) => {
    // Add space and capitalize if needed
    if (/[a-z]/.test(letter)) {
      return punct + ' ' + letter.toUpperCase();
    }
    return punct + ' ' + letter;
  });
  
  // Fix spacing around commas
  processed = processed.replace(/,\s*/g, ', ');
  processed = processed.replace(/\s+,/g, ',');
  
  // Clean up multiple spaces
  processed = processed.replace(/\s+/g, ' ').trim();
  
  return processed;
}

/**
 * Processes speech recognition results with punctuation
 * Only adds punctuation to final transcripts, not interim ones
 */
export function processSpeechResult(
  finalTranscript: string,
  interimTranscript: string,
  existingText: string = ''
): string {
  let result = existingText;
  
  // Process final transcript with punctuation
  if (finalTranscript.trim()) {
    // If we have existing text, add a space if needed
    if (result && !result.match(/[.!?]\s*$/)) {
      result += ' ';
    }
    
    // Add the final transcript with punctuation
    result += addPunctuationToTranscript(finalTranscript.trim());
  }
  
  // Add interim transcript without punctuation (still being spoken)
  if (interimTranscript.trim()) {
    // Add space if needed
    if (result && !result.match(/[.!?]\s*$/)) {
      result += ' ';
    }
    result += interimTranscript.trim();
  }
  
  return result;
}
