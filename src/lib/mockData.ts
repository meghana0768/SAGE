import type { SpeechAnalysis, CognitiveGameResult, LanguageComplexityScore, DailyLog } from '@/types';

// Generate dates for the past N days
function getPastDate(daysAgo: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
}

// Generate mock speech analyses for the past 14 days
export function generateMockSpeechAnalyses(): SpeechAnalysis[] {
  const analyses: SpeechAnalysis[] = [];
  const timeOfDays: ('morning' | 'afternoon' | 'evening')[] = ['morning', 'afternoon', 'evening'];
  
  for (let day = 0; day < 14; day++) {
    // 1-3 sessions per day
    const sessionsPerDay = Math.floor(Math.random() * 3) + 1;
    
    for (let session = 0; session < sessionsPerDay; session++) {
      const timeOfDay = timeOfDays[session % 3];
      const baseScore = 70 + (day < 7 ? day * 0.5 : 3.5 - (day - 7) * 0.3); // Slight variation
      const eveningPenalty = timeOfDay === 'evening' ? Math.random() * 10 : 0;
      
      analyses.push({
        id: `speech-${day}-${session}`,
        timestamp: getPastDate(day),
        duration: 60 + Math.random() * 180,
        transcript: `Sample conversation from ${timeOfDay} session...`,
        metrics: {
          sentenceLength: 8 + Math.floor(Math.random() * 8),
          vocabularyComplexity: Math.round(baseScore - eveningPenalty + Math.random() * 15),
          grammarConsistency: Math.round(75 + Math.random() * 20),
          repetitionCount: timeOfDay === 'evening' ? Math.floor(Math.random() * 5) + 1 : Math.floor(Math.random() * 2),
          pauseFrequency: 2 + Math.random() * 4,
          speechRate: 100 + Math.random() * 50,
          fleschKincaidGrade: 6 + Math.random() * 4
        },
        emotionalState: ['calm', 'happy', 'neutral'][Math.floor(Math.random() * 3)] as SpeechAnalysis['emotionalState'],
        timeOfDay
      });
    }
  }
  
  return analyses.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

// Generate mock game results
export function generateMockGameResults(): CognitiveGameResult[] {
  const results: CognitiveGameResult[] = [];
  const gameTypes: CognitiveGameResult['gameType'][] = [
    'memory_recall', 'attention_focus', 'language_formation', 'processing_speed'
  ];
  
  for (let day = 0; day < 14; day++) {
    // 1-2 games per day
    const gamesPerDay = Math.floor(Math.random() * 2) + 1;
    
    for (let game = 0; game < gamesPerDay; game++) {
      const gameType = gameTypes[Math.floor(Math.random() * gameTypes.length)];
      const baseAccuracy = gameType === 'memory_recall' ? 72 : 78;
      
      results.push({
        id: `game-${day}-${game}`,
        gameType,
        timestamp: getPastDate(day),
        accuracy: Math.round(baseAccuracy + Math.random() * 20 - 5),
        responseTime: 2000 + Math.random() * 3000,
        repetitionsNeeded: Math.floor(Math.random() * 2),
        frustrationDetected: Math.random() < 0.1,
        completed: Math.random() > 0.05
      });
    }
  }
  
  return results.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

// Generate language complexity scores over time
export function generateLanguageComplexityHistory(): LanguageComplexityScore[] {
  const scores: LanguageComplexityScore[] = [];
  
  for (let day = 0; day < 30; day++) {
    const baseScore = 68 + Math.sin(day * 0.1) * 5; // Slight wave pattern
    
    scores.push({
      date: getPastDate(day),
      overallScore: Math.round(baseScore + Math.random() * 10),
      breakdown: {
        vocabulary: Math.round(65 + Math.random() * 20),
        grammar: Math.round(70 + Math.random() * 20),
        fluency: Math.round(68 + Math.random() * 20),
        coherence: Math.round(72 + Math.random() * 18)
      },
      timeOfDayScores: {
        morning: Math.round(75 + Math.random() * 15),
        afternoon: Math.round(70 + Math.random() * 15),
        evening: Math.round(60 + Math.random() * 15)
      }
    });
  }
  
  return scores.sort((a, b) => a.date.getTime() - b.date.getTime());
}

// Generate emotional state distribution data
export function generateEmotionalDistribution() {
  return [
    { state: 'Calm', value: 45, color: '#7EB5A6' },
    { state: 'Happy', value: 25, color: '#E8C468' },
    { state: 'Neutral', value: 12, color: '#9B918A' },
    { state: 'Anxious', value: 10, color: '#D4A574' },
    { state: 'Sad', value: 5, color: '#8B9DC3' },
    { state: 'Agitated', value: 3, color: '#C97B7B' }
  ];
}

// Generate time of day performance data
export function generateTimeOfDayPerformance() {
  return [
    { time: 'Morning', language: 82, memory: 78, attention: 80 },
    { time: 'Afternoon', language: 75, memory: 74, attention: 76 },
    { time: 'Evening', language: 65, memory: 68, attention: 65 }
  ];
}

// Generate weekly trends
export function generateWeeklyTrends() {
  const data = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  for (let i = 0; i < 7; i++) {
    data.push({
      day: days[i],
      language: 65 + Math.random() * 20,
      memory: 68 + Math.random() * 18,
      attention: 70 + Math.random() * 16,
      processing: 62 + Math.random() * 22
    });
  }
  
  return data;
}

// Generate monthly cognitive trends
export function generateMonthlyCognitiveTrends() {
  const data = [];
  
  for (let i = 29; i >= 0; i--) {
    const date = getPastDate(i);
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
    
    // Add slight upward trend with noise
    const trend = (29 - i) * 0.15;
    
    data.push({
      date: dateStr,
      overall: Math.round(68 + trend + Math.random() * 8 - 4),
      language: Math.round(70 + trend + Math.random() * 10 - 5),
      memory: Math.round(66 + trend + Math.random() * 10 - 5),
      attention: Math.round(72 + trend + Math.random() * 8 - 4)
    });
  }
  
  return data;
}

// Sample family members for demo
export const sampleFamilyMembers = [
  {
    id: 'family-1',
    name: 'Sarah Johnson',
    relationship: 'Daughter',
    photoUrl: undefined,
    voiceRecordingUrl: undefined,
    memories: [
      {
        id: 'mem-1',
        title: 'Beach Vacation 2023',
        description: 'We went to the beach together last summer. You loved watching the sunset and collecting seashells.',
        tags: ['vacation', 'beach', 'summer']
      },
      {
        id: 'mem-2',
        title: 'Birthday Celebration',
        description: 'Your 75th birthday party at the garden restaurant. We surprised you with a chocolate cake!',
        tags: ['birthday', 'celebration', 'family']
      }
    ],
    recentUpdates: [
      {
        id: 'update-1',
        content: 'Tommy had his first soccer game yesterday. He scored a goal and was so excited to tell you about it!',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        author: 'Sarah'
      }
    ]
  },
  {
    id: 'family-2',
    name: 'Michael Johnson',
    relationship: 'Son',
    photoUrl: undefined,
    voiceRecordingUrl: undefined,
    memories: [
      {
        id: 'mem-3',
        title: 'Fishing Trip',
        description: 'Remember when we went fishing at the lake? You taught me how to cast the line perfectly.',
        tags: ['fishing', 'outdoors', 'teaching']
      }
    ],
    recentUpdates: [
      {
        id: 'update-2',
        content: 'Just got back from my business trip. I picked up those special cookies you like from the bakery in Portland.',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        author: 'Michael'
      }
    ]
  },
  {
    id: 'family-3',
    name: 'Tommy',
    relationship: 'Grandson',
    photoUrl: undefined,
    voiceRecordingUrl: undefined,
    memories: [
      {
        id: 'mem-4',
        title: 'Reading Stories',
        description: 'You read bedtime stories to Tommy every Sunday. His favorite is the one about the brave little rabbit.',
        tags: ['reading', 'stories', 'bonding']
      }
    ],
    recentUpdates: []
  }
];

