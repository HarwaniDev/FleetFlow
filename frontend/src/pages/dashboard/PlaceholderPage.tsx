import { useLocation } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"

export function PlaceholderPage() {
  const location = useLocation()
  const name = location.pathname.split("/").filter(Boolean).pop() ?? "Page"
  const title = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ")

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-[#101828]">{title}</h1>
      <Card className="border-[#e5e7eb] shadow-sm">
        <CardContent className="py-12 text-center text-[#4a5565]">
          Content for {title} will be implemented here.
        </CardContent>
      </Card>
    </div>
  )
}
