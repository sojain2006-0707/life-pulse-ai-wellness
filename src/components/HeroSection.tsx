import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Brain, Activity, Music, Sparkles, Shield } from "lucide-react";
import heroImage from "@/assets/hero-wellness.jpg";

const HeroSection = () => {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-background via-wellness-light/10 to-calm/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-wellness-light/30 text-wellness px-3 py-1 rounded-full text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered Wellness Insights</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Track Your{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Mental Wellness
                </span>{" "}
                Journey
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Monitor your daily mood, sleep patterns, stress levels, and activities. 
                Get personalized AI insights and music recommendations to improve your wellbeing.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="flex-1 sm:flex-none">
                Start Tracking Today
              </Button>
              <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                Watch Demo
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2 bg-card px-3 py-2 rounded-lg border shadow-soft">
                <Brain className="h-4 w-4 text-focus" />
                <span className="text-sm font-medium">AI Insights</span>
              </div>
              <div className="flex items-center space-x-2 bg-card px-3 py-2 rounded-lg border shadow-soft">
                <Music className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">Music Therapy</span>
              </div>
              <div className="flex items-center space-x-2 bg-card px-3 py-2 rounded-lg border shadow-soft">
                <Shield className="h-4 w-4 text-wellness" />
                <span className="text-sm font-medium">Privacy First</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-glow">
              <img 
                src={heroImage} 
                alt="Peaceful wellness meditation scene" 
                className="w-full h-[500px] object-cover animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <Card className="absolute -top-4 -left-4 p-4 bg-card/90 backdrop-blur-sm border shadow-soft animate-pulse-gentle">
              <div className="flex items-center space-x-3">
                <div className="bg-wellness p-2 rounded-lg">
                  <Heart className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Mood: Great</p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
              </div>
            </Card>

            <Card className="absolute -bottom-4 -right-4 p-4 bg-card/90 backdrop-blur-sm border shadow-soft animate-pulse-gentle">
              <div className="flex items-center space-x-3">
                <div className="bg-focus p-2 rounded-lg">
                  <Activity className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">7h 30m Sleep</p>
                  <p className="text-xs text-muted-foreground">Last night</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;