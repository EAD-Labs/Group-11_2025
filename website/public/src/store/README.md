# Redux Store Documentation

This directory contains the Redux store configuration for the GoQualify application.

## Structure

```
src/store/
├── store.ts              # Main store configuration
├── hooks.ts              # Typed Redux hooks
├── slices/               # Redux slices
│   ├── quizProgressSlice.ts  # Quiz progress management
│   └── userSlice.ts          # User authentication & profile
└── README.md             # This file
```

## Store Configuration

The main store is configured in `store.ts` and includes:

- Quiz progress management
- User authentication and profile
- Middleware configuration for serialization

## Available Slices

### QuizProgress Slice

Manages quiz progress data including:

- Quiz completion history
- Current quiz session
- Question responses and scoring
- Loading and error states

**Actions:**

- `addQuizProgress` - Add new quiz progress
- `updateQuizProgress` - Update existing quiz progress
- `setCurrentQuiz` - Set active quiz session
- `loadQuizProgress` - Load quiz progress from API
- `updateCurrentQuizQuestion` - Update question responses
- `updateCurrentQuizScore` - Update quiz scoring

### User Slice

Manages user authentication and profile data:

- User login/logout state
- Profile information
- Authentication status

**Actions:**

- `setUser` - Set user data (login)
- `clearUser` - Clear user data (logout)
- `updateUserProfile` - Update user profile
- `setAuthenticationStatus` - Set auth status

## Usage

### In Components

```tsx
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addQuizProgress, setLoading } from "../store/slices/quizProgressSlice";

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const { quizProgress, loading } = useAppSelector(
    (state) => state.quizProgress
  );

  const handleAddQuiz = (quizData) => {
    dispatch(addQuizProgress(quizData));
  };

  const handleSetLoading = (isLoading) => {
    dispatch(setLoading(isLoading));
  };

  return (
    <div>
      {loading ? "Loading..." : `Total quizzes: ${quizProgress.length}`}
    </div>
  );
};
```

### Adding New Slices

1. Create a new slice file in `slices/`
2. Add the reducer to `store.ts`
3. Export types and actions from the slice
4. Use the typed hooks in components

## TypeScript Support

The store is fully typed with TypeScript:

- `RootState` - Type for the entire store state
- `AppDispatch` - Type for the store dispatch function
- `useAppSelector` - Typed selector hook
- `useAppDispatch` - Typed dispatch hook

## Best Practices

1. Use the typed hooks (`useAppSelector`, `useAppDispatch`) instead of plain Redux hooks
2. Keep slices focused on specific domains
3. Use action creators for all state changes
4. Handle loading and error states in slices
5. Use TypeScript interfaces for all state and action types
