import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

const METRICS = [
  { label: "Revenue", value: "$1,234", color: "text-[#059669]", trend: "up" as const },
  { label: "Expense", value: "$789", color: "text-[#dc2626]", trend: "down" as const },
  { label: "ROI", value: "$1,234", color: "text-[#155dfc]" },
  { label: "Margin", value: "10.5%", color: "text-[#dc2626]", trend: "down" as const },
] as const

const OVERVIEW_ITEMS = [
  { label: "Total", value: "$45,230" },
  { label: "Net Profit", value: "$12,400" },
  { label: "Total Expenses", value: "$18,900" },
  { label: "Total Revenue", value: "$45,230" },
  { label: "VAT", value: "$2,100" },
  { label: "Tax", value: "$1,200" },
  { label: "Labor", value: "$8,500" },
] as const

const LINE_POINTS = [30, 50, 45, 70, 65, 90, 85]
const BAR_HEIGHTS = [60, 80, 70, 90, 85]

export function PerformanceOverviewPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-[#101828]">Performance Overview</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {METRICS.map((m) => (
          <Card key={m.label} className="border-[#e5e7eb] shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-[#6a7282]">{m.label}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={cn("text-lg font-semibold", m.color)}>{m.value}</span>
                {"trend" in m && m.trend === "up" && <TrendingUp className={cn("size-4", m.color)} />}
                {"trend" in m && m.trend === "down" && <TrendingDown className={cn("size-4", m.color)} />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-[#e5e7eb] shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-[#101828]">
              Revenue (Monthly)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-end gap-1">
              {LINE_POINTS.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-[#eab308]/80 min-w-2"
                  style={{ height: `${v}%` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#e5e7eb] shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-[#101828]">
              Current Condition (Fleet/Vehicle)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-end gap-2">
              {BAR_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-[#155dfc] min-h-2"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#e5e7eb] shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-[#101828]">
            Detailed Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {OVERVIEW_ITEMS.map(({ label, value }) => (
              <li key={label} className="flex justify-between text-sm py-1">
                <span className="text-[#4a5565]">{label}</span>
                <span className="font-medium text-[#101828]">{value}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
