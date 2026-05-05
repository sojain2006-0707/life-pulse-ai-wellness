import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Calendar, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Brain,
  Music,
  Dumbbell,
  AlertCircle,
  CheckCircle,
  Users,
  Clock,
  Target,
  Smile,
  Frown,
  Meh,
  PlayCircle
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface MoodEntry {
  date: string;
  timestamp: string;
  mood: string;
  moodScore: number;
  stressLevel: number;
  sleepHours: string;
  sleepQuality: string;
  activities: string[];
  notes: string;
  userId: string;
}

interface ExerciseRecommendation {
  type: string;
  title: string;
  description: string;
  duration: string;
  intensity: 'Low' | 'Medium' | 'High';
  benefits: string[];
}

interface MusicRecommendation {
  playlist: string;
  genre: string;
  description: string;
  tracks: string[];
  moodTarget: string;
}

const ComprehensiveDashboard: React.FC = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('7d');

  // Colors for charts
  const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
  const MOOD_COLORS: { [key: string]: string } = {
    'happy': '#10B981',
    'excited': '#F59E0B', 
    'content': '#06B6D4',
    'neutral': '#6B7280',
    'anxious': '#F59E0B',
    'sad': '#EF4444',
    'angry': '#DC2626',
    'tired': '#8B5CF6'
  };

  useEffect(() => {
    loadMoodData();
  }, [selectedPeriod]);

  const loadMoodData = async () => {
    setLoading(true);
    try {
      // Try to load from backend first
      const response = await fetch('http://localhost:8090/api/mood');
      if (response.ok) {
        const backendData = await response.json();
        setMoodEntries(backendData || []);
      } else {
        throw new Error('Backend not available');
      }
    } catch (error) {
      // Fallback to localStorage
      console.log('Loading from localStorage...');
      const localData = localStorage.getItem('lifepulse_moods');
      setMoodEntries(localData ? JSON.parse(localData) : []);
    }
    setLoading(false);
  };

  const getExerciseRecommendations = (latestEntry: MoodEntry | null): ExerciseRecommendation[] => {
    if (!latestEntry) {
      return [{
        type: 'Walking',
        title: 'Start with a Simple Walk',
        description: 'A gentle 15-minute walk can boost your mood and energy',
        duration: '15-20 mins',
        intensity: 'Low',
        benefits: ['Improves mood', 'Increases energy', 'Reduces stress']
      }];
    }

    const { mood, stressLevel, moodScore } = latestEntry;
    const recommendations: ExerciseRecommendation[] = [];

    if (stressLevel >= 7 || ['anxious', 'angry'].includes(mood)) {
      recommendations.push({
        type: 'Yoga',
        title: 'Stress-Relief Yoga Session',
        description: 'Gentle yoga poses and breathing exercises to calm your mind',
        duration: '20-30 mins',
        intensity: 'Low',
        benefits: ['Reduces stress', 'Improves flexibility', 'Calms mind']
      });
    }

    if (['sad', 'tired'].includes(mood) || moodScore <= 4) {
      recommendations.push({
        type: 'Cardio',
        title: 'Mood-Boosting Cardio',
        description: 'Light jogging or dancing to release endorphins',
        duration: '15-25 mins',
        intensity: 'Medium',
        benefits: ['Releases endorphins', 'Boosts energy', 'Improves mood']
      });
    }

    if (['happy', 'excited'].includes(mood) && moodScore >= 7) {
      recommendations.push({
        type: 'Strength Training',
        title: 'Channel Your Energy',
        description: 'Strength exercises to make the most of your positive energy',
        duration: '30-45 mins',
        intensity: 'High',
        benefits: ['Builds strength', 'Maintains momentum', 'Improves confidence']
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        type: 'Mixed Activity',
        title: 'Balanced Exercise',
        description: 'A mix of stretching, light cardio, and strength exercises',
        duration: '25-35 mins',
        intensity: 'Medium',
        benefits: ['Overall fitness', 'Mood regulation', 'Energy balance']
      });
    }

    return recommendations;
  };

  const getMusicRecommendations = (latestEntry: MoodEntry | null): MusicRecommendation[] => {
    if (!latestEntry) {
      return [{
        playlist: 'Feel Good Favorites',
        genre: 'Pop/Upbeat',
        description: 'Uplifting songs to brighten your day',
        tracks: ['Good as Hell - Lizzo', 'Can\'t Stop the Feeling - Justin Timberlake', 'Walking on Sunshine - Katrina & The Waves'],
        moodTarget: 'Mood boost'
      }];
    }

    const { mood, stressLevel } = latestEntry;
    const recommendations: MusicRecommendation[] = [];

    if (stressLevel >= 7 || ['anxious', 'angry'].includes(mood)) {
      recommendations.push({
        playlist: 'Calm & Relaxing',
        genre: 'Ambient/Classical',
        description: 'Soothing melodies to help you unwind and find peace',
        tracks: ['Weightless - Marconi Union', 'Clair de Lune - Debussy', 'River Flows in You - Yiruma'],
        moodTarget: 'Stress relief'
      });
    }

    if (['sad', 'tired'].includes(mood)) {
      recommendations.push({
        playlist: 'Mood Lift Therapy',
        genre: 'Uplifting/Motivational',
        description: 'Energizing songs to lift your spirits and motivate you',
        tracks: ['Stronger - Kelly Clarkson', 'Fight Song - Rachel Platten', 'Count on Me - Bruno Mars'],
        moodTarget: 'Energy boost'
      });
    }

    if (['happy', 'excited'].includes(mood)) {
      recommendations.push({
        playlist: 'Celebration Vibes',
        genre: 'Upbeat/Dance',
        description: 'High-energy tracks to match your positive mood',
        tracks: ['Happy - Pharrell Williams', 'Good as Hell - Lizzo', 'Can\'t Stop the Feeling - Justin Timberlake'],
        moodTarget: 'Maintain positivity'
      });
    }

    return recommendations;
  };

  const calculateStats = () => {
    if (moodEntries.length === 0) {
      return {
        currentMood: null,
        averageMood: 0,
        averageStress: 0,
        streakDays: 0,
        totalEntries: 0,
        moodTrend: 'stable' as const,
        topActivities: [],
        weeklyData: []
      };
    }

    const sortedEntries = [...moodEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const latest = sortedEntries[0];
    
    const avgMood = moodEntries.reduce((sum, entry) => sum + entry.moodScore, 0) / moodEntries.length;
    const avgStress = moodEntries.reduce((sum, entry) => sum + entry.stressLevel, 0) / moodEntries.length;
    
    // Calculate trend
    const recent = sortedEntries.slice(0, 3);
    const older = sortedEntries.slice(3, 6);
    const recentAvg = recent.length > 0 ? recent.reduce((sum, e) => sum + e.moodScore, 0) / recent.length : avgMood;
    const olderAvg = older.length > 0 ? older.reduce((sum, e) => sum + e.moodScore, 0) / older.length : recentAvg;
    
    let moodTrend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    if (recentAvg > olderAvg + 0.5) moodTrend = 'increasing';
    else if (recentAvg < olderAvg - 0.5) moodTrend = 'decreasing';

    // Calculate streak
    let streakDays = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      
      if (moodEntries.some(entry => entry.date === dateStr)) {
        streakDays++;
      } else {
        break;
      }
    }

    // Top activities
    const activityCount: { [key: string]: number } = {};
    moodEntries.forEach(entry => {
      entry.activities.forEach(activity => {
        activityCount[activity] = (activityCount[activity] || 0) + 1;
      });
    });
    
    const topActivities = Object.entries(activityCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([activity, count]) => ({ activity, count }));

    // Weekly chart data
    const weeklyData = moodEntries.slice(-7).map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
      mood: entry.moodScore,
      stress: entry.stressLevel,
      fullDate: entry.date
    }));

    return {
      currentMood: latest,
      averageMood: Math.round(avgMood * 10) / 10,
      averageStress: Math.round(avgStress * 10) / 10,
      streakDays,
      totalEntries: moodEntries.length,
      moodTrend,
      topActivities,
      weeklyData
    };
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy':
      case 'excited':
        return <Smile className="h-5 w-5 text-green-600" />;
      case 'sad':
      case 'angry':
        return <Frown className="h-5 w-5 text-red-600" />;
      default:
        return <Meh className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'decreasing':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const stats = calculateStats();
  const exerciseRecs = getExerciseRecommendations(stats.currentMood);
  const musicRecs = getMusicRecommendations(stats.currentMood);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Your Wellness Dashboard
        </h1>
        <p className="text-gray-600 text-lg">Track your mental wellness journey with personalized insights</p>

        <div className="flex gap-2 mt-4">
          <Button
            variant={selectedPeriod === '7d' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('7d')}
            size="sm"
          >
            7 Days
          </Button>
          <Button
            variant={selectedPeriod === '30d' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('30d')}
            size="sm"
          >
            30 Days
          </Button>
          <Button
            variant={selectedPeriod === '90d' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('90d')}
            size="sm"
          >
            90 Days
          </Button>
        </div>
      </div>

      {stats.totalEntries === 0 ? (
        // No data state
        <Card className="text-center py-12">
          <CardContent>
            <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-2xl font-semibold mb-2">Start Your Wellness Journey</h3>
            <p className="text-gray-600 mb-6">Track your daily mood to unlock personalized insights and recommendations</p>
            <Button size="lg">
              <Calendar className="h-4 w-4 mr-2" />
              Log Your First Mood
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Mood</CardTitle>
                {getMoodIcon(stats.currentMood?.mood || 'neutral')}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 capitalize">
                  {stats.currentMood?.mood || 'Not set'}
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className="text-lg font-semibold mr-2">{stats.currentMood?.moodScore || 0}/10</span>
                  {getTrendIcon(stats.moodTrend)}
                  <span className="ml-1 capitalize">{stats.moodTrend}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tracking Streak</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{stats.streakDays} days</div>
                <p className="text-xs text-muted-foreground">
                  {stats.streakDays > 0 ? 'Great consistency!' : 'Start your streak today'}
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-yellow-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">{stats.averageMood}</div>
                <p className="text-xs text-muted-foreground">Out of 10</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-red-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stress Level</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">{stats.averageStress}</div>
                <div className="mt-2">
                  <Progress value={stats.averageStress * 10} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="exercise">Exercise</TabsTrigger>
              <TabsTrigger value="music">Music Therapy</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mood Trends (Last 7 Days)</CardTitle>
                    <CardDescription>Track your mood and stress patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {stats.weeklyData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={stats.weeklyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={[0, 10]} />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="mood" 
                            stroke="#3B82F6" 
                            strokeWidth={3}
                            name="Mood Score" 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="stress" 
                            stroke="#EF4444" 
                            strokeWidth={2}
                            name="Stress Level" 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-64 flex items-center justify-center">
                        <p className="text-gray-500">Not enough data for trends yet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Mood Entries</CardTitle>
                    <CardDescription>Your latest wellness check-ins</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-64 overflow-y-auto">
                      {moodEntries.slice(-5).reverse().map((entry, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            {getMoodIcon(entry.mood)}
                            <div>
                              <p className="font-medium capitalize">{entry.mood}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(entry.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold" style={{ color: MOOD_COLORS[entry.mood] || '#6B7280' }}>
                              {entry.moodScore}/10
                            </div>
                            <div className="text-xs text-gray-500">
                              Stress: {entry.stressLevel}/10
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activities" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Activities</CardTitle>
                    <CardDescription>Activities you do most often</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {stats.topActivities.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.topActivities}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="activity" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#8B5CF6" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-64 flex items-center justify-center">
                        <p className="text-gray-500">No activity data yet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Activity Details</CardTitle>
                    <CardDescription>Break down of your wellness activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stats.topActivities.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="font-medium">{activity.activity}</span>
                          </div>
                          <Badge variant="secondary">{activity.count} times</Badge>
                        </div>
                      ))}
                      {stats.topActivities.length === 0 && (
                        <p className="text-gray-500 text-center py-4">
                          Start logging activities to see insights here!
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="exercise" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exerciseRecs.map((rec, index) => (
                  <Card key={index} className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Dumbbell className="h-5 w-5" />
                          {rec.title}
                        </CardTitle>
                        <Badge variant={rec.intensity === 'High' ? 'destructive' : rec.intensity === 'Medium' ? 'default' : 'secondary'}>
                          {rec.intensity}
                        </Badge>
                      </div>
                      <CardDescription>{rec.type} • {rec.duration}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{rec.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Benefits:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {rec.benefits.map((benefit, i) => (
                            <li key={i}>{benefit}</li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full mt-4" variant="outline">
                        <Target className="h-4 w-4 mr-2" />
                        Start Exercise
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="music" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {musicRecs.map((rec, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Music className="h-5 w-5" />
                        {rec.playlist}
                      </CardTitle>
                      <CardDescription>{rec.genre} • {rec.moodTarget}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{rec.description}</p>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Featured Tracks:</h4>
                        {rec.tracks.map((track, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <PlayCircle className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{track}</span>
                          </div>
                        ))}
                      </div>

                      <Button className="w-full mt-4">
                        <Music className="h-4 w-4 mr-2" />
                        Start Music Therapy
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      AI Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {stats.totalEntries >= 3 ? (
                      <>
                        <div className="p-4 border rounded-lg border-green-200 bg-green-50">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <Badge variant="default">Positive Pattern</Badge>
                          </div>
                          <h4 className="font-medium">Great Progress!</h4>
                          <p className="text-sm text-gray-600">
                            You've been consistent with tracking. Your average mood is {stats.averageMood}/10.
                          </p>
                        </div>

                        {stats.averageStress > 6 && (
                          <div className="p-4 border rounded-lg border-yellow-200 bg-yellow-50">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertCircle className="h-4 w-4 text-yellow-600" />
                              <Badge variant="destructive">Stress Alert</Badge>
                            </div>
                            <h4 className="font-medium">High Stress Detected</h4>
                            <p className="text-sm text-gray-600">
                              Your stress levels are elevated. Consider trying our recommended relaxation exercises.
                            </p>
                          </div>
                        )}

                        {stats.moodTrend === 'increasing' && (
                          <div className="p-4 border rounded-lg border-blue-200 bg-blue-50">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className="h-4 w-4 text-blue-600" />
                              <Badge variant="default">Improving Trend</Badge>
                            </div>
                            <h4 className="font-medium">Mood Improving</h4>
                            <p className="text-sm text-gray-600">
                              Your mood has been trending upward. Keep up the great work!
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <Brain className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-gray-500">
                          Track more moods to unlock personalized AI insights!
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="default">Daily Habit</Badge>
                        <Badge variant="outline">High Priority</Badge>
                      </div>
                      <h4 className="font-medium mb-1">Continue Daily Tracking</h4>
                      <p className="text-sm text-gray-600">
                        Maintain your streak by logging your mood consistently each day.
                      </p>
                    </div>

                    {stats.currentMood && stats.currentMood.stressLevel > 6 && (
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="destructive">Stress Management</Badge>
                          <Badge variant="outline">High Priority</Badge>
                        </div>
                        <h4 className="font-medium mb-1">Try Relaxation Techniques</h4>
                        <p className="text-sm text-gray-600">
                          Your stress levels are high. Consider meditation, deep breathing, or gentle yoga.
                        </p>
                      </div>
                    )}

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="default">Wellness</Badge>
                        <Badge variant="outline">Medium Priority</Badge>
                      </div>
                      <h4 className="font-medium mb-1">Stay Active</h4>
                      <p className="text-sm text-gray-600">
                        Regular exercise can significantly boost your mood and reduce stress.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default ComprehensiveDashboard;
