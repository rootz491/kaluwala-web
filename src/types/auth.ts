/**
 * Authentication types for Telegram Mini App
 */

export type UserRole = "villager" | "distributor" | "admin";

export interface AuthUser {
  id: string;
  telegramId: number;
  name: string;
  role: UserRole;
  username?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  expiresIn?: number;
  user?: AuthUser;
  error?: string;
}

export interface JWTPayload {
  sub: string;
  userId: string;
  telegramId: number;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  token: string | null;
  error: string | null;
}
