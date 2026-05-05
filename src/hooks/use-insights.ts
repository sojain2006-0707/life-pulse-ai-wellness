import { useState, useEffect } from 'react';
import { LucideIcon, TrendingUp, AlertTriangle, CheckCircle, Heart, Brain, Sun, Moon, Activity } from 'lucide-react';

interface Insight {
  type: string;
  icon: LucideIcon;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'success';
  confidence: number;
}

interface Recommendation {
  category: string;
  title: string;
  description: string;
  icon: LucideIcon;
  duration?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface InsightsData {
  insights: Insight[];
  recommendations: Recommendation[];
  isLoading: boolean;
  error: string | null;
}

const useInsights = () => {
  const [data, setData] = useState<InsightsData>({
    insights: [],
    recommendations: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        // Base URL for backend API
        const BASE_URL = 'http://localhost:8090';

        // Fetch mood data (insights patterns)
        const moodResponse = await fetch(`${BASE_URL}/api/insights`);
        const moodData = await moodResponse.json();

        // Fetch sleep data
        const sleepResponse = await fetch(`${BASE_URL}/api/sleep`);
        const sleepData = await sleepResponse.json();

        // Fetch activity data
        const activityResponse = await fetch(`${BASE_URL}/api/activity`);
        const activityData = await activityResponse.json();

        // Fetch stress data
        const stressResponse = await fetch(`${BASE_URL}/api/stress`);
        const stressData = await stressResponse.json();

        // Process mood patterns
        const moodInsights = processMoodPatterns(moodData);
        
        // Process sleep impact
        const sleepInsights = processSleepPatterns(sleepData);
        
        // Process activity impact
        const activityInsights = processActivityImpact(activityData);
        
        // Process stress triggers
        const stressInsights = processStressTriggers(stressData);

        // Generate recommendations based on all data
        const recommendations = generateRecommendations({
          mood: moodData,
          sleep: sleepData,
          activity: activityData,
          stress: stressData
        });

        setData({
          insights: [...(moodInsights || []), ...(sleepInsights || []), ...(activityInsights || []), ...(stressInsights || [])],
          recommendations: recommendations || [],
          isLoading: false,
          error: null
        });

      } catch (error) {
        setData(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to fetch insights. Please try again later.'
        }));
      }
    };

    fetchInsights();
  }, []);

  // Process mood patterns into insights
  const processMoodPatterns = (data: any): Insight[] => {
    const insights: Insight[] = [];
    
    if (data.patterns) {
      data.patterns.forEach((pattern: any) => {
        insights.push({
          type: 'Pattern Detection',
          icon: pattern.trend === 'positive' ? TrendingUp : AlertTriangle,
          title: pattern.title,
          description: pattern.description,
          severity: pattern.impact === 'positive' ? 'success' : 'info',
          confidence: pattern.confidence
        });
      });
    }

    return insights;
  };

  // Process sleep data into insights
  const processSleepPatterns = (data: any): Insight[] => {
    const insights: Insight[] = [];
    
    // mock sleep shape: { quality, duration, efficiency }
    if (data && (data.quality || data.efficiency)) {
      insights.push({
        type: 'Sleep Analysis',
        icon: Moon,
        title: 'Sleep Quality Snapshot',
        description: `Quality: ${data.quality ?? 'unknown'}, Duration: ${data.duration ?? 'n/a'}, Efficiency: ${data.efficiency ?? 'n/a'}%`,
        severity: (data.quality === 'good' || (data.efficiency ?? 0) >= 80) ? 'success' : 'warning',
        confidence: 85
      });
    }

    return insights;
  };

  // Process activity data into insights
  const processActivityImpact = (data: any): Insight[] => {
    const insights: Insight[] = [];
    
    // mock activity shape: { type, duration, intensity }
    if (data && data.type) {
      insights.push({
        type: 'Activity Impact',
        icon: Activity,
        title: 'Activity Snapshot',
        description: `Type: ${data.type}, Duration: ${data.duration}, Intensity: ${data.intensity}`,
        severity: 'success',
        confidence: 80
      });
    }

    return insights;
  };

  // Process stress triggers into insights
  const processStressTriggers = (data: any): Insight[] => {
    const insights: Insight[] = [];
    
    // mock stress shape: { level, triggers: string[] }
    if (data && data.level) {
      insights.push({
        type: 'Stress Level',
        icon: Brain,
        title: 'Current Stress Overview',
        description: `Level: ${data.level}${data.triggers?.length ? ` | Triggers: ${data.triggers.join(', ')}` : ''}`,
        severity: data.level === 'high' ? 'warning' : 'info',
        confidence: 75
      });
    }

    return insights;
  };

  // Generate recommendations based on all data
  const generateRecommendations = (data: any): Recommendation[] => {
    const recommendations: Recommendation[] = [];

    // Add mindfulness recommendations based on stress levels
    if (data.stress && data.stress.level === 'high') {
      recommendations.push({
        category: 'Mindfulness',
        title: '5-Minute Breathing Exercise',
        description: 'Based on your stress patterns, try this breathing technique when you feel overwhelmed.',
        icon: Heart,
        duration: '5 min',
        priority: 'high'
      });
    }

    // Add sleep recommendations
    if (data.sleep && data.sleep.quality === 'poor') {
      recommendations.push({
        category: 'Sleep',
        title: 'Sleep Schedule Optimization',
        description: 'Your sleep patterns suggest trying an earlier bedtime. Aim for 10 PM to improve sleep quality.',
        icon: Moon,
        duration: 'Ongoing'
      });
    }

    // Add activity recommendations
    if (data.activity && data.activity.frequency === 'low') {
      recommendations.push({
        category: 'Activity',
        title: 'Quick Energy Boost',
        description: 'Try a 10-minute walk during your lunch break to improve afternoon mood scores.',
        icon: Sun,
        duration: '10 min'
      });
    }

    return recommendations;
  };

  return data;
};

export default useInsights;
