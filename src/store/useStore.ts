import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  User, 
  SpeechAnalysis, 
  CognitiveGameResult, 
  Insight,
  EmotionalState,
  FamilyMember,
  FamilyRequest,
  FamilyMessage,
  ConversationSettings,
  MemorySession,
  Biography,
  BiographyEntry,
  TimelineEvent,
  HealthEntry,
  MedicalJournal,
  SharedHealthEntry
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
  activeTab: 'home' | 'games' | 'family' | 'insights' | 'biography' | 'timeline' | 'health' | 'settings' | 'speak';
  isDarkMode: boolean;
  
  // Biography feature
  memorySessions: MemorySession[];
  biography: Biography | null;
  
  // Health Scribe feature
  medicalJournal: MedicalJournal | null;
  isHealthMode: boolean;
  receivedHealthEntries: SharedHealthEntry[];
  sentHealthEntries: SharedHealthEntry[];
  
  // Family requests
  familyRequests: FamilyRequest[];
  
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
  setActiveTab: (tab: 'home' | 'games' | 'family' | 'insights' | 'biography' | 'timeline' | 'health' | 'settings' | 'speak') => void;
  toggleDarkMode: () => void;
  updateConversationSettings: (settings: Partial<ConversationSettings>) => void;
  requestFamilyConnection: (username: string, name: string, relationship: string) => void;
  acceptFamilyRequest: (requestId: string) => void;
  rejectFamilyRequest: (requestId: string) => void;
  removeFamilyMember: (memberId: string) => void;
  sendFamilyMessage: (toUsername: string, content: string) => void;
  markFamilyMessageRead: (messageId: string) => void;
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
  shareHealthEntryToFamily: (entry: HealthEntry, memberUsername: string) => void;
  markSharedHealthEntryRead: (entryId: string) => void;
  reset: () => void;
  clearAllAccounts: () => void;
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
      receivedHealthEntries: [],
      sentHealthEntries: [],
      familyRequests: [],

      // Actions
      login: (username, password) => {
        // Login only - does not create accounts
        try {
          const storedUsers = JSON.parse(localStorage.getItem('sage-users') || '{}');
          const normalizedUsername = username.trim().toLowerCase();
          
          // Validate input
          if (!normalizedUsername || !password) {
            return false;
          }
          
          // Check if user exists and password matches
          if (storedUsers[normalizedUsername] && storedUsers[normalizedUsername].password === password) {
            const userData = storedUsers[normalizedUsername];
            
            // If user data is missing or invalid, repair it
            if (!userData || !userData.user || typeof userData.user !== 'object') {
              console.warn('User data missing or invalid for:', normalizedUsername, '- repairing...');
              
              // Create a new user object with the username (use original username for display if available)
              const displayName = userData?.user?.name || normalizedUsername;
              const repairedUser = generateInitialUser(displayName);
              
              // Repair the user data
              storedUsers[normalizedUsername] = {
                password: userData?.password || password,
                user: repairedUser,
                isOnboarded: userData?.isOnboarded !== undefined ? userData.isOnboarded : true,
                speechAnalyses: userData?.speechAnalyses || [],
                gameResults: userData?.gameResults || [],
                insights: userData?.insights || [],
                memorySessions: userData?.memorySessions || [],
                biography: userData?.biography || null,
                medicalJournal: userData?.medicalJournal || null,
                receivedHealthEntries: userData?.receivedHealthEntries || [],
                sentHealthEntries: userData?.sentHealthEntries || [],
                familyRequests: userData?.familyRequests || []
              };
              
              // Save repaired data
              localStorage.setItem('sage-users', JSON.stringify(storedUsers));
              
              // Use the repaired data
              const repairedData = storedUsers[normalizedUsername];
              
              // Clear any stale persist data first
              try {
                const persistData = JSON.parse(localStorage.getItem('sage-storage') || '{}');
                if (persistData.state && persistData.state.currentUserId !== normalizedUsername) {
                  // Clear stale data
                  localStorage.setItem('sage-storage', JSON.stringify({
                    state: {
                      isAuthenticated: false,
                      currentUserId: null,
                      isOnboarded: false
                    }
                  }));
                }
              } catch (e) {
                // Ignore errors clearing persist data
              }
              
              // Set state with repaired data
              const updatedState = {
                isAuthenticated: true, 
                currentUserId: normalizedUsername,
                user: repairedData.user,
                isOnboarded: repairedData.isOnboarded !== undefined ? repairedData.isOnboarded : true,
                speechAnalyses: repairedData.speechAnalyses || [],
                gameResults: repairedData.gameResults || [],
                insights: repairedData.insights || [],
                memorySessions: repairedData.memorySessions || [],
                biography: repairedData.biography || null,
                medicalJournal: repairedData.medicalJournal || null,
                receivedHealthEntries: repairedData.receivedHealthEntries || [],
                sentHealthEntries: repairedData.sentHealthEntries || [],
                familyRequests: repairedData.familyRequests || []
              };
              
              set(updatedState);
              return true;
            }
            
            // User data is valid, proceed with normal login
            
            // Clear any stale persist data first
            try {
              const persistData = JSON.parse(localStorage.getItem('sage-storage') || '{}');
              if (persistData.state && persistData.state.currentUserId !== normalizedUsername) {
                // Clear stale data
                localStorage.setItem('sage-storage', JSON.stringify({
                  state: {
                    isAuthenticated: false,
                    currentUserId: null,
                    isOnboarded: false
                  }
                }));
              }
            } catch (e) {
              // Ignore errors clearing persist data
            }
            
            // For login users, always skip onboarding - only new signups need to see it
            const updatedState = {
              isAuthenticated: true, 
              currentUserId: normalizedUsername,
              user: userData.user,
              isOnboarded: userData.isOnboarded !== undefined ? userData.isOnboarded : true,
              speechAnalyses: userData.speechAnalyses || [],
              gameResults: userData.gameResults || [],
              insights: userData.insights || [],
              memorySessions: userData.memorySessions || [],
              biography: userData.biography || null,
              medicalJournal: userData.medicalJournal || null,
              receivedHealthEntries: userData.receivedHealthEntries || [],
              sentHealthEntries: userData.sentHealthEntries || [],
              familyRequests: userData.familyRequests || []
            };
            
            // Set the state directly - this will also update persist storage
            set(updatedState);
            
            // Save user data to localStorage immediately to ensure consistency
            try {
              storedUsers[normalizedUsername] = {
                ...storedUsers[normalizedUsername],
                password: storedUsers[normalizedUsername].password,
                user: updatedState.user,
                isOnboarded: updatedState.isOnboarded,
                speechAnalyses: updatedState.speechAnalyses,
                gameResults: updatedState.gameResults,
                insights: updatedState.insights,
                memorySessions: updatedState.memorySessions,
                biography: updatedState.biography,
                medicalJournal: updatedState.medicalJournal,
                receivedHealthEntries: updatedState.receivedHealthEntries,
                sentHealthEntries: updatedState.sentHealthEntries,
                familyRequests: updatedState.familyRequests
              };
              localStorage.setItem('sage-users', JSON.stringify(storedUsers));
            } catch (e) {
              // localStorage not available, continue anyway
              console.warn('localStorage not available, data not saved');
            }
            
            return true;
          }
        } catch (e) {
          // localStorage not available or error parsing
          console.error('localStorage error during login:', e);
        }
        
        // User doesn't exist or password doesn't match
        return false;
      },
      
      signUp: (username, password) => {
        // Sign up only - creates new account
        try {
          // Force fresh read from localStorage - don't trust any cached data
          let storedUsers: Record<string, any> = {};
          try {
            const usersData = localStorage.getItem('sage-users');
            console.log('SignUp - Raw localStorage data:', usersData);
            
            if (usersData && usersData.trim() !== '' && usersData !== '{}' && usersData !== 'null') {
              storedUsers = JSON.parse(usersData);
            } else {
              storedUsers = {};
            }
          } catch (e) {
            console.warn('Error parsing sage-users, treating as empty:', e);
            storedUsers = {};
          }
          
        const normalizedUsername = username.trim().toLowerCase();
        
          // Validate input
          if (!normalizedUsername || !password) {
            console.warn('SignUp - Invalid input');
            return false;
          }
          
          // Debug logging
          console.log('SignUp - Checking username:', normalizedUsername);
          console.log('SignUp - Stored users keys:', Object.keys(storedUsers));
          console.log('SignUp - User exists?', !!storedUsers[normalizedUsername]);
          
          // Check if username already exists - only if we have actual data
          if (storedUsers && typeof storedUsers === 'object' && Object.keys(storedUsers).length > 0) {
        if (storedUsers[normalizedUsername]) {
              console.error('SignUp - Username already exists:', normalizedUsername);
          return false; // Username already taken
            }
          }
          
          // Clear any stale persist data
          try {
            localStorage.setItem('sage-storage', JSON.stringify({
              state: {
                isAuthenticated: false,
                currentUserId: null,
                isOnboarded: false
              }
            }));
          } catch (e) {
            // Ignore errors
          }
          
          // Create new account with the actual username provided (not normalized for display)
          const newUser = generateInitialUser(username.trim()); // Use original username for display
        storedUsers[normalizedUsername] = {
          password: password,
          user: newUser,
          isOnboarded: false,
          speechAnalyses: [],
          gameResults: [],
          insights: [],
          memorySessions: [],
          biography: null,
            medicalJournal: null,
            receivedHealthEntries: [],
            sentHealthEntries: [],
            familyRequests: []
        };
          localStorage.setItem('sage-users', JSON.stringify(storedUsers));
          
        set({ 
          isAuthenticated: true, 
          currentUserId: normalizedUsername,
          user: newUser,
            isOnboarded: false,
            speechAnalyses: [],
            gameResults: [],
            insights: [],
            memorySessions: [],
            biography: null,
            medicalJournal: null,
            isHealthMode: false,
            receivedHealthEntries: [],
            sentHealthEntries: [],
            familyRequests: []
        });
        return true;
        } catch (e) {
          console.error('Error during signup:', e);
          return false;
        }
      },
      
      logout: () => set((state) => {
        // Save current user data before logging out
        if (state.currentUserId) {
          const storedUsers = JSON.parse(localStorage.getItem('sage-users') || '{}');
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
          localStorage.setItem('sage-users', JSON.stringify(storedUsers));
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
          const storedUsers = JSON.parse(localStorage.getItem('sage-users') || '{}');
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
          localStorage.setItem('sage-users', JSON.stringify(storedUsers));
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
      
      requestFamilyConnection: (username, name, relationship) => {
        const state = useStore.getState();
        if (!state.currentUserId || !state.user) return;
        
        const normalizedUsername = username.trim().toLowerCase();
        const storedUsers = JSON.parse(localStorage.getItem('sage-users') || '{}');
        
        // Check if user exists
        if (!storedUsers[normalizedUsername]) {
          alert('User not found. Please check the username.');
          return;
        }
        
        // Create request
        const request: FamilyRequest = {
          id: crypto.randomUUID(),
          fromUsername: state.currentUserId,
          fromName: state.user.name,
          toUsername: normalizedUsername,
          relationship,
          timestamp: new Date(),
          status: 'pending'
        };
        
        // Add to current user's requests (outgoing)
        set((state) => ({
          familyRequests: [...state.familyRequests, request]
        }));
        
        // Save to target user's localStorage
        const targetUserData = storedUsers[normalizedUsername];
        const targetRequests = targetUserData.familyRequests || [];
        targetRequests.push(request);
        storedUsers[normalizedUsername] = {
          ...targetUserData,
          familyRequests: targetRequests
        };
        localStorage.setItem('sage-users', JSON.stringify(storedUsers));
        
        // If target user is currently logged in, update their state
        if (normalizedUsername === state.currentUserId) {
          set({ familyRequests: [...state.familyRequests, request] });
        }
      },
      
      acceptFamilyRequest: (requestId) => {
        const state = useStore.getState();
        if (!state.currentUserId || !state.user) return;
        
        const request = state.familyRequests.find(r => r.id === requestId && r.status === 'pending');
        if (!request) return;
        
        const storedUsers = JSON.parse(localStorage.getItem('sage-users') || '{}');
        const fromUserData = storedUsers[request.fromUsername];
        
        if (!fromUserData) return;
        
        // Create family member for current user
        const newMember: FamilyMember = {
          id: crypto.randomUUID(),
          name: request.fromName,
          relationship: request.relationship,
          username: request.fromUsername,
          status: 'connected',
          messages: []
        };
        
        // Create family member for the requester
        const requesterMember: FamilyMember = {
          id: crypto.randomUUID(),
          name: state.user.name,
          relationship: request.relationship,
          username: state.currentUserId,
          status: 'connected',
          messages: []
        };
        
        // Update current user
        set((state) => ({
          user: state.user ? {
            ...state.user,
            familyMembers: [...state.user.familyMembers, newMember]
          } : null,
          familyRequests: state.familyRequests.map(r => 
            r.id === requestId ? { ...r, status: 'accepted' } : r
          )
        }));
        
        // Update requester's data
        fromUserData.user = {
          ...fromUserData.user,
          familyMembers: [...(fromUserData.user?.familyMembers || []), requesterMember]
        };
        fromUserData.familyRequests = (fromUserData.familyRequests || []).map((r: FamilyRequest) =>
          r.id === requestId ? { ...r, status: 'accepted' } : r
        );
        storedUsers[request.fromUsername] = fromUserData;
        localStorage.setItem('sage-users', JSON.stringify(storedUsers));
      },
      
      rejectFamilyRequest: (requestId) => {
        set((state) => ({
          familyRequests: state.familyRequests.map(r => 
            r.id === requestId ? { ...r, status: 'rejected' } : r
          )
        }));
      },
      
      removeFamilyMember: (memberId) => {
        set((state) => ({
        user: state.user ? {
          ...state.user,
            familyMembers: state.user.familyMembers.filter(m => m.id !== memberId)
        } : null
        }));
        
        // Also save to localStorage
        const stateAfter = useStore.getState();
        if (stateAfter.currentUserId) {
          const storedUsers = JSON.parse(localStorage.getItem('sage-users') || '{}');
          if (storedUsers[stateAfter.currentUserId]) {
            storedUsers[stateAfter.currentUserId].user = stateAfter.user;
            localStorage.setItem('sage-users', JSON.stringify(storedUsers));
          }
        }
      },
      
      sendFamilyMessage: (toUsername, content) => {
        const state = useStore.getState();
        if (!state.currentUserId || !state.user) return;
        
        const normalizedToUsername = toUsername.trim().toLowerCase();
        const message: FamilyMessage = {
          id: crypto.randomUUID(),
          fromUsername: state.currentUserId,
          fromName: state.user.name,
          toUsername: normalizedToUsername,
          content,
          timestamp: new Date(),
          read: false
        };
        
        // Add to current user's family member messages
        set((state) => ({
        user: state.user ? {
          ...state.user,
          familyMembers: state.user.familyMembers.map(m => 
              m.username?.toLowerCase() === normalizedToUsername
                ? { ...m, messages: [...m.messages, message] }
              : m
          )
        } : null
        }));
        
        // Save to target user's localStorage
        const storedUsers = JSON.parse(localStorage.getItem('sage-users') || '{}');
        const targetUserData = storedUsers[normalizedToUsername];
        if (targetUserData && targetUserData.user) {
          targetUserData.user.familyMembers = targetUserData.user.familyMembers.map((m: FamilyMember) =>
            m.username?.toLowerCase() === state.currentUserId?.toLowerCase()
              ? { ...m, messages: [...m.messages, message] }
              : m
          );
          storedUsers[normalizedToUsername] = targetUserData;
          localStorage.setItem('sage-users', JSON.stringify(storedUsers));
        }
      },
      
      markFamilyMessageRead: (messageId) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            familyMembers: state.user.familyMembers.map(m => ({
              ...m,
              messages: m.messages.map(msg =>
                msg.id === messageId ? { ...msg, read: true } : msg
              )
            }))
          } : null
        }));
      },
      
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
        // Helper to ensure date is a Date object (handles localStorage string serialization)
        const toDate = (d: Date | string): Date => d instanceof Date ? d : new Date(d);
        
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
              toDate(a.date).getTime() - toDate(b.date).getTime()
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
      
      shareHealthEntryToFamily: (entry, memberUsername) => {
        try {
          const state = useStore.getState();
          const storedUsers = JSON.parse(localStorage.getItem('sage-users') || '{}');
          const normalizedMemberUsername = memberUsername.trim().toLowerCase();
          
          // Check if the family member's account exists
          if (!storedUsers[normalizedMemberUsername]) {
            alert('Family member account not found. Please check the username.');
            return;
          }
          
          // Get current user info
          const currentUserName = state.currentUserId || '';
          const currentUserData = storedUsers[currentUserName];
          const currentUserNameDisplay = currentUserData?.user?.preferredName || currentUserData?.user?.name || currentUserName;
          
          // Create shared entry for recipient
          const receivedEntry: SharedHealthEntry = {
            id: crypto.randomUUID(),
            healthEntry: entry,
            fromUsername: currentUserName,
            fromName: currentUserNameDisplay,
            timestamp: new Date(),
            read: false
          };
          
          // Create shared entry for sender (with recipient info)
          const sentEntry: SharedHealthEntry = {
            ...receivedEntry,
            id: crypto.randomUUID(), // Different ID for sent entry
            toUsername: normalizedMemberUsername
          };
          
          // Add to the family member's received entries
          const memberData = storedUsers[normalizedMemberUsername];
          const memberReceivedEntries = memberData.receivedHealthEntries || [];
          memberData.receivedHealthEntries = [...memberReceivedEntries, receivedEntry];
          
          // Add to current user's sent entries
          const currentUserSentEntries = currentUserData.sentHealthEntries || [];
          currentUserData.sentHealthEntries = [...currentUserSentEntries, sentEntry];
          
          // Save to localStorage
          storedUsers[normalizedMemberUsername] = memberData;
          storedUsers[currentUserName] = currentUserData;
          localStorage.setItem('sage-users', JSON.stringify(storedUsers));
          
          // Update state if users are currently logged in
          if (state.currentUserId === normalizedMemberUsername) {
            set({ receivedHealthEntries: memberData.receivedHealthEntries || [] });
          }
          set({ sentHealthEntries: currentUserData.sentHealthEntries || [] });
        } catch (e) {
          console.error('Error sharing health entry:', e);
          alert('Failed to share health entry. Please try again.');
        }
      },
      
      markSharedHealthEntryRead: (entryId) => {
        try {
          const state = useStore.getState();
          const currentUserId = state.currentUserId;
          if (!currentUserId) return;
          
          const storedUsers = JSON.parse(localStorage.getItem('sage-users') || '{}');
          const userData = storedUsers[currentUserId];
          
          if (userData && userData.receivedHealthEntries) {
            userData.receivedHealthEntries = userData.receivedHealthEntries.map((entry: SharedHealthEntry) =>
              entry.id === entryId ? { ...entry, read: true } : entry
            );
            
            storedUsers[currentUserId] = userData;
            localStorage.setItem('sage-users', JSON.stringify(storedUsers));
            
            set({ receivedHealthEntries: userData.receivedHealthEntries });
          }
        } catch (e) {
          console.error('Error marking entry as read:', e);
        }
      },
      
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
        isHealthMode: false,
        receivedHealthEntries: []
      }),
      
      clearAllAccounts: () => {
        // NUCLEAR CLEAR - Remove everything
        try {
          console.log('🚨 Starting NUCLEAR CLEAR...');
          
          // Step 1: Clear all localStorage keys
          const keysToRemove = [];
          for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key) {
              keysToRemove.push(key);
              localStorage.removeItem(key);
            }
          }
          console.log('Step 1: Cleared', keysToRemove.length, 'localStorage keys');
          
          // Step 2: Clear all sessionStorage
          const sessionKeys = [];
          for (let i = sessionStorage.length - 1; i >= 0; i--) {
            const key = sessionStorage.key(i);
            if (key) {
              sessionKeys.push(key);
              sessionStorage.removeItem(key);
            }
          }
          console.log('Step 2: Cleared', sessionKeys.length, 'sessionStorage keys');
          
          // Step 3: Force remove sage keys 50 times (very aggressive)
          for (let i = 0; i < 50; i++) {
            localStorage.removeItem('sage-users');
            localStorage.removeItem('sage-storage');
            sessionStorage.removeItem('sage-users');
            sessionStorage.removeItem('sage-storage');
          }
          console.log('Step 3: Force removed sage keys 50 times');
          
          // Step 4: Use clear() method as backup
          try {
            localStorage.clear();
            sessionStorage.clear();
            console.log('Step 4: Used clear() method');
          } catch (e) {
            console.warn('clear() method failed:', e);
          }
          
          // Step 5: Final verification
          const finalCheck1 = localStorage.getItem('sage-users');
          const finalCheck2 = localStorage.getItem('sage-storage');
          const finalCheck3 = sessionStorage.getItem('sage-users');
          const finalCheck4 = sessionStorage.getItem('sage-storage');
          
          console.log('Final verification:');
          console.log('  sage-users in localStorage:', !!finalCheck1);
          console.log('  sage-storage in localStorage:', !!finalCheck2);
          console.log('  sage-users in sessionStorage:', !!finalCheck3);
          console.log('  sage-storage in sessionStorage:', !!finalCheck4);
          console.log('  All localStorage keys:', Object.keys(localStorage));
          console.log('  All sessionStorage keys:', Object.keys(sessionStorage));
          
          if (!finalCheck1 && !finalCheck2 && !finalCheck3 && !finalCheck4) {
            console.log('✅✅✅ NUCLEAR CLEAR SUCCESSFUL! ✅✅✅');
          } else {
            console.error('❌❌❌ WARNING: Data still exists after clearing!');
            console.error('This may be a browser caching issue. Please:');
            console.error('1. Close ALL browser tabs');
            console.error('2. Clear browser cache (Cmd+Shift+Delete)');
            console.error('3. Restart browser');
          }
          
          console.log('✅ NUCLEAR CLEAR complete');
        } catch (e) {
          console.error('Error clearing accounts:', e);
        }
        
        // Reset state
        set({
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
          receivedHealthEntries: [],
          sentHealthEntries: [],
          familyRequests: []
        });
      },
      
      debugStorage: () => {
        // Debug function to see what's actually in storage
        console.log('=== STORAGE DEBUG ===');
        console.log('localStorage length:', localStorage.length);
        console.log('sessionStorage length:', sessionStorage.length);
        
        const allLocalKeys = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
            allLocalKeys.push(key);
            if (key.includes('sage') || key.includes('user')) {
              console.log('Found key:', key, '=', localStorage.getItem(key)?.substring(0, 100));
            }
          }
        }
        console.log('All localStorage keys:', allLocalKeys);
        
        const sageUsers = localStorage.getItem('sage-users');
        const sageStorage = localStorage.getItem('sage-storage');
        
        console.log('sage-users exists?', !!sageUsers);
        console.log('sage-storage exists?', !!sageStorage);
        
        if (sageUsers) {
          try {
            const parsed = JSON.parse(sageUsers);
            console.log('sage-users content:', Object.keys(parsed));
            console.log('sage-users full:', parsed);
          } catch (e) {
            console.error('Error parsing sage-users:', e);
          }
        }
        
        console.log('=== END DEBUG ===');
      }
    }),
    {
      name: 'sage-storage',
      partialize: (state) => ({
        // Only persist minimal auth state - user data is stored in sage-users
        isAuthenticated: state.isAuthenticated,
        currentUserId: state.currentUserId,
        isOnboarded: state.isOnboarded
        // User data should always be loaded from sage-users, not from persist storage
      }),
      onRehydrateStorage: () => (state) => {
        // After rehydration, if user is authenticated, load their actual data from sage-users
        // This ensures we use the correct user data and prevents stale data issues
        if (state?.isAuthenticated && state.currentUserId) {
          try {
            const storedUsers = JSON.parse(localStorage.getItem('sage-users') || '{}');
            const normalizedUserId = state.currentUserId.trim().toLowerCase();
            const userData = storedUsers[normalizedUserId];
            
            // Validate user exists and has valid data
            if (userData && userData.user && typeof userData.user === 'object') {
            // Override rehydrated state with actual user data from storage
              // Always use userData from localStorage, never from rehydrated state
              useStore.setState({
                currentUserId: normalizedUserId, // Ensure normalized
                user: userData.user,
                isOnboarded: userData.isOnboarded !== undefined ? userData.isOnboarded : true,
                speechAnalyses: userData.speechAnalyses || [],
                gameResults: userData.gameResults || [],
                insights: userData.insights || [],
                memorySessions: userData.memorySessions || [],
                biography: userData.biography || null,
                medicalJournal: userData.medicalJournal || null,
                receivedHealthEntries: userData.receivedHealthEntries || [],
                sentHealthEntries: userData.sentHealthEntries || [],
                familyRequests: userData.familyRequests || []
              });
            } else {
              // User data doesn't exist or is corrupted - repair it or clear authentication
              if (userData && userData.password) {
                // User exists but data is corrupted - repair it
                console.warn('User data corrupted for:', normalizedUserId, '- repairing...');
                const displayName = userData?.user?.name || normalizedUserId;
                const repairedUser = generateInitialUser(displayName);
                
                const repairedData = {
                  ...userData,
                  user: repairedUser,
                  isOnboarded: userData.isOnboarded !== undefined ? userData.isOnboarded : true,
                  speechAnalyses: userData.speechAnalyses || [],
                  gameResults: userData.gameResults || [],
                  insights: userData.insights || [],
                  memorySessions: userData.memorySessions || [],
                  biography: userData.biography || null,
                  medicalJournal: userData.medicalJournal || null,
                  receivedHealthEntries: userData.receivedHealthEntries || [],
                  sentHealthEntries: userData.sentHealthEntries || [],
                  familyRequests: userData.familyRequests || []
                };
                
                // Save repaired data
                const storedUsers = JSON.parse(localStorage.getItem('sage-users') || '{}');
                storedUsers[normalizedUserId] = repairedData;
                localStorage.setItem('sage-users', JSON.stringify(storedUsers));
                
                // Set state with repaired data
                useStore.setState({
                  currentUserId: normalizedUserId,
                  user: repairedUser,
                  isOnboarded: repairedData.isOnboarded,
                  speechAnalyses: repairedData.speechAnalyses,
                  gameResults: repairedData.gameResults,
                  insights: repairedData.insights,
                  memorySessions: repairedData.memorySessions,
                  biography: repairedData.biography,
                  medicalJournal: repairedData.medicalJournal,
                  receivedHealthEntries: repairedData.receivedHealthEntries,
                  sentHealthEntries: repairedData.sentHealthEntries,
                  familyRequests: repairedData.familyRequests
                });
              } else {
                // User doesn't exist - clear authentication
                console.warn('User data not found for:', normalizedUserId, '- clearing authentication');
                useStore.setState({
                  isAuthenticated: false,
                  currentUserId: null,
                  user: null,
                  isOnboarded: false
                });
              }
            }
          } catch (e) {
            console.error('Error during rehydration:', e);
            // On error, clear authentication to prevent invalid state
            useStore.setState({
              isAuthenticated: false,
              currentUserId: null,
              user: null,
              isOnboarded: false
            });
          }
        } else {
          // Not authenticated - ensure clean state
          useStore.setState({
            isAuthenticated: false,
            currentUserId: null,
            user: null,
            isOnboarded: false
          });
        }
      }
    }
  )
);

