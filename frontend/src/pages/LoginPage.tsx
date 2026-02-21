import { useState } from "react"
import { Link, useNavigate, Navigate } from "react-router-dom"
import { getAuthToken, setAuthToken } from "@/lib/authStorage"
import { login as apiLogin, ApiError } from "@/lib/api"
import type { ApiRole as ApiRoleType } from "@/lib/api/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const LOGO_ICON =
  "https://www.figma.com/api/mcp/asset/f0294db7-4544-48ed-9ae3-ec7bc5927f71"

const ROLE_TO_API: Record<string, ApiRoleType> = {
  "fleet-manager": "Manager",
  dispatcher: "Dispatcher",
  "safety-officer": "Safety Officer",
  "financial-analyst": "Financial Analyst",
}

const ROLES = [
  { value: "", label: "Select role" },
  { value: "fleet-manager", label: "Fleet Manager" },
  { value: "dispatcher", label: "Dispatcher" },
  { value: "safety-officer", label: "Safety Officer" },
  { value: "financial-analyst", label: "Financial Analyst" },
] as const

function getErrorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    if (typeof err.detail === "string") return err.detail
    if (err.detail && typeof err.detail === "object" && "detail" in err.detail)
      return String((err.detail as { detail: string }).detail)
    return err.message || "Login failed"
  }
  return err instanceof Error ? err.message : "Login failed"
}

export function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (getAuthToken()) return <Navigate to="/dashboard" replace />

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const apiRole = role ? ROLE_TO_API[role] ?? "Manager" : "Manager"
    if (!username.trim() || !password) {
      setError("Username and password are required.")
      return
    }
    setLoading(true)
    try {
      const res = await apiLogin({
        username: username.trim(),
        password,
        role: apiRole,
      })
      setAuthToken(res.access_token)
      navigate("/dashboard", { replace: true })
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center"
      style={{
        background:
          "linear-gradient(142.23deg, rgb(239, 246, 255) 0%, rgb(219, 234, 254) 100%)",
      }}
    >
      <div className="w-full max-w-[448px] flex flex-col items-center px-4 py-10">
        {/* Logo & branding */}
        <header className="flex flex-col items-center gap-4 mb-8 text-center">
          <div
            className="size-16 rounded-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#155dfc" }}
          >
            <img
              src={LOGO_ICON}
              alt=""
              className="size-8 object-contain"
            />
          </div>
          <div>
            <h1 className="text-[30px] font-bold leading-9 text-[#101828]">
              FleetFlow
            </h1>
            <p className="text-base text-[#4a5565] mt-1">
              Fleet & Logistics Management
            </p>
          </div>
        </header>

        {/* Login / Register card */}
        <Card className="w-full bg-white rounded-2xl shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] border-0 overflow-hidden">
          <CardContent className="p-0">
            {/* Tabs */}
            <div className="flex border-b border-[#e5e7eb]">
              <Link
                to="/login"
                className="flex-1 py-3 text-center text-base font-medium text-[#155dfc] border-b-2 border-[#155dfc]"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex-1 py-3 text-center text-base font-medium text-[#6a7282] hover:text-[#4a5565]"
              >
                Register
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
                  {error}
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="your-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={cn(
                    "flex h-11 w-full rounded-lg border border-[#d1d5dc] bg-[#f9fafb] px-4 py-2.5 text-base text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc]/50 focus-visible:ring-offset-2"
                  )}
                >
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="text-base font-medium text-[#4a5565]">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-base font-medium text-[#155dfc] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-lg text-base font-medium text-white"
                style={{ backgroundColor: "#155dfc" }}
              >
                {loading ? "Signing in…" : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Start Guide */}
        <Card className="w-full mt-6 bg-white rounded-xl border border-[#e5e7eb] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]">
          <CardContent className="px-4 pt-4 pb-1">
            <p className="text-sm font-medium text-[#364153] mb-2">
              Quick Start Guide:
            </p>
            <ul className="flex flex-col gap-1 text-sm text-[#4a5565] list-none space-y-0">
              <li>
                <strong className="font-semibold">Login:</strong> Enter any
                email/username and password with a role to access the system
              </li>
              <li>
                <strong className="font-semibold">Fleet Manager:</strong> Full
                access including fleet request approvals
              </li>
              <li>
                <strong className="font-semibold">Other Roles:</strong> Must
                register and wait for fleet manager approval
              </li>
              <li>
                <strong className="font-semibold">Role-Based Dashboards:</strong>{" "}
                Each role sees different modules and data
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
