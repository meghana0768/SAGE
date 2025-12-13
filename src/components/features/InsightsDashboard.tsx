'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Card, StatCard, ProgressCard } from '@/components/ui/Card';
import { 
  TrendIndicator, EmotionIcon, TimeOfDayIcon,
  Brain, MessageCircle, Target, Activity, Calendar, Info, AlertCircle
} from '@/components/icons';
import { 
  generateMonthlyCognitiveTrends,
  generateTimeOfDayPerformance,
  generateEmotionalDistribution,
  generateWeeklyTrends
} from '@/lib/mockData';
import { sampleInsights } from '@/lib/gameData';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

type ViewMode = 'overview' | 'language' | 'cognitive' | 'emotional';

const tabItems = [
  { id: 'overview' as const, label: 'Overview' },
  { id: 'language' as const, label: 'Language' },
  { id: 'cognitive' as const, label: 'Cognitive' },
  { id: 'emotional' as const, label: 'Emotional' },
];

function InsightCard({ insight }: { insight: typeof sampleInsights[0] }) {
  const severityColors = {
    info: 'border-l-[var(--color-sage)]',
    notable: 'border-l-[var(--color-terracotta)]',
    significant: 'border-l-[var(--color-agitated)]'
  };
  
  const severityIcons = {
    info: <Info size={18} className="text-[var(--color-sage)]" />,
    notable: <AlertCircle size={18} className="text-[var(--color-terracotta)]" />,
    significant: <AlertCircle size={18} className="text-[var(--color-agitated)]" />
  };

  return (
    <Card className={`border-l-4 ${severityColors[insight.severity]}`}>
      <div className="flex items-start gap-3">
        <div className="p-2 bg-[var(--color-sand)] rounded-lg">
          {severityIcons[insight.severity]}
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-[var(--color-charcoal)]">{insight.title}</h4>
          <p className="text-sm text-[var(--color-stone)] mt-1">{insight.description}</p>
          {insight.recommendation && (
            <p className="text-sm text-[var(--color-sage)] mt-2 italic">
              💡 {insight.recommendation}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

function OverviewTab() {
  const { user } = useStore();
  const profile = user?.cognitiveProfile;
  const monthlyData = generateMonthlyCognitiveTrends();
  
  return (
    <div className="space-y-4">
      {/* Cognitive Scores */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          title="Language"
          value={profile?.languageComplexity.current || 75}
          trend={<TrendIndicator value={profile?.languageComplexity.trend || 0} />}
          icon={<MessageCircle size={20} className="text-[var(--color-sage)]" />}
          color="sage"
          delay={0.1}
        />
        <StatCard
          title="Memory"
          value={profile?.memoryRecall.current || 72}
          trend={<TrendIndicator value={profile?.memoryRecall.trend || 2} />}
          icon={<Brain size={20} className="text-[var(--color-terracotta)]" />}
          color="terracotta"
          delay={0.15}
        />
        <StatCard
          title="Attention"
          value={profile?.attention.current || 78}
          trend={<TrendIndicator value={profile?.attention.trend || 1} />}
          icon={<Target size={20} className="text-[var(--color-calm)]" />}
          color="calm"
          delay={0.2}
        />
        <StatCard
          title="Processing"
          value={profile?.processingSpeed.current || 70}
          trend={<TrendIndicator value={profile?.processingSpeed.trend || -1} />}
          icon={<Activity size={20} className="text-[var(--color-stone)]" />}
          delay={0.25}
        />
      </div>
      
      {/* Overall Trend Chart */}
      <Card delay={0.3}>
        <h3 className="font-display font-semibold text-[var(--color-charcoal)] mb-4">
          30-Day Cognitive Trend
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-sage)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-sage)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-sand)" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10, fill: 'var(--color-stone)' }}
                tickLine={false}
                interval={6}
              />
              <YAxis 
                domain={[50, 100]}
                tick={{ fontSize: 10, fill: 'var(--color-stone)' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--color-warm-white)', 
                  border: '1px solid var(--color-sand)',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="overall" 
                stroke="var(--color-sage)" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorOverall)" 
                name="Overall Score"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      {/* Peak Time & Dominant Emotion */}
      <div className="grid grid-cols-2 gap-3">
        <Card delay={0.35}>
          <p className="text-sm text-[var(--color-stone)] mb-2">Peak Cognition</p>
          <div className="flex items-center gap-2">
            <TimeOfDayIcon time={profile?.peakCognitionTime || 'morning'} size={28} />
            <span className="text-xl font-display font-bold text-[var(--color-charcoal)] capitalize">
              {profile?.peakCognitionTime || 'Morning'}
            </span>
          </div>
        </Card>
        <Card delay={0.4}>
          <p className="text-sm text-[var(--color-stone)] mb-2">Dominant Mood</p>
          <div className="flex items-center gap-2">
            <EmotionIcon emotion={profile?.emotionalPatterns.dominant || 'calm'} size={28} />
            <span className="text-xl font-display font-bold text-[var(--color-charcoal)] capitalize">
              {profile?.emotionalPatterns.dominant || 'Calm'}
            </span>
          </div>
        </Card>
      </div>
      
      {/* Recent Insights */}
      <div>
        <h3 className="font-display font-semibold text-[var(--color-charcoal)] mb-3">
          Recent Insights
        </h3>
        <div className="space-y-3">
          {sampleInsights.slice(0, 3).map((insight, idx) => (
            <InsightCard key={idx} insight={insight} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LanguageTab() {
  const monthlyData = generateMonthlyCognitiveTrends();
  const timeOfDayData = generateTimeOfDayPerformance();
  
  return (
    <div className="space-y-4">
      <Card>
        <h3 className="font-display font-semibold text-[var(--color-charcoal)] mb-4">
          Language Complexity Over Time
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-sand)" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10, fill: 'var(--color-stone)' }}
                interval={6}
              />
              <YAxis 
                domain={[50, 100]}
                tick={{ fontSize: 10, fill: 'var(--color-stone)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--color-warm-white)', 
                  border: '1px solid var(--color-sand)',
                  borderRadius: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="language" 
                stroke="var(--color-sage)" 
                strokeWidth={2}
                dot={false}
                name="Language Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      <Card>
        <h3 className="font-display font-semibold text-[var(--color-charcoal)] mb-4">
          Language by Time of Day
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timeOfDayData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-sand)" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12, fill: 'var(--color-stone)' }}
              />
              <YAxis 
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: 'var(--color-stone)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--color-warm-white)', 
                  border: '1px solid var(--color-sand)',
                  borderRadius: '12px'
                }}
              />
              <Bar 
                dataKey="language" 
                fill="var(--color-sage)" 
                radius={[8, 8, 0, 0]}
                name="Score"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-[var(--color-stone)] mt-3 text-center">
          📊 Language clarity is highest in the morning
        </p>
      </Card>
      
      <Card>
        <h3 className="font-display font-semibold text-[var(--color-charcoal)] mb-4">
          Language Insight
        </h3>
        <div className="p-4 bg-[var(--color-sand)] rounded-xl">
          <p className="text-[var(--color-charcoal)]">
            "Language complexity has gradually declined during evening conversations, 
            with increased repetition after 5 PM. Morning conversations show 15% 
            higher vocabulary diversity."
          </p>
        </div>
      </Card>
    </div>
  );
}

function CognitiveTab() {
  const weeklyData = generateWeeklyTrends();
  const timeOfDayData = generateTimeOfDayPerformance();
  
  const radarData = [
    { subject: 'Language', A: 75, fullMark: 100 },
    { subject: 'Memory', A: 72, fullMark: 100 },
    { subject: 'Attention', A: 78, fullMark: 100 },
    { subject: 'Processing', A: 70, fullMark: 100 },
    { subject: 'Coherence', A: 74, fullMark: 100 },
  ];
  
  return (
    <div className="space-y-4">
      {/* Radar Chart */}
      <Card>
        <h3 className="font-display font-semibold text-[var(--color-charcoal)] mb-4">
          Cognitive Profile
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--color-sand)" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fontSize: 11, fill: 'var(--color-stone)' }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: 'var(--color-stone)' }}
              />
              <Radar
                name="Score"
                dataKey="A"
                stroke="var(--color-sage)"
                fill="var(--color-sage)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      {/* Weekly Performance */}
      <Card>
        <h3 className="font-display font-semibold text-[var(--color-charcoal)] mb-4">
          This Week's Performance
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-sand)" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 11, fill: 'var(--color-stone)' }}
              />
              <YAxis 
                domain={[50, 100]}
                tick={{ fontSize: 10, fill: 'var(--color-stone)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--color-warm-white)', 
                  border: '1px solid var(--color-sand)',
                  borderRadius: '12px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="memory" stroke="var(--color-terracotta)" strokeWidth={2} dot={false} name="Memory" />
              <Line type="monotone" dataKey="attention" stroke="var(--color-calm)" strokeWidth={2} dot={false} name="Attention" />
              <Line type="monotone" dataKey="processing" stroke="var(--color-happy)" strokeWidth={2} dot={false} name="Processing" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      {/* Game Performance Summary */}
      <div className="grid grid-cols-2 gap-3">
        <ProgressCard
          title="Memory Recall"
          value={72}
          color="var(--color-terracotta)"
          subtitle="Stable this week"
        />
        <ProgressCard
          title="Attention Focus"
          value={78}
          color="var(--color-calm)"
          subtitle="+5% improvement"
        />
      </div>
      
      <InsightCard insight={sampleInsights[1]} />
    </div>
  );
}

function EmotionalTab() {
  const emotionalData = generateEmotionalDistribution();
  
  return (
    <div className="space-y-4">
      {/* Pie Chart */}
      <Card>
        <h3 className="font-display font-semibold text-[var(--color-charcoal)] mb-4">
          Emotional State Distribution
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={emotionalData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}
                labelLine={false}
              >
                {emotionalData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      {/* Emotional Breakdown */}
      <Card>
        <h3 className="font-display font-semibold text-[var(--color-charcoal)] mb-4">
          Emotional Patterns
        </h3>
        <div className="space-y-3">
          {emotionalData.map(item => (
            <div key={item.state} className="flex items-center gap-3">
              <EmotionIcon emotion={item.state.toLowerCase()} size={24} />
              <span className="flex-1 text-[var(--color-charcoal)]">{item.state}</span>
              <div className="w-32 h-2 bg-[var(--color-sand)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
              <span className="text-sm text-[var(--color-stone)] w-10 text-right">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Calming Mode Info */}
      <Card className="bg-gradient-to-br from-[var(--color-calm)] to-[var(--color-sage)] text-white">
        <h3 className="font-display font-semibold mb-2">Calming Mode</h3>
        <p className="text-sm opacity-90 mb-4">
          When anxiety or agitation is detected, VoiceSense can automatically 
          initiate calming dialogue, play familiar music, or suggest taking a break.
        </p>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Auto-enabled</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Voice-triggered</span>
        </div>
      </Card>
      
      <InsightCard insight={sampleInsights[3]} />
    </div>
  );
}

export function InsightsDashboard() {
  const { markInsightsRead } = useStore();
  const [activeView, setActiveView] = useState<ViewMode>('overview');
  
  // Mark insights as read when viewing
  useEffect(() => {
    markInsightsRead();
  }, [markInsightsRead]);

  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h2 className="text-2xl font-display font-bold text-[var(--color-charcoal)]">
          Insights
        </h2>
        <p className="text-[var(--color-stone)]">
          Track cognitive patterns over time
        </p>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {tabItems.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeView === tab.id
                ? 'bg-[var(--color-sage)] text-white'
                : 'bg-[var(--color-sand)] text-[var(--color-stone)] hover:bg-[var(--color-sage-light)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      {activeView === 'overview' && <OverviewTab />}
      {activeView === 'language' && <LanguageTab />}
      {activeView === 'cognitive' && <CognitiveTab />}
      {activeView === 'emotional' && <EmotionalTab />}
    </div>
  );
}

