'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Heart, Mic, MicOff, Activity, AlertCircle, CheckCircle2 } from '@/components/icons';
import { detectHealthIntent, generateHealthFollowUpQuestions, extractPainLevel } from '@/lib/healthIntentDetection';
import { processSpeechResult } from '@/lib/punctuationProcessor';
import type { HealthEntry, HealthIntent } from '@/types';

export function HealthScribe() {
  const {
    user,
    medicalJournal,
    isHealthMode,
    setIsHealthMode,
    addHealthEntry
  } = useStore();

  const [isRecording, setIsRecording] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [detectedIntent, setDetectedIntent] = useState<HealthIntent | null>(null);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [followUpResponses, setFollowUpResponses] = useState<{ question: string; response: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const transcriptBuilderRef = useRef<string>('');
  const recognitionRef = useRef<any>(null);
  
  // Check if Web Speech API is supported
  const isSpeechRecognitionSupported = () => {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  };

  // Monitor transcript for health intents
  useEffect(() => {
    if (currentTranscript.length > 20) {
      const intent = detectHealthIntent(currentTranscript);
      if (intent && !isHealthMode) {
        setDetectedIntent(intent);
        setIsHealthMode(true);
        const questions = generateHealthFollowUpQuestions(intent);
        setFollowUpQuestions(questions);
        setCurrentQuestionIndex(0);
      }
    }
  }, [currentTranscript, isHealthMode, setIsHealthMode]);

  const startRecording = useCallback(() => {
    if (!isSpeechRecognitionSupported()) {
      setErrorMessage('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    setIsRecording(true);
    setCurrentTranscript('');
    transcriptBuilderRef.current = '';
    setDetectedIntent(null);
    setFollowUpQuestions([]);
    setCurrentQuestionIndex(0);
    setFollowUpResponses([]);
    setErrorMessage(null);

    // Initialize Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMessage('Speech recognition is not available.');
      setIsRecording(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      // Process with punctuation
      const processedText = processSpeechResult(
        finalTranscript,
        interimTranscript,
        transcriptBuilderRef.current
      );
      
      transcriptBuilderRef.current = processedText;
      setCurrentTranscript(processedText);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech') {
        // User stopped speaking, but don't show error
        return;
      } else if (event.error === 'audio-capture') {
        setErrorMessage('Microphone not found. Please check your microphone settings.');
      } else if (event.error === 'not-allowed') {
        setErrorMessage('Microphone permission denied. Please allow microphone access in your browser settings.');
      } else {
        setErrorMessage(`Speech recognition error: ${event.error}`);
      }
      setIsRecording(false);
    };

    recognition.onend = () => {
      // Don't automatically stop recording - let user control it
      // This allows them to continue speaking
    };

    recognitionRef.current = recognition;
    
    try {
      recognition.start();
    } catch (error) {
      console.error('Error starting recognition:', error);
      setErrorMessage('Failed to start speech recognition. Please try again.');
      setIsRecording(false);
    }
  }, []);

  const stopRecording = useCallback(() => {
    // Stop speech recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
      recognitionRef.current = null;
    }
    
    setIsRecording(false);
    
    // Finalize transcript with punctuation
    if (transcriptBuilderRef.current) {
      const finalTranscript = transcriptBuilderRef.current.trim();
      setCurrentTranscript(finalTranscript);
      
      // Detect intent if not already detected
      if (!detectedIntent && finalTranscript.length > 0) {
        const intent = detectHealthIntent(finalTranscript);
        if (intent) {
          setDetectedIntent(intent);
          setIsHealthMode(true);
          const questions = generateHealthFollowUpQuestions(intent);
          setFollowUpQuestions(questions);
        }
      }
    }
  }, [currentTranscript, detectedIntent, setIsHealthMode]);

  const answerFollowUp = useCallback(async () => {
    if (!detectedIntent || currentQuestionIndex >= followUpQuestions.length) {
      // Save health entry
      const finalTranscript = transcriptBuilderRef.current.trim() || currentTranscript;
      const painLevel = extractPainLevel(finalTranscript);
      
      const healthEntry: HealthEntry = {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        intent: detectedIntent || 'general',
        primaryConcern: finalTranscript,
        followUpQuestions: followUpResponses.map(r => ({
          question: r.question,
          response: r.response,
          timestamp: new Date()
        })),
        painLevel: painLevel ?? undefined,
        notes: '',
        tags: []
      };
      
      addHealthEntry(healthEntry);
      setIsProcessing(true);
      
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsProcessing(false);
      setIsHealthMode(false);
      setCurrentTranscript('');
      transcriptBuilderRef.current = '';
      setDetectedIntent(null);
      setFollowUpQuestions([]);
      setCurrentQuestionIndex(0);
      setFollowUpResponses([]);
      return;
    }
    
    // Add response and move to next question
    const currentQuestion = followUpQuestions[currentQuestionIndex];
    const responseText = transcriptBuilderRef.current.trim() || currentTranscript;
    setFollowUpResponses(prev => [
      ...prev,
      { question: currentQuestion, response: responseText }
    ]);
    
    setCurrentQuestionIndex(prev => prev + 1);
    setCurrentTranscript('');
    transcriptBuilderRef.current = '';
    
    // Start recording for next question
    setTimeout(() => {
      startRecording();
    }, 100);
  }, [detectedIntent, currentQuestionIndex, followUpQuestions, currentTranscript, followUpResponses, addHealthEntry, setIsHealthMode, startRecording]);

  const getIntentIcon = (intent: HealthIntent) => {
    switch (intent) {
      case 'symptom':
      case 'pain':
        return <AlertCircle size={24} className="text-[var(--color-agitated)]" />;
      case 'medication':
        return <Activity size={24} className="text-[var(--color-terracotta)]" />;
      default:
        return <Heart size={24} className="text-[var(--color-sage)]" />;
    }
  };

  const getIntentLabel = (intent: HealthIntent): string => {
    const labels: Record<HealthIntent, string> = {
      symptom: 'Symptom Report',
      medication: 'Medication Inquiry',
      pain: 'Pain Assessment',
      appointment: 'Appointment',
      mood: 'Mood Check',
      sleep: 'Sleep Quality',
      nutrition: 'Nutrition',
      general: 'General Health'
    };
    return labels[intent];
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-[var(--color-charcoal)] mb-2">
          Health Scribe
        </h2>
        <p className="text-[var(--color-stone)]">
          Your intelligent health diary. I'll help track your well-being and create a record for your doctors.
        </p>
      </div>

      {isHealthMode && (
        <Card className="border-2 border-[var(--color-terracotta)] bg-[var(--color-terracotta)]/5">
          <div className="flex items-center gap-3 mb-2">
            {detectedIntent && getIntentIcon(detectedIntent)}
            <div>
              <h3 className="font-display font-semibold text-[var(--color-charcoal)]">
                Clinician Support Mode Active
              </h3>
              <p className="text-sm text-[var(--color-stone)]">
                {detectedIntent && getIntentLabel(detectedIntent)} detected
              </p>
            </div>
          </div>
          <p className="text-sm text-[var(--color-stone)]">
            I've detected a health-related topic. I'll ask some follow-up questions to create a complete record.
          </p>
        </Card>
      )}

      {!isRecording && !isHealthMode && (
        <Card className="text-center py-8">
          <Heart size={48} className="mx-auto text-[var(--color-sage)] mb-4" />
          <h3 className="text-lg font-display font-semibold text-[var(--color-charcoal)] mb-2">
            Ready to track your health
          </h3>
          <p className="text-[var(--color-stone)] mb-6">
            Start speaking about how you're feeling, any symptoms, medications, or health concerns.
            I'll automatically detect health topics and ask helpful follow-up questions.
          </p>
          <Button onClick={startRecording} icon={<Mic size={20} />} size="lg">
            Start Health Check
          </Button>
        </Card>
      )}

      {errorMessage && (
        <Card className="border-2 border-[var(--color-agitated)] bg-[var(--color-agitated)]/10">
          <p className="text-sm text-[var(--color-agitated)]">{errorMessage}</p>
          <Button
            onClick={() => setErrorMessage(null)}
            variant="secondary"
            size="sm"
            className="mt-2"
          >
            Dismiss
          </Button>
        </Card>
      )}

      {isRecording && (
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-[var(--color-agitated)] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[var(--color-charcoal)]">Recording...</span>
          </div>
          
          {followUpQuestions.length > 0 && currentQuestionIndex < followUpQuestions.length && (
            <div className="mb-4 p-4 bg-[var(--color-terracotta)]/10 rounded-xl border-2 border-[var(--color-terracotta)]">
              <p className="text-sm text-[var(--color-stone)] mb-2">Question {currentQuestionIndex + 1} of {followUpQuestions.length}:</p>
              <p className="text-lg font-medium text-[var(--color-charcoal)]">
                {followUpQuestions[currentQuestionIndex]}
              </p>
            </div>
          )}
          
          <div className="p-4 bg-[var(--color-sand)] rounded-xl mb-4">
            <p className="text-[var(--color-charcoal)] leading-relaxed">
              {currentTranscript || 'Listening...'}
              <span className="inline-block w-2 h-5 bg-[var(--color-sage)] ml-1 animate-pulse" />
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={stopRecording}
              variant="secondary"
              icon={<MicOff size={20} />}
              fullWidth
            >
              Stop Recording
            </Button>
          </div>
        </Card>
      )}

      {!isRecording && currentTranscript && isHealthMode && (
        <Card>
          <h3 className="text-lg font-display font-semibold text-[var(--color-charcoal)] mb-4">
            Your Response
          </h3>
          
          <div className="p-4 bg-[var(--color-sand)] rounded-xl mb-4">
            <p className="text-[var(--color-charcoal)] leading-relaxed">{currentTranscript}</p>
          </div>
          
          {followUpResponses.length > 0 && (
            <div className="mb-4 space-y-2">
              <p className="text-sm font-medium text-[var(--color-stone)] mb-2">Previous responses:</p>
              {followUpResponses.map((r, idx) => (
                <div key={idx} className="p-3 bg-[var(--color-sand)] rounded-lg">
                  <p className="text-xs text-[var(--color-stone)] mb-1">{r.question}</p>
                  <p className="text-sm text-[var(--color-charcoal)]">{r.response}</p>
                </div>
              ))}
            </div>
          )}
          
          <Button
            onClick={answerFollowUp}
            fullWidth
            icon={currentQuestionIndex >= followUpQuestions.length ? <CheckCircle2 size={18} /> : undefined}
          >
            {currentQuestionIndex >= followUpQuestions.length 
              ? 'Save Health Entry' 
              : 'Continue to Next Question'}
          </Button>
        </Card>
      )}

      {isProcessing && (
        <Card className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-[var(--color-sage)] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-[var(--color-stone)]">Saving your health entry...</p>
        </Card>
      )}

      {medicalJournal && medicalJournal.entries.length > 0 && (
        <Card>
          <h3 className="text-lg font-display font-semibold text-[var(--color-charcoal)] mb-4">
            Recent Health Entries
          </h3>
          <div className="space-y-3">
            {medicalJournal.entries.slice(0, 5).map((entry) => (
              <div key={entry.id} className="p-4 bg-[var(--color-sand)] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getIntentIcon(entry.intent)}
                    <span className="font-medium text-[var(--color-charcoal)]">
                      {getIntentLabel(entry.intent)}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--color-stone)]">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-charcoal)] mb-2">{entry.primaryConcern}</p>
                {entry.painLevel && (
                  <div className="text-xs text-[var(--color-stone)]">
                    Pain level: {entry.painLevel}/10
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

