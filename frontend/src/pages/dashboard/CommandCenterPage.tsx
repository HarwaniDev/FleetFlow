import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Route, Package, Users, Car, Shield, AlertTriangle, FileText } from "lucide-react"
import { getAuthRole } from "@/lib/authStorage"
import { cn } from "@/lib/utils"

const KPI_DATA = [
  { label: "Operational Compliance", value: "94%", trend: "up", color: "text-[#059669]" },
  { label: "Trips Completed", value: "28", trend: "up", color: "text-[#059669]" },
  { label: "Alerts", value: "5", trend: "down", color: "text-[#d97706]" },
  { label: "Accidents", value: "10.5%", trend: "up", color: "text-[#dc2626]" },
  { label: "Average MPG", value: "8.2", trend: "up", color: "text-[#059669]" },
  { label: "Total Revenue", value: "$45,230", trend: "up", color: "text-[#059669]" },
  { label: "Vehicles", value: "3", trend: "up", color: "text-[#059669]" },
  { label: "Drivers", value: "2", trend: "up", color: "text-[#059669]" },
] as const

const DISPATCHER_STATS = [
  { label: "Active Trips", value: "28", icon: Route, bg: "bg-[#dbeafe]" },
  { label: "Pending Cargo", value: "12", icon: Package, bg: "bg-[#fef9c2]" },
  { label: "Available Drivers", value: "35", icon: Users, bg: "bg-[#dcfce7]" },
  { label: "Available Vehicles", value: "38", icon: Car, bg: "bg-[#dcfce7]" },
] as const

const DISPATCHER_ACTIVE_TRIPS = [
  { id: "T-1001", cargo: "Electronics", driver: "John Smith", progress: 65, status: "In Progress" },
  { id: "T-1002", cargo: "Furniture", driver: "Sarah Johnson", progress: 40, status: "In Progress" },
  { id: "T-1003", cargo: "Food Products", driver: "Mike Wilson", progress: 15, status: "Dispatched" },
] as const

const REVENUE_BARS = [
  { label: "Week 1", value: 85 },
  { label: "Week 2", value: 60 },
  { label: "Week 3", value: 95 },
  { label: "Week 4", value: 70 },
  { label: "Week 5", value: 100 },
]

const FAILURE_RATE_POINTS = [4, 6, 5, 7, 5, 8, 6]
const MAX_FAILURE = 10

const SAFETY_OFFICER_KPIS = [
  { label: "Safety Score", value: "92", trend: "↑ 2 pts", icon: Shield, iconBg: "bg-[#dcfce7]", trendColor: "text-[#00a63e]" },
  { label: "Compliance Alerts", value: "3", icon: AlertTriangle, iconBg: "bg-[#ffe2e2]" },
  { label: "Incident Reports", value: "2", icon: AlertTriangle, iconBg: "bg-[#fef9c2]" },
  { label: "License Expiry", value: "5", sub: "Next 30 days", icon: FileText, iconBg: "bg-[#fef9c2]" },
] as const

const SAFETY_RECENT_ALERTS = [
  { title: "CDL License Expiring", desc: "John Smith - Expires in 15 days", variant: "warning" as const },
  { title: "Vehicle Inspection Overdue", desc: "Truck #TRK-045 - Overdue by 3 days", variant: "expired" as const },
] as const

