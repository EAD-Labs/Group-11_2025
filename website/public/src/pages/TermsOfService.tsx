import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">
          Effective Date: April 1, 2025
        </p>

        <div className="prose prose-lg max-w-none">
          <p className="mb-8">
            Welcome to Rewision. These Terms of Service ("Terms") govern your
            access to and use of our website, services, and products
            (collectively, the "Service"). By accessing or using Rewision, you
            agree to comply with these Terms. If you do not agree, you must not
            use the Service.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. User Access</h2>
            <p>
              Rewision is available to all individuals without age restrictions.
            </p>
            <p>
              If you are under the legal age of majority in your jurisdiction,
              you should use the Service under the guidance or supervision of a
              parent, guardian, or teacher.
            </p>
            <p>
              By using Rewision, you agree that you (or your guardian, where
              applicable) are responsible for compliance with these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account and login credentials.
            </p>
            <p>
              You agree to notify us immediately of any unauthorized access or
              breach of security.
            </p>
            <p>
              Rewision is not liable for any loss or damage resulting from your
              failure to secure your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              3. Subscriptions & Payments
            </h2>
            <p>
              Rewision offers Monthly, Yearly, and Lifetime subscription plans.
            </p>
            <p>
              By purchasing a subscription, you authorize us (or our third-party
              payment processors) to charge your chosen payment method.
            </p>
            <p>
              Prices are subject to change, but any changes will not affect
              active subscriptions until renewal.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Refund Policy</h2>
            <p>Refunds are governed strictly by our Refund Policy.</p>
            <p>
              All users are advised to review the Refund Policy before making a
              purchase.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Copy, distribute, or resell any part of the Service without
                written permission.
              </li>
              <li>
                Use the Service for unlawful, fraudulent, or harmful purposes.
              </li>
              <li>
                Attempt to interfere with the proper functioning of the Service
                (including hacking, scraping, or reverse-engineering).
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              6. Intellectual Property
            </h2>
            <p>
              All content, features, and materials provided by Rewision
              (including text, software, graphics, logos, and interactive
              elements) are the exclusive property of Rewision.
            </p>
            <p>
              You are granted a limited, non-transferable, non-exclusive license
              to access and use the Service for personal, non-commercial use.
            </p>
            <p>
              Any unauthorized use may result in termination of your account and
              legal action.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Termination</h2>
            <p>
              We may suspend or terminate your access if you violate these
              Terms, misuse the Service, or engage in fraudulent activity.
            </p>
            <p>
              Upon termination, your right to use the Service will cease
              immediately, without refund, except as provided in the Refund
              Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Disclaimers</h2>
            <p>
              The Service is provided on an "as is" and "as available" basis
              without warranties of any kind, whether express or implied.
            </p>
            <p>
              Rewision does not guarantee uninterrupted or error-free service.
            </p>
            <p>
              Educational content is provided for learning purposes only; we
              make no guarantees of academic or professional outcomes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              9. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Rewision, its founders,
              employees, and affiliates shall not be held liable for any
              indirect, incidental, or consequential damages arising from your
              use of the Service.
            </p>
            <p>
              Our total liability for any claim shall not exceed the amount you
              paid for the Service in the past 12 months.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              10. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms are governed by the laws of India, without regard to
              conflict-of-law principles.
            </p>
            <p>
              Any disputes shall be subject to the exclusive jurisdiction of the
              courts located in Mumbai, Maharashtra, India.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">11. Modifications</h2>
            <p>
              We reserve the right to update or modify these Terms of Service at
              any time.
            </p>
            <p>
              Continued use of the Service after updates constitutes your
              acceptance of the revised Terms of Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
            <p>
              For questions regarding these Terms of Service, please contact us
              at:{" "}
              <a
                href="mailto:support@rewision.io"
                className="text-primary hover:underline"
              >
                support@rewision.io
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
