import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/login.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setEmailSent(true);
        // Navigate to OTP verification page for password reset
        navigate("/verify-otp", {
          state: {
            email: email,
            fromForgotPassword: true,
          },
        });
      } else {
        setErrors({ general: data.message || "Failed to send reset email" });
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Reset Password</h1>
          <p>Enter your email to receive a password reset code</p>
        </div>

        {!emailSent ? (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className={errors.email ? "error" : ""}
                disabled={isLoading}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            {errors.general && (
              <div
                className="error-message"
                style={{ textAlign: "center", marginBottom: "1rem" }}
              >
                {errors.general}
              </div>
            )}

            <button
              type="submit"
              className="email-login-btn"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Check Your Email</h3>
            <p>
              We've sent a password reset code to <strong>{email}</strong>
            </p>
            <p>Please check your inbox and follow the instructions.</p>
          </div>
        )}

        <div className="signup-prompt">
          <p>
            Remember your password?{" "}
            <button
              onClick={handleBackToLogin}
              className="signup-link"
              disabled={isLoading}
            >
              Back to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
