import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LoginPage } from "@/pages/LoginPage"
import { RegisterPage } from "@/pages/RegisterPage"
import { HomeRedirect } from "@/pages/HomeRedirect"
import { AuthGuard } from "@/router/guards/AuthGuard"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import {
  DashboardIndex,
  TripsPage,
  FleetRequestsPage,
  AssetsFinancePage,
  CompliancePage,
  DriverProfilePage,
} from "@/pages/dashboard"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <DashboardLayout />
            </AuthGuard>
          }
        >
          <Route index element={<DashboardIndex />} />
          <Route path="trips" element={<TripsPage />} />
          <Route path="assets-finance" element={<AssetsFinancePage />} />
          <Route path="compliance" element={<CompliancePage />} />
          <Route path="fleet-requests" element={<FleetRequestsPage />} />
          <Route path="drivers/:driverId" element={<DriverProfilePage />} />
        </Route>
        <Route path="/forgot-password" element={<div className="p-8 text-center">Forgot password — coming soon</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
