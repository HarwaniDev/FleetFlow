import { Navigate, useLocation } from "react-router-dom"
import { getAuthToken } from "@/lib/authStorage"

interface AuthGuardProps {
  children: React.ReactNode
}

/**
 * Protects routes that require a JWT. If no token in localStorage, redirects to /login.
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const location = useLocation()
  const token = getAuthToken()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
