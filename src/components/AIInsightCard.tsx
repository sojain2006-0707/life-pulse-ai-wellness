import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, TrendingUp, Brain, AlertCircle } from "lucide-react";

interface AIInsightCardProps {
  title: string;
  type: "pattern" | "alert" | "prediction";
  confidence: number;
  description: string;
}

const getInsightIcon = (type: string) => {
  switch (type) {
    case "pattern":
      return <TrendingUp className="w-5 h-5 text-blue-600" />;
    case "prediction":
      return <Brain className="w-5 h-5 text-purple-600" />;
    case "alert":
      return <AlertCircle className="w-5 h-5 text-red-600" />;
    default:
      return <LineChart className="w-5 h-5 text-gray-600" />;
  }
};

const getInsightColor = (type: string) => {
  switch (type) {
    case "pattern":
      return "bg-blue-50 border-blue-100";
    case "prediction":
      return "bg-purple-50 border-purple-100";
    case "alert":
      return "bg-red-50 border-red-100";
    default:
      return "bg-gray-50 border-gray-100";
  }
};

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 90) return "bg-green-100 text-green-700";
  if (confidence >= 70) return "bg-yellow-100 text-yellow-700";
  return "bg-gray-100 text-gray-700";
};

const AIInsightCard = ({ title, type, confidence, description }: AIInsightCardProps) => {
  return (
    <Card className={`relative overflow-hidden border-2 ${getInsightColor(type)} transition-all duration-300 hover:shadow-lg`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getInsightIcon(type)}
            <div className="text-sm font-medium text-muted-foreground">
              Pattern Detection
            </div>
          </div>
          <Badge className={`${getConfidenceColor(confidence)} font-medium`}>
            {confidence}% Confidence
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardContent>
      {/* Decorative gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/10 pointer-events-none" />
    </Card>
  );
};

export default AIInsightCard;
