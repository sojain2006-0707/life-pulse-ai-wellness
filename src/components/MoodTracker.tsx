import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MoodTracker = () => {
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");

  const handleMoodChange = (selectedMood: string) => {
    setMood(selectedMood);
  };

  const handleSubmit = () => {
    // Handle submit logic here
    console.log({ mood, notes });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>How are you feeling?</CardTitle>
        <CardDescription>Log your mood and track your well-being.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4">
          <Button
            variant={(mood === "happy" ? "default" : "outline")}
            onClick={() => handleMoodChange("happy")}
          >
            😊 Happy
          </Button>
          <Button
            variant={(mood === "sad" ? "default" : "outline")}
            onClick={() => handleMoodChange("sad")}
          >
            😢 Sad
          </Button>
          <Button
            variant={(mood === "angry" ? "default" : "outline")}
            onClick={() => handleMoodChange("angry")}
          >
            😠 Angry
          </Button>
          <Button
            variant={(mood === "calm" ? "default" : "outline")}
            onClick={() => handleMoodChange("calm")}
          >
            😌 Calm
          </Button>
        </div>
        <div className="mt-4">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes about your mood..."
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit}>Save</Button>
      </CardFooter>
    </Card>
  );
};

export default MoodTracker;