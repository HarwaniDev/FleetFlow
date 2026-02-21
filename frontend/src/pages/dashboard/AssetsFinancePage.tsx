import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Truck, Wrench, DollarSign, Pencil, Trash2 } from "lucide-react"
import { getAuthRole } from "@/lib/authStorage"
import {
  getFleetKpis,
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  queryKeys,
} from "@/lib/api"
import type { VehicleResponse, VehicleCreateRequest, VehicleStatus } from "@/lib/api/types"
import { cn } from "@/lib/utils"

const TABS = [
  { id: "vehicle" as const, label: "Vehicle Overview & Maintenance", icon: Truck },
  { id: "financial" as const, label: "Financial Highlights", icon: DollarSign },
]

const VEHICLE_STATUSES: VehicleStatus[] = [
  "Available",
  "On Trip",
  "In Shop",
  "Retired",
]

const defaultForm: VehicleCreateRequest & { status?: VehicleStatus } = {
  name_model: "",
  license_plate: "",
  max_load_capacity: 0,
  odometer: 0,
  vehicle_type: "",
  region: "",
}

export function AssetsFinancePage() {
  const queryClient = useQueryClient()
  const role = getAuthRole()
  const isFinancialAnalyst = role === "Financial Analyst"
  const isManager = role === "Manager"
  const [activeTab, setActiveTab] = useState<"vehicle" | "financial">(
    isFinancialAnalyst ? "financial" : "vehicle"
  )
  const [vehicleForm, setVehicleForm] = useState<{
    open: boolean
    editing: VehicleResponse | null
    values: VehicleCreateRequest & { status?: VehicleStatus }
  }>({ open: false, editing: null, values: { ...defaultForm } })
  const [formError, setFormError] = useState<string | null>(null)

  const { data: kpis, isLoading: kpisLoading, error: kpisError } = useQuery({
    queryKey: queryKeys.manager.kpis(),
    queryFn: getFleetKpis,
    enabled: isManager,
  })

  const { data: vehicles = [], isLoading: vehiclesLoading } = useQuery({
    queryKey: queryKeys.manager.vehicles(),
    queryFn: () => getVehicles(),
    enabled: isManager && activeTab === "vehicle",
  })

  const createMutation = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.manager.all })
      setVehicleForm((f) => ({ ...f, open: false, values: { ...defaultForm } }))
      setFormError(null)
    },
    onError: (err: Error) => setFormError(err.message),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Parameters<typeof updateVehicle>[1] }) =>
      updateVehicle(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.manager.all })
      setVehicleForm((f) => ({ ...f, open: false, editing: null, values: { ...defaultForm } }))
      setFormError(null)
    },
    onError: (err: Error) => setFormError(err.message),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.manager.all })
    },
  })

  function openAddForm() {
    setFormError(null)
    setVehicleForm({
      open: true,
      editing: null,
      values: { ...defaultForm },
    })
  }

  function openEditForm(v: VehicleResponse) {
    setFormError(null)
    setVehicleForm({
      open: true,
      editing: v,
      values: {
        name_model: v.name_model,
        license_plate: v.license_plate,
        max_load_capacity: v.max_load_capacity,
        odometer: v.odometer,
        vehicle_type: v.vehicle_type ?? "",
        region: v.region ?? "",
        status: v.status,
      },
    })
  }

  function closeForm() {
    setVehicleForm((f) => ({ ...f, open: false, editing: null, values: { ...defaultForm } }))
    setFormError(null)
  }

  function handleVehicleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { editing, values } = vehicleForm
    const payload = {
      name_model: values.name_model.trim(),
      license_plate: values.license_plate.trim(),
      max_load_capacity: Number(values.max_load_capacity) || 0,
      odometer: Number(values.odometer) || 0,
      vehicle_type: values.vehicle_type?.trim() || null,
      region: values.region?.trim() || null,
    }
    if (!payload.name_model || !payload.license_plate || payload.max_load_capacity <= 0) {
      setFormError("Name/model, license plate, and max load capacity (positive) are required.")
      return
    }
    if (editing) {
      updateMutation.mutate({
        id: editing.id,
        data: { ...payload, status: values.status },
      })
    } else {
      createMutation.mutate(payload)
    }
  }

  function handleDelete(v: VehicleResponse) {
    if (window.confirm(`Delete vehicle "${v.name_model}" (${v.license_plate})?`)) {
      deleteMutation.mutate(v.id)
    }
  }

  const fleetKpiCards =
    isManager && kpis
      ? [
          {
            label: "Fleet Utilization",
            value: `${Math.round(kpis.utilization_rate * 100)}%`,
            icon: Truck,
            bar: Math.round(kpis.utilization_rate * 100),
          },
          {
            label: "Maintenance Alerts",
            value: String(kpis.maintenance_alerts),
            icon: Wrench,
            bar: null as number | null,
          },
          {
            label: "Active Fleet",
            value: String(kpis.active_fleet),
            icon: Truck,
            bar: null as number | null,
          },
        ]
      : []

  const allKpis = fleetKpiCards

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#101828] tracking-tight">
        Assets & Finance
      </h1>

      {!isFinancialAnalyst && (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {kpisLoading && isManager && (
          <Card className="border-[#e5e7eb] shadow-sm col-span-2 sm:col-span-4">
            <CardContent className="p-4 text-sm text-[#6a7282]">
              Loading fleet KPIs…
            </CardContent>
          </Card>
        )}
        {kpisError && isManager && (
          <Card className="border-red-200 shadow-sm col-span-2 sm:col-span-4">
            <CardContent className="p-4 text-sm text-red-700">
              Could not load fleet KPIs. You may need Manager access.
            </CardContent>
          </Card>
        )}
        {!kpisLoading && allKpis.map(({ label, value, icon: Icon, bar }) => (
          <Card key={label} className="border-[#e5e7eb] shadow-sm">
            <CardContent className="p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Icon className="size-5 text-[#6a7282]" />
                {bar != null && (
                  <div className="w-16 h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#155dfc]"
                      style={{ width: `${bar}%` }}
                    />
                  </div>
                )}
              </div>
              <p className="text-xs font-medium text-[#6a7282]">{label}</p>
              <p className="text-lg font-semibold text-[#101828]">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      )}

      {/* Tab buttons - no routes, client-side only */}
      <div className="flex gap-0 border-b border-[#e5e7eb]">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={cn(
              "flex items-center gap-2 px-6 py-4 text-base font-medium border-b-2 -mb-px transition-colors min-h-[57px]",
              activeTab === id
                ? "bg-[#eff6ff] border-[#155dfc] text-[#155dfc]"
                : "border-transparent text-[#4a5565] hover:bg-[#f9fafb] hover:text-[#101828]"
            )}
          >
            <Icon className="size-5 shrink-0" />
            {label}
          </button>
        ))}
      </div>

      {activeTab === "vehicle" && (
        <>
          <Card className="border-[#e5e7eb] shadow-sm">
            <CardContent className="p-4">
              <p className="text-sm text-[#4a5565]">
                Vehicle overview, upcoming maintenance, and financial highlights.
              </p>
            </CardContent>
          </Card>
          {isManager && (
            <>
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={openAddForm}
                  className="gap-2 text-[#155dfc] bg-transparent hover:bg-[#eff6ff]"
                >
                  Add Vehicle
                </Button>
              </div>

              {vehicleForm.open && (
                <Card className="border-[#e5e7eb] shadow-sm">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold text-[#101828] mb-3">
                      {vehicleForm.editing ? "Edit vehicle" : "Add vehicle"}
                    </h3>
                    <form onSubmit={handleVehicleSubmit} className="space-y-3">
                      {formError && (
                        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
                          {formError}
                        </p>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="name_model">Name / Model</Label>
                          <Input
                            id="name_model"
                            value={vehicleForm.values.name_model}
                            onChange={(e) =>
                              setVehicleForm((f) => ({
                                ...f,
                                values: { ...f.values, name_model: e.target.value },
                              }))
                            }
                            placeholder="e.g. Ford F-150"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="license_plate">License plate</Label>
                          <Input
                            id="license_plate"
                            value={vehicleForm.values.license_plate}
                            onChange={(e) =>
                              setVehicleForm((f) => ({
                                ...f,
                                values: { ...f.values, license_plate: e.target.value },
                              }))
                            }
                            placeholder="ABC-1234"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="max_load_capacity">Max load capacity (kg)</Label>
                          <Input
                            id="max_load_capacity"
                            type="number"
                            min={0}
                            step={1}
                            value={vehicleForm.values.max_load_capacity || ""}
                            onChange={(e) =>
                              setVehicleForm((f) => ({
                                ...f,
                                values: {
                                  ...f.values,
                                  max_load_capacity: Number(e.target.value) || 0,
                                },
                              }))
                            }
                            placeholder="1000"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="odometer">Odometer</Label>
                          <Input
                            id="odometer"
                            type="number"
                            min={0}
                            value={vehicleForm.values.odometer ?? ""}
                            onChange={(e) =>
                              setVehicleForm((f) => ({
                                ...f,
                                values: {
                                  ...f.values,
                                  odometer: Number(e.target.value) || 0,
                                },
                              }))
                            }
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="vehicle_type">Type (optional)</Label>
                          <Input
                            id="vehicle_type"
                            value={vehicleForm.values.vehicle_type ?? ""}
                            onChange={(e) =>
                              setVehicleForm((f) => ({
                                ...f,
                                values: { ...f.values, vehicle_type: e.target.value },
                              }))
                            }
                            placeholder="Truck, Van, etc."
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="region">Region (optional)</Label>
                          <Input
                            id="region"
                            value={vehicleForm.values.region ?? ""}
                            onChange={(e) =>
                              setVehicleForm((f) => ({
                                ...f,
                                values: { ...f.values, region: e.target.value },
                              }))
                            }
                            placeholder="e.g. North"
                          />
                        </div>
                      </div>
                      {vehicleForm.editing && (
                        <div className="space-y-1.5">
                          <Label htmlFor="status">Status</Label>
                          <select
                            id="status"
                            value={vehicleForm.values.status ?? "Available"}
                            onChange={(e) =>
                              setVehicleForm((f) => ({
                                ...f,
                                values: {
                                  ...f.values,
                                  status: e.target.value as VehicleStatus,
                                },
                              }))
                            }
                            className={cn(
                              "flex h-10 w-full rounded-lg border border-[#d1d5dc] bg-[#f9fafb] px-3 py-2 text-sm",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc]/50"
                            )}
                          >
                            {VEHICLE_STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div className="flex gap-2 pt-2">
                        <Button
                          type="submit"
                          disabled={createMutation.isPending || updateMutation.isPending}
                          className="bg-[#155dfc] hover:bg-[#155dfc]/90"
                        >
                          {vehicleForm.editing
                            ? updateMutation.isPending
                              ? "Saving…"
                              : "Save"
                            : createMutation.isPending
                              ? "Adding…"
                              : "Add vehicle"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={closeForm}
                          className="border-[#d1d5dc]"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              <Card className="border-[#e5e7eb] shadow-sm">
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold text-[#101828] mb-3">
                    Fleet vehicles
                  </h3>
                  {vehiclesLoading ? (
                    <p className="text-sm text-[#6a7282]">Loading vehicles…</p>
                  ) : vehicles.length === 0 ? (
                    <p className="text-sm text-[#6a7282]">No vehicles yet. Add one above.</p>
                  ) : (
                    <ul className="divide-y divide-[#e5e7eb]">
                      {vehicles.map((v) => (
                        <li
                          key={v.id}
                          className="py-2 flex justify-between items-center gap-2 text-sm"
                        >
                          <div className="min-w-0">
                            <span className="font-medium text-[#101828]">
                              {v.name_model}
                            </span>
                            <span className="text-[#6a7282] ml-2">
                              {v.license_plate} · {v.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="size-8 text-[#6a7282] hover:text-[#155dfc]"
                              onClick={() => openEditForm(v)}
                              aria-label="Edit"
                            >
                              <Pencil className="size-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="size-8 text-[#6a7282] hover:text-red-600"
                              onClick={() => handleDelete(v)}
                              disabled={deleteMutation.isPending}
                              aria-label="Delete"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </>
      )}

      {activeTab === "financial" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#101828]">
              Financial Overview
            </h2>
            <div className="h-9 px-3 rounded-lg border-2 border-[#2b7fff] bg-white shadow-sm flex items-center text-sm text-[#101828]">
              Past month
            </div>
          </div>

          <Card className="border border-[#e5e7eb] rounded-xl shadow-sm">
            <CardContent className="p-12 flex flex-col items-center justify-center gap-2 text-center">
              <DollarSign className="size-10 text-[#9ca3af]" />
              <p className="text-sm font-medium text-[#4a5565]">No financial data yet</p>
              <p className="text-xs text-[#6a7282]">
                Revenue, expenses, and reports will appear here when available.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
