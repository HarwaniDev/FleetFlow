import { Navigate } from "react-router-dom"
import { getAuthRole } from "@/lib/authStorage"
import { CommandCenterPage } from "./CommandCenterPage"

/**
 * Dashboard index: redirect Financial Analyst to Assets & Finance (Financial Highlights).
 */
export function DashboardIndex() {
  const role = getAuthRole()
  if (role === "Financial Analyst") {
    return <Navigate to="/dashboard/assets-finance" replace />
  }
  return <CommandCenterPage />
}
