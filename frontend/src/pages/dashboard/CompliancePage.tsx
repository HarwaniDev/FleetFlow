import { Card, CardContent } from "@/components/ui/card"
import { Shield, AlertTriangle, FileText } from "lucide-react"
import { getAuthRole } from "@/lib/authStorage"
import { cn } from "@/lib/utils"

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

      <Card className="border-[#e5e7eb] shadow-sm overflow-hidden">
        <CardContent className="py-12 flex flex-col items-center justify-center gap-2 text-center">
          <Shield className="size-10 text-[#9ca3af]" />
          <p className="text-sm font-medium text-[#4a5565]">No compliance data yet</p>
          <p className="text-xs text-[#6a7282]">Alerts and KPIs will appear here when available.</p>
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
