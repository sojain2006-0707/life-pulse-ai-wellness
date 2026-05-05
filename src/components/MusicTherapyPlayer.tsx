import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart, Star, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: number;
  moodScore: number;
  youtubeUrl?: string;
}

interface Playlist {
  name: string;
  description: string;
  tracks: Track[];
  targetMood: string;
  duration: number;
}

const MusicTherapyPlayer = () => {
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [moodBefore, setMoodBefore] = useState(5);
  const [moodAfter, setMoodAfter] = useState<number | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [likedTracks, setLikedTracks] = useState<string[]>([]);
  const [dislikedTracks, setDislikedTracks] = useState<string[]>([]);
  const [skippedCount, setSkippedCount] = useState(0);
  const [repeatedCount, setRepeatedCount] = useState(0);
  const [sessionFeedback, setSessionFeedback] = useState('');
  const [sessionRating, setSessionRating] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const samplePlaylists: Playlist[] = [
    {
      name: 'Gentle Uplift',
      description: 'Soft, comforting songs to gradually improve your mood',
      targetMood: 'sad',
      duration: 1800,
      tracks: [
        {
          id: '1',
          title: 'Three Little Birds',
          artist: 'Bob Marley',
          genre: 'reggae',
          duration: 188,
          moodScore: 8,
          youtubeUrl: 'https://www.youtube.com/watch?v=zaGUr6wzyT8'
        },
        {
          id: '2',
          title: 'Here Comes the Sun',
          artist: 'The Beatles',
          genre: 'rock',
          duration: 185,
          moodScore: 9,
          youtubeUrl: 'https://www.youtube.com/watch?v=KQetemT1sWc'
        },
        {
          id: '3',
          title: 'Good as Hell',
          artist: 'Lizzo',
          genre: 'pop',
          duration: 219,
          moodScore: 9,
          youtubeUrl: 'https://www.youtube.com/watch?v=SmbmeOgWsqE'
        }
      ]
    },
    {
      name: 'Calm Mind',
      description: 'Soothing tracks to reduce anxiety and promote relaxation',
      targetMood: 'anxious',
      duration: 2100,
      tracks: [
        {
          id: '4',
          title: 'Weightless',
          artist: 'Marconi Union',
          genre: 'ambient',
          duration: 485,
          moodScore: 8,
          youtubeUrl: 'https://www.youtube.com/watch?v=UfcAVejslrU'
        },
        {
          id: '5',
          title: 'Clair de Lune',
          artist: 'Claude Debussy',
          genre: 'classical',
          duration: 300,
          moodScore: 7,
          youtubeUrl: 'https://www.youtube.com/watch?v=CvFH_6DNRCY'
        }
      ]
    },
    {
      name: 'Feel Good Vibes',
      description: 'Upbeat songs to maintain and amplify positive energy',
      targetMood: 'happy',
      duration: 1680,
      tracks: [
        {
          id: '6',
          title: 'Uptown Funk',
          artist: 'Mark Ronson ft. Bruno Mars',
          genre: 'funk',
          duration: 269,
          moodScore: 10,
          youtubeUrl: 'https://www.youtube.com/watch?v=OPf0YbXqDm0'
        },
        {
          id: '7',
          title: 'Happy',
          artist: 'Pharrell Williams',
          genre: 'pop',
          duration: 233,
          moodScore: 10,
          youtubeUrl: 'https://www.youtube.com/watch?v=ZbZSe6N_BXs'
        }
      ]
    }
  ];

  useEffect(() => {
    // Set initial playlist based on current mood
    const playlist = getRecommendedPlaylist(moodBefore);
    setCurrentPlaylist(playlist);
    if (playlist.tracks.length > 0) {
      setCurrentTrack(playlist.tracks[0]);
    }
  }, [moodBefore]);

  const getRecommendedPlaylist = (mood: number): Playlist => {
    if (mood <= 3) return samplePlaylists[0]; // Gentle Uplift
    if (mood <= 5) return samplePlaylists[1]; // Calm Mind
    return samplePlaylists[2]; // Feel Good Vibes
  };

  const startSession = () => {
    setSessionStartTime(new Date());
  };

  const playTrack = (track: Track) => {
    if (!sessionStartTime) startSession();
    
    setCurrentTrack(track);
    setIsPlaying(true);
    
    // In a real app, you would integrate with YouTube API or Spotify
    // For demo purposes, we'll simulate playback
    console.log(`Playing: ${track.title} by ${track.artist}`);
    console.log(`YouTube URL: ${track.youtubeUrl}`);
  };

  const togglePlayPause = () => {
    if (!sessionStartTime) startSession();
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (!currentPlaylist) return;
    
    const nextIndex = (currentTrackIndex + 1) % currentPlaylist.tracks.length;
    setCurrentTrackIndex(nextIndex);
    setCurrentTrack(currentPlaylist.tracks[nextIndex]);
    
    if (nextIndex === 0) {
      setRepeatedCount(prev => prev + 1);
    }
  };

  const previousTrack = () => {
    if (!currentPlaylist) return;
    
    const prevIndex = currentTrackIndex === 0 
      ? currentPlaylist.tracks.length - 1 
      : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setCurrentTrack(currentPlaylist.tracks[prevIndex]);
  };

  const skipTrack = () => {
    setSkippedCount(prev => prev + 1);
    nextTrack();
  };

  const likeTrack = (trackId: string) => {
    setLikedTracks(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
    setDislikedTracks(prev => prev.filter(id => id !== trackId));
  };

  const dislikeTrack = (trackId: string) => {
    setDislikedTracks(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
    setLikedTracks(prev => prev.filter(id => id !== trackId));
  };

  const switchPlaylist = (playlist: Playlist) => {
    setCurrentPlaylist(playlist);
    setCurrentTrack(playlist.tracks[0]);
    setCurrentTrackIndex(0);
  };

  const endSession = async () => {
    if (!sessionStartTime || !currentPlaylist) return;
    
    const sessionDuration = (new Date().getTime() - sessionStartTime.getTime()) / 1000 / 60; // minutes
    
    const sessionData = {
      playlistName: currentPlaylist.name,
      tracks: currentPlaylist.tracks,
      moodBefore,
      moodAfter,
      duration: sessionDuration,
      skipped: skippedCount,
      repeated: repeatedCount,
      feedback: {
        rating: sessionRating,
        liked: likedTracks,
        disliked: dislikedTracks,
        comments: sessionFeedback
      }
    };
    
    // In a real app, you would send this to your backend
    console.log('Session data:', sessionData);
    
    // Reset session
    setSessionStartTime(null);
    setMoodAfter(null);
    setSkippedCount(0);
    setRepeatedCount(0);
    setLikedTracks([]);
    setDislikedTracks([]);
    setSessionFeedback('');
    setSessionRating(0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Music Therapy</h1>
        <p className="text-gray-600">Personalized music recommendations to enhance your mood</p>
      </div>

      {/* Mood Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            How are you feeling?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Very Sad</span>
              <span>Current: {moodBefore}/10</span>
              <span>Very Happy</span>
            </div>
            <Slider
              value={[moodBefore]}
              onValueChange={(value) => setMoodBefore(value[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
          {sessionStartTime && moodAfter === null && (
            <div className="space-y-2">
              <label className="text-sm font-medium">How do you feel after listening?</label>
              <div className="flex justify-between text-sm">
                <span>Much Worse</span>
                <span>After: {moodAfter || 'Not set'}/10</span>
                <span>Much Better</span>
              </div>
              <Slider
                value={moodAfter ? [moodAfter] : [5]}
                onValueChange={(value) => setMoodAfter(value[0])}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Playlist Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {samplePlaylists.map((playlist, index) => (
          <Card 
            key={index}
            className={`cursor-pointer transition-all ${
              currentPlaylist?.name === playlist.name 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:shadow-md'
            }`}
            onClick={() => switchPlaylist(playlist)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{playlist.name}</CardTitle>
              <CardDescription>{playlist.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <Badge variant="outline">{playlist.tracks.length} tracks</Badge>
                <span className="text-sm text-gray-500">
                  {Math.round(playlist.duration / 60)} min
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Music Player */}
      {currentTrack && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle>Now Playing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Track Info */}
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold">{currentTrack.title}</h3>
              <p className="text-gray-600">{currentTrack.artist}</p>
              <Badge>{currentTrack.genre}</Badge>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(currentTrack.duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" size="icon" onClick={previousTrack}>
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button size="icon" onClick={togglePlayPause} className="w-12 h-12">
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              
              <Button variant="outline" size="icon" onClick={nextTrack}>
                <SkipForward className="h-4 w-4" />
              </Button>

              <div className="flex items-center space-x-2 ml-8">
                <Volume2 className="h-4 w-4" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-20"
                />
              </div>
            </div>

            {/* Track Actions */}
            <div className="flex justify-center space-x-4">
              <Button
                variant={likedTracks.includes(currentTrack.id) ? "default" : "outline"}
                size="sm"
                onClick={() => likeTrack(currentTrack.id)}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                Like
              </Button>
              
              <Button
                variant={dislikedTracks.includes(currentTrack.id) ? "destructive" : "outline"}
                size="sm"
                onClick={() => dislikeTrack(currentTrack.id)}
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                Dislike
              </Button>

              <Button variant="outline" size="sm" onClick={skipTrack}>
                Skip Track
              </Button>

              {currentTrack.youtubeUrl && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(currentTrack.youtubeUrl, '_blank')}
                >
                  Open in YouTube
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Session Feedback */}
      {sessionStartTime && (
        <Card>
          <CardHeader>
            <CardTitle>Session Feedback</CardTitle>
            <CardDescription>Help us improve your music therapy experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Rate this session (1-5 stars)</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer ${
                      star <= sessionRating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                    onClick={() => setSessionRating(star)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Additional feedback (optional)</label>
              <Textarea
                placeholder="How did this session make you feel? Any suggestions for improvement?"
                value={sessionFeedback}
                onChange={(e) => setSessionFeedback(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={endSession} className="flex-1">
                End Session
              </Button>
              <Button variant="outline" onClick={() => setSessionStartTime(null)}>
                Continue Listening
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Playlist Tracks */}
      {currentPlaylist && (
        <Card>
          <CardHeader>
            <CardTitle>{currentPlaylist.name} - Track List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {currentPlaylist.tracks.map((track, index) => (
                <div
                  key={track.id}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    currentTrack?.id === track.id
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'hover:bg-gray-50 border border-gray-200'
                  }`}
                  onClick={() => playTrack(track)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">{index + 1}</span>
                    <div>
                      <p className="font-medium">{track.title}</p>
                      <p className="text-sm text-gray-600">{track.artist}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{track.genre}</Badge>
                    <span className="text-sm text-gray-500">
                      {formatTime(track.duration)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm">{track.moodScore}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MusicTherapyPlayer;