import { Outlet } from "react-router-dom"
import { NavLink, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Car,
  Route,
  Wrench,
  DollarSign,
  Bell,
  FileText,
  Settings,
  Search,
  BellRing,
  User,
  PlusCircle,
} from "lucide-react"
import { clearAuthToken } from "@/lib/authStorage"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/vehicles", label: "Vehicles", icon: Car },
  { to: "/dashboard/trips", label: "Trips & Drivers", icon: Route },
  { to: "/dashboard/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/dashboard/expenses", label: "Expenses", icon: DollarSign },
  { to: "/dashboard/reminders", label: "Reminders", icon: Bell },
  { to: "/dashboard/reports", label: "Reports", icon: FileText },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
] as const

export function DashboardLayout() {
  const navigate = useNavigate()

  function handleLogout() {
    clearAuthToken()
    navigate("/login", { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-white border-r border-[#e5e7eb] flex flex-col">
        <div className="p-4 border-b border-[#e5e7eb] flex items-center gap-2">
          <div
            className="size-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#155dfc" }}
          >
            <Car className="size-4 text-white" />
          </div>
          <span className="font-semibold text-[#101828]">FleetFlow</span>
        </div>
        <span className="px-4 py-2 text-xs font-medium text-[#6a7282] uppercase tracking-wider">
          Command Center
        </span>
        <nav className="flex-1 px-2 py-2 flex flex-col gap-0.5">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#eff6ff] text-[#155dfc]"
                    : "text-[#4a5565] hover:bg-[#f3f4f6] hover:text-[#101828]"
                )
              }
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 shrink-0 bg-white border-b border-[#e5e7eb] flex items-center justify-between gap-4 px-6">
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
