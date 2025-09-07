import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Lightbulb, 
  Target, 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  MessageSquare,
  Heart
} from "lucide-react";

const AIInsightsSection = () => {
  const insights = [
    {
      type: "Pattern Detection",
      icon: TrendingUp,
      title: "Sleep-Mood Connection Found",
      description: "Your mood scores are 23% higher on days when you sleep 7+ hours. Consider maintaining a consistent sleep schedule.",
      severity: "info",
      confidence: 94
    },
    {
      type: "Trigger Alert",
      icon: AlertTriangle,
      title: "Potential Stress Trigger",
      description: "Work meetings on Mondays correlate with higher stress levels. Try scheduling buffer time before important meetings.",
      severity: "warning",
      confidence: 87
    },
    {
      type: "Positive Pattern",
      icon: CheckCircle,
      title: "Exercise Boost Detected",
      description: "Your mood improves by 31% on days with physical activity. Keep up the great work with your fitness routine!",
      severity: "success",
      confidence: 91
    }
  ];

  const recommendations = [
    {
      category: "Mindfulness",
      title: "5-Minute Breathing Exercise",
      description: "Based on your stress patterns, try this breathing technique when you feel overwhelmed.",
      icon: Heart,
      duration: "5 min"
    },
    {
      category: "Professional",
      title: "Consider Speaking to Someone",
      description: "Your recent mood patterns suggest it might help to talk with a mental health professional.",
      icon: MessageSquare,
      priority: "high"
    },
    {
      category: "Lifestyle",
      title: "Morning Routine Optimization",
      description: "Starting your day with light exposure and movement could improve your overall mood scores.",
      icon: Lightbulb,
      duration: "15 min"
    }
  ];

  return (
    <section id="insights" className="py-20 bg-gradient-to-b from-background to-focus/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            AI-Powered Intelligence
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Hidden{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Patterns & Insights
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our advanced AI analyzes your data to identify triggers, patterns, and personalized 
            recommendations to improve your mental wellness journey.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* AI Insights */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="h-6 w-6 text-accent" />
              <h3 className="text-xl font-semibold">Recent Insights</h3>
            </div>

            {insights.map((insight, index) => (
              <Card key={index} className="border-l-4 border-l-primary shadow-soft">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <insight.icon className={`h-5 w-5 ${
                        insight.severity === 'success' ? 'text-wellness' : 
                        insight.severity === 'warning' ? 'text-energy' : 'text-focus'
                      }`} />
                      <Badge variant="outline" className="text-xs">
                        {insight.type}
                      </Badge>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{insight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {insight.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recommendations */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="h-6 w-6 text-wellness" />
              <h3 className="text-xl font-semibold">Personalized Recommendations</h3>
            </div>

            {recommendations.map((rec, index) => (
              <Card key={index} className="group hover:shadow-soft transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-wellness/10 rounded-lg">
                        <rec.icon className="h-5 w-5 text-wellness" />
                      </div>
                      <div>
                        <Badge variant="outline" className="text-xs mb-1">
                          {rec.category}
                        </Badge>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {rec.title}
                        </CardTitle>
                      </div>
                    </div>
                    {rec.duration && (
                      <Badge variant="secondary" className="text-xs">
                        {rec.duration}
                      </Badge>
                    )}
                    {rec.priority === 'high' && (
                      <Badge variant="destructive" className="text-xs">
                        Important
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription className="text-sm leading-relaxed">
                    {rec.description}
                  </CardDescription>
                  <Button variant="wellness" size="sm" className="w-full">
                    {rec.category === 'Professional' ? 'Find Resources' : 'Try This Exercise'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-gradient-hero text-primary-foreground border-none shadow-glow">
            <CardContent className="p-8">
              <Brain className="h-12 w-12 mx-auto mb-4 animate-pulse-gentle" />
              <h3 className="text-2xl font-bold mb-4">
                Ready to Unlock Your Wellness Insights?
              </h3>
              <p className="text-primary-foreground/90 mb-6">
                Start tracking today and let our AI help you discover patterns, 
                triggers, and personalized strategies for better mental health.
              </p>
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                Begin Your Journey
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIInsightsSection;