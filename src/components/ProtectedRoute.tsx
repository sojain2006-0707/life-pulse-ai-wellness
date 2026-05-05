import { ReactNode } from "react";
import AuthGuard from "./AuthGuard";
import { useAuth } from "@/lib/auth-context";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthGuard />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
