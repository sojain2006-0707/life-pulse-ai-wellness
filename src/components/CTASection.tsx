import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Shield, 
  Smartphone, 
  Music,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const CTASection = () => {
  const features = [
    { icon: Heart, text: "Track mood, sleep & stress" },
    { icon: Music, text: "Smart music recommendations" },
    { icon: Shield, text: "Privacy-first approach" },
    { icon: Smartphone, text: "Mobile-optimized design" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-wellness-light/10 via-background to-focus/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-6">
            🚀 Ready to Start?
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Take Control of Your{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Mental Wellness
            </span>{" "}
            Today
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already started their wellness journey with LifePulse. 
            Begin tracking, get AI insights, and improve your mental health with personalized recommendations.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 hover:shadow-soft transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div className="bg-gradient-wellness/10 p-3 rounded-lg mb-3 inline-block">
                    <feature.icon className="h-5 w-5 text-wellness" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{feature.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main CTA */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="flex items-center gap-2 text-lg px-8 py-3">
                Start Your Free Journey
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-wellness" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-wellness" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-wellness" />
                <span>Privacy protected</span>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Shield className="h-5 w-5 text-wellness" />
                <p className="text-sm">
                  <strong className="text-foreground">Your privacy matters.</strong> All data is encrypted and secure. 
                  We never share your personal mental health information.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTASection;