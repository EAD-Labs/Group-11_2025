import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const location = useLocation();
  if (isLoading) {
    return null;
  } else {
    if (!isAuthenticated) {
      return (
        <Navigate
          to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        />
      );
    }
    return children;
  }
}
