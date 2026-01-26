'use client';

import { 
  Mic, 
  MicOff, 
  Home, 
  Brain, 
  Heart, 
  Users, 
  BarChart3, 
  Settings, 
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Calendar,
  MessageCircle,
  BookOpen,
  Target,
  Zap,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Info,
  X,
  Plus,
  Image,
  User,
  Sparkles,
  Sun,
  Moon,
  Sunrise,
  CloudSun,
  Smile,
  Meh,
  Frown,
  Activity,
  Coffee,
  Download,
  Filter,
  LogOut,
  Share2,
  Send,
  Check,
  XCircle
} from 'lucide-react';

export {
  LogOut,
  Share2,
  Mic,
  MicOff,
  Home,
  Brain,
  Heart,
  Users,
  BarChart3,
  Settings,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Calendar,
  MessageCircle,
  BookOpen,
  Target,
  Zap,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Info,
  X,
  Plus,
  Image,
  User,
  Sparkles,
  Sun,
  Moon,
  Sunrise,
  CloudSun,
  Smile,
  Meh,
  Frown,
  Activity,
  Coffee,
  Download,
  Filter,
  Send,
  Check,
  XCircle
};

// Voice wave animation component
export function VoiceWave({ isActive, size = 'md' }: { isActive: boolean; size?: 'sm' | 'md' | 'lg' }) {
  const heights = {
    sm: ['h-3', 'h-5', 'h-4', 'h-6', 'h-3'],
    md: ['h-4', 'h-8', 'h-6', 'h-10', 'h-5'],
    lg: ['h-6', 'h-12', 'h-8', 'h-14', 'h-7']
  };
  
  const widths = {
    sm: 'w-0.5',
    md: 'w-1',
    lg: 'w-1.5'
  };
  
  return (
    <div className="flex items-center justify-center gap-1">
      {heights[size].map((height, i) => (
        <div
          key={i}
          className={`${widths[size]} ${isActive ? height : 'h-1'} bg-current rounded-full transition-all duration-200 ${
            isActive ? 'voice-wave-bar' : ''
          }`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}

// Logo component
export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };
  
  return (
    <div className={`${sizes[size]} relative`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-sage)] to-[var(--color-sage-dark)] rounded-2xl transform rotate-3" />
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-terracotta)] to-[var(--color-terracotta-dark)] rounded-2xl transform -rotate-3 opacity-60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Mic className="w-1/2 h-1/2 text-white" />
      </div>
    </div>
  );
}

// Emotion icon component
export function EmotionIcon({ emotion, size = 24 }: { emotion: string; size?: number }) {
  switch (emotion) {
    case 'happy':
      return <Smile size={size} className="text-[var(--color-happy)]" />;
    case 'calm':
      return <Coffee size={size} className="text-[var(--color-calm)]" />;
    case 'anxious':
      return <Activity size={size} className="text-[var(--color-anxious)]" />;
    case 'sad':
      return <Frown size={size} className="text-[var(--color-sad)]" />;
    case 'agitated':
      return <AlertCircle size={size} className="text-[var(--color-agitated)]" />;
    default:
      return <Meh size={size} className="text-[var(--color-stone)]" />;
  }
}

// Time of day icon
export function TimeOfDayIcon({ time, size = 24 }: { time: string; size?: number }) {
  switch (time) {
    case 'morning':
      return <Sunrise size={size} className="text-amber-500" />;
    case 'afternoon':
      return <Sun size={size} className="text-yellow-500" />;
    case 'evening':
      return <CloudSun size={size} className="text-orange-500" />;
    case 'night':
      return <Moon size={size} className="text-indigo-400" />;
    default:
      return <Sun size={size} className="text-yellow-500" />;
  }
}

// Trend indicator
export function TrendIndicator({ value, size = 16 }: { value: number; size?: number }) {
  if (value > 0) {
    return (
      <span className="inline-flex items-center text-green-600">
        <TrendingUp size={size} />
        <span className="ml-1 text-sm">+{value}%</span>
      </span>
    );
  } else if (value < 0) {
    return (
      <span className="inline-flex items-center text-red-500">
        <TrendingDown size={size} />
        <span className="ml-1 text-sm">{value}%</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center text-[var(--color-stone)]">
      <Minus size={size} />
      <span className="ml-1 text-sm">Stable</span>
    </span>
  );
}

