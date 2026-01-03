/**
 * Extracts dates from text and prompts user for dates if not found
 */

export interface ExtractedDate {
  text: string; // Original text mentioning the date
  date: Date | null; // Parsed date, or null if couldn't parse
  confidence: 'high' | 'medium' | 'low';
}

/**
 * Extracts dates from transcript text
 */
export function extractDatesFromText(text: string): ExtractedDate[] {
  const dates: ExtractedDate[] = [];
  
  // Pattern for years (1900-2099)
  const yearPattern = /\b(19|20)\d{2}\b/g;
  const yearMatches = [...text.matchAll(yearPattern)];
  
  yearMatches.forEach(match => {
    const year = parseInt(match[0]);
    dates.push({
      text: match[0],
      date: new Date(year, 0, 1), // January 1st of that year
      confidence: 'high'
    });
  });
  
  // Pattern for full dates (Month Day, Year)
  const fullDatePattern = /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(\d{4})\b/gi;
  const fullDateMatches = [...text.matchAll(fullDatePattern)];
  
  fullDateMatches.forEach(match => {
    const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 
                        'july', 'august', 'september', 'october', 'november', 'december'];
    const month = monthNames.indexOf(match[1].toLowerCase());
    const day = parseInt(match[2]);
    const year = parseInt(match[3]);
    
    if (month !== -1 && day >= 1 && day <= 31) {
      dates.push({
        text: match[0],
        date: new Date(year, month, day),
        confidence: 'high'
      });
    }
  });
  
  // Pattern for relative dates (e.g., "in 1965", "during the 1980s")
  const relativePattern = /\b(in|during|around|by|before|after)\s+(\d{4})\b/gi;
  const relativeMatches = [...text.matchAll(relativePattern)];
  
  relativeMatches.forEach(match => {
    const year = parseInt(match[2]);
    dates.push({
      text: match[0],
      date: new Date(year, 0, 1),
      confidence: 'medium'
    });
  });
  
  // Remove duplicates (same date)
  const uniqueDates = dates.filter((date, index, self) =>
    index === self.findIndex(d => 
      d.date && date.date && d.date.getTime() === date.date.getTime()
    )
  );
  
  return uniqueDates;
}

/**
 * Checks if text mentions an event that might need a date
 */
export function hasEventWithoutDate(text: string): boolean {
  // Look for event keywords - expanded list
  const eventKeywords = /\b(married|graduated|moved|started|began|ended|retired|born|died|traveled|visited|met|got|had|bought|sold|built|created|won|achieved|accomplished|joined|left|opened|closed|moved to|moved from|got married|got divorced|had children|had a child|started working|started school|finished|completed|learned|taught|discovered|invented|founded|established|launched|published|awarded|received|celebrated|anniversary|birthday|wedding|graduation|promotion|retirement)\b/i;
  
  // Check if there's an event keyword but no date nearby (within 100 characters for better detection)
  const matches = [...text.matchAll(eventKeywords)];
  
  if (matches.length === 0) {
    return false; // No events detected
  }
  
  for (const match of matches) {
    const beforeText = text.substring(Math.max(0, match.index! - 100), match.index!);
    const afterText = text.substring(match.index!, Math.min(text.length, match.index! + 100));
    const context = beforeText + afterText;
    
    // Check if there's a date in the context
    const hasDate = /\b(19|20)\d{2}\b/.test(context) || 
                    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/gi.test(context) ||
                    /\b(in|during|around|by|before|after)\s+(19|20)\d{2}\b/gi.test(context);
    
    if (!hasDate) {
      return true; // Event mentioned but no date found
    }
  }
  
  return false;
}

/**
 * Parses a date string from user input
 */
export function parseUserDate(input: string): Date | null {
  // Try to parse various date formats
  const cleaned = input.trim();
  
  // Try year only (e.g., "1965")
  const yearMatch = cleaned.match(/^(19|20)\d{2}$/);
  if (yearMatch) {
    return new Date(parseInt(yearMatch[0]), 0, 1);
  }
  
  // Try "Month Year" (e.g., "January 1965")
  const monthYearMatch = cleaned.match(/^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})$/i);
  if (monthYearMatch) {
    const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 
                        'july', 'august', 'september', 'october', 'november', 'december'];
    const month = monthNames.indexOf(monthYearMatch[1].toLowerCase());
    const year = parseInt(monthYearMatch[2]);
    if (month !== -1) {
      return new Date(year, month, 1);
    }
  }
  
  // Try "Month Day, Year" (e.g., "January 15, 1965")
  const fullDateMatch = cleaned.match(/^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(\d{4})$/i);
  if (fullDateMatch) {
    const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 
                        'july', 'august', 'september', 'october', 'november', 'december'];
    const month = monthNames.indexOf(fullDateMatch[1].toLowerCase());
    const day = parseInt(fullDateMatch[2]);
    const year = parseInt(fullDateMatch[3]);
    if (month !== -1 && day >= 1 && day <= 31) {
      return new Date(year, month, day);
    }
  }
  
  // Try standard date parsing
  const parsed = new Date(cleaned);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }
  
  return null;
}

