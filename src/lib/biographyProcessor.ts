import type { BiographyEntry, MemorySession } from '@/types';

/**
 * Background function that analyzes chat logs and extracts biographical facts
 * This simulates sending to an AI service for analysis
 */
export async function processBiographyFromTranscript(
  transcript: string,
  chapter: string
): Promise<BiographyEntry> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Extract key biographical facts from transcript
  // In a real implementation, this would call an AI API
  const extractedFacts = extractBiographicalFacts(transcript);

  const entry: BiographyEntry = {
    id: crypto.randomUUID(),
    chapter: chapter as any,
    content: formatBiographyContent(transcript, chapter),
    extractedFacts,
    timestamp: new Date(),
    sourceSessionId: crypto.randomUUID()
  };

  return entry;
}

/**
 * Extracts biographical facts from transcript
 * In production, this would use an AI service with the prompt:
 * "Analyze the transcript below. Extract key biographical facts (dates, names, locations, life lessons) 
 * and format them into a structured JSON file titled 'Grandma's Life Story.' Ignore small talk."
 */
function extractBiographicalFacts(transcript: string): BiographyEntry['extractedFacts'] {
  const facts: BiographyEntry['extractedFacts'] = {
    dates: [],
    names: [],
    locations: [],
    lifeLessons: []
  };

  // Simple pattern matching (in production, use AI)
  const datePattern = /\b(19|20)\d{2}\b|\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/gi;
  const dates = transcript.match(datePattern);
  if (dates) {
    facts.dates = [...new Set(dates)];
  }

  // Extract capitalized words (likely names/places)
  const capitalizedWords = transcript.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g);
  if (capitalizedWords) {
    const filtered = capitalizedWords.filter(word => 
      !['I', 'The', 'This', 'That', 'When', 'Where', 'What', 'How', 'Why'].includes(word)
    );
    facts.names = [...new Set(filtered.slice(0, 10))];
  }

  // Extract locations (words after "in", "at", "from")
  const locationPattern = /\b(in|at|from|to)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi;
  const locations = [...transcript.matchAll(locationPattern)];
  if (locations.length > 0) {
    facts.locations = [...new Set(locations.map(m => m[2]).slice(0, 5))];
  }

  // Extract life lessons (sentences with "learned", "taught", "important", etc.)
  const lessonKeywords = ['learned', 'taught', 'important', 'remember', 'always', 'never', 'should'];
  const sentences = transcript.split(/[.!?]+/);
  const lessons = sentences
    .filter(s => lessonKeywords.some(keyword => s.toLowerCase().includes(keyword)))
    .map(s => s.trim())
    .filter(s => s.length > 10)
    .slice(0, 3);
  
  if (lessons.length > 0) {
    facts.lifeLessons = lessons;
  }

  return facts;
}

/**
 * Formats transcript into biography content
 */
function formatBiographyContent(transcript: string, chapter: string): string {
  // Clean up the transcript and format it as a biography entry
  const cleaned = transcript
    .replace(/\s+/g, ' ')
    .trim();
  
  // Add chapter context
  return `During ${chapter}, ${cleaned}`;
}

/**
 * Generates empathetic follow-up questions based on the conversation
 * Analyzes the actual response content to ask relevant follow-up questions
 */
