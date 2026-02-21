import { useQuery } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"
import { LayoutDashboard, AlertTriangle, Wifi, WifiOff } from "lucide-react"
import { getAuthRole } from "@/lib/authStorage"
import { getHealth, queryKeys } from "@/lib/api"

export function CommandCenterPage() {
  const role = getAuthRole()
  const isDispatcher = role === "Dispatcher"
  const isSafetyOfficer = role === "Safety Officer"

  const { data: health, isError: healthError } = useQuery({
    queryKey: queryKeys.health,
    queryFn: getHealth,
    staleTime: 30 * 1000,
  })

  if (isSafetyOfficer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-2xl font-bold text-[#101828] tracking-tight">Command Center</h1>
            <p className="text-base text-[#4a5565] mt-1">Safety and compliance overview</p>
          </div>
          {health && (
            <span className="flex items-center gap-1.5 text-xs text-[#059669]">
              <Wifi className="size-3.5" /> Backend connected
            </span>
          )}
          {healthError && (
            <span className="flex items-center gap-1.5 text-xs text-[#dc2626]">
              <WifiOff className="size-3.5" /> Cannot reach backend
            </span>
          )}
        </div>
        <Card className="border border-[#e5e7eb] rounded-xl shadow-sm overflow-hidden">
          <CardContent className="py-16 flex flex-col items-center justify-center gap-2 text-center">
            <AlertTriangle className="size-10 text-[#9ca3af]" />
            <p className="text-sm font-medium text-[#4a5565]">No safety data yet</p>
            <p className="text-xs text-[#6a7282]">KPIs and compliance alerts will appear here when available.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isDispatcher) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-2xl font-bold text-[#101828]">Command Center</h1>
            <p className="text-base text-[#4a5565] mt-1">Operational overview and trip management</p>
          </div>
          {health && (
            <span className="flex items-center gap-1.5 text-xs text-[#059669]">
              <Wifi className="size-3.5" /> Backend connected
            </span>
          )}
          {healthError && (
            <span className="flex items-center gap-1.5 text-xs text-[#dc2626]">
              <WifiOff className="size-3.5" /> Cannot reach backend
            </span>
          )}
        </div>
        <Card className="border border-[#e5e7eb] rounded-xl">
          <CardContent className="py-16 flex flex-col items-center justify-center gap-2 text-center">
            <LayoutDashboard className="size-10 text-[#9ca3af]" />
            <p className="text-sm font-medium text-[#4a5565]">No dispatcher data yet</p>
            <p className="text-xs text-[#6a7282]">Active trips and stats will appear here when available.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#101828]">Command Center</h1>
        {health ? (
          <span className="flex items-center gap-1.5 text-xs text-[#059669]">
            <Wifi className="size-3.5" />
            Backend connected
          </span>
        ) : healthError ? (
          <span className="flex items-center gap-1.5 text-xs text-[#dc2626]">
            <WifiOff className="size-3.5" />
            Cannot reach backend
          </span>
        ) : null}
      </div>
      <Card className="border border-[#e5e7eb] shadow-sm">
        <CardContent className="py-16 flex flex-col items-center justify-center gap-2 text-center">
          <LayoutDashboard className="size-10 text-[#9ca3af]" />
          <p className="text-sm font-medium text-[#4a5565]">No data yet</p>
          <p className="text-xs text-[#6a7282]">KPIs and charts will appear here when available.</p>
        </CardContent>
      </Card>
    </div>
  )
}
