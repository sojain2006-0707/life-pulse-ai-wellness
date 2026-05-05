import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AuthGuard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <Card className="w-full max-w-md shadow-xl backdrop-blur-sm bg-white/90">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">
            Hold up — sign in first
          </CardTitle>
          <CardDescription className="text-base">
            You need to sign in to access LifePulse features.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-center">
            Please sign in to continue.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <Button
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
            <Button
              className="flex-1 bg-white hover:bg-gray-50 border-2"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthGuard;
