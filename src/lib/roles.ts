/**
 * Role management utilities
 * Works with JWT auth from Cloudflare Worker
 */

export type UserRole = "villager" | "distributor" | "admin";

/**
 * Check if user has required role (role hierarchy)
 */
export function hasRole(
  userRole: UserRole | undefined,
  requiredRole: UserRole
): boolean {
  if (!userRole) return false;

  const roleHierarchy: Record<UserRole, number> = {
    villager: 1,
    distributor: 2,
    admin: 3,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

/**
 * Check if user can manage a specific line
 * Distributors can only manage their assigned lines
 * Admins can manage all lines
 */
export function canManageLine(
  userRole: UserRole | undefined,
  userLineIds: string[] | undefined,
  lineId: string
): boolean {
  if (!userRole) return false;
  if (userRole === "admin") return true;
  if (userRole === "distributor" && userLineIds?.includes(lineId)) return true;
  return false;
}
