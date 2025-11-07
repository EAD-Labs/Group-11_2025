import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">
          Effective Date: April 1, 2025
        </p>

        <div className="prose prose-lg max-w-none">
          <p className="mb-8">
            Rewision ("we," "our," or "us") values your privacy and is committed
            to protecting your personal information. This Privacy Policy
            explains how we collect, use, disclose, and safeguard information
            when you use our website, Chrome extension, and related services
            (collectively, the "Service").
          </p>

          <p className="mb-8">
            By using Rewision, you agree to the practices described in this
            Privacy Policy.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              1. Information We Collect
            </h2>
            <p>We may collect the following types of information:</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">
              Personal Information
            </h3>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Name, email address, and account details provided during
                registration.
              </li>
              <li>
                Payment information when you purchase a subscription (processed
                securely by third-party payment providers; we do not store card
                details).
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Usage Data</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Interactions with quizzes, study analytics, and learning
                activity.
              </li>
              <li>
                Device type, browser, IP address, and access times for security
                and analytics.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">
              Cookies & Tracking Technologies
            </h3>
            <p>
              Cookies and similar technologies may be used to improve
              functionality, remember preferences, and analyze user activity.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              2. How We Use Your Information
            </h2>
            <p>We use the information collected to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide, maintain, and improve our Service.</li>
              <li>Personalize your learning experience and track progress.</li>
              <li>Process payments and manage subscriptions.</li>
              <li>Communicate important updates, offers, and support.</li>
              <li>
                Ensure security, prevent fraud, and enforce our Terms &
                Conditions.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              3. Sharing of Information
            </h2>
            <p>
              We do not sell or rent your personal information. We may share
              data only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Service Providers:</strong> With trusted third-party
                vendors (e.g., payment processors, hosting providers) who help
                us operate our Service.
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required to comply
                with laws, regulations, or valid legal requests.
              </li>
              <li>
                <strong>Business Transfers:</strong> In case of a merger,
                acquisition, or sale of assets, your information may be
                transferred as part of the business.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Data Retention</h2>
            <p>
              Personal data is retained only as long as necessary to provide our
              Service, comply with legal obligations, and resolve disputes.
            </p>
            <p>
              You may request deletion of your account and associated data at
              any time by contacting us at{" "}
              <a
                href="mailto:support@rewision.io"
                className="text-primary hover:underline"
              >
                support@rewision.io
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your data from unauthorized access, alteration,
              disclosure, or destruction.
            </p>
            <p>
              However, no online service can guarantee absolute security, and
              you use Rewision at your own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access, correct, or delete your personal data.</li>
              <li>Withdraw consent for data processing.</li>
              <li>Opt out of marketing communications at any time.</li>
            </ul>
            <p>
              To exercise these rights, contact us at{" "}
              <a
                href="mailto:support@rewision.io"
                className="text-primary hover:underline"
              >
                support@rewision.io
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Children's Privacy</h2>
            <p>
              Rewision is available to users of all ages, including students. If
              you are under the legal age of majority in your jurisdiction, you
              should use the Service under the guidance of a parent, guardian,
              or teacher. We do not knowingly collect personal information from
              children without appropriate consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. International Users</h2>
            <p>
              If you are accessing Rewision from outside India, note that your
              information may be processed and stored in India and other
              countries where our service providers operate.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              9. Changes to this Privacy Policy
            </h2>
            <p>
              We reserve the right to update this Privacy Policy from time to
              time. Any changes will be posted on this page with an updated
              effective date. Continued use of the Service constitutes
              acceptance of the revised policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy,
              please contact us at:{" "}
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

export default PrivacyPolicy;
