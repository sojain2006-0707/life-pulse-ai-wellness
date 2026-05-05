import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  CheckCircle, 
  Calendar, 
  Loader2,
  TrendingUp,
  Heart
} from 'lucide-react';

const activities = [
  { name: "Work", emoji: "💼" },
  { name: "Study", emoji: "📚" },
  { name: "Exercise", emoji: "🏃" },
  { name: "Social", emoji: "🤝" },
  { name: "Relaxation", emoji: "🧘" },
  { name: "Family", emoji: "👨‍👩‍👦" },
  { name: "Hobby", emoji: "🎨" },
  { name: "Entertainment", emoji: "🎮" },
  { name: "Outdoors", emoji: "🌳" },
  { name: "Reading", emoji: "📖" },
  { name: "Music", emoji: "🎵" },
  { name: "Cooking", emoji: "🍳" }
];

const quotes = [
  "Every day is a fresh start.",
  "Your emotions are valid and important.",
  "Take care of your mind, and your mind will take care of you.",
  "Small steps lead to big changes.",
  "You are stronger than you think."
];

const DailyMoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [moodScore, setMoodScore] = useState([5]);
  const [stressLevel, setStressLevel] = useState([3]);
  const [sleepHours, setSleepHours] = useState("");
  const [sleepQuality, setSleepQuality] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [showMusicDialog, setShowMusicDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [todayEntry, setTodayEntry] = useState<any>(null);
  const [moodHistory, setMoodHistory] = useState<any[]>([]);
  const { toast } = useToast();

  // Check if user has already logged mood today
  useEffect(() => {
    loadTodaysMood();
    loadMoodHistory();
  }, []);

  const loadTodaysMood = async () => {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const savedMoods = JSON.parse(localStorage.getItem('lifepulse_moods') || '[]');
      const todaysMood = savedMoods.find((entry: any) => entry.date === today);
      
      if (todaysMood) {
        setTodayEntry(todaysMood);
        setSelectedMood(todaysMood.mood);
        setMoodScore([todaysMood.moodScore]);
        setStressLevel([todaysMood.stressLevel]);
        setSleepHours(todaysMood.sleepHours);
        setSleepQuality(todaysMood.sleepQuality);
        setSelectedActivities(todaysMood.activities);
        setNotes(todaysMood.notes);
      }
    } catch (error) {
      console.error('Error loading today\'s mood:', error);
    }
  };

  const loadMoodHistory = async () => {
    try {
      const savedMoods = JSON.parse(localStorage.getItem('lifepulse_moods') || '[]');
      setMoodHistory(savedMoods.slice(-7)); // Last 7 entries
    } catch (error) {
      console.error('Error loading mood history:', error);
    }
  };

  const saveMoodToBackend = async (moodData: any) => {
    try {
      const response = await fetch('http://localhost:8090/api/mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('lifepulse_token')}`
        },
        body: JSON.stringify(moodData)
      });

      if (!response.ok) {
        throw new Error('Failed to save to backend');
      }

      return await response.json();
    } catch (error) {
      console.warn('Backend save failed, using local storage:', error);
      // Fallback to local storage
      const savedMoods = JSON.parse(localStorage.getItem('lifepulse_moods') || '[]');
      const existingIndex = savedMoods.findIndex((entry: any) => entry.date === moodData.date);
      
      if (existingIndex >= 0) {
        savedMoods[existingIndex] = moodData;
      } else {
        savedMoods.push(moodData);
      }
      
      localStorage.setItem('lifepulse_moods', JSON.stringify(savedMoods));
      return moodData;
    }
  };

  const handleActivityToggle = (activity: string) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmit = async () => {
    if (!selectedMood) {
      toast({
        title: "Please select your mood",
        description: "We need to know how you're feeling today.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const moodData = {
        date: format(new Date(), 'yyyy-MM-dd'),
        timestamp: new Date().toISOString(),
        mood: selectedMood,
        moodScore: moodScore[0],
        stressLevel: stressLevel[0],
        sleepHours: sleepHours,
        sleepQuality: sleepQuality,
        activities: selectedActivities,
        notes: notes,
        userId: localStorage.getItem('lifepulse_user') ? 
          JSON.parse(localStorage.getItem('lifepulse_user') || '{}').id : 'anonymous'
      };

      await saveMoodToBackend(moodData);
      setTodayEntry(moodData);
      
      // Update dashboard data
      const dashboardStats = JSON.parse(localStorage.getItem('lifepulse_dashboard') || '{}');
      dashboardStats.lastMoodEntry = moodData;
      dashboardStats.totalEntries = (dashboardStats.totalEntries || 0) + 1;
      dashboardStats.averageMood = calculateAverageMood();
      localStorage.setItem('lifepulse_dashboard', JSON.stringify(dashboardStats));

      toast({
        title: "Great job checking in! ✨",
        description: `Your ${selectedMood} mood has been saved for ${format(new Date(), 'MMM d, yyyy')}`,
      });

      if (["sad", "angry"].includes(selectedMood)) {
        setShowMusicDialog(true);
      }

      // Reload mood history
      await loadMoodHistory();

    } catch (error) {
      console.error('Error saving mood:', error);
      toast({
        title: "Error saving mood",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAverageMood = () => {
    const savedMoods = JSON.parse(localStorage.getItem('lifepulse_moods') || '[]');
    if (savedMoods.length === 0) return 5;
    
    const total = savedMoods.reduce((sum: number, entry: any) => sum + entry.moodScore, 0);
    return Math.round(total / savedMoods.length);
  };

  const getMoodEmoji = (mood: string) => {
    const moodMap: { [key: string]: string } = {
      'happy': '😊',
      'calm': '😌',
      'neutral': '😐',
      'sad': '😢',
      'angry': '😠'
    };
    return moodMap[mood] || '😐';
  };

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-20 pb-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            How are you feeling today?
          </h1>
          <p className="text-muted-foreground">
            {format(new Date(), "EEEE, MMMM d, yyyy")}
          </p>
        </div>

        <Card className="shadow-xl backdrop-blur-sm bg-white/90">
          <CardContent className="p-6 space-y-6">
            {/* Today's Entry Status */}
            {todayEntry && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">
                    Already logged today! {getMoodEmoji(todayEntry.mood)} 
                  </span>
                  <Badge variant="outline" className="ml-2">
                    {todayEntry.mood} mood
                  </Badge>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  You can update your entry below if needed.
                </p>
              </div>
            )}

            {/* Recent Mood History */}
            {moodHistory.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Your Recent Moods</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {moodHistory.slice(-5).map((entry, index) => (
                    <div key={index} className="flex items-center gap-1 bg-white rounded-full px-3 py-1 text-sm">
                      <Calendar className="h-3 w-3 text-gray-500" />
                      <span>{format(new Date(entry.date), 'MMM d')}</span>
                      <span className="ml-1">{getMoodEmoji(entry.mood)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Mood Selection */}
            <div className="space-y-4">
              <Label>Select your mood</Label>
              <div className="flex justify-between gap-2">
                {[
                  { emoji: "😊", mood: "happy", label: "Happy" },
                  { emoji: "😌", mood: "calm", label: "Calm" },
                  { emoji: "😐", mood: "neutral", label: "Neutral" },
                  { emoji: "😢", mood: "sad", label: "Sad" },
                  { emoji: "😠", mood: "angry", label: "Angry" },
                ].map(({ emoji, mood, label }) => (
                  <Button
                    key={mood}
                    onClick={() => setSelectedMood(mood)}
                    className={`flex-1 text-2xl h-16 ${
                      selectedMood === mood
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex flex-col items-center">
                      <span>{emoji}</span>
                      <span className="text-sm mt-1">{label}</span>
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Mood Score */}
            <div className="space-y-4">
              <Label>Mood intensity (1-10)</Label>
              <Slider
                value={moodScore}
                onValueChange={setMoodScore}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            {/* Stress Level */}
            <div className="space-y-4">
              <Label>Stress level (1-10)</Label>
              <Slider
                value={stressLevel}
                onValueChange={setStressLevel}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Relaxed</span>
                <span>Stressed</span>
              </div>
            </div>

            {/* Sleep */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Sleep hours</Label>
                <Select value={sleepHours} onValueChange={setSleepHours}>
                  <SelectTrigger>
                    <SelectValue placeholder="Hours of sleep" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 13 }, (_, i) => (
                      <SelectItem key={i} value={String(i)}>
                        {i} hours
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Sleep quality</Label>
                <Select value={sleepQuality} onValueChange={setSleepQuality}>
                  <SelectTrigger>
                    <SelectValue placeholder="Rate quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Activities */}
            <div className="space-y-4">
              <Label className="text-lg font-medium">Activities today</Label>
              <div className="flex flex-wrap gap-3">
                {activities.map(({ name, emoji }) => (
                  <Button
                    key={name}
                    onClick={() => handleActivityToggle(name)}
                    className={`px-4 py-2 rounded-full border-2 transition-all duration-300 ${
                      selectedActivities.includes(name)
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-md"
                        : "bg-white hover:bg-gray-50 border-gray-200 hover:border-blue-400 text-gray-700"
                    }`}
                    type="button"
                  >
                    <span className="mr-2">{emoji}</span>
                    {name}
                  </Button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Select all activities that apply to your day
              </p>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How was your day? What's on your mind?"
                className="h-24"
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !selectedMood}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Saving your day...
                </div>
              ) : todayEntry ? (
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Update My Day
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Save My Day
                </div>
              )}
            </Button>

            {/* Validation Message */}
            {!selectedMood && (
              <p className="text-sm text-center text-red-500">
                Please select your mood to continue
              </p>
            )}

            {/* Success Stats */}
            {moodHistory.length > 0 && (
              <div className="text-center text-sm text-gray-600">
                <div className="flex items-center justify-center gap-4">
                  <span>🗓️ {moodHistory.length} days tracked</span>
                  <span>📈 Average mood: {calculateAverageMood()}/10</span>
                </div>
              </div>
            )}

            {/* Motivational Quote */}
            <div className="text-center text-muted-foreground italic">
              "{randomQuote}"
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Music Suggestion Dialog */}
      <Dialog open={showMusicDialog} onOpenChange={setShowMusicDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Here's something to lift your spirits 🎵</DialogTitle>
            <DialogDescription>
              Music can help change your mood. How about listening to one of your favorite songs?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              onClick={() => setShowMusicDialog(false)}
            >
              ▶ Play "Happy" by Pharrell Williams
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DailyMoodTracker;
