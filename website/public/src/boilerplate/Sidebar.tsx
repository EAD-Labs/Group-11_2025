import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import {
  LayoutDashboard,
  LineChart,
  AlertTriangle,
  MessageSquare,
  Users,
} from "lucide-react";
import "./Sidebar.css";

export default function Sidebar() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { isExpanded } = useAppSelector((state) => state.sidebar);
  const location = useLocation();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="sidebar-content">
        <div className="sidebar-menu">
          <Link
            to="/home"
            className={`sidebar-link ${
              location.pathname === "/home" ? "active" : ""
            }`}
            title="Home"
          >
            <div className="sidebar-icon">
              <LayoutDashboard size={20} />
            </div>
            {isExpanded && <span>Home</span>}
          </Link>
          <Link
            to="/studyanalytics"
            className={`sidebar-link ${
              location.pathname === "/studyanalytics" ? "active" : ""
            }`}
            title="Study Analytics"
          >
            <div className="sidebar-icon">
              <LineChart size={20} />
            </div>
            {isExpanded && <span>Study Analytics</span>}
          </Link>
          <Link
            to="/study-rooms"
            className={`sidebar-link ${
              location.pathname === "/study-rooms" ? "active" : ""
            }`}
            title="Study Rooms"
          >
            <div className="sidebar-icon">
              <Users size={20} />
            </div>
            {isExpanded && <span>Study Rooms</span>}
          </Link>
        </div>

        <div className="sidebar-footer">
          <Link
            to="/feedback"
            className={`sidebar-link ${
              location.pathname === "/feedback" ? "active" : ""
            }`}
            title="Feedback"
          >
            <div className="sidebar-icon">
              <MessageSquare size={20} />
            </div>
            {isExpanded && <span>Feedback</span>}
          </Link>
          <Link
            to="/report"
            className={`sidebar-link ${
              location.pathname === "/report" ? "active" : ""
            }`}
            title="Report a Bug"
          >
            <div className="sidebar-icon">
              <AlertTriangle size={20} />
            </div>
            {isExpanded && <span>Report Bug</span>}
          </Link>
        </div>
      </div>
    </div>
  );
}
