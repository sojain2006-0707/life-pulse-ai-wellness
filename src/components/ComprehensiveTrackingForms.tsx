import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Heart, Activity, Moon, Brain, Save, Plus, Minus } from 'lucide-react';

interface MoodEntry {
  level: number;
  emotions: string[];
  intensity: 'low' | 'medium' | 'high';
  triggers: string[];
  notes: string;
  context: {
    location: string;
    weather: string;
    socialSituation: string;
    workLoad: 'light' | 'moderate' | 'heavy';
  };
}

interface ActivityEntry {
  activities: {
    type: string;
    name: string;
    duration: number;
    intensity: 'low' | 'moderate' | 'high';
    enjoyment: number;
    socialContext: string;
    location: string;
    notes: string;
  }[];
  moodBefore: number;
  moodAfter: number;
}

interface SleepEntry {
  bedtime: string;
  wakeTime: string;
  quality: number;
  interruptions: number;
  environment: {
    temperature: string;
    noise: string;
    lighting: string;
  };
  preSleepActivities: string[];
  caffeineIntake: {
    amount: number;
    timeBeforeBed: number;
  };
  moodBeforeSleep: number;
  dreamRecall: boolean;
  notes: string;
}

interface StressEntry {
  level: number;
  triggers: {
    category: string;
    description: string;
    intensity: number;
    duration: string;
  }[];
  physicalSymptoms: string[];
  emotionalSymptoms: string[];
  copingStrategies: {
    strategy: string;
    effectiveness: number;
    duration: number;
  }[];
  context: {
    location: string;
    timeOfDay: string;
    socialSituation: string;
  };
  notes: string;
}

