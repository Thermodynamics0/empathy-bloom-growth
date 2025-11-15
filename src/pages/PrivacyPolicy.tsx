import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-bloom-50 via-background to-calm-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-8 shadow-elegant">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-bloom bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <div className="space-y-6 text-foreground/80">
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">1. Information We Collect</h2>
              <p className="mb-4">
                BloomMind collects personal information that you provide when creating an account, including your email address and display name. We also collect mood entries, journal reflections, challenge completions, and chat conversations to provide our wellness services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">2. How We Use Your Information</h2>
              <p className="mb-4">
                Your information is used to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide personalized mood tracking and analytics</li>
                <li>Power our AI empathy chat companion</li>
                <li>Track your progress in wellness challenges</li>
                <li>Improve our services and user experience</li>
                <li>Send important account and service notifications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">3. Data Security</h2>
              <p className="mb-4">
                We implement industry-standard security measures to protect your personal information. Your data is encrypted in transit and at rest. We use secure authentication methods and regularly update our security practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">4. Data Sharing</h2>
              <p className="mb-4">
                We do not sell your personal information. We only share data with trusted service providers who help us operate BloomMind, and they are bound by confidentiality agreements. Your mood entries and chat conversations remain private and are never shared with third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">5. Your Rights</h2>
              <p className="mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your account and data</li>
                <li>Export your data</li>
                <li>Opt-out of certain data collection</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">6. Cookies and Tracking</h2>
              <p className="mb-4">
                We use essential cookies to maintain your session and provide core functionality. We do not use third-party tracking cookies for advertising purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">7. Children's Privacy</h2>
              <p className="mb-4">
                BloomMind is not intended for users under 13 years of age. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">8. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any significant changes via email or through the app.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">9. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us through the "Report an Issue" feature in your account menu.
              </p>
            </section>

            <p className="text-sm text-muted-foreground mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
