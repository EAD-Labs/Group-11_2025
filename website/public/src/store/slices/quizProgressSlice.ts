import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { logoutAction } from '../logout';

export interface QuizProgress {
  _id: string;
  quizId: string;
  title: string;
  description: string;
  youtuber: string;
  startTime: string;
  submitted: boolean;
  videoId: string;
  user: string;
  questions: QuizQuestion[];
  answered: Answered[];
}

export interface Answered {
  _id: string;
  questionId: string;
  answerId: string;
  isCorrect: boolean;
  remarks: string;
}

export interface QuizQuestion {
  _id: string;
  question: string;
  options: QuizOptions[];
  timestamp: number;
}

export interface QuizOptions {
  _id: string;
  option: string;
  isCorrect: boolean;
}

interface QuizProgressState {
  quizProgress: QuizProgress[];
  loading: boolean;
  error: string | null;
}

const initialState: QuizProgressState = {
  quizProgress: [],
  loading: false,
  error: null,
};

// Async thunk for fetching quiz progress
export const fetchQuizProgress = createAsyncThunk(
  'quizProgress/fetchQuizProgress',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/quiz/fetchall`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        return data.data;
      }
      else if (!response.ok) {
        if (response.status === 401) {
          dispatch(logoutAction({ redirectTo: "/login" }) as any);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch quiz progress'
      );
    }
  }
);


const quizProgressSlice = createSlice({
  name: 'quizProgress',
  initialState,
  reducers: {
    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearQuizProgress: (state) => {
      state.quizProgress = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.quizProgress = action.payload;
        state.error = null;
      })
      .addCase(fetchQuizProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setError,
  clearQuizProgress,
} = quizProgressSlice.actions;

export default quizProgressSlice.reducer;
