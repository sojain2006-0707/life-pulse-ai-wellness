import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Brain, 
  Activity, 
  Music, 
  Moon, 
  Target, 
  TrendingUp, 
  Shield,
  Smartphone,
  Bell
} from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Daily Mood Tracking",
    description: "Log your emotions and feelings with our intuitive mood tracker. Identify patterns and triggers over time.",
    badge: "Core Feature",
    color: "text-wellness"
  },
  {
    icon: Moon,
    title: "Sleep Pattern Analysis",
    description: "Monitor your sleep quality and duration. Get insights on how sleep affects your mental wellness.",
    badge: "Health Tracking",
    color: "text-calm"
  },
  {
    icon: Target,
    title: "Stress Level Monitoring",
    description: "Track daily stress levels and discover what situations or activities impact your stress most.",
    badge: "Wellness",
    color: "text-energy"
  },
  {
    icon: Activity,
    title: "Activity Logging",
    description: "Record your daily activities and see how different activities correlate with your mood and energy.",
    badge: "Lifestyle",
    color: "text-focus"
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Get personalized recommendations and pattern analysis powered by advanced machine learning algorithms.",
    badge: "AI Feature",
    color: "text-accent"
  },
  {
    icon: Music,
    title: "Smart Music Recommendations",
    description: "Receive curated music suggestions based on your current mood to help regulate emotions and reduce stress.",
    badge: "Therapy",
    color: "text-primary"
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description: "Visualize your wellness journey with beautiful charts and detailed analytics to track your improvement.",
    badge: "Analytics",
    color: "text-wellness"
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Your mental health data is encrypted and secure. We follow strict privacy guidelines to protect your information.",
    badge: "Security",
    color: "text-muted-foreground"
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Access LifePulse anywhere with our responsive design optimized for mobile devices and tablets.",
    badge: "Mobile",
    color: "text-focus"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get gentle reminders for check-ins and immediate music suggestions when you need emotional support.",
    badge: "Notifications",
    color: "text-energy"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background to-wellness-light/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Complete Wellness Platform
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for{" "}
            <span className="bg-gradient-wellness bg-clip-text text-transparent">
              Mental Wellness
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools and AI-powered insights to help you understand, track, 
            and improve your mental health journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-soft transition-all duration-300 hover:-translate-y-1 border-border/50"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-gradient-wellness/10 ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;