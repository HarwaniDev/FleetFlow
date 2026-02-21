import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { clearAuthToken } from "@/lib/authStorage"

export function DashboardPage() {
  const navigate = useNavigate()

  function handleLogout() {
    clearAuthToken()
    navigate("/login", { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] p-6">
      <header className="flex items-center justify-between max-w-6xl mx-auto mb-8">
        <h1 className="text-2xl font-semibold text-[#101828]">Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Log out
        </Button>
      </header>
      <main className="max-w-6xl mx-auto">
        <p className="text-[#4a5565]">Welcome to FleetFlow. Dashboard content goes here.</p>
      </main>
    </div>
  )
}
