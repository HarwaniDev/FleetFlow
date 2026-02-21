import { Navigate } from "react-router-dom"
import { getAuthToken } from "@/lib/authStorage"

/**
 * For "/": redirect to /dashboard if JWT exists, otherwise to /login.
 */
export function HomeRedirect() {
  const token = getAuthToken()
  return <Navigate to={token ? "/dashboard" : "/login"} replace />
}
