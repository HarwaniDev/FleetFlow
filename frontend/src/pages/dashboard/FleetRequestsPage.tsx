import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, Clock, CheckCircle, XCircle } from "lucide-react"

export function FleetRequestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#101828] tracking-tight">
          Fleet Join Requests
        </h1>
        <p className="text-base text-[#4a5565] mt-1">
          Review and manage requests to join your fleet
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border border-[#e5e7eb] rounded-xl">
          <CardContent className="p-5 flex gap-3 items-center">
            <div className="size-10 rounded-lg bg-[#fef9c3] flex items-center justify-center shrink-0">
              <Clock className="size-5 text-[#92400e]" />
            </div>
            <div>
              <p className="text-sm text-[#4a5565]">Pending Requests</p>
              <p className="text-2xl font-bold text-[#101828]">0</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-[#e5e7eb] rounded-xl">
          <CardContent className="p-5 flex gap-3 items-center">
            <div className="size-10 rounded-lg bg-[#dcfce7] flex items-center justify-center shrink-0">
              <CheckCircle className="size-5 text-[#166534]" />
            </div>
            <div>
              <p className="text-sm text-[#4a5565]">Approved</p>
              <p className="text-2xl font-bold text-[#101828]">0</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-[#e5e7eb] rounded-xl">
          <CardContent className="p-5 flex gap-3 items-center">
            <div className="size-10 rounded-lg bg-[#fee2e2] flex items-center justify-center shrink-0">
              <XCircle className="size-5 text-[#991b1b]" />
            </div>
            <div>
              <p className="text-sm text-[#4a5565]">Rejected</p>
              <p className="text-2xl font-bold text-[#101828]">0</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-[#e5e7eb] rounded-xl">
        <div className="px-6 pt-6 pb-4 border-b border-[#e5e7eb]">
          <h2 className="text-lg font-semibold text-[#101828]">Pending Requests</h2>
        </div>
        <CardContent className="py-16 flex flex-col items-center justify-center gap-4 text-center">
          <div className="size-12 rounded-full bg-[#f3f4f6] flex items-center justify-center">
            <UserPlus className="size-6 text-[#9ca3af]" />
          </div>
          <p className="text-base text-[#4a5565]">No pending requests</p>
        </CardContent>
      </Card>
    </div>
  )
}