const ComprehensiveTrackingForms = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState('mood');

  // Mood tracking state
  const [moodEntry, setMoodEntry] = useState<MoodEntry>({
    level: 5,
    emotions: [],
    intensity: 'medium',
    triggers: [],
    notes: '',
    context: {
      location: '',
      weather: '',
      socialSituation: '',
      workLoad: 'moderate'
    }
  });

  // Activity tracking state
  const [activityEntry, setActivityEntry] = useState<ActivityEntry>({
    activities: [{
      type: 'exercise',
      name: '',
      duration: 30,
      intensity: 'moderate',
      enjoyment: 3,
      socialContext: 'alone',
      location: 'home',
      notes: ''
    }],
    moodBefore: 5,
    moodAfter: 5
  });

  // Sleep tracking state
  const [sleepEntry, setSleepEntry] = useState<SleepEntry>({
    bedtime: '22:00',
    wakeTime: '07:00',
    quality: 3,
    interruptions: 0,
    environment: {
      temperature: 'comfortable',
      noise: 'quiet',
      lighting: 'dark'
    },
    preSleepActivities: [],
    caffeineIntake: {
      amount: 0,
      timeBeforeBed: 0
    },
    moodBeforeSleep: 5,
    dreamRecall: false,
    notes: ''
  });

  // Stress tracking state
  const [stressEntry, setStressEntry] = useState<StressEntry>({
    level: 5,
    triggers: [{
      category: 'work',
      description: '',
      intensity: 3,
      duration: 'moderate'
    }],
    physicalSymptoms: [],
    emotionalSymptoms: [],
    copingStrategies: [{
      strategy: '',
      effectiveness: 3,
      duration: 10
    }],
    context: {
      location: '',
      timeOfDay: 'afternoon',
      socialSituation: ''
    },
    notes: ''
  });

  const emotionOptions = [
    'happy', 'sad', 'anxious', 'excited', 'angry', 'calm', 
    'frustrated', 'content', 'overwhelmed', 'peaceful',
    'stressed', 'relaxed', 'energetic', 'tired'
  ];

  const activityTypes = [
    'exercise', 'social', 'work', 'hobby', 'relaxation', 
    'creative', 'outdoor', 'indoor', 'educational', 'entertainment'
  ];

  const physicalSymptoms = [
    'headache', 'muscle_tension', 'fatigue', 'nausea', 'dizziness',
    'chest_pain', 'rapid_heartbeat', 'sweating', 'trembling', 'insomnia'
  ];

  const emotionalSymptoms = [
    'irritability', 'anxiety', 'overwhelm', 'sadness', 'anger',
    'restlessness', 'worry', 'mood_swings', 'difficulty_concentrating'
  ];

  const preSleepActivities = [
    'reading', 'screen_time', 'exercise', 'meditation', 'music',
    'bath', 'conversation', 'work', 'eating', 'tv_watching'
  ];

  const addActivity = () => {
    setActivityEntry(prev => ({
      ...prev,
      activities: [...prev.activities, {
        type: 'exercise',
        name: '',
        duration: 30,
        intensity: 'moderate',
        enjoyment: 3,
        socialContext: 'alone',
        location: 'home',
        notes: ''
      }]
    }));
  };

  const removeActivity = (index: number) => {
    setActivityEntry(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };

  const addTrigger = () => {
    setStressEntry(prev => ({
      ...prev,
      triggers: [...prev.triggers, {
        category: 'work',
        description: '',
        intensity: 3,
        duration: 'moderate'
      }]
    }));
  };

  const removeTrigger = (index: number) => {
    setStressEntry(prev => ({
      ...prev,
      triggers: prev.triggers.filter((_, i) => i !== index)
    }));
  };

  const addCopingStrategy = () => {
    setStressEntry(prev => ({
      ...prev,
      copingStrategies: [...prev.copingStrategies, {
        strategy: '',
        effectiveness: 3,
        duration: 10
      }]
    }));
  };

  const removeCopingStrategy = (index: number) => {
    setStressEntry(prev => ({
      ...prev,
      copingStrategies: prev.copingStrategies.filter((_, i) => i !== index)
    }));
  };

  const saveMoodEntry = async () => {
    try {
      const response = await fetch('/api/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...moodEntry, date: selectedDate })
      });
      if (response.ok) {
        alert('Mood entry saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save mood entry:', error);
    }
  };

  const saveActivityEntry = async () => {
    try {
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...activityEntry, date: selectedDate })
      });
      if (response.ok) {
        alert('Activity entry saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save activity entry:', error);
    }
  };

  const saveSleepEntry = async () => {
    try {
      const response = await fetch('/api/sleep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...sleepEntry, date: selectedDate })
      });
      if (response.ok) {
        alert('Sleep entry saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save sleep entry:', error);
    }
  };

  const saveStressEntry = async () => {
    try {
      const response = await fetch('/api/stress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...stressEntry, date: selectedDate })
      });
      if (response.ok) {
        alert('Stress entry saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save stress entry:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Daily Tracking</h1>
        <p className="text-gray-600">Record your mood, activities, sleep, and stress levels</p>
      </div>

      {/* Date Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Date</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      {/* Tracking Forms */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="mood" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Mood
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Activities
          </TabsTrigger>
          <TabsTrigger value="sleep" className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            Sleep
          </TabsTrigger>
          <TabsTrigger value="stress" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Stress
          </TabsTrigger>
        </TabsList>

        {/* Mood Tracking */}
        <TabsContent value="mood">
          <Card>
            <CardHeader>
              <CardTitle>Mood Tracking</CardTitle>
              <CardDescription>How are you feeling today?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mood Level */}
              <div className="space-y-2">
                <Label>Mood Level (1-10)</Label>
                <div className="px-4">
                  <Slider
                    value={[moodEntry.level]}
                    onValueChange={(value) => setMoodEntry(prev => ({ ...prev, level: value[0] }))}
                    max={10}
                    min={1}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Very Sad</span>
                    <span>{moodEntry.level}</span>
                    <span>Very Happy</span>
                  </div>
                </div>
              </div>

              {/* Emotions */}
              <div className="space-y-2">
                <Label>Emotions (select all that apply)</Label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {emotionOptions.map(emotion => (
                    <div key={emotion} className="flex items-center space-x-2">
                      <Checkbox
                        id={emotion}
                        checked={moodEntry.emotions.includes(emotion)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setMoodEntry(prev => ({
                              ...prev,
                              emotions: [...prev.emotions, emotion]
                            }));
                          } else {
                            setMoodEntry(prev => ({
                              ...prev,
                              emotions: prev.emotions.filter(e => e !== emotion)
                            }));
                          }
                        }}
                      />
                      <Label htmlFor={emotion} className="text-sm capitalize">
                        {emotion.replace('_', ' ')}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intensity */}
              <div className="space-y-2">
                <Label>Emotional Intensity</Label>
                <Select value={moodEntry.intensity} onValueChange={(value: 'low' | 'medium' | 'high') => 
                  setMoodEntry(prev => ({ ...prev, intensity: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Context */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={moodEntry.context.location}
                    onChange={(e) => setMoodEntry(prev => ({
                      ...prev,
                      context: { ...prev.context, location: e.target.value }
                    }))}
                    placeholder="e.g., home, office, park"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Weather</Label>
                  <Input
                    value={moodEntry.context.weather}
                    onChange={(e) => setMoodEntry(prev => ({
                      ...prev,
                      context: { ...prev.context, weather: e.target.value }
                    }))}
                    placeholder="e.g., sunny, rainy, cloudy"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label>Notes (optional)</Label>
                <Textarea
                  value={moodEntry.notes}
                  onChange={(e) => setMoodEntry(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any additional thoughts about your mood today..."
                />
              </div>

              <Button onClick={saveMoodEntry} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Mood Entry
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tracking */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Tracking</CardTitle>
              <CardDescription>Record your daily activities and their impact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mood Before/After */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Mood Before Activities (1-10)</Label>
                  <Slider
                    value={[activityEntry.moodBefore]}
                    onValueChange={(value) => setActivityEntry(prev => ({ ...prev, moodBefore: value[0] }))}
                    max={10}
                    min={1}
                    step={1}
                  />
                  <div className="text-center text-sm">{activityEntry.moodBefore}</div>
                </div>
                <div className="space-y-2">
                  <Label>Mood After Activities (1-10)</Label>
                  <Slider
                    value={[activityEntry.moodAfter]}
                    onValueChange={(value) => setActivityEntry(prev => ({ ...prev, moodAfter: value[0] }))}
                    max={10}
                    min={1}
                    step={1}
                  />
                  <div className="text-center text-sm">{activityEntry.moodAfter}</div>
                </div>
              </div>

              {/* Activities */}
              {activityEntry.activities.map((activity, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Activity {index + 1}</h4>
                    {activityEntry.activities.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeActivity(index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select 
                        value={activity.type} 
                        onValueChange={(value) => {
                          const newActivities = [...activityEntry.activities];
                          newActivities[index].type = value;
                          setActivityEntry(prev => ({ ...prev, activities: newActivities }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {activityTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Activity Name</Label>
                      <Input
                        value={activity.name}
                        onChange={(e) => {
                          const newActivities = [...activityEntry.activities];
                          newActivities[index].name = e.target.value;
                          setActivityEntry(prev => ({ ...prev, activities: newActivities }));
                        }}
                        placeholder="e.g., morning jog, reading a book"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Duration (minutes)</Label>
                      <Input
                        type="number"
                        value={activity.duration}
                        onChange={(e) => {
                          const newActivities = [...activityEntry.activities];
                          newActivities[index].duration = parseInt(e.target.value) || 0;
                          setActivityEntry(prev => ({ ...prev, activities: newActivities }));
                        }}
                        min="1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Enjoyment (1-5)</Label>
                      <Slider
                        value={[activity.enjoyment]}
                        onValueChange={(value) => {
                          const newActivities = [...activityEntry.activities];
                          newActivities[index].enjoyment = value[0];
                          setActivityEntry(prev => ({ ...prev, activities: newActivities }));
                        }}
                        max={5}
                        min={1}
                        step={1}
                      />
                      <div className="text-center text-sm">{activity.enjoyment}</div>
                    </div>
                  </div>
                </Card>
              ))}

              <Button onClick={addActivity} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Another Activity
              </Button>

              <Button onClick={saveActivityEntry} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Activity Entry
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sleep Tracking */}
        <TabsContent value="sleep">
          <Card>
            <CardHeader>
              <CardTitle>Sleep Tracking</CardTitle>
              <CardDescription>Record your sleep patterns and quality</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Sleep Times */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bedtime</Label>
                  <Input
                    type="time"
                    value={sleepEntry.bedtime}
                    onChange={(e) => setSleepEntry(prev => ({ ...prev, bedtime: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Wake Time</Label>
                  <Input
                    type="time"
                    value={sleepEntry.wakeTime}
                    onChange={(e) => setSleepEntry(prev => ({ ...prev, wakeTime: e.target.value }))}
                  />
                </div>
              </div>

              {/* Sleep Quality */}
              <div className="space-y-2">
                <Label>Sleep Quality (1-5)</Label>
                <Slider
                  value={[sleepEntry.quality]}
                  onValueChange={(value) => setSleepEntry(prev => ({ ...prev, quality: value[0] }))}
                  max={5}
                  min={1}
                  step={1}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Very Poor</span>
                  <span>{sleepEntry.quality}</span>
                  <span>Excellent</span>
                </div>
              </div>

              {/* Pre-Sleep Activities */}
              <div className="space-y-2">
                <Label>Activities Before Bed (select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {preSleepActivities.map(activity => (
                    <div key={activity} className="flex items-center space-x-2">
                      <Checkbox
                        id={activity}
                        checked={sleepEntry.preSleepActivities.includes(activity)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSleepEntry(prev => ({
                              ...prev,
                              preSleepActivities: [...prev.preSleepActivities, activity]
                            }));
                          } else {
                            setSleepEntry(prev => ({
                              ...prev,
                              preSleepActivities: prev.preSleepActivities.filter(a => a !== activity)
                            }));
                          }
                        }}
                      />
                      <Label htmlFor={activity} className="text-sm">
                        {activity.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sleep Environment */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Temperature</Label>
                  <Select 
                    value={sleepEntry.environment.temperature} 
                    onValueChange={(value) => setSleepEntry(prev => ({
                      ...prev,
                      environment: { ...prev.environment, temperature: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="too_cold">Too Cold</SelectItem>
                      <SelectItem value="cold">Cold</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="warm">Warm</SelectItem>
                      <SelectItem value="too_warm">Too Warm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Noise Level</Label>
                  <Select 
                    value={sleepEntry.environment.noise} 
                    onValueChange={(value) => setSleepEntry(prev => ({
                      ...prev,
                      environment: { ...prev.environment, noise: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="silent">Silent</SelectItem>
                      <SelectItem value="quiet">Quiet</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="noisy">Noisy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Lighting</Label>
                  <Select 
                    value={sleepEntry.environment.lighting} 
                    onValueChange={(value) => setSleepEntry(prev => ({
                      ...prev,
                      environment: { ...prev.environment, lighting: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="dim">Dim</SelectItem>
                      <SelectItem value="bright">Bright</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={saveSleepEntry} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Sleep Entry
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stress Tracking */}
        <TabsContent value="stress">
          <Card>
            <CardHeader>
              <CardTitle>Stress Tracking</CardTitle>
              <CardDescription>Monitor your stress levels and triggers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stress Level */}
              <div className="space-y-2">
                <Label>Overall Stress Level (1-10)</Label>
                <Slider
                  value={[stressEntry.level]}
                  onValueChange={(value) => setStressEntry(prev => ({ ...prev, level: value[0] }))}
                  max={10}
                  min={1}
                  step={1}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>No Stress</span>
                  <span>{stressEntry.level}</span>
                  <span>Extreme Stress</span>
                </div>
              </div>

              {/* Stress Triggers */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Stress Triggers</Label>
                  <Button onClick={addTrigger} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Trigger
                  </Button>
                </div>

                {stressEntry.triggers.map((trigger, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Trigger {index + 1}</h4>
                      {stressEntry.triggers.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeTrigger(index)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select 
                          value={trigger.category} 
                          onValueChange={(value) => {
                            const newTriggers = [...stressEntry.triggers];
                            newTriggers[index].category = value;
                            setStressEntry(prev => ({ ...prev, triggers: newTriggers }));
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="work">Work</SelectItem>
                            <SelectItem value="relationships">Relationships</SelectItem>
                            <SelectItem value="health">Health</SelectItem>
                            <SelectItem value="finances">Finances</SelectItem>
                            <SelectItem value="family">Family</SelectItem>
                            <SelectItem value="social">Social</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                          value={trigger.description}
                          onChange={(e) => {
                            const newTriggers = [...stressEntry.triggers];
                            newTriggers[index].description = e.target.value;
                            setStressEntry(prev => ({ ...prev, triggers: newTriggers }));
                          }}
                          placeholder="Describe the stressor"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Intensity (1-5)</Label>
                        <Slider
                          value={[trigger.intensity]}
                          onValueChange={(value) => {
                            const newTriggers = [...stressEntry.triggers];
                            newTriggers[index].intensity = value[0];
                            setStressEntry(prev => ({ ...prev, triggers: newTriggers }));
                          }}
                          max={5}
                          min={1}
                          step={1}
                        />
                        <div className="text-center text-sm">{trigger.intensity}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Physical Symptoms */}
              <div className="space-y-2">
                <Label>Physical Symptoms (select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {physicalSymptoms.map(symptom => (
                    <div key={symptom} className="flex items-center space-x-2">
                      <Checkbox
                        id={symptom}
                        checked={stressEntry.physicalSymptoms.includes(symptom)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setStressEntry(prev => ({
                              ...prev,
                              physicalSymptoms: [...prev.physicalSymptoms, symptom]
                            }));
                          } else {
                            setStressEntry(prev => ({
                              ...prev,
                              physicalSymptoms: prev.physicalSymptoms.filter(s => s !== symptom)
                            }));
                          }
                        }}
                      />
                      <Label htmlFor={symptom} className="text-sm">
                        {symptom.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emotional Symptoms */}
              <div className="space-y-2">
                <Label>Emotional Symptoms (select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {emotionalSymptoms.map(symptom => (
                    <div key={symptom} className="flex items-center space-x-2">
                      <Checkbox
                        id={`emotional_${symptom}`}
                        checked={stressEntry.emotionalSymptoms.includes(symptom)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setStressEntry(prev => ({
                              ...prev,
                              emotionalSymptoms: [...prev.emotionalSymptoms, symptom]
                            }));
                          } else {
                            setStressEntry(prev => ({
                              ...prev,
                              emotionalSymptoms: prev.emotionalSymptoms.filter(s => s !== symptom)
                            }));
                          }
                        }}
                      />
                      <Label htmlFor={`emotional_${symptom}`} className="text-sm">
                        {symptom.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={saveStressEntry} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Stress Entry
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComprehensiveTrackingForms;