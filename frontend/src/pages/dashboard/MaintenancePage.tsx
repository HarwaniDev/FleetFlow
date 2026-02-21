import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const METRICS = [
  { label: "Overdue Maintenance", value: "1", status: "red" },
  { label: "Upcoming Maintenance", value: "2", status: "neutral" },
  { label: "Maintenance Cost", value: "$87.3K", status: "red", trend: "up" },
  { label: "Fuel Cost", value: "$18.9K", status: "red", trend: "up" },
] as const

const OPERATING = [
  { label: "Total Revenue", value: "$45,230" },
  { label: "Operational Compliance", value: "94%" },
  { label: "Fuel Consumption", value: "1,240 L" },
  { label: "Avg. Daily Mileage", value: "156 mi" },
  { label: "Fleet Utilization", value: "78%" },
] as const

const MAINTENANCE_ITEMS = [
  { title: "Brake Fluid Check", status: "Due soon", color: "bg-[#fef3c7] text-[#92400e]" },
  { title: "Vehicle Inspection", status: "Overdue", color: "bg-[#fee2e2] text-[#991b1b]" },
  { title: "Oil Change", status: "Due today", color: "bg-[#fef3c7] text-[#92400e]" },
] as const

export function MaintenancePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-[#101828]">Operating & Maintenance</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {METRICS.map(({ label, value, status }) => (
          <Card key={label} className="border-[#e5e7eb] shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-[#6a7282]">{label}</p>
              <p className={cn("text-lg font-semibold", status === "red" && "text-[#dc2626]")}>
                {value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-[#e5e7eb] shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-medium text-[#101828] mb-3">Operating Overview</h3>
            <ul className="space-y-2">
              {OPERATING.map(({ label, value }) => (
                <li key={label} className="flex justify-between text-sm">
                  <span className="text-[#4a5565]">{label}</span>
                  <span className="font-medium text-[#101828]">{value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="border-[#e5e7eb] shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-medium text-[#101828] mb-3">Upcoming & Overdue</h3>
            <ul className="space-y-2">
              {MAINTENANCE_ITEMS.map(({ title, status, color }) => (
                <li
                  key={title}
                  className="flex items-center justify-between text-sm py-1.5 px-2 rounded bg-[#f9fafb]"
                >
                  <span className="text-[#101828]">{title}</span>
                  <span className={cn("rounded px-2 py-0.5 text-xs font-medium", color)}>
                    {status}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#e5e7eb] shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <h3 className="font-medium text-[#101828] p-4 border-b border-[#e5e7eb]">
            Maintenance History
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                  <th className="text-left py-3 px-4 font-medium text-[#364153]">Vehicle</th>
                  <th className="text-left py-3 px-4 font-medium text-[#364153]">Maintenance Type</th>
                  <th className="text-left py-3 px-4 font-medium text-[#364153]">Cost</th>
                  <th className="text-left py-3 px-4 font-medium text-[#364153]">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-[#364153]">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-[#364153]">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#e5e7eb]">
                  <td className="py-3 px-4 text-[#101828]">Ford F-150</td>
                  <td className="py-3 px-4 text-[#101828]">Oil Change</td>
                  <td className="py-3 px-4 text-[#101828]">$120</td>
                  <td className="py-3 px-4 text-[#101828]">2025-02-15</td>
                  <td className="py-3 px-4">
                    <span className="rounded-full bg-[#d1fae5] px-2 py-0.5 text-xs font-medium text-[#059669]">
                      Completed
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#155dfc] text-xs">View</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
