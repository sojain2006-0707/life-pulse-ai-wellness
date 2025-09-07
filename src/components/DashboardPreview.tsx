import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Moon, 
  Target, 
  Activity, 
  TrendingUp, 
  Music,
  Calendar,
  Award
} from "lucide-react";

const DashboardPreview = () => {
  return (
    <section id="dashboard" className="py-20 bg-gradient-to-b from-wellness-light/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Interactive Dashboard
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Personal{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Wellness Command Center
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get a complete overview of your mental health journey with beautiful visualizations 
            and actionable insights at a glance.
          </p>
        </div>

        {/* Dashboard Mock-up */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            {/* Quick Stats */}
            <Card className="lg:col-span-4">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-wellness" />
                  Today's Overview
                </CardTitle>
                <CardDescription>Your wellness snapshot for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-wellness-light/20 rounded-lg">
                    <Heart className="h-8 w-8 text-wellness mx-auto mb-2" />
                    <p className="text-2xl font-bold text-wellness">8.5</p>
                    <p className="text-sm text-muted-foreground">Mood Score</p>
                  </div>
                  <div className="text-center p-4 bg-calm/20 rounded-lg">
                    <Moon className="h-8 w-8 text-calm mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">7h 30m</p>
                    <p className="text-sm text-muted-foreground">Sleep</p>
                  </div>
                  <div className="text-center p-4 bg-energy/20 rounded-lg">
                    <Target className="h-8 w-8 text-energy mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">Low</p>
                    <p className="text-sm text-muted-foreground">Stress</p>
                  </div>
                  <div className="text-center p-4 bg-focus/20 rounded-lg">
                    <Activity className="h-8 w-8 text-focus mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">85%</p>
                    <p className="text-sm text-muted-foreground">Activity</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Mood Trends */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-wellness" />
                  Mood Trends (7 Days)
                </CardTitle>
                <CardDescription>Your emotional patterns over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-sm font-medium w-12">{day}</span>
                      <div className="flex-1 mx-4">
                        <Progress value={[85, 75, 90, 80, 95, 70, 85][index]} className="h-2" />
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${[85, 75, 90, 80, 95, 70, 85][index] > 80 ? 'text-wellness' : 'text-energy'}`}
                      >
                        {['Great', 'Good', 'Great', 'Good', 'Excellent', 'OK', 'Great'][index]}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Music className="h-5 w-5 text-accent" />
                    Music Recommendations
                  </CardTitle>
                  <CardDescription>Curated for your current mood</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <p className="font-medium text-sm">🎵 Peaceful Morning</p>
                    <p className="text-xs text-muted-foreground">Matches your calm mood</p>
                  </div>
                  <div className="p-3 bg-wellness/10 rounded-lg">
                    <p className="font-medium text-sm">🎶 Focus Flow</p>
                    <p className="text-xs text-muted-foreground">Boost productivity</p>
                  </div>
                  <Button variant="wellness" size="sm" className="w-full">
                    View All Suggestions
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-focus" />
                    Weekly Achievement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-2">
                    <div className="text-3xl">🏆</div>
                    <p className="font-medium">Consistency Champion</p>
                    <p className="text-sm text-muted-foreground">
                      7 days of mood tracking!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;