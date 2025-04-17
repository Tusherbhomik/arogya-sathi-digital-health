
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import LoginPage from "./pages/auth/LoginPage";
import PatientHomePage from "./pages/patient/HomePage";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PharmacyDashboard from "./pages/pharmacy/PharmacyDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./context/UserContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<Layout />}>
              {/* Patient Routes */}
              <Route index element={<PatientHomePage />} />
              <Route path="health-card" element={<PatientHomePage />} />
              <Route path="medical-records" element={<PatientHomePage />} />
              <Route path="prescriptions" element={<PatientHomePage />} />
              
              {/* Doctor Routes */}
              <Route path="doctor" element={<DoctorDashboard />} />
              <Route path="doctor/patients" element={<DoctorDashboard />} />
              <Route path="doctor/medical-records" element={<DoctorDashboard />} />
              <Route path="doctor/prescriptions" element={<DoctorDashboard />} />
              
              {/* Pharmacy Routes */}
              <Route path="pharmacy" element={<PharmacyDashboard />} />
              <Route path="pharmacy/verify" element={<PharmacyDashboard />} />
              <Route path="pharmacy/dispense" element={<PharmacyDashboard />} />
              <Route path="pharmacy/history" element={<PharmacyDashboard />} />
              
              {/* Admin Routes */}
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/users" element={<AdminDashboard />} />
              <Route path="admin/audit" element={<AdminDashboard />} />
              <Route path="admin/analytics" element={<AdminDashboard />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
