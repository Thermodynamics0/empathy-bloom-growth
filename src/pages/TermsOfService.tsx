import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
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
            Terms of Service
          </h1>
          
          <div className="space-y-6 text-foreground/80">
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using BloomMind, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">2. Service Description</h2>
              <p className="mb-4">
                BloomMind is a wellness application that provides mood tracking, AI-powered empathy chat, self-growth challenges, and personal analytics. Our service is designed to support mental and emotional well-being but is not a substitute for professional medical advice, diagnosis, or treatment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">3. User Accounts</h2>
              <p className="mb-4">
                You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Providing accurate and current information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">4. Acceptable Use</h2>
              <p className="mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the service for any illegal purposes</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the service</li>
                <li>Share inappropriate or harmful content</li>
                <li>Impersonate others or misrepresent your affiliation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">5. Medical Disclaimer</h2>
              <p className="mb-4">
                BloomMind is not a medical service and does not provide medical advice. Our AI chat companion is for emotional support only and should not replace professional mental health care. If you are experiencing a mental health crisis, please contact emergency services or a crisis helpline immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">6. Intellectual Property</h2>
              <p className="mb-4">
                All content, features, and functionality of BloomMind are owned by us and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, or distribute our content without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">7. User Content</h2>
              <p className="mb-4">
                You retain ownership of the content you create (mood entries, journal reflections, etc.). By using BloomMind, you grant us a license to use this content solely to provide and improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">8. Service Modifications</h2>
              <p className="mb-4">
                We reserve the right to modify, suspend, or discontinue any part of the service at any time. We will provide reasonable notice for significant changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">9. Limitation of Liability</h2>
              <p className="mb-4">
                BloomMind is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service, including but not limited to direct, indirect, incidental, or consequential damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">10. Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your account at any time for violations of these terms. You may delete your account at any time through your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">11. Governing Law</h2>
              <p className="mb-4">
                These terms are governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">12. Contact Information</h2>
              <p>
                For questions about these Terms of Service, please use the "Report an Issue" feature in your account menu.
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

export default TermsOfService;
