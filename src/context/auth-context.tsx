"use client";

import { AuthResponse, AuthState, AuthUser, UserRole } from "@/types/auth";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AUTH_ENDPOINT =
  process.env.NEXT_PUBLIC_AUTH_ENDPOINT ||
  "https://kaluwala-telegram.karansh491.workers.dev/auth";
const TOKEN_KEY = "kaluwala_auth_token";
const USER_KEY = "kaluwala_auth_user";

interface AuthContextValue extends AuthState {
  login: () => Promise<boolean>;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

/**
 * Safe version that doesn't throw - for optional auth checks
 */
export function useAuthSafe(): AuthContextValue | null {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    token: null,
    error: null,
  });

  // Load saved auth on mount
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    const savedUser = localStorage.getItem(USER_KEY);

    if (savedToken && savedUser) {
      try {
        const user = JSON.parse(savedUser) as AuthUser;

        // Check if token is expired (basic check)
        const payload = parseJWT(savedToken);
        if (payload && payload.exp * 1000 > Date.now()) {
          setState({
            isAuthenticated: true,
            isLoading: false,
            user,
            token: savedToken,
            error: null,
          });
          return;
        }
      } catch {
        // Invalid saved data, clear it
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }

    setState((prev) => ({ ...prev, isLoading: false }));
  }, []);

  const login = useCallback(async (): Promise<boolean> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Get Telegram WebApp initData
      const win = window as unknown as {
        Telegram?: { WebApp?: { initData?: string } };
      };
      const initData = win.Telegram?.WebApp?.initData;

      if (!initData) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Please open this app from Telegram",
        }));
        return false;
      }

      const response = await fetch(AUTH_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData }),
      });

      const data: AuthResponse = await response.json();

      if (data.success && data.token && data.user) {
        // Save to localStorage
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));

        setState({
          isAuthenticated: true,
          isLoading: false,
          user: data.user,
          token: data.token,
          error: null,
        });
        return true;
      } else {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: data.error || "Authentication failed",
        }));
        return false;
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Authentication failed";
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: message,
      }));
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      token: null,
      error: null,
    });
  }, []);

  const hasRole = useCallback(
    (requiredRole: UserRole): boolean => {
      if (!state.user) return false;

      const roleHierarchy: Record<UserRole, number> = {
        villager: 1,
        distributor: 2,
        admin: 3,
      };

      return roleHierarchy[state.user.role] >= roleHierarchy[requiredRole];
    },
    [state.user]
  );

  const getToken = useCallback((): string | null => {
    return state.token;
  }, [state.token]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        hasRole,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Parse JWT payload without verification (client-side only)
 */
function parseJWT(token: string): { exp: number } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
}

export default AuthProvider;
