/**
 * Authenticated fetch helper for API calls
 * Automatically includes JWT token and handles 401 errors
 */

const TOKEN_KEY = "kaluwala_auth_token";

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

/**
 * Make an authenticated API request
 */
export async function authFetch<T = unknown>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { skipAuth, ...fetchOptions } = options;

  const headers = new Headers(fetchOptions.headers);

  if (!skipAuth) {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  if (!headers.has("Content-Type") && fetchOptions.body) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (response.status === 401) {
    // Token expired or invalid
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("kaluwala_auth_user");
    throw new AuthError("Session expired. Please login again.", 401);
  }

  if (response.status === 403) {
    throw new AuthError(
      "You don't have permission to perform this action.",
      403
    );
  }

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Request failed" }));
    throw new AuthError(error.error || "Request failed", response.status);
  }

  return response.json();
}

/**
 * Custom error class for auth-related errors
 */
export class AuthError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = "AuthError";
  }
}

/**
 * Get the current auth token (for manual use)
 */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Check if user is authenticated (quick check without context)
 */
export function isAuthenticated(): boolean {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const payload = JSON.parse(atob(parts[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
