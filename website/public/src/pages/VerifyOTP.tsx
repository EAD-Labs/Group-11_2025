import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/slices/authSlice";
import PasswordInput from "../components/PasswordInput";
import "../pages/login.css";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState(20); // 20 seconds
  const [canResend, setCanResend] = useState(false);

  const email = location.state?.email;
  const fromSignup = location.state?.fromSignup;
  const fromForgotPassword = location.state?.fromForgotPassword;

  useEffect(() => {
    if (!email) {
      if (redirectTo) {
        navigate("/login?redirectTo=" + encodeURIComponent(redirectTo));
      } else {
        navigate("/login");
      }
      return;
    }

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "otp") {
      // Only allow numbers and limit to 6 digits
      const numericValue = value.replace(/\D/g, "").slice(0, 6);
      setOtp(numericValue);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!otp) {
      newErrors.otp = "OTP is required";
    } else if (otp.length !== 6) {
      newErrors.otp = "OTP must be 6 digits";
    }

    if (fromForgotPassword) {
      if (!newPassword) {
        newErrors.newPassword = "New password is required";
      } else if (newPassword.length < 6) {
        newErrors.newPassword = "Password must be at least 6 characters";
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (newPassword !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      let endpoint = "/auth/verify-otp";
      let body: any = { otp, email };

      if (fromForgotPassword) {
        endpoint = "/auth/verify-forgot-password-otp";
        body = { otp, email, newPassword };
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (fromSignup) {
          // For signup, fetch user data after successful OTP verification
          try {
            const userResponse = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/auth/authenticate`,
              {
                credentials: "include",
              }
            );

            if (userResponse.ok) {
              const userData = await userResponse.json();
              dispatch(setUser(userData.user));
              if (redirectTo) {
                navigate(
                  "/thankyou?redirectTo=" + encodeURIComponent(redirectTo)
                );
              } else {
                navigate("/thankyou");
              }
            } else {
              // Fallback: navigate to login
              if (redirectTo) {
                navigate(
                  "/login?redirectTo=" + encodeURIComponent(redirectTo),
                  {
                    state: {
                      message: "Account verified successfully! Please login.",
                    },
                  }
                );
              } else {
                navigate("/login", {
                  state: {
                    message: "Account verified successfully! Please login.",
                  },
                });
              }
            }
          } catch (error) {
            console.error("Failed to fetch user data:", error);
            navigate("/login", {
              state: {
                message: "Account verified successfully! Please login.",
              },
            });
          }
        } else if (fromForgotPassword) {
          // Navigate to login with success message
          navigate("/login", {
            state: {
              message:
                "Password updated successfully! Please login with your new password.",
            },
          });
        }
      } else {
        setErrors({ general: data.message || "OTP verification failed" });
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setIsLoading(true);
    try {
      const endpoint = fromForgotPassword
        ? "/auth/forgot-password"
        : "/auth/resend-otp";
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setTimeLeft(20); // Reset timer to 20 seconds
        setCanResend(false);
        setErrors({});
      } else {
        setErrors({ general: data.message || "Failed to resend OTP" });
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    if (redirectTo) {
      navigate("/login?redirectTo=" + encodeURIComponent(redirectTo));
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Verify OTP</h1>
          <p>
            {fromSignup
              ? "Enter the 6-digit code sent to your email to verify your account"
              : fromForgotPassword
              ? "Enter the 6-digit code sent to your email to reset your password"
              : "Enter the 6-digit code sent to your email"}
          </p>
        </div>

        <form onSubmit={handleVerifyOTP} className="login-form">
          <div className="form-group">
            <label htmlFor="otp">Verification Code</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleInputChange}
              placeholder="Enter 6-digit code"
              className={errors.otp ? "error" : ""}
              disabled={isLoading}
              maxLength={6}
            />
            {errors.otp && <span className="error-message">{errors.otp}</span>}
          </div>

          {fromForgotPassword && (
            <>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <PasswordInput
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                  className={errors.newPassword ? "error" : ""}
                  disabled={isLoading}
                  error={errors.newPassword}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <PasswordInput
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                  className={errors.confirmPassword ? "error" : ""}
                  disabled={isLoading}
                  error={errors.confirmPassword}
                />
              </div>
            </>
          )}

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
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="otp-timer">
          <p>
            {timeLeft > 0 ? (
              <>
                Resend available in: <strong>{formatTime(timeLeft)}</strong>
              </>
            ) : (
              <>You can now resend the code</>
            )}
          </p>

          <button
            onClick={handleResendOTP}
            className="resend-otp-btn"
            disabled={!canResend || isLoading}
          >
            {canResend
              ? "Resend Code"
              : `Resend Code (${formatTime(timeLeft)})`}
          </button>
        </div>

        <div className="signup-prompt">
          <p>
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
