import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export function PerformanceOverviewPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-[#101828]">Performance Overview</h1>
      <Card className="border-[#e5e7eb] shadow-sm">
        <CardContent className="py-12 flex flex-col items-center justify-center gap-2 text-center">
          <TrendingUp className="size-10 text-[#9ca3af]" />
          <p className="text-sm font-medium text-[#4a5565]">No performance data yet</p>
          <p className="text-xs text-[#6a7282]">Metrics and charts will appear here when available.</p>
        </CardContent>
      </Card>
    </div>
  )
}
