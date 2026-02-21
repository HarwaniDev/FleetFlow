import { useCallback } from "react"
import { getAuthToken, setAuthToken as setStorageToken, clearAuthToken as clearStorageToken } from "@/lib/authStorage"

export function useAuth() {
  const token = getAuthToken()
  const isAuthenticated = Boolean(token)

  const setToken = useCallback((value: string) => {
    setStorageToken(value)
  }, [])

  const clearToken = useCallback(() => {
    clearStorageToken()
  }, [])

  return { token, isAuthenticated, setToken, clearToken }
}