export function CommandCenterPage() {
  const role = getAuthRole()
  const isDispatcher = role === "Dispatcher"
  const isSafetyOfficer = role === "Safety Officer"

  if (isSafetyOfficer) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#101828] tracking-tight">Command Center</h1>
          <p className="text-base text-[#4a5565] mt-1">Safety and compliance overview</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAFETY_OFFICER_KPIS.map(({ label, value, trend, icon: Icon, iconBg, trendColor, sub }) => (
            <Card key={label} className="border border-[#e5e7eb] rounded-xl shadow-sm overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("rounded-lg size-12 flex items-center justify-center", iconBg)}>
                    <Icon className={cn("size-6", label === "Safety Score" ? "text-[#00a63e]" : "text-[#101828]")} />
                  </div>
                  {trend && <span className={cn("text-sm font-medium", trendColor ?? "text-[#00a63e]")}>{trend}</span>}
                </div>
                <p className="text-sm font-medium text-[#4a5565]">{label}</p>
                <p className="text-3xl font-bold text-[#101828] mt-1">{value}</p>
                {sub && <p className="text-sm text-[#6a7282] mt-1">{sub}</p>}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border border-[#e5e7eb] rounded-xl shadow-sm overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-[#101828]">Recent Compliance Alerts</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {SAFETY_RECENT_ALERTS.map(({ title, desc, variant }) => (
              <div
                key={title}
                className={cn(
                  "flex items-center justify-between rounded-lg px-4 py-3 border",
                  variant === "warning" && "bg-[#fefce8] border-[#fff085]",
                  variant === "expired" && "bg-[#fef2f2] border-[#ffc9c9]"
                )}
              >
                <div>
                  <p className="font-medium text-[#101828]">{title}</p>
                  <p className="text-sm text-[#4a5565]">{desc}</p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-medium shrink-0",
                    variant === "warning" && "bg-[#fef9c2] border border-[#fff085] text-[#a65f00]",
                    variant === "expired" && "bg-[#ffe2e2] border border-[#ffc9c9] text-[#c10007]"
                  )}
                >
                  {variant === "warning" ? "Warning" : "Expired"}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isDispatcher) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#101828]">Command Center</h1>
          <p className="text-base text-[#4a5565] mt-1">
            Operational overview and trip management
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DISPATCHER_STATS.map(({ label, value, icon: Icon, bg }) => (
            <Card key={label} className="border border-[#e5e7eb] rounded-xl">
              <CardContent className="p-6">
                <div className={cn("rounded-lg size-12 flex items-center justify-center mb-4", bg)}>
                  <Icon className="size-6 text-[#101828]" />
                </div>
                <p className="text-sm font-medium text-[#4a5565]">{label}</p>
                <p className="text-3xl font-bold text-[#101828] mt-1">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border border-[#e5e7eb] rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-[#101828]">
              Active Trips
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {DISPATCHER_ACTIVE_TRIPS.map((trip) => (
              <div
                key={trip.id}
                className="border border-[#e5e7eb] rounded-lg p-4 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#101828]">{trip.id}</span>
                  <span className="rounded-full bg-[#dbeafe] border border-[#bedbff] px-2.5 py-1 text-xs font-medium text-[#1447e6]">
                    {trip.status}
                  </span>
                </div>
                <p className="text-sm text-[#4a5565]">{trip.cargo}</p>
                <p className="text-sm text-[#6a7282]">Driver: {trip.driver}</p>
                <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#155dfc] rounded-full transition-all"
                    style={{ width: `${trip.progress}%` }}
                  />
                </div>
                <p className="text-xs text-[#6a7282]">{trip.progress}% complete</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-[#101828]">Command Center</h1>

      {/* KPI grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {KPI_DATA.map(({ label, value, trend, color }) => (
          <Card key={label} className="border-[#e5e7eb] shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-[#6a7282] mb-1">{label}</p>
              <div className="flex items-center gap-1.5">
                <span className={cn("text-lg font-semibold", color)}>{value}</span>
                {trend === "up" ? (
                  <TrendingUp className={cn("size-4 shrink-0", color)} />
                ) : (
                  <TrendingDown className={cn("size-4 shrink-0", color)} />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-[#e5e7eb] shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-[#101828]">
              Top Revenue (Last 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-40">
              {REVENUE_BARS.map(({ label, value }) => (
                <div key={label} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t bg-[#155dfc] min-h-[4px] transition-all"
                    style={{ height: `${value}%` }}
                  />
                  <span className="text-xs text-[#6a7282]">{label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#e5e7eb] shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-[#101828]">
              Trip Failure Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 flex items-end gap-1">
              {FAILURE_RATE_POINTS.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-[#155dfc]/70 min-w-2"
                  style={{ height: `${(v / MAX_FAILURE) * 100}%` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
