import React from "react";
import { CalendarDays, Clock, AlertCircle, DollarSign } from "lucide-react";

const RefundPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground mb-12">
            At GoQualify, we strive to provide high-quality learning tools and
            services. To ensure clarity and fairness, our refund policy applies
            consistently across all subscription plans.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Monthly Subscription */}
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Monthly Subscription</h2>
              </div>
              <ul className="space-y-4 text-muted-foreground">
                <li>
                  Full refund if requested within 7 calendar days of purchase or
                  renewal.
                </li>
                <li>
                  After 7 days, non-refundable with access until billing cycle
                  end.
                </li>
              </ul>
            </div>

            {/* Yearly Subscription */}
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CalendarDays className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Yearly Subscription</h2>
              </div>
              <ul className="space-y-4 text-muted-foreground">
                <li>
                  Full refund if requested within 7 calendar days of purchase or
                  renewal.
                </li>
                <li>
                  After 7 days, non-refundable with access until term end.
                </li>
              </ul>
            </div>

            {/* Lifetime Subscription */}
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Pay As You Go</h2>
              </div>
              <ul className="space-y-4 text-muted-foreground">
                <li>You can not get a refund for pay as you go purchases.</li>
              </ul>
            </div>
          </div>

          {/* General Terms & Conditions */}
          <div className="bg-gradient-card rounded-xl p-8 border border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">General Terms & Conditions</h2>
            </div>

            <div className="space-y-6">
              <p className="text-muted-foreground">
                Refund requests must be submitted in writing to{" "}
                <a
                  href="mailto:query@rewision.io"
                  className="text-primary hover:underline"
                >
                  query@rewision.io
                </a>{" "}
                with the purchase details.
              </p>

              <p className="text-muted-foreground">
                Approved refunds will be processed to the original payment
                method within 5-10 business days.
              </p>

              <p className="text-muted-foreground">
                Refunds are granted only once per customer per subscription type
                to prevent misuse.
              </p>

              <div className="mt-6">
                <p className="font-semibold mb-4">
                  Rewision reserves the right to deny a refund in cases of:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Violation of our Terms of Service or Fair Use Policy,</li>
                  <li>Fraudulent or abusive refund claims.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
