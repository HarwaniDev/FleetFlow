const AUTH_TOKEN_KEY = "fleetflow_jwt"

/** JWT role claim values from backend: Manager | Dispatcher | Safety Officer | Financial Analyst */
export type AuthRole = "Manager" | "Dispatcher" | "Safety Officer" | "Financial Analyst"

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/")
  const pad = base64.length % 4
  if (pad) base64 += "====".slice(0, 4 - pad)
  return atob(base64)
}

function base64UrlEncode(str: string): string {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

/**
 * Decodes the JWT payload (no signature verification) and returns the role claim.
 * Returns null if token is missing, invalid, or has no role.
 */
export function getAuthRole(): AuthRole | null {
  try {
    const token = getAuthToken()
    if (!token) return null
    const parts = token.split(".")
    if (parts.length < 2) return null
    const payloadJson = base64UrlDecode(parts[1])
    const payload = JSON.parse(payloadJson) as { role?: string }
    const role = payload.role
    if (
      role === "Manager" ||
      role === "Dispatcher" ||
      role === "Safety Officer" ||
      role === "Financial Analyst"
    ) {
      return role
    }
    return null
  } catch {
    return null
  }
}

export function getAuthToken(): string | null {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  } catch {
    return null
  }
}

export function setAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

/**
 * Creates a mock JWT for development with the given role in the payload.
 * Replace with real JWT from auth API in production.
 */
export function createMockToken(role: AuthRole): string {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }))
  const payload = base64UrlEncode(JSON.stringify({ role }))
  return `${header}.${payload}.mock`
}

export function clearAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}
