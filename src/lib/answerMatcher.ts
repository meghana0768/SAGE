/**
 * Advanced answer matching for memory recall games
 * Handles number formats, synonyms, and variations
 */

// Number word to digit mapping
const numberWords: Record<string, string> = {
  'zero': '0',
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
  'ten': '10',
  'eleven': '11',
  'twelve': '12',
  'thirteen': '13',
  'fourteen': '14',
  'fifteen': '15',
  'sixteen': '16',
  'seventeen': '17',
  'eighteen': '18',
  'nineteen': '19',
  'twenty': '20',
  'thirty': '30',
  'forty': '40',
  'fifty': '50',
  'sixty': '60',
  'seventy': '70',
  'eighty': '80',
  'ninety': '90',
  'hundred': '100',
  'thousand': '1000'
};

// Common synonyms and variations
const synonyms: Record<string, string[]> = {
  'years': ['year', 'yrs', 'yr'],
  'months': ['month', 'mo', 'mos'],
  'days': ['day', 'd'],
  'hours': ['hour', 'hr', 'hrs'],
  'minutes': ['minute', 'min', 'mins'],
  'dollars': ['dollar', '$', 'usd'],
  'cents': ['cent', 'c'],
  'miles': ['mile', 'mi'],
  'kilometers': ['kilometer', 'km', 'kms'],
  'pounds': ['pound', 'lb', 'lbs'],
  'kilograms': ['kilogram', 'kg', 'kgs'],
  'children': ['child', 'kids', 'kid'],
  'people': ['person', 'persons'],
  'friends': ['friend'],
  'siblings': ['sibling', 'brother', 'sister', 'brothers', 'sisters'],
};

/**
 * Converts number words to digits
 */
function normalizeNumbers(text: string): string {
  let normalized = text.toLowerCase();
  
  // Handle compound numbers like "thirty years" -> "30 years"
  for (const [word, digit] of Object.entries(numberWords)) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    normalized = normalized.replace(regex, digit);
  }
  
  // Handle compound numbers like "thirty-five" -> "35"
  const compoundPattern = /(\d+)\s*-\s*(\d+)/g;
  normalized = normalized.replace(compoundPattern, (match, tens, ones) => {
    return String(parseInt(tens) + parseInt(ones));
  });
  
  return normalized;
}

/**
 * Normalizes synonyms
 */
function normalizeSynonyms(text: string): string {
  let normalized = text.toLowerCase();
  
  for (const [key, variations] of Object.entries(synonyms)) {
    for (const variation of variations) {
      const regex = new RegExp(`\\b${variation}\\b`, 'gi');
      normalized = normalized.replace(regex, key);
    }
  }
  
  return normalized;
}

/**
 * Removes common words that don't affect meaning
 */
function removeStopWords(text: string): string {
  const stopWords = ['a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can'];
  const words = text.split(/\s+/);
  return words.filter(word => !stopWords.includes(word.toLowerCase())).join(' ');
}

/**
 * Extracts numbers from text
 */
function extractNumbers(text: string): string[] {
  // Extract all numbers (digits and words)
  const digitNumbers = text.match(/\d+/g) || [];
  const wordNumbers: string[] = [];
  
  for (const [word, digit] of Object.entries(numberWords)) {
    if (text.toLowerCase().includes(word)) {
      wordNumbers.push(digit);
    }
  }
  
  return [...new Set([...digitNumbers, ...wordNumbers])];
}

/**
 * Checks if two answers match, considering variations
 */
export function matchAnswer(userAnswer: string, correctAnswer: string): boolean {
  if (!userAnswer || !correctAnswer) return false;
  
  // Basic normalization
  let user = userAnswer.toLowerCase().trim();
  let correct = correctAnswer.toLowerCase().trim();
  
  // Exact match (after normalization)
  if (user === correct) return true;
  
  // Check if one contains the other
  if (user.includes(correct) || correct.includes(user)) return true;
  
  // Normalize numbers
  const userNormalized = normalizeNumbers(user);
  const correctNormalized = normalizeNumbers(correct);
  
  // Check after number normalization
  if (userNormalized === correctNormalized) return true;
  if (userNormalized.includes(correctNormalized) || correctNormalized.includes(userNormalized)) return true;
  
  // Normalize synonyms
  const userSyn = normalizeSynonyms(userNormalized);
  const correctSyn = normalizeSynonyms(correctNormalized);
  
  // Check after synonym normalization
  if (userSyn === correctSyn) return true;
  if (userSyn.includes(correctSyn) || correctSyn.includes(userSyn)) return true;
  
  // Extract and compare numbers
  const userNumbers = extractNumbers(user);
  const correctNumbers = extractNumbers(correct);
  
  if (userNumbers.length > 0 && correctNumbers.length > 0) {
    // Check if any numbers match
    const hasMatchingNumber = userNumbers.some(num => correctNumbers.includes(num));
    if (hasMatchingNumber) {
      // If numbers match, check if the rest of the answer is similar
      const userWithoutNumbers = user.replace(/\d+/g, '').trim();
      const correctWithoutNumbers = correct.replace(/\d+/g, '').trim();
      
      // If both have similar non-numeric content or one is mostly just the number
      if (userWithoutNumbers.length < 5 || correctWithoutNumbers.length < 5) {
        return true; // Mostly just numbers, and they match
      }
      
      // Check if non-numeric parts are similar
      const userSynNoNum = normalizeSynonyms(userWithoutNumbers);
      const correctSynNoNum = normalizeSynonyms(correctWithoutNumbers);
      if (userSynNoNum === correctSynNoNum || 
          userSynNoNum.includes(correctSynNoNum) || 
          correctSynNoNum.includes(userSynNoNum)) {
        return true;
      }
    }
  }
  
  // Remove stop words and compare
  const userClean = removeStopWords(userSyn);
  const correctClean = removeStopWords(correctSyn);
  
  if (userClean === correctClean) return true;
  if (userClean.includes(correctClean) || correctClean.includes(userClean)) return true;
  
  // Calculate similarity score (simple word overlap)
  const userWords = userClean.split(/\s+/).filter(w => w.length > 0);
  const correctWords = correctClean.split(/\s+/).filter(w => w.length > 0);
  
  if (userWords.length === 0 || correctWords.length === 0) return false;
  
  const matchingWords = userWords.filter(w => correctWords.includes(w));
  const similarity = matchingWords.length / Math.max(userWords.length, correctWords.length);
  
  // If more than 70% of words match, consider it correct
  return similarity >= 0.7;
}

