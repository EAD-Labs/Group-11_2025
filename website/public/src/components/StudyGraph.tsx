import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./StudyGraph.css";

interface ActivityType {
  _id: string;
  type: "video_viewing" | "quiz_taking";
  startTime: number;
  endTime: number;
  duration: number;
  questionId: string;
  videoId: string;
}

interface StudyAnalyticsType {
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

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: "video" | "quiz" | "practice" | "reading";
  day: number; // 0-6 for Sunday-Saturday
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  durationMinutes: number;
  quizProgressId: string;
}

interface StudyGraphProps {
  studyAnalytics: StudyAnalyticsType[];
}

const StudyGraph: React.FC<StudyGraphProps> = ({ studyAnalytics }) => {
  // Get week start (Sunday) and end (Saturday)
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const calendarBodyRef = useRef<HTMLDivElement>(null);
  const weeklyCalendarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Scroll to 7:00 AM position when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (weeklyCalendarRef.current) {
        const scrollPosition = 7 * 80;
        weeklyCalendarRef.current.scrollTop = scrollPosition;
      }
    }, 100); // Small delay to ensure DOM is rendered

    return () => clearTimeout(timer);
  }, []);

  const getWeekDates = (date: Date): Date[] => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day;
    start.setDate(diff);

    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(start);
      newDate.setDate(start.getDate() + i);
      // Reset time to start of day for consistent comparison
      newDate.setHours(0, 0, 0, 0);
      dates.push(newDate);
    }
    return dates;
  };

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Get day name
  const getDayName = (date: Date): string => {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  // Check if date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Generate time slots for current view (24 hours)
  const getVisibleTimeSlots = (): number[] => {
    const slots: number[] = [];
    for (let i = 0; i < 24; i++) {
      // Show all 24 hours
      slots.push(i);
    }
    return slots;
  };

  // Convert analytics to calendar events
  const getCalendarEvents = (): CalendarEvent[] => {
    const weekStart = getWeekDates(currentWeek)[0];
    const weekEnd = getWeekDates(currentWeek)[6];
    weekEnd.setHours(23, 59, 59, 999); // End of day

    return studyAnalytics
      .filter((analytics: StudyAnalyticsType): boolean => {
        // Check if event falls within current week
        const eventStart = new Date(analytics.startTime);
        const eventEnd = new Date(analytics.endTime);
        return eventStart <= weekEnd && eventEnd >= weekStart;
      })
      .map((analytics: StudyAnalyticsType): CalendarEvent => {
        const start = new Date(analytics.startTime);
        const end = new Date(analytics.endTime);
        const day = start.getDay();
        const startHour = start.getHours();
        const startMinute = start.getMinutes();
        const endHour = end.getHours();
        const endMinute = end.getMinutes();

        // Calculate duration in minutes for proper positioning
        const durationMs =
          analytics.totalDuration || end.getTime() - start.getTime();
        const durationMinutes = Math.max(
          1,
          Math.ceil(durationMs / (1000 * 60))
        );

        return {
          id: analytics._id,
          title: analytics.title,
          start,
          end,
          type: analytics.activities.some((a) => a.type === "quiz_taking")
            ? "quiz"
            : "video",
          day,
          startHour,
          startMinute,
          endHour,
          endMinute,
          durationMinutes,
          quizProgressId: analytics.quizProgressId,
        };
      });
  };

  const events = getCalendarEvents();
  const weekDates = getWeekDates(currentWeek);

  const goToPreviousWeek = (): void => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(newDate);
  };

  // Navigate to next week
  const goToNextWeek = (): void => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(newDate);
  };
  const goToToday = (): void => {
    setCurrentWeek(new Date());
  };

  // Handle event click to navigate to PastQuizFullInfo
  const handleEventClick = (quizProgressId: string): void => {
    if (quizProgressId) {
      navigate(`/pastquizfullinfo/?quizId=${quizProgressId}`);
    } else {
      console.warn("No quizProgressId available for this event");
    }
  };

  return (
    <div className="study-graph-container">
      <div className="calendar-section">
        <div className="calendar-header">
          <div className="calendar-title-section">
            <div className="view-indicator">Week View</div>
          </div>
          <div className="calendar-navigation">
            <button onClick={goToPreviousWeek} className="nav-btn">
              &lt;
            </button>
            <button onClick={goToToday} className="today-btn">
              Today
            </button>
            <button onClick={goToNextWeek} className="nav-btn">
              &gt;
            </button>
          </div>
        </div>

        <div className="weekly-calendar" ref={weeklyCalendarRef}>
          <div className="calendar-headers">
            <div className="time-header-sticky">Time</div>
            {weekDates.map((date, dayIndex) => (
              <div
                key={dayIndex}
                className={`day-header-sticky ${isToday(date) ? "today" : ""}`}
              >
                <div className="day-name">{getDayName(date)}</div>
                <div className="day-date">{formatDate(date)}</div>
              </div>
            ))}
          </div>

          {/* Scrollable Calendar Body */}
          <div className="calendar-body" ref={calendarBodyRef}>
            <div className="calendar-grid">
              {/* Time column */}
              <div className="time-column">
                {getVisibleTimeSlots().map((hour) => (
                  <div key={hour} className="time-slot">
                    {hour.toString().padStart(2, "0")}:00
                  </div>
                ))}
              </div>

              {/* Day columns */}
              {weekDates.map((date, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`day-column ${isToday(date) ? "today" : ""}`}
                >
                  {getVisibleTimeSlots().map((hour) => (
                    <div key={hour} className="time-slot">
                      {/* Render events for this time slot and day */}
                      {events
                        .filter(
                          (event) =>
                            event.day === dayIndex &&
                            event.startHour <= hour &&
                            event.endHour >= hour
                        )
                        .map((event) => {
                          // Only render the event in the hour it starts
                          if (event.startHour !== hour) return null;

                          // Calculate total height across all hours this event spans
                          const totalHours =
                            event.endHour - event.startHour + 1;
                          // const totalHeight = totalHours * 100; // Total height in pixels

                          // Calculate top offset based on start minute
                          const topOffset = (event.startMinute / 60) * 100;

                          // Calculate bottom offset based on end minute
                          const bottomOffset =
                            event.endHour === event.startHour
                              ? (event.endMinute / 60) * 100
                              : (event.endMinute / 60) * 100 +
                                (totalHours - 1) * 100;

                          // Final height is the difference between bottom and top
                          const height = bottomOffset - topOffset;

                          // Ensure minimum height for visibility
                          const finalHeight = Math.max(height, 20);

                          return (
                            <div
                              key={event.id}
                              className={`calendar-event ${event.type} clickable`}
                              title={`${event.title} (${event.durationMinutes} min) - Click to view details`}
                              onClick={() =>
                                handleEventClick(event.quizProgressId)
                              }
                              style={{
                                top: `${topOffset}px`,
                                height: `${finalHeight}px`,
                                minHeight: "20px",
                                zIndex: 10,
                                left: "2px",
                                right: "2px",
                                cursor: "pointer",
                              }}
                            >
                              {event.title}
                            </div>
                          );
                        })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyGraph;
