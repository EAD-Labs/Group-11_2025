import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Goal {
  _id: string;
  goalType: 'study_hours' | 'quiz_questions';
  goalValue: number;
  currentValue: number;
  isCompleted: boolean;
  weekStartDate: string;
  weekEndDate: string;
  userId: string;
}

export interface WeekGoals {
  weekStart: string;
  weekEnd: string;
  goals: Goal[];
}

interface GoalState {
  weekGoals: WeekGoals[];
  currentWeekOffset: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: GoalState = {
  weekGoals: [],
  currentWeekOffset: 0,
  isLoading: false,
  error: null,
};


// Async thunk for creating a weekly goal
export const createWeeklyGoal = createAsyncThunk(
  'goals/createWeeklyGoal',
  async (goalData: {
    goalType: 'study_hours' | 'quiz_questions';
    goalValue: number;
    weekStartDate: string;
    weekEndDate: string;
  }, { rejectWithValue }) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/goal/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(goalData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create goal');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create goal');
    }
  }
);

// Async thunk for updating a weekly goal
export const updateWeeklyGoal = createAsyncThunk(
  'goals/updateWeeklyGoal',
  async (goalData: {
    id: string;
    goalType: 'study_hours' | 'quiz_questions';
    goalValue: number;
    weekStartDate: string;
    weekEndDate: string;
    isCompleted?: boolean;
  }, { rejectWithValue }) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/goal/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(goalData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update goal');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update goal');
    }
  }
);

// Async thunk for getting all goals
export const getAllGoals = createAsyncThunk(
  'goals/getAllGoals',
  async (_, { rejectWithValue }) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/goal/getAll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch goals');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch goals');
    }
  }
);

// Async thunk for getting weekly goal
export const getWeeklyGoal = createAsyncThunk(
  'goals/getWeeklyGoal',
  async (startDate: string, { rejectWithValue }) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/goal/getWeeklyGoal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ startDate }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch weekly goal');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch weekly goal');
    }
  }
);

const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    setCurrentWeekOffset: (state, action: PayloadAction<number>) => {
      state.currentWeekOffset = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Helper function to organize goals by week
    organizeGoalsByWeek: (state, action: PayloadAction<Goal[]>) => {
      const goals = action.payload;
      const weekMap = new Map<string, Goal[]>();

      goals.forEach(goal => {
        const weekStart = goal.weekStartDate.split('T')[0];
        if (!weekMap.has(weekStart)) {
          weekMap.set(weekStart, []);
        }
        weekMap.get(weekStart)!.push(goal);
      });

      state.weekGoals = Array.from(weekMap.entries()).map(([weekStart, weekGoals]) => {
        const weekStartDate = new Date(weekStart);
        const weekEndDate = new Date(weekStartDate);
        weekEndDate.setDate(weekStartDate.getDate() + 6);
        
        return {
          weekStart,
          weekEnd: weekEndDate.toISOString().split('T')[0],
          goals: weekGoals,
        };
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Create goal
      .addCase(createWeeklyGoal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createWeeklyGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add the new goal to the appropriate week
        const newGoal = action.payload;
        const weekStart = newGoal.weekStartDate.split('T')[0];
        const weekEnd = newGoal.weekEndDate.split('T')[0];
        
        const existingWeekIndex = state.weekGoals.findIndex(
          week => week.weekStart === weekStart
        );
        
        if (existingWeekIndex >= 0) {
          state.weekGoals[existingWeekIndex].goals.push(newGoal);
        } else {
          state.weekGoals.push({
            weekStart,
            weekEnd,
            goals: [newGoal],
          });
        }
      })
      .addCase(createWeeklyGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update goal
      .addCase(updateWeeklyGoal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateWeeklyGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedGoal = action.payload;
        const weekStart = updatedGoal.weekStartDate.split('T')[0];
        
        const weekIndex = state.weekGoals.findIndex(
          week => week.weekStart === weekStart
        );
        
        if (weekIndex >= 0) {
          const goalIndex = state.weekGoals[weekIndex].goals.findIndex(
            goal => goal._id === updatedGoal._id
          );
          
          if (goalIndex >= 0) {
            state.weekGoals[weekIndex].goals[goalIndex] = updatedGoal;
          }
        }
      })
      .addCase(updateWeeklyGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get all goals
      .addCase(getAllGoals.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        // Organize goals by week
        const weekMap = new Map<string, Goal[]>();

        action.payload.forEach((goal: Goal) => {
          const weekStart = goal.weekStartDate.split('T')[0];
          if (!weekMap.has(weekStart)) {
            weekMap.set(weekStart, []);
          }
          weekMap.get(weekStart)!.push(goal);
        });

        state.weekGoals = Array.from(weekMap.entries()).map(([weekStart, weekGoals]) => {
          const weekStartDate = new Date(weekStart);
          const weekEndDate = new Date(weekStartDate);
          weekEndDate.setDate(weekStartDate.getDate() + 6);
          
          return {
            weekStart,
            weekEnd: weekEndDate.toISOString().split('T')[0],
            goals: weekGoals,
          };
        });
      })
      .addCase(getAllGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get weekly goal
      .addCase(getWeeklyGoal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWeeklyGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        const goals = action.payload;
        if (goals.length > 0) {
          const weekStart = goals[0].weekStartDate.split('T')[0];
          const weekEnd = goals[0].weekEndDate.split('T')[0];
          
          const existingWeekIndex = state.weekGoals.findIndex(
            week => week.weekStart === weekStart
          );
          
          if (existingWeekIndex >= 0) {
            state.weekGoals[existingWeekIndex].goals = goals;
          } else {
            state.weekGoals.push({
              weekStart,
              weekEnd,
              goals,
            });
          }
        }
      })
      .addCase(getWeeklyGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentWeekOffset,
  clearError,
  organizeGoalsByWeek,
} = goalSlice.actions;

export default goalSlice.reducer;
