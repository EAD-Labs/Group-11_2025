import { useState, useEffect } from "react";
import {
  useNavigate,
  Link,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/slices/authSlice";
import PasswordInput from "../components/PasswordInput";
import "./login.css";

export default function Login() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message from location state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    if (!formData.username) {
      newErrors.username = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
      newErrors.username = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Login successful, update Redux store and navigate to home
        dispatch(setUser(data.user));
        if (redirectTo) {
          navigate(decodeURIComponent(redirectTo));
        } else {
          navigate("/home");
        }
      } else {
        setErrors({ general: data.message || "Login failed" });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    if (redirectTo) {
      window.location.href = `${
        import.meta.env.VITE_BACKEND_URL
      }/auth/google/?redirectTo=${encodeURIComponent(redirectTo)}`;
    } else {
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
    }
  };

  const handleSignup = () => {
    if (redirectTo) {
      navigate("/signup?redirectTo=" + encodeURIComponent(redirectTo));
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue your learning journey</p>
        </div>

        {successMessage && (
          <div className="success-message" style={{ marginBottom: "2rem" }}>
            <div
              className="success-icon"
              style={{ width: "40px", height: "40px", fontSize: "1.5rem" }}
            >
              ✓
            </div>
            <p
              style={{
                margin: "0.5rem 0 0 0",
                color: "#34A853",
                fontWeight: "600",
              }}
            >
              {successMessage}
            </p>
          </div>
        )}

        {/* Google OAuth Button */}
        <button
          className="google-login-btn"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <>
            <svg className="google-icon" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </>
        </button>

        <div className="divider">
          <span>or</span>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={errors.username ? "error" : ""}
              disabled={isLoading}
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <PasswordInput
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={errors.password ? "error" : ""}
              disabled={isLoading}
              error={errors.password}
            />
          </div>

          <div className="form-options">
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
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
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="signup-prompt">
          <p>
            Don't have an account?{" "}
            <button
              onClick={handleSignup}
              className="signup-link"
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
