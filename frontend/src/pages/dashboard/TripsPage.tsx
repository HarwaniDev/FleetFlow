import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, Plus, Route, Package, Users, Car, Pencil, MapPin } from "lucide-react"
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

const DISPATCHER_STATS = [
  { label: "Active Trips", value: 2, icon: Route },
  { label: "Pending Cargo", value: 1, icon: Package },
  { label: "Available Drivers", value: 2, icon: Users },
  { label: "Available Vehicles", value: 2, icon: Car },
] as const

const DISPATCHER_TRIPS = [
  {
    id: "T-1001",
    description: "Electronics Shipment",
    weight: "2500 lbs",
    origin: "New York, NY",
    destination: "Boston, MA",
    driver: "John Smith",
    vehicle: "TRK-023",
    progress: 65,
    status: "In Progress",
  },
  {
    id: "T-1002",
    description: "Furniture Delivery",
    weight: "1800 lbs",
    origin: "Chicago, IL",
    destination: "Detroit, MI",
    driver: "Sarah Johnson",
    vehicle: "TRK-024",
    progress: 40,
    status: "In Progress",
  },
] as const

const DISPATCHER_DRIVERS = [
  {
    id: "john-smith",
    driverId: "D-001",
    name: "John Smith",
    license: "CDL-A",
    phone: "(555) 123-4567",
    tripsCompleted: 245,
    currentTrip: "T-1001",
    status: "On Duty" as const,
  },
  {
    id: "sarah-johnson",
    driverId: "D-002",
    name: "Sarah Johnson",
    license: "CDL-A",
    phone: "(555) 234-5678",
    tripsCompleted: 198,
    currentTrip: "T-1002",
    status: "On Duty" as const,
  },
  {
    id: "mike-wilson",
    driverId: "D-003",
    name: "Mike Wilson",
    license: "CDL-B",
    phone: "(555) 345-6789",
    tripsCompleted: 167,
    currentTrip: null,
    status: "Off Duty" as const,
  },
  {
    id: "emily-davis",
    driverId: "D-004",
    name: "Emily Davis",
    license: "CDL-A",
    phone: "(555) 456-7890",
    tripsCompleted: 203,
    currentTrip: null,
    status: "Off Duty" as const,
  },
] as const

const TRIPS = [
  {
    id: "TRP-001",
    driver: "John Doe",
    vehicle: "Ford F-150",
    origin: "Warehouse A",
    destination: "Site B",
    startDate: "2025-02-20",
    endDate: "2025-02-20",
    status: "Completed",
  },
]

