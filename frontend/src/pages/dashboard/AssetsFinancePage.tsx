import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, Wrench, DollarSign, TrendingUp, FileDown, FileSpreadsheet } from "lucide-react"
import { getAuthRole } from "@/lib/authStorage"
import { cn } from "@/lib/utils"

const KPIS = [
  { label: "Fleet Utilization", value: "84%", icon: Truck, bar: 84 },
  { label: "Maintenance Alerts", value: "3", icon: Wrench },
  { label: "Monthly Expenses", value: "$87.5k", icon: DollarSign },
  { label: "ROI", value: "18.5%", icon: TrendingUp },
]

const TABS = [
  { id: "vehicle" as const, label: "Vehicle Overview & Maintenance", icon: Truck },
  { id: "financial" as const, label: "Financial Highlights", icon: DollarSign },
]

const FUEL_COSTS_DATA = [
  { week: "Week 1", value: 8500 },
  { week: "Week 2", value: 9200 },
  { week: "Week 3", value: 8800 },
  { week: "Week 4", value: 9500 },
]

const EXPENSE_BREAKDOWN = [
  { category: "Fuel", value: 24000 },
  { category: "Maintenance", value: 12000 },
  { category: "Insurance", value: 8000 },
  { category: "Salaries", value: 34000 },
  { category: "Other", value: 6000 },
]
const EXPENSE_TOTAL = 87500

const DETAILED_EXPENSES = [
  { category: "Fuel", percent: "29.0", amount: 25400 },
  { category: "Maintenance", percent: "14.6", amount: 12800 },
  { category: "Insurance", percent: "9.7", amount: 8500 },
  { category: "Salaries", percent: "40.2", amount: 35200 },
  { category: "Other", percent: "6.4", amount: 5600 },
]

const BAR_CHART_MAX = 36000

export function AssetsFinancePage() {
  const role = getAuthRole()
  const isFinancialAnalyst = role === "Financial Analyst"
  const [activeTab, setActiveTab] = useState<"vehicle" | "financial">(
    isFinancialAnalyst ? "financial" : "vehicle"
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#101828] tracking-tight">
        Assets & Finance
      </h1>

      {!isFinancialAnalyst && (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {KPIS.map(({ label, value, icon: Icon, bar }) => (
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
          <div className="flex justify-end">
            <Button className="gap-2 text-[#155dfc] bg-transparent hover:bg-[#eff6ff]">
              Add Vehicle
            </Button>
          </div>
        </>
      )}

      {activeTab === "financial" && (
        <div className="space-y-6">
          {/* Financial Overview header + period */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#101828]">
              Financial Overview
            </h2>
            <div className="h-9 px-3 rounded-lg border-2 border-[#2b7fff] bg-white shadow-sm flex items-center text-sm text-[#101828]">
              Past month
            </div>
          </div>

          {/* ROI card */}
          <Card
            className="border border-[#e9d4ff] rounded-xl overflow-hidden shadow-sm"
            style={{
              background: "linear-gradient(168.49deg, #faf5ff 0%, #eff6ff 100%)",
            }}
          >
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-[#101828]">
                Return on Investment (ROI)
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-[#4a5565]">Revenue</p>
                  <p className="text-2xl font-bold text-[#00a63e]">$125k</p>
                </div>
                <div>
                  <p className="text-sm text-[#4a5565]">Expenses</p>
                  <p className="text-2xl font-bold text-[#e7000b]">$88k</p>
                </div>
                <div>
                  <p className="text-sm text-[#4a5565]">Profit</p>
                  <p className="text-2xl font-bold text-[#9810fa]">$37.5k</p>
                </div>
              </div>
              <div className="pt-4 border-t border-[#e9d4ff] flex items-center justify-between">
                <p className="text-base text-[#364153]">Return on Investment</p>
                <p className="text-3xl font-bold text-[#9810fa]">18.5%</p>
              </div>
            </CardContent>
          </Card>

          {/* Fuel Costs (Past Month) */}
          <Card className="border border-[#e5e7eb] rounded-xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#101828]">
                  Fuel Costs (Past Month)
                </h3>
                <button
                  type="button"
                  className="size-5 text-[#6a7282] hover:text-[#101828]"
                  aria-label="Export"
                >
                  <FileSpreadsheet className="size-5" />
                </button>
              </div>
              <div className="h-[250px] w-full">
                <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((y, i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={y * 180}
                      x2="400"
                      y2={y * 180}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                  ))}
                  {[0, 0.33, 0.66, 1].map((x, i) => (
                    <line
                      key={i}
                      x1={x * 380}
                      y1="0"
                      x2={x * 380}
                      y2="180"
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                  ))}
                  {/* Line chart: 8500–9500 range → ~15–5% from top */}
                  <polyline
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={FUEL_COSTS_DATA.map((d, i) => {
                      const x = 40 + (i / (FUEL_COSTS_DATA.length - 1)) * 320
                      const y = 180 - ((d.value - 8000) / 2000) * 160
                      return `${x},${y}`
                    }).join(" ")}
                  />
                  {FUEL_COSTS_DATA.map((d, i) => {
                    const x = 40 + (i / (FUEL_COSTS_DATA.length - 1)) * 320
                    const y = 180 - ((d.value - 8000) / 2000) * 160
                    return (
                      <circle
                        key={d.week}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#f97316"
                      />
                    )
                  })}
                </svg>
              </div>
              <div className="flex justify-between text-xs text-[#6b7280] mt-1">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
            </CardContent>
          </Card>

          {/* Expense Breakdown (Past Month) */}
          <Card className="border border-[#e5e7eb] rounded-xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#101828]">
                  Expense Breakdown (Past Month)
                </h3>
                <span className="text-sm text-[#6a7282]">
                  Total: ${EXPENSE_TOTAL.toLocaleString()}
                </span>
              </div>
              <div className="h-[250px] flex items-end gap-3 px-2">
                {EXPENSE_BREAKDOWN.map(({ category, value }) => (
                  <div
                    key={category}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-full max-w-[80px] rounded-t bg-[#155dfc]"
                      style={{
                        height: `${(value / BAR_CHART_MAX) * 100}%`,
                        minHeight: 8,
                      }}
                    />
                    <span className="text-xs text-[#6b7280] text-center">
                      {category}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-4 text-xs text-[#6b7280]">
                <span>0</span>
                <span>9000</span>
                <span>18000</span>
                <span>27000</span>
                <span>36000</span>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Expenses */}
          <Card className="border border-[#e5e7eb] rounded-xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#101828]">
                  Detailed Expenses
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-[#155dfc] hover:bg-[#eff6ff]"
                >
                  <FileDown className="size-4" />
                  Export Report
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                {DETAILED_EXPENSES.map(({ category, percent, amount }) => (
                  <div
                    key={category}
                    className="flex items-center justify-between rounded-lg border border-[#e5e7eb] px-4 py-3"
                  >
                    <div>
                      <p className="font-medium text-[#101828]">{category}</p>
                      <p className="text-sm text-[#6a7282]">
                        {percent}% of total
                      </p>
                    </div>
                    <p className="text-xl font-bold text-[#101828]">
                      ${amount.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
