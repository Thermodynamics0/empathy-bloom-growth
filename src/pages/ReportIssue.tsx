import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ReportIssue = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send to a backend
    toast({
      title: "Issue Reported",
      description: "Thank you for your feedback! We'll look into this soon. 🌸",
    });
    
    // Reset form
    setSubject("");
    setCategory("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bloom-50 via-background to-calm-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-8 shadow-elegant">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-bloom bg-clip-text text-transparent">
            Report an Issue
          </h1>
          <p className="text-muted-foreground mb-6">
            Let us know about any bugs, problems, or suggestions you have. We're here to help! 🌸
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select issue category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="account">Account Issue</SelectItem>
                  <SelectItem value="data">Data Problem</SelectItem>
                  <SelectItem value="chat">Chat/AI Issue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide as much detail as possible about the issue..."
                className="min-h-[200px]"
                required
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Submit Report
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
            </div>
          </form>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">Need Immediate Help?</h3>
            <p className="text-sm text-muted-foreground">
              If you're experiencing a mental health crisis, please contact emergency services or a crisis helpline immediately. BloomMind is not a substitute for professional medical care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
