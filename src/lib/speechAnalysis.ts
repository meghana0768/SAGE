import type { SpeechAnalysis, EmotionalState } from '@/types';

// Calculate Flesch-Kincaid Grade Level
export function calculateFleschKincaid(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const syllables = words.reduce((count, word) => count + countSyllables(word), 0);
  
  if (sentences.length === 0 || words.length === 0) return 0;
  
  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;
  
  // Flesch-Kincaid Grade Level formula
  const gradeLevel = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
  
  return Math.max(0, Math.min(18, gradeLevel));
}

// Count syllables in a word (approximate)
function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;
  
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

// Calculate vocabulary complexity (0-100)
export function calculateVocabularyComplexity(text: string): number {
  const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  if (words.length === 0) return 50;
  
  // Simple words (common, short)
  const simpleWords = new Set([
    'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'can', 'and', 'but', 'or', 'if',
    'then', 'else', 'when', 'where', 'why', 'how', 'what', 'who', 'which',
    'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we',
    'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'its',
    'our', 'their', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'from', 'up', 'down', 'out', 'off', 'over', 'under', 'again', 'further',
    'once', 'here', 'there', 'all', 'each', 'few', 'more', 'most', 'other',
    'some', 'such', 'no', 'not', 'only', 'own', 'same', 'so', 'than', 'too',
    'very', 'just', 'also', 'now', 'go', 'going', 'went', 'gone', 'come',
    'came', 'see', 'saw', 'seen', 'look', 'looked', 'looking', 'get', 'got',
    'say', 'said', 'tell', 'told', 'know', 'knew', 'think', 'thought',
    'want', 'wanted', 'like', 'liked', 'need', 'needed', 'good', 'well',
    'new', 'old', 'great', 'little', 'big', 'small', 'long', 'short',
    'high', 'low', 'young', 'right', 'left', 'yes', 'no', 'okay', 'ok'
  ]);
  
  let complexWordCount = 0;
  const uniqueWords = new Set<string>();
  
  words.forEach(word => {
    const cleanWord = word.replace(/[^a-z]/g, '');
    uniqueWords.add(cleanWord);
    if (!simpleWords.has(cleanWord) && cleanWord.length > 6) {
      complexWordCount++;
    }
  });
  
  // Factors: unique word ratio, complex word ratio, average word length
  const uniqueRatio = uniqueWords.size / words.length;
  const complexRatio = complexWordCount / words.length;
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;
  
  const score = (uniqueRatio * 30) + (complexRatio * 40) + (avgWordLength * 5);
  return Math.min(100, Math.max(0, score));
}

// Detect repetitions in text
export function detectRepetitions(text: string): number {
  const sentences = text.toLowerCase().split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length < 2) return 0;
  
  let repetitionCount = 0;
  const seenPhrases = new Map<string, number>();
  
  sentences.forEach(sentence => {
    const words = sentence.trim().split(/\s+/);
    // Check for repeated 3-word phrases
    for (let i = 0; i <= words.length - 3; i++) {
      const phrase = words.slice(i, i + 3).join(' ');
      if (phrase.length > 5) {
        const count = seenPhrases.get(phrase) || 0;
        seenPhrases.set(phrase, count + 1);
        if (count > 0) repetitionCount++;
      }
    }
  });
  
  return repetitionCount;
}

// Calculate grammar consistency (simplified)
export function calculateGrammarConsistency(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length === 0) return 75;
  
  let issues = 0;
  
  sentences.forEach(sentence => {
    const trimmed = sentence.trim();
    
    // Check for capitalization at start
    if (trimmed.length > 0 && trimmed[0] !== trimmed[0].toUpperCase()) {
      issues++;
    }
    
    // Check for double spaces
    if (/\s{2,}/.test(trimmed)) {
      issues++;
    }
    
    // Check for incomplete sentences (very short)
    const words = trimmed.split(/\s+/).filter(w => w.length > 0);
    if (words.length < 2) {
      issues++;
    }
  });
  
  const issueRate = issues / sentences.length;
  return Math.max(0, Math.min(100, 100 - issueRate * 25));
}

// Detect pauses (simulated based on punctuation and ellipses)
export function detectPauses(text: string, durationSeconds: number): number {
  const pauseIndicators = (text.match(/\.{2,}|,|\-{2,}|…/g) || []).length;
  const pausesPerMinute = durationSeconds > 0 
    ? (pauseIndicators / durationSeconds) * 60 
    : 0;
  return Math.round(pausesPerMinute * 10) / 10;
}

