import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Target,
  CheckCircle2,
  HelpCircle,
  Clock,
  Plus,
  Calendar,
  ChevronDown,
} from "lucide-react";
import "./WeeklyGoals.css";
import {
  createWeeklyGoal,
  getAllGoals,
  setCurrentWeekOffset,
  clearError,
  type Goal,
} from "../store/slices/goalSlice";
import type { RootState, AppDispatch } from "../store/store";

// Helper function to convert backend Goal to display Goal
const convertToDisplayGoal = (
  goal: Goal
): {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  currentValue: number;
  targetValue: number;
  unit: string;
  icon: React.ReactNode;
} => {
  const isStudyHours = goal.goalType === "study_hours";
  return {
    id: goal._id,
    title: isStudyHours ? "Study Hours" : "Quiz Questions",
    description: isStudyHours
      ? "Complete your weekly study hours"
      : "Answer quiz questions correctly",
    completed: goal.isCompleted,
    currentValue: goal.currentValue,
    targetValue: goal.goalValue,
    unit: isStudyHours ? "hours" : "questions",
    icon: isStudyHours ? <Clock size={24} /> : <HelpCircle size={24} />,
  };
};

const WeeklyGoals = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { weekGoals, currentWeekOffset, isLoading, error } = useSelector(
    (state: RootState) => state.goals
  );

  // Helper function to get week start and end dates
  const getWeekDates = (weekOffset: number) => {
    const now = new Date();
    const currentWeekStart = new Date(now);
    currentWeekStart.setDate(now.getDate() - now.getDay()); // Start of current week (Sunday)
    currentWeekStart.setHours(0, 0, 0, 0);

    const targetWeekStart = new Date(currentWeekStart);
    targetWeekStart.setDate(currentWeekStart.getDate() + weekOffset * 7);

    const targetWeekEnd = new Date(targetWeekStart);
    targetWeekEnd.setDate(targetWeekStart.getDate() + 6);

    return {
      start: targetWeekStart.toISOString().split("T")[0],
      end: targetWeekEnd.toISOString().split("T")[0],
    };
  };

  // Local state for UI
  const [showSetGoalsForm, setShowSetGoalsForm] = useState(false);
  const [showWeekDropdown, setShowWeekDropdown] = useState(false);
  const [goalTargets, setGoalTargets] = useState({
    studyHours: 0,
    quizQuestions: 0,
  });
  const [defaultsChecked, setDefaultsChecked] = useState(false);

  const predefinedGoals = [
    {
      id: "studyHours",
      title: "Study Hours",
      description: "Complete your weekly study hours",
      unit: "hours",
      icon: <Clock size={24} />,
    },
    {
      id: "quizQuestions",
      title: "Quiz Questions",
      description: "Answer quiz questions correctly",
      unit: "questions",
      icon: <HelpCircle size={24} />,
    },
  ];

  const currentWeek = weekGoals.find(
    (week) => week.weekStart === getWeekDates(currentWeekOffset).start
  ) || {
    weekStart: getWeekDates(currentWeekOffset).start,
    weekEnd: getWeekDates(currentWeekOffset).end,
    goals: [],
  };

  // Debug logging
  console.log("Current week calculation:", {
    currentWeekOffset,
    currentWeekStart: getWeekDates(currentWeekOffset).start,
    weekGoals,
    currentWeek,
    currentWeekGoalsCount: currentWeek.goals.length,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load goals on component mount
  useEffect(() => {
    dispatch(getAllGoals());
  }, [dispatch]);

  // Set default goals if current week has no goals
  useEffect(() => {
    const setDefaultGoalsIfNeeded = async () => {
      if (weekGoals.length === 0 || defaultsChecked) return; // Wait for goals to load and prevent duplicates

      try {
        const currentWeekStart = getWeekDates(0).start;
        const lastWeekStart = getWeekDates(-1).start;

        console.log("Checking for default goals:", {
          currentWeekStart,
          lastWeekStart,
          weekGoals,
          defaultsChecked,
        });

        const currentWeekGoals = weekGoals.find(
          (week) => week.weekStart === currentWeekStart
        );
        const lastWeekGoals = weekGoals.find(
          (week) => week.weekStart === lastWeekStart
        );

        console.log("Found goals:", {
          currentWeekGoals,
          lastWeekGoals,
          currentWeekHasGoals:
            currentWeekGoals && currentWeekGoals.goals.length > 0,
        });

        // If current week has no goals
        if (!currentWeekGoals || currentWeekGoals.goals.length === 0) {
          console.log("Creating default goals for current week");
          let goalsToCreate = [];

          // If last week had goals, use those values
          if (lastWeekGoals && lastWeekGoals.goals.length > 0) {
            console.log("Using last week's goals as template");
            for (const goal of lastWeekGoals.goals) {
              goalsToCreate.push({
                goalType: goal.goalType,
                goalValue: goal.goalValue,
                weekStartDate: currentWeekStart,
                weekEndDate: getWeekDates(0).end,
              });
            }
          } else {
            console.log("Using default values: 3 hours, 20 questions");
            // If last week also had no goals, use defaults
            goalsToCreate = [
              {
                goalType: "study_hours" as const,
                goalValue: 3,
                weekStartDate: currentWeekStart,
                weekEndDate: getWeekDates(0).end,
              },
              {
                goalType: "quiz_questions" as const,
                goalValue: 20,
                weekStartDate: currentWeekStart,
                weekEndDate: getWeekDates(0).end,
              },
            ];
          }

          console.log("Goals to create:", goalsToCreate);

          // Create the goals
          for (const goalData of goalsToCreate) {
            console.log("Creating goal:", goalData);
            await dispatch(createWeeklyGoal(goalData)).unwrap();
          }

          console.log("Default goals created successfully");
          // Mark as checked to prevent duplicate creation
          setDefaultsChecked(true);
        } else {
          console.log("Current week already has goals, marking as checked");
          // Current week has goals, mark as checked
          setDefaultsChecked(true);
        }
      } catch (error) {
        console.error("Error setting default goals:", error);
        setDefaultsChecked(true); // Mark as checked even on error to prevent retries
      }
    };

    setDefaultGoalsIfNeeded();
  }, [weekGoals, dispatch, defaultsChecked]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowWeekDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getProgressPercentage = (currentValue: number, targetValue: number) => {
    return Math.min(Math.round((currentValue / targetValue) * 100), 100);
  };

  const isGoalCompleted = (currentValue: number, targetValue: number) => {
    return currentValue >= targetValue;
  };

  const selectWeek = (weekOffset: number) => {
    dispatch(setCurrentWeekOffset(weekOffset));
    setShowWeekDropdown(false);
    // Close the form when switching to current week
    if (weekOffset === 0) {
      setShowSetGoalsForm(false);
    }
  };

  const generateWeekOptions = () => {
    const options = [];
    // Only allow current week (0) and next week (1)
    for (let i = 0; i <= 1; i++) {
      const weekDates = getWeekDates(i);
      const isCurrentWeek = i === 0;
      const hasGoals = weekGoals.some(
        (week) => week.weekStart === weekDates.start
      );

      options.push({
        offset: i,
        label: isCurrentWeek ? "This Week" : "Next Week",
        weekStart: weekDates.start,
        weekEnd: weekDates.end,
        hasGoals,
      });
    }
    return options;
  };

  const setGoals = async () => {
    if (goalTargets.studyHours > 0 || goalTargets.quizQuestions > 0) {
      const weekDates = getWeekDates(currentWeekOffset);

      try {
        // Create goals for each target that has a value > 0
        const goalPromises = [];

        if (goalTargets.studyHours > 0) {
          goalPromises.push(
            dispatch(
              createWeeklyGoal({
                goalType: "study_hours",
                goalValue: goalTargets.studyHours,
                weekStartDate: weekDates.start,
                weekEndDate: weekDates.end,
              })
            )
          );
        }

        if (goalTargets.quizQuestions > 0) {
          goalPromises.push(
            dispatch(
              createWeeklyGoal({
                goalType: "quiz_questions",
                goalValue: goalTargets.quizQuestions,
                weekStartDate: weekDates.start,
                weekEndDate: weekDates.end,
              })
            )
          );
        }

        // Wait for all goals to be created
        await Promise.all(goalPromises);

        setGoalTargets({ studyHours: 0, quizQuestions: 0 });
        setShowSetGoalsForm(false);
      } catch (error) {
        console.error("Error creating goals:", error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Clear error when component unmounts or when user dismisses it
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    <div className="weekly-goals-container">
      {error && (
        <div
          className="error-message"
          style={{
            background: "#fee",
            color: "#c33",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}
      <div className="goals-header">
        <div className="goals-title-section">
          <Target className="goals-icon" size={32} />
          <div>
            <h1>Weekly Goals</h1>
            <p>
              Set and track your weekly objectives to stay focused and
              productive.
            </p>
          </div>
        </div>
        <button
          className="set-goals-btn"
          disabled={isLoading}
          onClick={() => {
            if (currentWeekOffset === 0) {
              // Switch to next week and open form
              dispatch(setCurrentWeekOffset(1));
              setShowSetGoalsForm(true);
            } else {
              // Toggle form on next week
              setShowSetGoalsForm(!showSetGoalsForm);
            }
          }}
        >
          <Plus size={20} />
          {isLoading ? "Loading..." : "Set Goals"}
        </button>
      </div>

      <div className="week-navigation">
        <div className="week-selector" ref={dropdownRef}>
          <button
            className="week-selector-btn"
            onClick={() => setShowWeekDropdown(!showWeekDropdown)}
          >
            <Calendar size={20} />
            <span>{currentWeekOffset === 0 ? "This Week" : "Next Week"}</span>
            <ChevronDown
              size={16}
              className={`chevron ${showWeekDropdown ? "open" : ""}`}
            />
          </button>

          {showWeekDropdown && (
            <div className="week-dropdown">
              {generateWeekOptions().map((option) => (
                <button
                  key={option.offset}
                  className={`week-option ${
                    currentWeekOffset === option.offset ? "active" : ""
                  } ${option.hasGoals ? "has-goals" : ""}`}
                  onClick={() => selectWeek(option.offset)}
                >
                  <div className="week-option-content">
                    <span className="week-label">{option.label}</span>
                    <span className="week-dates">
                      {formatDate(option.weekStart)} -{" "}
                      {formatDate(option.weekEnd)}
                    </span>
                  </div>
                  {option.hasGoals && <div className="goals-indicator">•</div>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {showSetGoalsForm && currentWeekOffset === 1 && (
        <div className="set-goals-form">
          <h3>Set Goals for Next Week</h3>
          <p>Set your target values for the predefined goals:</p>

          {predefinedGoals.map((goal) => (
            <div key={goal.id} className="goal-setting-item">
              <div className="goal-info">
                <div className="goal-icon-small">{goal.icon}</div>
                <div>
                  <h4>{goal.title}</h4>
                  <p>{goal.description}</p>
                </div>
              </div>
              <div className="goal-target-input">
                <input
                  type="number"
                  value={goalTargets[goal.id as keyof typeof goalTargets]}
                  onChange={(e) =>
                    setGoalTargets({
                      ...goalTargets,
                      [goal.id]: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  min="0"
                />
                <span className="unit-label">{goal.unit}</span>
              </div>
            </div>
          ))}

          <div className="form-actions">
            <button
              className="cancel-btn"
              onClick={() => setShowSetGoalsForm(false)}
            >
              Cancel
            </button>
            <button
              className="save-btn"
              onClick={setGoals}
              disabled={isLoading}
            >
              {isLoading ? "Setting Goals..." : "Set Goals"}
            </button>
          </div>
        </div>
      )}

      <div className="goals-list">
        {currentWeek.goals.length === 0 ? (
          <div className="empty-state">
            <Target size={48} />
            <h3>
              {currentWeekOffset === 0
                ? "No goals set for this week"
                : "No goals set for next week"}
            </h3>
            <p>
              {currentWeekOffset === 0
                ? "Goals for this week are read-only. Switch to next week to set new goals."
                : "Click 'Set Goals' to add your weekly objectives!"}
            </p>
          </div>
        ) : (
          currentWeek.goals.map((goal) => {
            const displayGoal = convertToDisplayGoal(goal);
            const progressPercentage = getProgressPercentage(
              displayGoal.currentValue,
              displayGoal.targetValue
            );
            const isCompleted = isGoalCompleted(
              displayGoal.currentValue,
              displayGoal.targetValue
            );

            return (
              <div
                key={displayGoal.id}
                className={`goal-card ${isCompleted ? "completed" : ""}`}
              >
                <div className="goal-main">
                  <div className="goal-icon">{displayGoal.icon}</div>
                  <div className="goal-content">
                    <div className="goal-header">
                      <h3 className={isCompleted ? "completed-text" : ""}>
                        {displayGoal.title}
                      </h3>
                      <div className="goal-progress-text">
                        {displayGoal.currentValue} / {displayGoal.targetValue}{" "}
                        {displayGoal.unit}
                      </div>
                    </div>
                    <p
                      className={`goal-description ${
                        isCompleted ? "completed-text" : ""
                      }`}
                    >
                      {displayGoal.description}
                    </p>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div
                          className={`progress-fill ${
                            isCompleted ? "completed" : ""
                          }`}
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                      <div className="progress-percentage">
                        {progressPercentage}%
                      </div>
                    </div>
                    {isCompleted && (
                      <div className="completion-badge">
                        <CheckCircle2 size={16} />
                        <span>Completed!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WeeklyGoals;
