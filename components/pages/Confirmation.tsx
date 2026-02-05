import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const Confirmation = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          {/* Success Card */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
            {/* Header */}
            <div className="gradient-teal py-12 px-6 text-primary-foreground">
              <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8" />
              </div>
              <h1 className="text-2xl font-display font-semibold mb-2">
                Booking Confirmed!
              </h1>
              <p className="opacity-80">Your car is reserved.</p>
            </div>

            {/* Details */}
            <div className="p-6">
              <div className="text-sm text-muted-foreground mb-1">
                Booking Reference
              </div>
              <div className="text-xl font-semibold mb-6">#YU-9942-XJ</div>

              <div className="border border-border rounded-xl p-4 mb-6">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Vehicle</span>
                  <span className="font-medium">Premium SUV</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Dates</span>
                  <span className="font-medium">12 Aug - 15 Aug</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Total Paid</span>
                  <span className="font-medium text-primary">€290.40</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full gradient-teal text-primary-foreground">
                  Manage Booking
                </Button>
                <Button variant="outline" className="w-full">
                  Download Confirmation
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mt-6">
                A confirmation email has been sent to your email address.
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            className="mt-8"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Confirmation;
