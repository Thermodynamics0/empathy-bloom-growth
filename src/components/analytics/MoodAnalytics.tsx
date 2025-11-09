import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface MoodData {
  date: string;
  score: number;
  stress: number;
}

const moodToScore: Record<string, number> = {
  very_sad: 1,
  sad: 2,
  neutral: 3,
  happy: 4,
  very_happy: 5,
};

export const MoodAnalytics = () => {
  const [data, setData] = useState<MoodData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ avgMood: 0, avgStress: 0, bestDay: "" });
  const { toast } = useToast();

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get last 7 days of mood entries
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data: entries, error } = await supabase
        .from("mood_entries")
        .select("*")
        .eq("user_id", user.id)
        .gte("created_at", sevenDaysAgo.toISOString())
        .order("created_at", { ascending: true });

      if (error) throw error;

      // Group by date and calculate averages
      const groupedData: Record<string, { scores: number[]; stress: number[] }> = {};
      
      entries?.forEach((entry) => {
        const date = new Date(entry.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        if (!groupedData[date]) {
          groupedData[date] = { scores: [], stress: [] };
        }
        groupedData[date].scores.push(moodToScore[entry.mood]);
        groupedData[date].stress.push(entry.stress_level);
      });

      const chartData: MoodData[] = Object.entries(groupedData).map(([date, values]) => ({
        date,
        score: values.scores.reduce((a, b) => a + b, 0) / values.scores.length,
        stress: values.stress.reduce((a, b) => a + b, 0) / values.stress.length,
      }));

      setData(chartData);

      // Calculate stats
      if (chartData.length > 0) {
        const avgMood = chartData.reduce((sum, d) => sum + d.score, 0) / chartData.length;
        const avgStress = chartData.reduce((sum, d) => sum + d.stress, 0) / chartData.length;
        const bestDay = chartData.reduce((best, current) =>
          current.score > best.score ? current : best
        ).date;

        setStats({ avgMood, avgStress, bestDay });
      }
    } catch (error: any) {
      toast({
        title: "Error loading analytics",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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

  if (data.length === 0) {
    return (
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-2xl">Your Emotional Journey</CardTitle>
          <CardDescription>Track your mood patterns over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <p>Start logging your moods to see your wellness trends</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-2xl">Your Emotional Journey</CardTitle>
        <CardDescription>Your mood and stress patterns over the past week</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">
                {stats.avgMood.toFixed(1)}/5
              </div>
              <p className="text-sm text-muted-foreground">Average Mood</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent">
                {stats.avgStress.toFixed(1)}/5
              </div>
              <p className="text-sm text-muted-foreground">Average Stress</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary-light flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {stats.bestDay}
              </div>
              <p className="text-sm text-muted-foreground">Best Day</p>
            </CardContent>
          </Card>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--foreground))"
                fontSize={12}
              />
              <YAxis stroke="hsl(var(--foreground))" fontSize={12} domain={[0, 5]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                name="Mood"
                dot={{ fill: "hsl(var(--primary))" }}
              />
              <Line
                type="monotone"
                dataKey="stress"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                name="Stress"
                dot={{ fill: "hsl(var(--accent))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