export function generateFollowUpQuestions(
  currentTopic: string,
  previousResponses: string[]
): string[] {
  const questions: string[] = [];
  const latestResponse = previousResponses[previousResponses.length - 1] || '';
  const responseLower = latestResponse.toLowerCase();

  // Analyze the response content to generate contextual questions
  // Look for specific topics, people, places, emotions, and events mentioned
  // IMPORTANT: Check specific topics FIRST before generic checks

  // Check for travel FIRST (before generic location check)
  const travelKeywords = /\b(traveled|trip|visited|journey|adventure|saw|explored|went to|flew to|drove to|sailed|cruise|vacation|holiday|tour|sightseeing|destination|country|countries|city|cities|beach|mountain|museum|landmark|culture|cuisine|hotel|resort|airport|train|plane|flight)\b/i;
  const locationMentions = /\b(in|to|from|at)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/g;
  const hasTravelContent = travelKeywords.test(latestResponse) || currentTopic.toLowerCase().includes('travel');
  
  // Check for living/residence (different from travel)
  const livingKeywords = /\b(lived|living|moved to|resided|settled|home|hometown|grew up in)\b/i;
  const hasLivingContent = livingKeywords.test(latestResponse);

  // Check for mentions of people
  if (/\b(mother|father|mom|dad|parent|sibling|brother|sister|friend|teacher|boss|colleague|spouse|husband|wife|partner|child|children|grandchild)\b/i.test(latestResponse)) {
    questions.push("Can you tell me more about the people you mentioned?");
    questions.push("What role did they play in your life?");
    questions.push("How did they influence you?");
  }

  // Check for mentions of time periods or dates
  if (/\b(19|20)\d{2}\b|\b(when|during|year|years ago|decade)\b/i.test(latestResponse)) {
    questions.push("What was that time period like for you?");
    questions.push("How was life different back then?");
    questions.push("What do you remember most about that era?");
  }

  // Check for emotions or feelings
  if (/\b(happy|sad|proud|grateful|scared|excited|worried|loved|enjoyed|appreciated|felt|feeling)\b/i.test(latestResponse)) {
    questions.push("How did that experience make you feel?");
    questions.push("What emotions stand out most from that time?");
    questions.push("How did those feelings change over time?");
  }

  // Check for challenges or difficulties
  if (/\b(challenge|difficult|hard|tough|struggle|problem|obstacle|hardship|demanding)\b/i.test(latestResponse)) {
    questions.push("How did you overcome those challenges?");
    questions.push("What helped you get through that difficult time?");
    questions.push("What did you learn from facing those obstacles?");
  }

  // Check for achievements or accomplishments
  if (/\b(achieved|accomplished|succeeded|proud|accomplishment|success|learned|taught|mastered)\b/i.test(latestResponse)) {
    questions.push("What did you learn from that experience?");
    questions.push("What are you most proud of about that achievement?");
    questions.push("How did that success impact your life?");
  }

  // Check for work/career specific content
  if (currentTopic.toLowerCase().includes('career') || /\b(work|job|career|profession|military|served|worked|colleague|boss|office)\b/i.test(latestResponse)) {
    if (!responseLower.includes('enjoy') && !responseLower.includes('like')) {
      questions.push("What did you enjoy most about that work?");
    }
    if (!responseLower.includes('challenge') && !responseLower.includes('difficult')) {
      questions.push("What challenges did you face?");
    }
    questions.push("How did that work shape who you are today?");
    questions.push("What skills did you develop in that role?");
    questions.push("Who were the most memorable people you worked with?");
    questions.push("What would you tell someone starting in that field?");
  }

  // Check for family/marriage specific content
  if (currentTopic.toLowerCase().includes('marriage') || currentTopic.toLowerCase().includes('family') || 
      /\b(married|wedding|spouse|husband|wife|children|family|parent|grandparent)\b/i.test(latestResponse)) {
    if (!responseLower.includes('special') && !responseLower.includes('important')) {
      questions.push("What made that moment special?");
    }
    questions.push("How did that change your life?");
    questions.push("What traditions did you create together?");
    questions.push("What advice would you give about family life?");
    questions.push("What are your favorite memories with them?");
  }

  // Check for childhood specific content
  if (currentTopic.toLowerCase().includes('childhood') || /\b(childhood|grew up|young|school|child|kid)\b/i.test(latestResponse)) {
    if (!responseLower.includes('favorite') && !responseLower.includes('memory')) {
      questions.push("What was your favorite memory from that time?");
    }
    questions.push("Who were the most important people in your life then?");
    questions.push("What games or activities did you enjoy?");
    questions.push("What lessons from childhood do you still carry with you?");
    questions.push("How was your childhood different from today's kids?");
  }

  // Check for hobbies/interests
  if (currentTopic.toLowerCase().includes('hobbies') || /\b(hobby|interest|enjoy|love|passion|gardening|cooking|reading|sport|activity)\b/i.test(latestResponse)) {
    questions.push("What drew you to that activity?");
    questions.push("How has that hobby enriched your life?");
    questions.push("What's your favorite thing about doing that?");
    questions.push("When did you first discover this interest?");
    questions.push("Have you shared this hobby with others?");
  }

  // Check for travel - much more intelligent detection (already defined above, but process here)
  if (hasTravelContent) {
    // Extract mentioned locations - improved to catch "traveled to Paris" and "visited the Eiffel Tower"
    const locations: string[] = [];
    
    // First, try to extract locations after travel verbs
    const travelLocationPattern = /\b(traveled|visited|went to|flew to|drove to|saw|explored)\s+(?:the\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi;
    let match;
    
    while ((match = travelLocationPattern.exec(latestResponse)) !== null) {
      const location = match[2];
      if (location && !['I', 'The', 'This', 'That', 'When', 'Where', 'What', 'How', 'Why', 'It', 'Was', 'Eiffel'].includes(location)) {
        locations.push(location);
      }
    }
    
    // Also try the general location pattern if no locations found
    if (locations.length === 0) {
      while ((match = locationMentions.exec(latestResponse)) !== null) {
        const location = match[2];
        if (location && !['I', 'The', 'This', 'That', 'When', 'Where', 'What', 'How', 'Why', 'It', 'Was'].includes(location)) {
          locations.push(location);
        }
      }
    }
    
    // Generate context-aware travel questions
    if (locations.length > 0) {
      const location = locations[0];
      questions.push(`What was it like visiting ${location}?`);
      questions.push(`What did you enjoy most about ${location}?`);
      questions.push(`What surprised you about ${location}?`);
      questions.push(`Would you go back to ${location}?`);
      questions.push(`What would you tell someone planning to visit ${location}?`);
    } else if (/\b(country|countries|city|cities)\b/i.test(latestResponse)) {
      questions.push("What was the most interesting place you visited?");
      questions.push("What made that destination special to you?");
    } else if (/\b(culture|cuisine|food|local)\b/i.test(latestResponse)) {
      questions.push("What was the most memorable cultural experience?");
      questions.push("Did you try any local foods or customs?");
    } else if (/\b(beach|ocean|sea|coast)\b/i.test(latestResponse)) {
      questions.push("What was your favorite memory from that beach or coastal area?");
      questions.push("Did you do any activities by the water?");
    } else if (/\b(mountain|hiking|climbing|nature)\b/i.test(latestResponse)) {
      questions.push("What was the most beautiful view you saw?");
      questions.push("How did that natural setting make you feel?");
    } else if (/\b(museum|art|history|historical|landmark)\b/i.test(latestResponse)) {
      questions.push("What was the most fascinating thing you learned?");
      questions.push("Which historical site or museum stood out to you?");
    } else if (/\b(family|children|kids|spouse|husband|wife|together)\b/i.test(latestResponse)) {
      questions.push("What was your favorite memory from traveling with them?");
      questions.push("How did that trip bring you closer together?");
    } else if (/\b(adventure|exciting|thrilling|unforgettable|amazing)\b/i.test(latestResponse)) {
      questions.push("What made that experience so memorable?");
      questions.push("Would you want to have a similar adventure again?");
    } else {
      // Generic but better travel questions
      questions.push("What was the most memorable part of that trip?");
      questions.push("What did you learn from that travel experience?");
      questions.push("Would you recommend that destination to others?");
    }
  }

  // Check for mentions of places/locations - but ONLY if not travel or living
  if (!hasTravelContent && !hasLivingContent && /\b(in|at|from|to)\s+[A-Z][a-z]+/i.test(latestResponse)) {
    // Generic location mention (not travel or living)
    questions.push("Can you tell me more about that place?");
  } else if (hasLivingContent && !hasTravelContent) {
    // Someone lived somewhere (not traveling)
    questions.push("What was it like living there?");
  }

  // If no specific questions were generated, use generic empathetic questions
  if (questions.length === 0) {
    questions.push("Can you tell me more about that?");
    questions.push("What stands out most in your memory?");
    questions.push("How did that experience impact you?");
    questions.push("What would you want others to know about that?");
    questions.push("How has that shaped who you are today?");
    questions.push("What advice would you give based on that experience?");
  }

  // Return up to 8-10 most relevant questions
  return questions.slice(0, 10);
}

