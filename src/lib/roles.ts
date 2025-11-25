/**
 * Role management utilities
 * Reads user role from Appwrite users collection
 */

import { databases, DB_ID, COLLECTIONS } from "./appwrite";

export type UserRole = "villager" | "distributor" | "admin";

export interface AppwriteUser {
  $id: string;
  telegramId: string;
  name: string;
  role: UserRole;
  lineIds?: string[]; // For distributors: which lines they manage
  createdAt: string;
  updatedAt: string;
}

/**
 * Get user by Telegram ID
 */
export async function getUserByTelegramId(
  telegramId: string
): Promise<AppwriteUser | null> {
  try {
    // Assuming telegramId is used as document ID or we query by it
    const doc = await databases.getDocument(
      DB_ID,
      COLLECTIONS.USERS,
      telegramId
    );
    return doc as unknown as AppwriteUser;
  } catch {
    return null;
  }
}

/**
 * Check if user has required role
 */
export function hasRole(user: AppwriteUser | null, requiredRole: UserRole): boolean {
  if (!user) return false;
  
  const roleHierarchy: Record<UserRole, number> = {
    villager: 1,
    distributor: 2,
    admin: 3,
  };
  
  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
}

/**
 * Check if user is a distributor for a specific line
 */
export function isDistributorForLine(
  user: AppwriteUser | null,
  lineId: string
): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;
  if (user.role === "distributor" && user.lineIds?.includes(lineId)) return true;
  return false;
}
