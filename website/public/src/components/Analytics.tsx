import { Clock, Target, Play, Flame } from "lucide-react";
import "./Analytics.css";
import type { StudyAnalyticsType } from "../pages/StudyAnalytics";
import StudyContributionChart from "./StudyContributionChart";
import { useAppSelector } from "../store/hooks";

export const Analytics = ({
  studyAnalytics,
}: {
  studyAnalytics: StudyAnalyticsType[];
}) => {
  const { quizProgress } = useAppSelector((state) => state.quizProgress);
  const currentWeekStart = new Date(
    new Date().setDate(new Date().getDate() - 7)
  );
  const tempcurrentWeekStart = new Date(currentWeekStart);
  const currentweekEnd = new Date(
    tempcurrentWeekStart.setDate(tempcurrentWeekStart.getDate() + 7)
  );

  //filter studyAnalytics by weekStart and weekEnd
  const weeklyStudyAnalytics = studyAnalytics.filter((study) => {
    const studyStartTime = new Date(study.startTime);
    return (
      studyStartTime >= currentWeekStart && studyStartTime <= currentweekEnd
    );
  });
  const weeklyTotalWatchTime = weeklyStudyAnalytics.reduce((acc, curr) => {
    const numberToAdd = curr?.totalDuration || 0;
    return acc + numberToAdd;
  }, 0); // in milliseconds
  let weeklyTotalWatchTimeInHours = weeklyTotalWatchTime / 3600000;
  if (!weeklyTotalWatchTimeInHours) {
    weeklyTotalWatchTimeInHours = 0;
  }

  //calculate last week total watch time
  const temp2currentWeekStart = new Date(currentWeekStart);
  const lastWeekStart = new Date(
    temp2currentWeekStart.setDate(temp2currentWeekStart.getDate() - 7)
  );
  const templastWeekStart = new Date(lastWeekStart);
  const lastWeekEnd = new Date(
    templastWeekStart.setDate(templastWeekStart.getDate() + 7)
  );

  const lastWeekStudyAnalytics = studyAnalytics.filter((study) => {
    const studyStartTime = new Date(study.startTime);
    return studyStartTime >= lastWeekStart && studyStartTime <= lastWeekEnd;
  });

  const lastWeekTotalWatchTime = lastWeekStudyAnalytics.reduce((acc, curr) => {
    const numberToAdd = curr?.totalDuration || 0;
    return acc + numberToAdd;
  }, 0);

  //calculate percentage change in watch time
  let percentageChange = 0;
  if (lastWeekTotalWatchTime !== 0) {
    percentageChange =
      ((weeklyTotalWatchTime - lastWeekTotalWatchTime) /
        lastWeekTotalWatchTime) *
      100;
  }

  // Calculate quizzes completed in past 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const quizzesCompletedLast7Days = quizProgress.filter((quiz) => {
    // A quiz is completed if it's submitted and was completed within the last 7 days
    if (!quiz.submitted) return false;

    const quizEndTime = new Date(quiz.startTime);
    // For submitted quizzes, we'll use startTime as completion time
    // You might want to add an endTime field to QuizProgress if available
    return quizEndTime >= sevenDaysAgo && quizEndTime <= today;
  }).length;

  // Calculate quizzes completed in previous 7 days (8-14 days ago) for comparison
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
  fourteenDaysAgo.setHours(0, 0, 0, 0);

  const eightDaysAgo = new Date();
  eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);
  eightDaysAgo.setHours(23, 59, 59, 999);

  const quizzesCompletedPrevious7Days = quizProgress.filter((quiz) => {
    if (!quiz.submitted) return false;

    const quizEndTime = new Date(quiz.startTime);
    return quizEndTime >= fourteenDaysAgo && quizEndTime <= eightDaysAgo;
  }).length;

  // Calculate percentage change in quiz completion
  let quizCompletionChange = 0;
  if (quizzesCompletedPrevious7Days !== 0) {
    quizCompletionChange =
      ((quizzesCompletedLast7Days - quizzesCompletedPrevious7Days) /
        quizzesCompletedPrevious7Days) *
      100;
  } else if (quizzesCompletedLast7Days > 0) {
    quizCompletionChange = 100; // If no quizzes in previous period but some in current
  }

  // Calculate viewing streak (consecutive days with at least 10 minutes)
  const calculateViewingStreak = (): number => {
    const now = new Date();
    const today = new Date(now);
    today.setHours(23, 59, 59, 999);

    let streak = 0;
    let currentDate = new Date(today);

    // Start from yesterday, not today (since today might not be finished)
    currentDate.setDate(currentDate.getDate() - 1);

    while (true) {
      const dayStart = new Date(currentDate);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(currentDate);
      dayEnd.setHours(23, 59, 59, 999);

      // Get all study sessions for this day
      const daySessions = studyAnalytics.filter((study) => {
        const studyStartTime = new Date(study.startTime);
        return studyStartTime >= dayStart && studyStartTime <= dayEnd;
      });

      // Calculate total watch time for this day (in minutes)
      const dayWatchTime =
        daySessions.reduce((acc, curr) => {
          return acc + (curr.totalDuration || 0);
        }, 0) / 60000; // Convert milliseconds to minutes

      // If this day has at least 10 minutes of viewing, continue streak
      if (dayWatchTime >= 10) {
        streak++;
        // Move to previous day
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        // Streak broken
        break;
      }
    }

    return streak;
  };

  const viewingStreak = calculateViewingStreak();

  return (
    <div className="analytics-container">
      <div className="metrics-grid">
        {/* Total Watch Time Card */}
        <div className="metric-card">
          <div className="card-header">
            <div className="icon-container">
              <Clock className="metric-icon" />
            </div>
            <div className="badge">{percentageChange.toFixed(2)}%</div>
          </div>
          <div className="metric-value">
            {Math.floor(weeklyTotalWatchTimeInHours)}h{" "}
            {Math.floor((weeklyTotalWatchTimeInHours % 1) * 60)}m
          </div>
          <div className="metric-label">Total Watch Time (7 days)</div>
        </div>

        {/* Quiz Accuracy Card */}
        <div className="metric-card">
          <div className="card-header">
            <div className="icon-container">
              <Target className="metric-icon" />
            </div>
            <div className="badge">+5%</div>
          </div>
          <div className="metric-value">87%</div>
          <div className="metric-label">Quiz Accuracy</div>
        </div>

        {/* Viewing Streak Card */}
        <div className="metric-card">
          <div className="card-header">
            <div className="icon-container">
              <Flame className="metric-icon" />
            </div>
          </div>
          <div className="metric-value">{viewingStreak} days</div>
          <div className="metric-label">Viewing Streak</div>
        </div>

        {/* Learning Sessions Card */}
        <div className="metric-card">
          <div className="card-header">
            <div className="icon-container">
              <Play className="metric-icon" />
            </div>
            <div className="badge">{quizzesCompletedPrevious7Days}%</div>
          </div>
          <div className="metric-value">{quizzesCompletedLast7Days}</div>
          <div className="metric-label">Quizes Completed (7 days)</div>
        </div>
      </div>

      {/* GitHub contribution-like chart */}
      <StudyContributionChart studyAnalytics={studyAnalytics} />
    </div>
  );
};
