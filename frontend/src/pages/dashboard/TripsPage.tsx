import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, Plus, Route, Users } from "lucide-react"
import { getAuthRole } from "@/lib/authStorage"
import { cn } from "@/lib/utils"

const TABS = [
  { id: "trips" as const, label: "Trips" },
  { id: "drivers" as const, label: "Drivers" },
  { id: "fleet-join" as const, label: "Fleet Join Requests" },
] as const

const DISPATCHER_TABS = [
  { id: "trips-cargo" as const, label: "Trips & Cargo" },
  { id: "drivers" as const, label: "Drivers" },
] as const

export function TripsPage() {
  const role = getAuthRole()
  const isDispatcher = role === "Dispatcher"
  const [activeTab, setActiveTab] = useState<"trips" | "drivers" | "fleet-join">("trips")
  const [dispatcherTab, setDispatcherTab] = useState<"trips-cargo" | "drivers">("trips-cargo")

  if (isDispatcher) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#101828]">Trips & Driver Management</h1>
            <p className="text-base text-[#4a5565] mt-1">
              Manage trips, cargo assignments, and driver operations
            </p>
          </div>
          <Button className="bg-[#155dfc] hover:bg-[#155dfc]/90 shrink-0 gap-2">
            <Plus className="size-5" />
            Create Trip
          </Button>
        </div>

        <div className="border-b border-[#e5e7eb]">
          <div className="flex gap-0">
            {DISPATCHER_TABS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setDispatcherTab(id)}
                className={cn(
                  "flex-1 sm:flex-none px-6 py-4 text-base font-medium border-b-2 -mb-px transition-colors",
                  dispatcherTab === id
                    ? "border-[#155dfc] text-[#155dfc] bg-[#eff6ff]"
                    : "border-transparent text-[#4a5565] hover:text-[#101828]"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {dispatcherTab === "trips-cargo" && (
          <Card className="border border-[#e5e7eb]">
            <CardContent className="py-12 flex flex-col items-center justify-center gap-2 text-center">
              <Route className="size-10 text-[#9ca3af]" />
              <p className="text-sm font-medium text-[#4a5565]">No trips yet</p>
              <p className="text-xs text-[#6a7282]">Trips and cargo will appear here when available.</p>
            </CardContent>
          </Card>
        )}

        {dispatcherTab === "drivers" && (
          <Card className="border border-[#e5e7eb]">
            <CardContent className="py-12 flex flex-col items-center justify-center gap-2 text-center">
              <Users className="size-10 text-[#9ca3af]" />
              <p className="text-sm font-medium text-[#4a5565]">No drivers yet</p>
              <p className="text-xs text-[#6a7282]">Driver list will appear here when available.</p>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-[#101828]">Trips & Driver Management</h1>

      <div className="flex gap-1 border-b border-[#e5e7eb]">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
              activeTab === id
                ? "border-[#155dfc] text-[#155dfc]"
                : "border-transparent text-[#6a7282] hover:text-[#101828]"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === "trips" && (
        <>
          <div className="flex gap-4 text-sm text-[#6a7282]">
            <span>Total Trips: 0</span>
            <span>Completed Trips: 0</span>
            <span>Pending Trips: 0</span>
          </div>
          <div className="flex justify-end">
            <Button className="bg-[#155dfc] hover:bg-[#155dfc]/90">Add Trip</Button>
          </div>
          <Card className="border-[#e5e7eb] shadow-sm overflow-hidden">
            <CardContent className="py-12 flex flex-col items-center justify-center gap-2 text-center">
              <Route className="size-10 text-[#9ca3af]" />
              <p className="text-sm font-medium text-[#4a5565]">No trips yet</p>
              <p className="text-xs text-[#6a7282]">Trips will appear here when available.</p>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === "drivers" && (
        <>
          <div className="flex gap-4 text-sm text-[#6a7282]">
            <span>Active: 0</span>
          </div>
          <Card className="border-[#e5e7eb] shadow-sm overflow-hidden">
            <CardContent className="py-12 flex flex-col items-center justify-center gap-2 text-center">
              <Users className="size-10 text-[#9ca3af]" />
              <p className="text-sm font-medium text-[#4a5565]">No drivers yet</p>
              <p className="text-xs text-[#6a7282]">Drivers will appear here when available.</p>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === "fleet-join" && (
        <>
          <div className="flex gap-4 text-sm text-[#6a7282]">
            <span>Pending: 0</span>
            <span>Approved: 0</span>
            <span>Rejected: 0</span>
          </div>
          <Card className="border-[#e5e7eb] shadow-sm">
            <CardContent className="py-16 flex flex-col items-center justify-center gap-4 text-center">
              <div className="size-16 rounded-full bg-[#f3f4f6] flex items-center justify-center">
                <UserPlus className="size-8 text-[#9ca3af]" />
              </div>
              <p className="text-[#4a5565] font-medium">You have no pending requests</p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
