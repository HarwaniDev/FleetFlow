import { useParams, Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const TABS = [
  { id: "trips", label: "Trips" },
  { id: "schedule", label: "Schedule" },
  { id: "documents", label: "Documents" },
  { id: "vehicle", label: "Vehicle" },
  { id: "earnings", label: "Earnings" },
] as const

const DRIVER_NAMES: Record<string, string> = {
  "john-doe": "John Doe",
  "john-brown": "John Brown",
}

const TRIP_SUMMARY = { total: 12, completed: 10, pending: 2 }

export function DriverProfilePage() {
  const { driverId } = useParams<{ driverId: string }>()
  const name = driverId ? DRIVER_NAMES[driverId] ?? "Unknown Driver" : "Unknown"

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/trips" className="text-sm text-[#155dfc] hover:underline">
          Back to Trips
        </Link>
      </div>
      <h1 className="text-xl font-semibold text-[#101828]">{name}</h1>

      <div className="flex gap-1 border-b border-[#e5e7eb]">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
              id === "trips"
                ? "border-[#155dfc] text-[#155dfc]"
                : "border-transparent text-[#6a7282] hover:text-[#101828]"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex gap-4 text-sm">
        <span className="text-[#6a7282]">Total: {TRIP_SUMMARY.total}</span>
        <span className="text-[#6a7282]">Completed: {TRIP_SUMMARY.completed}</span>
        <span className="text-[#6a7282]">Pending: {TRIP_SUMMARY.pending}</span>
      </div>

      <Card className="border-[#e5e7eb] shadow-sm">
        <CardContent className="p-4">
          <h3 className="font-medium text-[#101828] mb-3">Trips</h3>
          <p className="text-sm text-[#4a5565]">Trip list for this driver would appear here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
