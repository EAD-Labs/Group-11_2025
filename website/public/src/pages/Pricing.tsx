import { Check } from "lucide-react";
import "./Pricing.css";

export default function Pricing() {
  const plans = [
    {
      name: "Monthly",
      credits: "400 Credits",
      price: 10,
      period: "month",
      description: "10 credits = 1 hour video quiz",
      features: [
        "400 Credits Monthly",
        "Real-Time Embedded Quizzes",
        "Smart Study Analytics",
        "Study With Friends",
        "Progress Tracking",
        "Unlimited Video Learning",
        "Email Support",
      ],
      popular: false,
    },
    {
      name: "Annual",
      credits: "Save $20",
      price: 100,
      period: "year",
      monthlyEquivalent: 8.33,
      description: "10 credits = 1 hour video quiz",
      features: [
        "400 Credits Monthly",
        "Real-Time Embedded Quizzes",
        "Smart Study Analytics",
        "Study With Friends",
        "Progress Tracking",
        "Unlimited Video Learning",
        "Priority Support",
        "Advanced AI Insights",
        "Learning Certificates",
        "Export Progress Reports",
      ],
      popular: true,
    },
    {
      name: "Pay As You Go",
      credits: "Buy as needed",
      price: 0.05,
      period: "credit",
      description: "No monthly commitment",
      features: [
        "Buy Credits Anytime",
        "No Monthly Commitment",
        "Real-Time Embedded Quizzes",
        "Smart Study Analytics",
        "Basic Support",
        "Pay Only What You Use",
      ],
      popular: false,
    },
  ];

  const formatPrice = (price: number) => {
    return `$${price}`;
  };

  return (
    <div className="pricing-container">
      <div className="pricing-header">
        <h1 className="pricing-title">Choose Your Plan</h1>
        <p className="pricing-subtitle">
          Flexible pricing options to fit your learning needs
        </p>
      </div>

      {/* Main Plans */}
      <div className="plans-grid">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`plan-card ${plan.popular ? "popular" : ""}`}
          >
            {plan.popular && <div className="popular-badge">Save $20</div>}

            <div className="plan-header">
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-credits">{plan.credits}</div>
            </div>

            <div className="plan-pricing">
              <div className="price">
                {formatPrice(plan.price)}
                <span className="price-period">/{plan.period}</span>
              </div>
              {plan.monthlyEquivalent && (
                <div className="monthly-equivalent">
                  That's just ${plan.monthlyEquivalent} per month
                </div>
              )}
              <div className="credit-conversion">{plan.description}</div>
            </div>

            <div className="plan-features">
              <ul>
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <Check size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`plan-button ${
                plan.popular ? "primary" : "secondary"
              }`}
            >
              {plan.name === "Pay As You Go"
                ? "Get Started"
                : `Choose ${plan.name}`}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>How do credits work?</h4>
            <p>
              Each credit represents 6 minutes of video content. 10 credits = 1
              hour of video quiz generation. Credits are used when you generate
              quizzes from video content.
            </p>
          </div>
          <div className="faq-item">
            <h4>Can I change plans anytime?</h4>
            <p>
              Yes! You can upgrade, downgrade, or switch between plans at any
              time. Changes take effect immediately and unused credits are
              prorated.
            </p>
          </div>
          <div className="faq-item">
            <h4>What payment methods do you accept?</h4>
            <p>We accept all major credit and debit cards.</p>
          </div>
          <div className="faq-item">
            <h4>Do credits expire?</h4>
            <p>
              Monthly and Annual plan credits reset each billing cycle. Pay As
              You Go credits never expire, so you can use them whenever you need
              them.
            </p>
          </div>
          <div className="faq-item">
            <h4>Is there a free trial?</h4>
            <p>
              Yes! All paid plans come with a 14-day free trial. No credit card
              required to start, and you get 50 free credits to test the
              platform.
            </p>
          </div>
          <div className="faq-item">
            <h4>Can I get a refund?</h4>
            <p>
              Yes! We offer a 7-day money-back guarantee for paid plans. Pay As
              You Go credits are non-refundable.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="pricing-cta">
        <h2>Ready to boost your learning?</h2>
        <p>
          Join thousands of learners who are already improving their study
          habits with AI-powered quizzes
        </p>
        <div className="cta-buttons">
          <button className="cta-primary">Start Free Trial</button>
          <button className="cta-secondary">Contact Sales</button>
        </div>
      </div>
    </div>
  );
}
