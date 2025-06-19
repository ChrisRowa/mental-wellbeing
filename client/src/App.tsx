import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Therapists from "./pages/Therapists";
import NotFound from "./pages/NotFound";
import { UserProvider, useUser } from "@/context/UserContext";
import TherapistDashboard from "./pages/TherapistDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Booking from "./pages/Booking";
import Appointments from "./pages/Appointments";

const queryClient = new QueryClient();

function ProtectedRoute({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) {
    if (user.role === "therapist") return <Navigate to="/therapist-dashboard" replace />;
    if (user.role === "admin") return <Navigate to="/admin-dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

const App = () => (
  <UserProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["user"]}><Dashboard /></ProtectedRoute>} />
            <Route path="/therapist-dashboard" element={<ProtectedRoute allowedRoles={["therapist"]}><TherapistDashboard /></ProtectedRoute>} />
            <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/booking" element={<ProtectedRoute allowedRoles={["user"]}><Booking /></ProtectedRoute>} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/therapists" element={<Therapists />} />
            <Route path="/appointments" element={<ProtectedRoute allowedRoles={["user"]}><Appointments /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </UserProvider>
);

export default App;
