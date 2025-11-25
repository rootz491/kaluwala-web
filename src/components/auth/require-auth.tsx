"use client";

import { useAuth, useAuthSafe } from "@/context/auth-context";
import { UserRole } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface RequireAuthProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

/**
 * Component that requires authentication to render children
 */
export function RequireAuth({
  children,
  requiredRole,
  fallback,
  redirectTo = "/telegram",
}: RequireAuthProps) {
  const { isAuthenticated, isLoading, user, hasRole, login } = useAuth();
  const router = useRouter();
  const loginAttempted = useRef(false);

  useEffect(() => {
    // Auto-login only once if we have Telegram context but not authenticated
    if (!isLoading && !isAuthenticated && !loginAttempted.current) {
      loginAttempted.current = true;
      login();
    }
  }, [isLoading, isAuthenticated, login]);

  if (isLoading) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      )
    );
  }

  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="flex flex-col items-center justify-center min-h-[200px] gap-4 p-4">
          <p className="text-muted-foreground text-center">
            Please open this app from Telegram to continue.
          </p>
          <button
            onClick={() => {
              loginAttempted.current = false;
              login();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )
    );
  }

  if (requiredRole && !hasRole(requiredRole)) {
    // User authenticated but lacks required role
    if (redirectTo) {
      router.push(redirectTo);
      return null;
    }
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] gap-2 p-4">
        <p className="text-red-500 font-medium">Access Denied</p>
        <p className="text-muted-foreground text-sm text-center">
          You need {requiredRole} permissions to access this page.
        </p>
        <p className="text-xs text-muted-foreground">
          Current role: {user?.role}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * Hook to check if user has a specific role
 */
export function useRequireRole(requiredRole: UserRole): {
  allowed: boolean;
  isLoading: boolean;
  user: ReturnType<typeof useAuth>["user"];
} {
  const auth = useAuthSafe();

  if (!auth) {
    return { allowed: false, isLoading: true, user: null };
  }

  return {
    allowed: auth.hasRole(requiredRole),
    isLoading: auth.isLoading,
    user: auth.user,
  };
}

export default RequireAuth;
