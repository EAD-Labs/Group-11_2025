import React, { useEffect, useState } from "react";
import { Calendar, BarChart3 } from "lucide-react";
import StudyGraph from "../components/StudyGraph";
import { Analytics } from "../components/Analytics";
import "./study-analytics.css";

export interface ActivityType {
  _id: string;
  type: "video_viewing" | "quiz_taking";
  startTime: number;
  endTime: number;
  duration: number;
  questionId: string;
  videoId: string;
}

export interface StudyAnalyticsType {
  _id: string;
  videoId: string;
  userId: string;
  title: string;
  startTime: number;
  endTime: number;
  totalDuration: number;
  quizProgressId: string;
  activities: ActivityType[];
}

const StudyAnalytics = (): React.JSX.Element => {
  const backendUrl: string = import.meta.env.VITE_BACKEND_URL;
  const [studyAnalytics, setStudyAnalytics] = useState<StudyAnalyticsType[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("study-calendar");

  useEffect((): void => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async (): Promise<void> => {
    await fetchStudyAnalytics();
  };

  const fetchStudyAnalytics = async (): Promise<void> => {
    try {
      setLoading(true);
      const response: Response = await fetch(
        `${backendUrl}/quizsession/getAllQuizSession`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }

      const data: { data: StudyAnalyticsType[] } = await response.json();
      setStudyAnalytics(data.data);
    } catch (error: unknown) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "study-calendar":
        return <StudyGraph studyAnalytics={studyAnalytics} />;
      case "analytics":
        return <Analytics studyAnalytics={studyAnalytics} />;
      default:
        return <StudyGraph studyAnalytics={studyAnalytics} />;
    }
  };

  if (loading) {
    return (
      <div className="study-analytics-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="study-analytics-container">
      <div className="analytics-header">
        <h1>Study Analytics</h1>
        <p>View your study history and track your progress over time.</p>
      </div>

      <div className="tab-navigation">
        <button
          className={`tab-button ${
            activeTab === "study-calendar" ? "active" : ""
          }`}
          onClick={() => setActiveTab("study-calendar")}
        >
          <Calendar className="tab-icon" size={20} />
          <span className="tab-text">Study Calendar</span>
        </button>

        <button
          className={`tab-button ${activeTab === "analytics" ? "active" : ""}`}
          onClick={() => setActiveTab("analytics")}
        >
          <BarChart3 className="tab-icon" size={20} />
          <span className="tab-text">Analytics</span>
        </button>
      </div>

      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default StudyAnalytics;
