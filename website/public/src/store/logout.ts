import { clearQuizProgress } from "./slices/quizProgressSlice";
import { logout as logoutAuth } from "./slices/authSlice";
import type { AppDispatch } from "./store";

export const logoutAction = ({redirectTo}: {redirectTo: string}) => {
  return async (dispatch: AppDispatch) => {
    // Logout from auth system
    await dispatch(logoutAuth());
    // Clear quiz progress
    dispatch(clearQuizProgress());
    // Redirect to login page
    window.location.href = redirectTo;
  };
};