const DRIVERS = [
  { id: "john-doe", name: "John Doe", license: "CDL-A", status: "Active", trips: 12 },
  { id: "jane-smith", name: "Jane Smith", license: "CDL-B", status: "Active", trips: 8 },
]

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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {DISPATCHER_STATS.map(({ label, value, icon: Icon }) => (
            <Card key={label} className="border border-[#e5e7eb]">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="rounded-lg bg-[#dbeafe] size-10 flex items-center justify-center shrink-0">
                  <Icon className="size-5 text-[#155dfc]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#4a5565]">{label}</p>
                  <p className="text-xl font-bold text-[#101828]">{value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
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
          <div className="space-y-4">
            {DISPATCHER_TRIPS.map((trip) => (
              <Card key={trip.id} className="border border-[#e5e7eb] overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#101828]">{trip.id}</span>
                        <span className="rounded-full bg-[#dbeafe] border border-[#bedbff] px-2.5 py-0.5 text-xs font-medium text-[#1447e6]">
                          {trip.status}
                        </span>
                      </div>
                      <Button variant="ghost" size="icon" className="text-[#4a5565] shrink-0">
                        <Pencil className="size-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-[#4a5565]">{trip.description}</p>
                    <p className="text-sm text-[#6a7282]">{trip.weight}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#6a7282]">
                      <span className="flex items-center gap-1">
                        <MapPin className="size-4 shrink-0" />
                        {trip.origin}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="size-4 shrink-0" />
                        {trip.destination}
                      </span>
                    </div>
                    <p className="text-sm text-[#6a7282]">
                      Driver: {trip.driver} · Vehicle: {trip.vehicle}
                    </p>
                    <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#155dfc] rounded-full"
                        style={{ width: `${trip.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#6a7282]">{trip.progress}% complete</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {dispatcherTab === "drivers" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DISPATCHER_DRIVERS.map((d) => (
              <Card key={d.id} className="border border-[#e5e7eb] rounded-lg">
                <CardContent className="p-5 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="rounded-full bg-[#dbeafe] size-12 flex items-center justify-center shrink-0">
                        <Users className="size-6 text-[#155dfc]" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#101828] text-lg truncate">{d.name}</p>
                        <p className="text-sm text-[#6a7282]">{d.driverId}</p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium shrink-0",
                        d.status === "On Duty"
                          ? "bg-[#dcfce7] border border-[#b9f8cf] text-[#008236]"
                          : "bg-[#f3f4f6] border border-[#e5e7eb] text-[#364153]"
                      )}
                    >
                      {d.status}
                    </span>
                  </div>
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#6a7282]">License</span>
                      <span className="text-[#101828]">{d.license}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6a7282]">Phone</span>
                      <span className="text-[#101828]">{d.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6a7282]">Trips Completed</span>
                      <span className="text-[#101828]">{d.tripsCompleted}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#6a7282]">Current Trip</span>
                      {d.currentTrip ? (
                        <Link
                          to="/dashboard"
                          className="font-medium text-[#155dfc] hover:underline"
                        >
                          {d.currentTrip}
                        </Link>
                      ) : (
                        <span className="text-[#101828]">—</span>
                      )}
                    </div>
                  </div>
                  <Link to={`/dashboard/drivers/${d.id}`} className="block">
                    <Button
                      variant="outline"
                      className="w-full border-[#d1d5dc] text-[#364153]"
                    >
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
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
            <span>Total Trips: 1</span>
            <span>Completed Trips: 1</span>
            <span>Pending Trips: 0</span>
          </div>
          <div className="flex justify-end">
            <Button className="bg-[#155dfc] hover:bg-[#155dfc]/90">Add Trip</Button>
          </div>
          <Card className="border-[#e5e7eb] shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                      <th className="text-left py-3 px-4 font-medium text-[#364153]">Trip ID</th>
                      <th className="text-left py-3 px-4 font-medium text-[#364153]">Driver</th>
                      <th className="text-left py-3 px-4 font-medium text-[#364153]">Vehicle</th>
                      <th className="text-left py-3 px-4 font-medium text-[#364153]">Origin</th>
                      <th className="text-left py-3 px-4 font-medium text-[#364153]">Destination</th>
                      <th className="text-left py-3 px-4 font-medium text-[#364153]">Start Date</th>
                      <th className="text-left py-3 px-4 font-medium text-[#364153]">End Date</th>
                      <th className="text-left py-3 px-4 font-medium text-[#364153]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRIPS.map((t) => (
                      <tr key={t.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb]">
                        <td className="py-3 px-4 text-[#101828]">{t.id}</td>
                        <td className="py-3 px-4">
                          <Link
                            to="/dashboard/drivers/john-doe"
                            className="text-[#155dfc] hover:underline"
                          >
                            {t.driver}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-[#101828]">{t.vehicle}</td>
                        <td className="py-3 px-4 text-[#101828]">{t.origin}</td>
                        <td className="py-3 px-4 text-[#101828]">{t.destination}</td>
                        <td className="py-3 px-4 text-[#101828]">{t.startDate}</td>
                        <td className="py-3 px-4 text-[#101828]">{t.endDate}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center rounded-full bg-[#d1fae5] px-2 py-0.5 text-xs font-medium text-[#059669]">
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === "drivers" && (
        <>
          <div className="flex gap-4 text-sm text-[#6a7282]">
            <span>Active: {DRIVERS.length}</span>
          </div>
          <Card className="border-[#e5e7eb] shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                      <th className="text-left py-3 px-4 font-medium text-[#364153]">Driver</th>
                      <th className="text-left py-3 px-4 font-medium text-[#364153]">License</th>
                      <th className="text-left py-3 px-4 font-medium text-[#364153]">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-[#364153]">Trips</th>
                      <th className="text-left py-3 px-4 font-medium text-[#364153]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DRIVERS.map((d) => (
                      <tr key={d.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb]">
                        <td className="py-3 px-4">
                          <Link
                            to={`/dashboard/drivers/${d.id}`}
                            className="text-[#155dfc] hover:underline font-medium"
                          >
                            {d.name}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-[#101828]">{d.license}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center rounded-full bg-[#d1fae5] px-2 py-0.5 text-xs font-medium text-[#059669]">
                            {d.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#101828]">{d.trips}</td>
                        <td className="py-3 px-4">
                          <Link
                            to={`/dashboard/drivers/${d.id}`}
                            className="text-[#155dfc] hover:underline text-xs"
                          >
                            View profile
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
