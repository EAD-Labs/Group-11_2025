import { useNavigate, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { toggleSidebar } from "../store/slices/sidebarSlice";
import { Menu, X, Target } from "lucide-react";
import { checkAuth } from "../store/slices/authSlice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  );
  const { isExpanded } = useAppSelector((state) => state.sidebar);
  const location = useLocation();
  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return null;
  }

  if (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/verify-otp"
  ) {
    return null;
  } else {
    if (!isAuthenticated) {
      return (
        <nav className="navbar-not-logged-in">
          <div className="navbar-brand">
            <Link to="/" className="navbar-logo">
              Rewision
            </Link>
          </div>
          <div className="navbar-menu">
            <Link to="/blog" className="navbar-link">
              Blog
            </Link>
            <Link to="/pricing" className="navbar-link">
              Pricing
            </Link>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/signup" className="navbar-button-primary">
              Get Rewision for free
            </Link>
            <Link to="/contact" className="navbar-button-secondary">
              Contact Us
            </Link>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="navbar">
          <div className="navbar-brand">
            {isAuthenticated && (
              <button
                className="sidebar-toggle"
                onClick={() => dispatch(toggleSidebar())}
                aria-label={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
              >
                {isExpanded ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
            <Link to="/home" className="navbar-logo">
              Rewision
            </Link>
          </div>

          <div className="navbar-menu">
            {isAuthenticated ? (
              <>
                <Link
                  to="/weekly-goals"
                  className={`navbar-link ${
                    location.pathname === "/weekly-goals" ? "active" : ""
                  }`}
                  title="Weekly Goals"
                >
                  <Target size={20} />
                  <span>Goals</span>
                </Link>
                <div className="navbar-user">
                  <Link to="/profile" className="user-name">
                    Welcome, {user?.name}
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to="/home" className="navbar-link">
                  Home
                </Link>
                <button onClick={handleLogin} className="login-btn">
                  Login
                </button>
              </>
            )}
          </div>
        </nav>
      );
    }
  }
}
