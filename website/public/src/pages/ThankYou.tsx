import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import "./ThankYou.css";

export default function ThankYou() {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const [referralCode, setReferralCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchReferralCodefromCookies = async () => {
    const referralCode = document.cookie
      .split("; ")
      .find((row) => row.startsWith("referralCode="))
      ?.split("=")[1];
    setReferralCode(referralCode || "");
  };
  useEffect(() => {
    fetchReferralCodefromCookies();
  }, []);

  const handleReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralCode.trim()) {
      setError("Please enter a referral code");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/referral`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ referralCode }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to validate referral code");
      }

      setSuccess("Referral code applied successfully!");
      setTimeout(() => {
        if (redirectTo) {
          navigate(decodeURIComponent(redirectTo));
        } else {
          navigate("/home");
        }
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to validate referral code"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
        <div className="success-circle">✓</div>
        <header className="thankyou-header">
          <h1>Thank You{user?.name ? `, ${user.name}` : ""}!</h1>
          <p>Your account has been successfully created</p>
        </header>

        <section className="thankyou-content">
          <p>Welcome to Rewision! We're excited to have you on board.</p>

          <form onSubmit={handleReferralSubmit} className="referral-form">
            <div className="form-group">
              <input
                type="text"
                id="referralCode"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Enter referral code (optional)"
                disabled={isSubmitting}
                className="referral-input"
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="thankyou-actions">
              {referralCode.trim() ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="start-btn"
                >
                  {isSubmitting ? "Validating..." : "Apply Code"}
                </button>
              ) : (
                <Link
                  to={redirectTo ? decodeURIComponent(redirectTo) : "/home"}
                  className="start-btn"
                >
                  Get Started
                </Link>
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
