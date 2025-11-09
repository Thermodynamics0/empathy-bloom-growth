import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Check, Loader2 } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  completed?: boolean;
}

export const BloomChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get all challenges
      const { data: allChallenges, error: challengesError } = await supabase
        .from("challenges")
        .select("*");

      if (challengesError) throw challengesError;

      // Get today's completed challenges
      const today = new Date().toISOString().split("T")[0];
      const { data: userChallenges, error: userError } = await supabase
        .from("user_challenges")
        .select("challenge_id, completed")
        .eq("user_id", user.id)
        .gte("created_at", today);

      if (userError) throw userError;

      const completedIds = new Set(
        userChallenges?.filter((uc) => uc.completed).map((uc) => uc.challenge_id) || []
      );

      const challengesWithStatus = allChallenges?.map((c) => ({
        ...c,
        completed: completedIds.has(c.id),
      })) || [];

      setChallenges(challengesWithStatus);
    } catch (error: any) {
      toast({
        title: "Error loading challenges",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (challengeId: string) => {
    setCompletingId(challengeId);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("user_challenges").insert({
        user_id: user.id,
        challenge_id: challengeId,
        completed: true,
        completed_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Challenge completed! 🌟",
        description: "Keep up the great work on your wellness journey.",
      });

      loadChallenges();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setCompletingId(null);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-2xl">Daily Bloom Challenges</CardTitle>
        <CardDescription>
          Small steps towards greater well-being
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {challenges.map((challenge) => (
            <Card
              key={challenge.id}
              className={`border-2 transition-all ${
                challenge.completed
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-base">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {challenge.description}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {challenge.category.replace("_", " ")}
                  </Badge>
                </div>
                {challenge.completed ? (
                  <div className="flex items-center gap-2 text-primary">
                    <Check className="h-4 w-4" />
                    <span className="text-sm font-medium">Completed!</span>
                  </div>
                ) : (
                  <Button
                    onClick={() => handleComplete(challenge.id)}
                    disabled={completingId === challenge.id}
                    size="sm"
                    className="w-full"
                  >
                    {completingId === challenge.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Mark Complete"
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
