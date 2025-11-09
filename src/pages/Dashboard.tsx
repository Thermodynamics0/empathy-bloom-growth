import { Navigation } from "@/components/layout/Navigation";
import { MoodJournal } from "@/components/mood/MoodJournal";
import { EmpathyChat } from "@/components/chat/EmpathyChat";
import { BloomChallenges } from "@/components/challenges/BloomChallenges";
import { MoodAnalytics } from "@/components/analytics/MoodAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Bot, Trophy, TrendingUp } from "lucide-react";
import heroBloom from "@/assets/hero-bloom.jpg";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={heroBloom}
          alt="Blooming flowers representing growth and wellness"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-2 drop-shadow-lg">
              Your Wellness Journey
            </h2>
            <p className="text-lg drop-shadow-md">
              Nurture your mind, one day at a time
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="journal" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="journal" className="gap-2">
              <Heart className="h-4 w-4" />
              Journal
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <Bot className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="challenges" className="gap-2">
              <Trophy className="h-4 w-4" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="journal" className="space-y-6">
            <MoodJournal />
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <EmpathyChat />
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <BloomChallenges />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <MoodAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