// Calculate speech rate
export function calculateSpeechRate(text: string, durationSeconds: number): number {
  const words = text.split(/\s+/).filter(w => w.length > 0).length;
  if (durationSeconds === 0) return 0;
  return Math.round((words / durationSeconds) * 60);
}

// Analyze emotional tone (simplified sentiment analysis)
export function analyzeEmotionalTone(text: string): EmotionalState {
  const lowerText = text.toLowerCase();
  
  const emotionKeywords: Record<EmotionalState, string[]> = {
    happy: ['happy', 'glad', 'wonderful', 'great', 'love', 'lovely', 'joy', 'beautiful', 'amazing', 'excited', 'laugh', 'smile', 'good'],
    calm: ['peaceful', 'calm', 'relaxed', 'quiet', 'gentle', 'nice', 'fine', 'okay', 'alright', 'comfortable', 'easy'],
    anxious: ['worried', 'anxious', 'nervous', 'scared', 'afraid', 'concern', 'stress', 'tension', 'uncertain', 'unsure', 'maybe', 'confused'],
    sad: ['sad', 'miss', 'lonely', 'alone', 'tired', 'exhausted', 'difficult', 'hard', 'lost', 'gone', 'remember when', 'used to'],
    agitated: ['angry', 'frustrated', 'annoyed', 'upset', 'hate', 'terrible', 'awful', 'wrong', 'stop', 'no', 'don\'t', 'can\'t'],
    neutral: []
  };
  
  const scores: Record<EmotionalState, number> = {
    happy: 0, calm: 0, anxious: 0, sad: 0, agitated: 0, neutral: 1
  };
  
  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = lowerText.match(regex);
      if (matches) {
        scores[emotion as EmotionalState] += matches.length;
      }
    });
  });
  
  let maxEmotion: EmotionalState = 'neutral';
  let maxScore = 0;
  
  Object.entries(scores).forEach(([emotion, score]) => {
    if (score > maxScore) {
      maxScore = score;
      maxEmotion = emotion as EmotionalState;
    }
  });
  
  return maxEmotion;
}

// Get time of day category
export function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

// Full speech analysis
export function analyzeSpeech(
  transcript: string, 
  durationSeconds: number
): Omit<SpeechAnalysis, 'id' | 'timestamp'> {
  return {
    duration: durationSeconds,
    transcript,
    metrics: {
      sentenceLength: calculateAverageSentenceLength(transcript),
      vocabularyComplexity: calculateVocabularyComplexity(transcript),
      grammarConsistency: calculateGrammarConsistency(transcript),
      repetitionCount: detectRepetitions(transcript),
      pauseFrequency: detectPauses(transcript, durationSeconds),
      speechRate: calculateSpeechRate(transcript, durationSeconds),
      fleschKincaidGrade: calculateFleschKincaid(transcript)
    },
    emotionalState: analyzeEmotionalTone(transcript),
    timeOfDay: getTimeOfDay()
  };
}

function calculateAverageSentenceLength(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length === 0) return 0;
  
  const totalWords = sentences.reduce((sum, sentence) => {
    return sum + sentence.trim().split(/\s+/).filter(w => w.length > 0).length;
  }, 0);
  
  return Math.round(totalWords / sentences.length);
}

// Generate language complexity score (0-100)
export function calculateLanguageComplexityScore(analysis: SpeechAnalysis): number {
  const { metrics } = analysis;
  
  const weights = {
    vocabulary: 0.25,
    grammar: 0.2,
    fluency: 0.25,
    complexity: 0.3
  };
  
  const vocabularyScore = metrics.vocabularyComplexity;
  const grammarScore = metrics.grammarConsistency;
  
  // Fluency based on speech rate (optimal: 120-150 wpm) and pause frequency
  const optimalRate = 135;
  const rateDeviation = Math.abs(metrics.speechRate - optimalRate);
  const fluencyScore = Math.max(0, 100 - rateDeviation * 0.5 - metrics.pauseFrequency * 5);
  
  // Complexity from Flesch-Kincaid (grade 8-12 is considered good for adults)
  const complexityScore = Math.min(100, metrics.fleschKincaidGrade * 8);
  
  return Math.round(
    vocabularyScore * weights.vocabulary +
    grammarScore * weights.grammar +
    fluencyScore * weights.fluency +
    complexityScore * weights.complexity
  );
}

