import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  User, 
  SpeechAnalysis, 
  CognitiveGameResult, 
  Insight,
  EmotionalState,
  FamilyMember,
  FamilyMemory,
  ConversationSettings,
  MemorySession,
  Biography,
  BiographyEntry,
  TimelineEvent,
  HealthEntry,
  MedicalJournal
} from '@/types';
import { calculateCognitiveProfile } from '@/lib/cognitiveProfileCalculator';

interface AppState {
  // Authentication state
  isAuthenticated: boolean;
  currentUserId: string | null;
  
  // User state
  user: User | null;
  isOnboarded: boolean;
  
  // Current session
  isRecording: boolean;
  currentTranscript: string;
  currentEmotionalState: EmotionalState;
  
  // Speech analysis history
  speechAnalyses: SpeechAnalysis[];
  
  // Game results
  gameResults: CognitiveGameResult[];
  
  // Insights
  insights: Insight[];
  unreadInsights: number;
  
  // UI state
  activeTab: 'home' | 'games' | 'family' | 'insights' | 'biography' | 'timeline' | 'health' | 'settings';
  isDarkMode: boolean;
  
  // Biography feature
  memorySessions: MemorySession[];
  biography: Biography | null;
  
  // Health Scribe feature
  medicalJournal: MedicalJournal | null;
  isHealthMode: boolean;
  
  // Actions
  login: (username: string, password: string) => boolean;
  signUp: (username: string, password: string) => boolean;
  logout: () => void;
  setUser: (user: User) => void;
  completeOnboarding: (name: string) => void;
  setIsRecording: (isRecording: boolean) => void;
  setCurrentTranscript: (transcript: string) => void;
  setCurrentEmotionalState: (state: EmotionalState) => void;
  addSpeechAnalysis: (analysis: SpeechAnalysis) => void;
  addGameResult: (result: CognitiveGameResult) => void;
  addInsight: (insight: Insight) => void;
  markInsightsRead: () => void;
  setActiveTab: (tab: 'home' | 'games' | 'family' | 'insights' | 'biography' | 'timeline' | 'health' | 'settings') => void;
  toggleDarkMode: () => void;
  updateConversationSettings: (settings: Partial<ConversationSettings>) => void;
  addFamilyMember: (member: FamilyMember) => void;
  addFamilyMemory: (memberId: string, memory: FamilyMemory) => void;
  // Biography actions
  addMemorySession: (session: MemorySession) => void;
  updateMemorySession: (sessionId: string, updates: Partial<MemorySession>) => void;
  addBiographyEntry: (entry: BiographyEntry) => void;
  addTimelineEvent: (event: TimelineEvent) => void;
  setBiography: (biography: Biography) => void;
  // Health actions
  addHealthEntry: (entry: HealthEntry) => void;
  setMedicalJournal: (journal: MedicalJournal) => void;
  setIsHealthMode: (isHealthMode: boolean) => void;
  reset: () => void;
}

