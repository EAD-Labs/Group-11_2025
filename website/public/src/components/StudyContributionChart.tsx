import React, { useState, useMemo } from "react";
import "./StudyContributionChart.css";

interface StudyAnalyticsType {
  _id: string;
  videoId: string;
  userId: string;
  title: string;
  startTime: number;
  endTime: number;
  totalDuration: number;
  quizProgressId: string;
  activities: Array<{
    _id: string;
    type: "video_viewing" | "quiz_taking";
    startTime: number;
    endTime: number;
    duration: number;
    questionId: string;
    videoId: string;
  }>;
}

interface StudyContributionChartProps {
  studyAnalytics: StudyAnalyticsType[];
}

interface ContributionData {
  date: string;
  count: number;
  level: number; // 0-4 for intensity levels
  totalDuration: number; // in minutes
}

const StudyContributionChart: React.FC<StudyContributionChartProps> = ({
  studyAnalytics,
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  // Generate contribution data for the last year
  const contributionData = useMemo(() => {
    const data: ContributionData[] = [];
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    oneYearAgo.setDate(oneYearAgo.getDate() - oneYearAgo.getDay()); // Start from Sunday

    // Initialize all dates with zero activity
    for (let i = 0; i < 371; i++) {
      // 53 weeks * 7 days + some buffer
      const date = new Date(oneYearAgo);
      date.setDate(oneYearAgo.getDate() + i);

      if (date > today) break; // Don't show future dates

      data.push({
        date: date.toISOString().split("T")[0],
        count: 0,
        level: 0,
        totalDuration: 0,
      });
    }

    // Process study analytics data
    studyAnalytics.forEach((study) => {
      const studyDate = new Date(study.startTime);
      const dateString = studyDate.toISOString().split("T")[0];

      const existingData = data.find((d) => d.date === dateString);
      if (existingData) {
        existingData.count += 1;
        // Add validation to ensure totalDuration is a valid number
        const duration = study.totalDuration || 0;
        if (!isNaN(duration) && duration > 0) {
          existingData.totalDuration += Math.round(duration / (1000 * 60)); // Convert to minutes
        }
      }
    });

    // Add some sample data for demonstration if no real data exists
    if (studyAnalytics.length === 0) {
      const today = new Date();
      for (let i = 0; i < 30; i++) {
        const sampleDate = new Date(today);
        sampleDate.setDate(today.getDate() - i);
        const dateString = sampleDate.toISOString().split("T")[0];

        const existingData = data.find((d) => d.date === dateString);
        if (existingData) {
          // Random activity for demonstration
          const hasActivity = Math.random() > 0.3;
          if (hasActivity) {
            existingData.count = Math.floor(Math.random() * 5) + 1;
            existingData.totalDuration = Math.floor(Math.random() * 120) + 30; // 30-150 minutes
          }
        }
      }
    }

    // Calculate intensity levels based on duration thresholds
    data.forEach((item) => {
      if (item.count === 0) {
        item.level = 0;
      } else {
        // Use duration-based thresholds: 15 mins, 30 mins, 1 hour, 2 hours
        const durationMinutes = item.totalDuration;

        if (durationMinutes < 15) item.level = 1;
        else if (durationMinutes < 30) item.level = 2;
        else if (durationMinutes < 60) item.level = 3;
        else if (durationMinutes < 120) item.level = 4;
        else item.level = 4; // 2+ hours gets max level
      }
    });

    return data;
  }, [studyAnalytics]);

  // Group data by weeks
  const weeklyData = useMemo(() => {
    const weeks: ContributionData[][] = [];
    for (let i = 0; i < contributionData.length; i += 7) {
      weeks.push(contributionData.slice(i, i + 7));
    }
    return weeks;
  }, [contributionData]);

  // Get month labels
  const monthLabels = useMemo(() => {
    const labels: { month: string; weekIndex: number }[] = [];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let lastMonth = -1;
    weeklyData.forEach((week, weekIndex) => {
      if (week.length > 0) {
        const firstDay = new Date(week[0].date);
        const month = firstDay.getMonth();
        if (month !== lastMonth) {
          labels.push({ month: months[month], weekIndex });
          lastMonth = month;
        }
      }
    });

    return labels;
  }, [weeklyData]);

  const getLevelClass = (level: number): string => {
    switch (level) {
      case 0:
        return "level-0";
      case 1:
        return "level-1";
      case 2:
        return "level-2";
      case 3:
        return "level-3";
      case 4:
        return "level-4";
      default:
        return "level-0";
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDuration = (minutes: number): string => {
    // Add validation to handle NaN, undefined, or null values
    if (!minutes || isNaN(minutes) || minutes < 0) {
      return "0m";
    }

    if (minutes < 60) {
      return `${Math.round(minutes)}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${Math.round(remainingMinutes)}m`
      : `${hours}h`;
  };

  const selectedDayData = selectedDate
    ? contributionData.find((d) => d.date === selectedDate)
    : null;

  const hoveredDayData = hoveredDate
    ? contributionData.find((d) => d.date === hoveredDate)
    : null;

  const displayData = selectedDayData || hoveredDayData;

  return (
    <div className="contribution-chart-container">
      <div className="chart-header">
        <h3>Study Activity</h3>
        <p>Study sessions over the past year</p>
      </div>

      <div className="contribution-chart-wrapper">
        <div className="month-labels">
          {monthLabels.map((label, index) => (
            <div
              key={index}
              className="month-label"
              style={{
                left: `${label.weekIndex * 19 + 32}px`,
              }}
            >
              {label.month}
            </div>
          ))}
        </div>

        <div className="contribution-chart">
          <div className="day-labels">
            <div className="day-label">Sun</div>
            <div className="day-label">Mon</div>
            <div className="day-label">Tue</div>
            <div className="day-label">Wed</div>
            <div className="day-label">Thu</div>
            <div className="day-label">Fri</div>
            <div className="day-label">Sat</div>
          </div>

          <div className="contribution-grid">
            {weeklyData.map((week, weekIndex) => (
              <div key={weekIndex} className="week-column">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`contribution-day ${getLevelClass(day.level)} ${
                      selectedDate === day.date ? "selected" : ""
                    }`}
                    title={`${formatDate(day.date)}: ${day.count} session${
                      day.count !== 1 ? "s" : ""
                    }, ${formatDuration(day.totalDuration)}`}
                    onClick={() => setSelectedDate(day.date)}
                    onMouseEnter={() => setHoveredDate(day.date)}
                    onMouseLeave={() => setHoveredDate(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="chart-legend">
        <div className="legend-label">Less</div>
        <div className="legend-squares">
          <div className="legend-square level-0"></div>
          <div className="legend-square level-1"></div>
          <div className="legend-square level-2"></div>
          <div className="legend-square level-3"></div>
          <div className="legend-square level-4"></div>
        </div>
        <div className="legend-label">More</div>
      </div>

      {displayData && (
        <div className="day-details">
          <h4>{formatDate(displayData.date)}</h4>
          <div className="day-stats">
            <div className="stat">
              <span className="stat-value">
                {formatDuration(displayData.totalDuration)}
              </span>
              <span className="stat-label">total time</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyContributionChart;
