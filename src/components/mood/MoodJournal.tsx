import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Smile, Meh, Frown, Loader2 } from "lucide-react";

const moodOptions = [
  { value: "very_sad", label: "Very Sad", icon: Frown, color: "text-destructive" },
  { value: "sad", label: "Sad", icon: Frown, color: "text-orange-500" },
  { value: "neutral", label: "Neutral", icon: Meh, color: "text-muted-foreground" },
  { value: "happy", label: "Happy", icon: Smile, color: "text-primary-light" },
  { value: "very_happy", label: "Very Happy", icon: Smile, color: "text-primary" },
];

export const MoodJournal = () => {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [stressLevel, setStressLevel] = useState<number[]>([3]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!selectedMood) {
      toast({
        title: "Select a mood",
        description: "Please choose how you're feeling today",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("mood_entries").insert({
        user_id: user.id,
        mood: selectedMood,
        stress_level: stressLevel[0],
        note: note || null,
      });

      if (error) throw error;

      toast({
        title: "Mood logged! 🌸",
        description: "Your reflection has been saved.",
      });

      // Reset form
      setSelectedMood("");
      setStressLevel([3]);
      setNote("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-2xl">How are you feeling today?</CardTitle>
        <CardDescription>Take a moment to check in with yourself</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Your Mood</Label>
          <div className="grid grid-cols-5 gap-3">
            {moodOptions.map((mood) => {
              const Icon = mood.icon;
              return (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                    selectedMood === mood.value
                      ? "border-primary bg-primary/5 scale-105"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Icon className={`h-8 w-8 mb-2 ${mood.color}`} />
                  <span className="text-xs font-medium text-center">{mood.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Stress Level: {stressLevel[0]}/5</Label>
          <Slider
            value={stressLevel}
            onValueChange={setStressLevel}
            min={1}
            max={5}
            step={1}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="note">Notes (Optional)</Label>
          <Textarea
            id="note"
            placeholder="What's on your mind today?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
          />
        </div>

        <Button onClick={handleSubmit} className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Log My Mood
        </Button>
      </CardContent>
    </Card>
  );
};
