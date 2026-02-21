import { Card, CardContent } from "@/components/ui/card"
import { Shield, Calendar, AlertTriangle, FileText } from "lucide-react"
import { getAuthRole } from "@/lib/authStorage"
import { cn } from "@/lib/utils"

const KPIS = [
  { label: "Avg Safety Score", value: "94", icon: Shield, color: "text-[#059669]" },
  { label: "Expiring Soon", value: "2", icon: Calendar, color: "text-[#d97706]" },
  { label: "Open Incidents", value: "1", icon: AlertTriangle, color: "text-[#dc2626]" },
  { label: "Total Licenses", value: "4", icon: FileText, color: "text-[#155dfc]" },
] as const

const ALERTS = [
  {
    title: "License Expiry",
    desc: "CDL License expiring in 170 days",
    meta: "Driver: Mike Wilson",
    date: "2026-02-21",
    variant: "yellow" as const,
  },
  {
    title: "Vehicle Inspection",
    desc: "Annual inspection overdue by 3 days",
    meta: "Vehicle: TRK-042",
    date: "2026-02-20",
    variant: "red" as const,
  },
  {
    title: "Hours of Service",
    desc: "Approaching maximum weekly hours",
    meta: "Driver: John Smith",
    date: "2026-02-21",
    variant: "yellow" as const,
  },
] as const

const TABS = [
  { id: "license", label: "License Tracker", icon: FileText },
  { id: "incidents", label: "Incident Reports", icon: AlertTriangle },
  { id: "safety", label: "Safety Scoreboard", icon: Shield },
] as const

export function CompliancePage() {
  const role = getAuthRole()
  const isSafetyOfficer = role === "Safety Officer"
  const subtitle = isSafetyOfficer
    ? "Monitor licenses, safety records, and incident reports"
    : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#101828] tracking-tight">
          Compliance & Safety
        </h1>
        {subtitle && <p className="text-base text-[#4a5565] mt-1">{subtitle}</p>}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {KPIS.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-[#e5e7eb] shadow-sm overflow-hidden">
            <CardContent className="p-4">
              <Icon className={cn("size-5 mb-2", color)} />
              <p className="text-xs font-medium text-[#6a7282]">{label}</p>
              <p className={cn("text-lg font-semibold", color)}>{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-[#e5e7eb] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#101828]">Compliance Alerts</h2>
          <span className="rounded-full bg-[#dc2626] px-2.5 py-0.5 text-xs font-medium text-white">
            3 Active
          </span>
        </div>
        <CardContent className="p-0">
          <ul className="divide-y divide-[#e5e7eb]">
            {ALERTS.map(({ title, desc, meta, date, variant }) => (
              <li
                key={title}
                className={cn(
                  "flex items-start gap-3 px-6 py-4",
                  variant === "red" && "bg-[#fef2f2]",
                  variant === "yellow" && "bg-[#fefce8]"
                )}
              >
                <AlertTriangle
                  className={cn(
                    "size-5 shrink-0 mt-0.5",
                    variant === "red" ? "text-[#dc2626]" : "text-[#d97706]"
                  )}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-[#101828]">{title}</p>
                  <p className="text-sm text-[#4a5565]">{desc}</p>
                  <p className="text-xs text-[#6a7282] mt-1">{meta}</p>
                </div>
                <span className="text-sm text-[#6a7282] shrink-0">{date}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex gap-1 border-b border-[#e5e7eb]">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
              id === "license"
                ? "border-[#155dfc] text-[#155dfc]"
                : "border-transparent text-[#6a7282] hover:text-[#101828]"
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