const generateInitialUser = (username: string): User => ({
  id: crypto.randomUUID(),
  name: username, // Use username as name initially
  preferredName: username, // Use username as preferred name
  familyMembers: [],
  cognitiveProfile: {
    userId: crypto.randomUUID(),
    lastUpdated: new Date(),
    overallTrend: null,
    languageComplexity: { current: null, trend: null, weeklyAverage: null },
    memoryRecall: { current: null, trend: null, weeklyAverage: null },
    attention: { current: null, trend: null, weeklyAverage: null },
    processingSpeed: { current: null, trend: null, weeklyAverage: null },
    emotionalPatterns: {
      dominant: null,
      frequency: null
    },
    peakCognitionTime: null,
    recentInsights: []
  },
  conversationSettings: {
    speechRate: 'normal',
    sentenceComplexity: 'moderate',
    usesFamiliarNames: true,
    repetitionEnabled: true,
    calmingModeActive: false
  },
  createdAt: new Date()
});

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      isAuthenticated: false,
      currentUserId: null,
      user: null,
      isOnboarded: false,
      isRecording: false,
      currentTranscript: '',
      currentEmotionalState: 'neutral',
      speechAnalyses: [],
      gameResults: [],
      insights: [],
      unreadInsights: 0,
      activeTab: 'home',
      isDarkMode: false,
      memorySessions: [],
      biography: null,
      medicalJournal: null,
      isHealthMode: false,

      // Actions
      login: (username, password) => {
        // Login only - does not create accounts
        try {
          const storedUsers = JSON.parse(localStorage.getItem('voicesense-users') || '{}');
          const normalizedUsername = username.trim().toLowerCase();
          
          // Check if user exists and password matches
          if (storedUsers[normalizedUsername] && storedUsers[normalizedUsername].password === password) {
            const userData = storedUsers[normalizedUsername];
            
            // For login users, always skip onboarding - only new signups need to see it
            const updatedState = {
              isAuthenticated: true, 
              currentUserId: normalizedUsername,
              user: userData.user || null,
              isOnboarded: true, // Always true for login - skip onboarding for returning users
              speechAnalyses: userData.speechAnalyses || [],
              gameResults: userData.gameResults || [],
              insights: userData.insights || [],
              memorySessions: userData.memorySessions || [],
              biography: userData.biography || null,
              medicalJournal: userData.medicalJournal || null
            };
            
            // Set the state directly
            set(updatedState);
            
            // Save user data to localStorage immediately
            try {
              storedUsers[normalizedUsername] = {
                ...storedUsers[normalizedUsername],
                password: storedUsers[normalizedUsername].password,
                user: updatedState.user,
                isOnboarded: true, // Mark as onboarded for returning users
                speechAnalyses: updatedState.speechAnalyses,
                gameResults: updatedState.gameResults,
                insights: updatedState.insights,
                memorySessions: updatedState.memorySessions,
                biography: updatedState.biography,
                medicalJournal: updatedState.medicalJournal
              };
              localStorage.setItem('voicesense-users', JSON.stringify(storedUsers));
            } catch (e) {
              // localStorage not available, continue anyway
              console.warn('localStorage not available, data not saved');
            }
            
            return true;
          }
        } catch (e) {
          // localStorage not available or error parsing
          console.warn('localStorage error during login:', e);
        }
        
        // User doesn't exist or password doesn't match
        return false;
      },
      
      signUp: (username, password) => {
        // Sign up only - creates new account
        const storedUsers = JSON.parse(localStorage.getItem('voicesense-users') || '{}');
        const normalizedUsername = username.trim().toLowerCase();
        
        // Check if username already exists
        if (storedUsers[normalizedUsername]) {
          return false; // Username already taken
        }
        
        // Create new account
        const newUser = generateInitialUser(normalizedUsername);
        storedUsers[normalizedUsername] = {
          password: password,
          user: newUser,
          isOnboarded: false,
          speechAnalyses: [],
          gameResults: [],
          insights: [],
          memorySessions: [],
          biography: null,
          medicalJournal: null
        };
        localStorage.setItem('voicesense-users', JSON.stringify(storedUsers));
        set({ 
          isAuthenticated: true, 
          currentUserId: normalizedUsername,
          user: newUser,
          isOnboarded: false
        });
        return true;
      },
      
      logout: () => set((state) => {
        // Save current user data before logging out
        if (state.currentUserId) {
          const storedUsers = JSON.parse(localStorage.getItem('voicesense-users') || '{}');
          storedUsers[state.currentUserId] = {
            ...storedUsers[state.currentUserId],
            password: storedUsers[state.currentUserId]?.password || '',
            user: state.user,
            isOnboarded: state.isOnboarded,
            speechAnalyses: state.speechAnalyses,
            gameResults: state.gameResults,
            insights: state.insights,
            memorySessions: state.memorySessions,
            biography: state.biography,
            medicalJournal: state.medicalJournal
          };
          localStorage.setItem('voicesense-users', JSON.stringify(storedUsers));
        }
        
        return { 
          isAuthenticated: false, 
          currentUserId: null,
          user: null,
          isOnboarded: false,
          isRecording: false,
          currentTranscript: '',
          currentEmotionalState: 'neutral',
          speechAnalyses: [],
          gameResults: [],
          insights: [],
          unreadInsights: 0,
          activeTab: 'home',
          isCalmingMode: false,
          memorySessions: [],
          biography: null,
          medicalJournal: null,
          isHealthMode: false
        };
      }),
      
      setUser: (user) => set({ user }),
      
      completeOnboarding: (name) => {
        const state = useStore.getState();
        // Use current username if available, otherwise use the provided name
        const usernameToUse = state.currentUserId || name;
        const newUser = generateInitialUser(usernameToUse);
        // Update name and preferredName with the provided name from onboarding
        newUser.name = name;
        newUser.preferredName = name.split(' ')[0];
        
        let finalUser = newUser;
        
        // If there's existing data, calculate profile from it
        if (state.speechAnalyses.length > 0 || state.gameResults.length > 0) {
          const calculatedProfile = calculateCognitiveProfile(
            state.speechAnalyses,
            state.gameResults,
            newUser.cognitiveProfile
          );
          finalUser = { ...newUser, cognitiveProfile: calculatedProfile };
        }
        
        // Update state
        set({
          user: finalUser,
          isOnboarded: true
        });
        
        // Immediately save to localStorage
        if (state.currentUserId) {
          const storedUsers = JSON.parse(localStorage.getItem('voicesense-users') || '{}');
          storedUsers[state.currentUserId] = {
            ...storedUsers[state.currentUserId],
            user: finalUser,
            isOnboarded: true,
            speechAnalyses: state.speechAnalyses,
            gameResults: state.gameResults,
            insights: state.insights,
            memorySessions: state.memorySessions,
            biography: state.biography,
            medicalJournal: state.medicalJournal
          };
          localStorage.setItem('voicesense-users', JSON.stringify(storedUsers));
        }
      },
      
      setIsRecording: (isRecording) => set({ isRecording }),
      
      setCurrentTranscript: (transcript) => set({ currentTranscript: transcript }),
      
      setCurrentEmotionalState: (state) => set({ currentEmotionalState: state }),
      
      addSpeechAnalysis: (analysis) => set((state) => {
        const newAnalyses = [...state.speechAnalyses, analysis];
        const updatedProfile = state.user 
          ? calculateCognitiveProfile(newAnalyses, state.gameResults, state.user.cognitiveProfile)
          : undefined;
        return {
          speechAnalyses: newAnalyses,
          user: state.user && updatedProfile
            ? { ...state.user, cognitiveProfile: updatedProfile }
            : state.user
        };
      }),
      
      addGameResult: (result) => set((state) => {
        const newResults = [...state.gameResults, result];
        const updatedProfile = state.user
          ? calculateCognitiveProfile(state.speechAnalyses, newResults, state.user.cognitiveProfile)
          : undefined;
        return {
          gameResults: newResults,
          user: state.user && updatedProfile
            ? { ...state.user, cognitiveProfile: updatedProfile }
            : state.user
        };
      }),
      
      addInsight: (insight) => set((state) => ({
        insights: [insight, ...state.insights],
        unreadInsights: state.unreadInsights + 1
      })),
      
      markInsightsRead: () => set({ unreadInsights: 0 }),
      
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      toggleDarkMode: () => set((state) => ({ 
        isDarkMode: !state.isDarkMode 
      })),
      
      updateConversationSettings: (settings) => set((state) => ({
        user: state.user ? {
          ...state.user,
          conversationSettings: { ...state.user.conversationSettings, ...settings }
        } : null
      })),
      
      addFamilyMember: (member) => set((state) => ({
        user: state.user ? {
          ...state.user,
          familyMembers: [...state.user.familyMembers, member]
        } : null
      })),
      
      addFamilyMemory: (memberId, memory) => set((state) => ({
        user: state.user ? {
          ...state.user,
          familyMembers: state.user.familyMembers.map(m => 
            m.id === memberId 
              ? { ...m, memories: [...m.memories, memory] }
              : m
          )
        } : null
      })),
      
      // Biography actions
      addMemorySession: (session) => set((state) => ({
        memorySessions: [...state.memorySessions, session]
      })),
      
      updateMemorySession: (sessionId, updates) => set((state) => ({
        memorySessions: state.memorySessions.map(session =>
          session.id === sessionId ? { ...session, ...updates } : session
        )
      })),
      
      addBiographyEntry: (entry) => set((state) => {
        if (!state.biography) {
          const newBiography: Biography = {
            id: crypto.randomUUID(),
            userId: state.user?.id || '',
            title: `${state.user?.preferredName || 'User'}'s Life Story`,
            entries: [entry],
            timelineEvents: [],
            lastUpdated: new Date(),
            isComplete: false
          };
          return { biography: newBiography };
        }
        return {
          biography: {
            ...state.biography,
            entries: [...state.biography.entries, entry],
            lastUpdated: new Date()
          }
        };
      }),
      
      addTimelineEvent: (event) => set((state) => {
        if (!state.biography) {
          const newBiography: Biography = {
            id: crypto.randomUUID(),
            userId: state.user?.id || '',
            title: `${state.user?.preferredName || 'User'}'s Life Story`,
            entries: [],
            timelineEvents: [event],
            lastUpdated: new Date(),
            isComplete: false
          };
          return { biography: newBiography };
        }
        return {
          biography: {
            ...state.biography,
            timelineEvents: [...state.biography.timelineEvents, event].sort((a, b) => 
              a.date.getTime() - b.date.getTime()
            ),
            lastUpdated: new Date()
          }
        };
      }),
      
      setBiography: (biography) => set({ biography }),
      
      // Health actions
      addHealthEntry: (entry) => set((state) => {
        if (!state.medicalJournal) {
          const newJournal: MedicalJournal = {
            id: crypto.randomUUID(),
            userId: state.user?.id || '',
            entries: [entry],
            lastUpdated: new Date(),
            summary: {
              recentSymptoms: [],
              medicationCompliance: 100,
              painTrend: 'stable',
              lastDoctorVisit: undefined
            }
          };
          return { medicalJournal: newJournal };
        }
        return {
          medicalJournal: {
            ...state.medicalJournal,
            entries: [...state.medicalJournal.entries, entry],
            lastUpdated: new Date()
          }
        };
      }),
      
      setMedicalJournal: (journal) => set({ medicalJournal: journal }),
      
      setIsHealthMode: (isHealthMode) => set({ isHealthMode }),
      
      reset: () => set({
        isAuthenticated: false,
        currentUserId: null,
        user: null,
        isOnboarded: false,
        isRecording: false,
        currentTranscript: '',
        currentEmotionalState: 'neutral',
        speechAnalyses: [],
        gameResults: [],
        insights: [],
        unreadInsights: 0,
        activeTab: 'home',
        isDarkMode: false,
        memorySessions: [],
        biography: null,
        medicalJournal: null,
        isHealthMode: false
      })
    }),
    {
      name: 'voicesense-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        currentUserId: state.currentUserId,
        user: state.user,
        isOnboarded: state.isOnboarded,
        speechAnalyses: state.speechAnalyses,
        gameResults: state.gameResults,
        insights: state.insights,
        memorySessions: state.memorySessions,
        biography: state.biography,
        medicalJournal: state.medicalJournal
      }),
      onRehydrateStorage: () => (state) => {
        // After rehydration, if user is authenticated, load their actual data from voicesense-users
        // This ensures we use the correct isOnboarded status
        if (state?.isAuthenticated && state.currentUserId) {
          const storedUsers = JSON.parse(localStorage.getItem('voicesense-users') || '{}');
          const userData = storedUsers[state.currentUserId];
          if (userData) {
            // Override rehydrated state with actual user data from storage
            useStore.setState({
              user: userData.user || state.user,
              isOnboarded: userData.isOnboarded === true ? true : (state.isOnboarded || false),
              speechAnalyses: userData.speechAnalyses || state.speechAnalyses || [],
              gameResults: userData.gameResults || state.gameResults || [],
              insights: userData.insights || state.insights || [],
              memorySessions: userData.memorySessions || state.memorySessions || [],
              biography: userData.biography || state.biography,
              medicalJournal: userData.medicalJournal || state.medicalJournal
            });
          }
        }
      }
    }
  )
);

