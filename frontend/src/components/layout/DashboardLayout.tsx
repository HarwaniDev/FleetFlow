import { Outlet, useLocation, NavLink, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Car,
  Route,
  DollarSign,
  Shield,
  UserPlus,
  Search,
  BellRing,
  User,
  PlusCircle,
} from "lucide-react"
import { clearAuthToken, getAuthRole } from "@/lib/authStorage"
import { cn } from "@/lib/utils"

const FULL_NAV_ITEMS = [
  { to: "/dashboard", label: "Command Center", icon: LayoutDashboard },
  { to: "/dashboard/trips", label: "Trips & Drivers", icon: Route },
  { to: "/dashboard/assets-finance", label: "Assets & Finance", icon: DollarSign },
  { to: "/dashboard/compliance", label: "Compliance & Safety", icon: Shield },
  { to: "/dashboard/fleet-requests", label: "Fleet Requests", icon: UserPlus },
] as const

const DISPATCHER_NAV_ITEMS = FULL_NAV_ITEMS.slice(0, 2)

/** Command Center + Compliance & Safety only (Figma Safety Officer) */
const SAFETY_OFFICER_NAV_ITEMS = [
  { to: "/dashboard", label: "Command Center", icon: LayoutDashboard },
  { to: "/dashboard/compliance", label: "Compliance & Safety", icon: Shield },
] as const

/** Assets & Finance only (Figma Financial Analyst) */
const FINANCIAL_ANALYST_NAV_ITEMS = [
  { to: "/dashboard/assets-finance", label: "Assets & Finance", icon: DollarSign },
] as const

function getPageTitle(pathname: string, role: string | null): string {
  if (pathname === "/dashboard" || pathname === "/dashboard/") return "Command Center"
  if (pathname.startsWith("/dashboard/trips")) return "Trips & Drivers"
  if (pathname.startsWith("/dashboard/assets-finance"))
    return role === "Financial Analyst" ? "Financial Highlights" : "Assets & Finance"
  if (pathname.startsWith("/dashboard/compliance")) return "Compliance & Safety"
  if (pathname.startsWith("/dashboard/fleet-requests")) return "Fleet Requests"
  if (pathname.startsWith("/dashboard/drivers")) return "Driver Profile"
  return "Dashboard"
}

export function DashboardLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const role = getAuthRole()
  const isDispatcher = role === "Dispatcher"
  const isSafetyOfficer = role === "Safety Officer"
  const isFinancialAnalyst = role === "Financial Analyst"
  const navItems = isFinancialAnalyst
    ? FINANCIAL_ANALYST_NAV_ITEMS
    : isSafetyOfficer
      ? SAFETY_OFFICER_NAV_ITEMS
      : isDispatcher
        ? DISPATCHER_NAV_ITEMS
        : FULL_NAV_ITEMS
  const roleLabel = isFinancialAnalyst
    ? "Financial Analyst"
    : isSafetyOfficer
      ? "Safety Officer"
      : isDispatcher
        ? "Dispatcher"
        : "Fleet Manager"
  const breadcrumb = isFinancialAnalyst
    ? "FleetFlow / Financial Analyst"
    : isSafetyOfficer
      ? "FleetFlow / Safety Officer"
      : isDispatcher
        ? "FleetFlow / Dispatcher"
        : "FleetFlow"
  const pageTitle = getPageTitle(location.pathname, role)

  function handleLogout() {
    clearAuthToken()
    navigate("/login", { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] flex">
      {/* Sidebar - matches Figma: 256px, nav gap-1, item h-11 rounded-lg */}
      <aside className="w-64 shrink-0 bg-white border-r border-[#e5e7eb] flex flex-col">
        <div className="h-[72px] border-b border-[#e5e7eb] flex items-center px-6 gap-3 shrink-0">
          <div
            className="size-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#155dfc" }}
          >
            <Car className="size-5 text-white" />
          </div>
          <span className="font-bold text-[#101828] text-xl tracking-tight">FleetFlow</span>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 h-11 pl-3 pr-3 rounded-lg text-base font-medium transition-colors",
                  isActive
                    ? "bg-[#eff6ff] text-[#155dfc]"
                    : "text-[#364153] hover:bg-[#f3f4f6] hover:text-[#101828]"
                )
              }
            >
              <Icon className="size-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-[#e5e7eb] p-3">
          <div className="flex items-center gap-3 rounded-lg bg-[#f9fafb] px-3 py-3">
            <div
              className="size-8 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#155dfc" }}
            >
              <User className="size-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[#101828] truncate">
                {roleLabel}
              </p>
              <p className="text-xs text-[#6a7282] truncate">{roleLabel}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 shrink-0 bg-white border-b border-[#e5e7eb] flex items-center justify-between gap-4 px-6">
          <div className="flex flex-col justify-center min-w-0">
            <p className="text-sm text-[#6a7282] truncate">{breadcrumb}</p>
            <p className="text-lg font-semibold text-[#101828] truncate">{pageTitle}</p>
          </div>
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#6a7282]" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] text-sm text-[#101828] placeholder:text-[#6a7282] focus:outline-none focus:ring-2 focus:ring-[#155dfc]/30 focus:border-[#155dfc]"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-[#4a5565]">
              <BellRing className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-[#155dfc] border-[#155dfc]/30"
            >
              <PlusCircle className="size-4" />
              Add widget
            </Button>
            <button
              type="button"
              className="flex items-center justify-center size-9 rounded-full bg-[#e5e7eb] text-[#4a5565] shrink-0"
              aria-label="User menu"
            >
              <User className="size-4" />
            </button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
