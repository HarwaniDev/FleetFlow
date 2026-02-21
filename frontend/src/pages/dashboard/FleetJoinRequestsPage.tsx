import { Card, CardContent } from "@/components/ui/card"
import { UserPlus } from "lucide-react"

export function FleetJoinRequestsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-[#101828]">Fleet Join Requests</h1>
      <div className="flex gap-4 text-sm">
        <span className="text-[#6a7282]">Pending: 0</span>
        <span className="text-[#6a7282]">Approved: 0</span>
        <span className="text-[#6a7282]">Rejected: 0</span>
      </div>
      <Card className="border-[#e5e7eb] shadow-sm">
        <CardContent className="py-16 flex flex-col items-center justify-center gap-4 text-center">
          <div className="size-16 rounded-full bg-[#f3f4f6] flex items-center justify-center">
            <UserPlus className="size-8 text-[#9ca3af]" />
          </div>
          <p className="text-[#4a5565] font-medium">You have no pending requests</p>
        </CardContent>
      </Card>
    </div>
  )
}
