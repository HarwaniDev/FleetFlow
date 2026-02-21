import { Card, CardContent } from "@/components/ui/card"
import { Wrench } from "lucide-react"

export function MaintenancePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-[#101828]">Operating & Maintenance</h1>
      <Card className="border-[#e5e7eb] shadow-sm">
        <CardContent className="py-12 flex flex-col items-center justify-center gap-2 text-center">
          <Wrench className="size-10 text-[#9ca3af]" />
          <p className="text-sm font-medium text-[#4a5565]">No maintenance data yet</p>
          <p className="text-xs text-[#6a7282]">Metrics and history will appear here when available.</p>
        </CardContent>
      </Card>
    </div>
  )
}
