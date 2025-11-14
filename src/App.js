import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Packages from "./pages/Packages";
import Gyms from "./pages/Gyms";
import Sessions from "./pages/Sessions";
import Activity from "./pages/Activity";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import PremiumPlan from "./pages/PremiumPlan";
import PaymentPage from "./pages/PaymentPage"; 

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/packages" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> 
        <Route
          path="/packages"
          element={
            <ProtectedRoute>
              <Packages />
            </ProtectedRoute>
          }
        />
        <Route path="/premium-plan" element={<PremiumPlan />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route
          path="/gyms"
          element={
            <ProtectedRoute>
              <Gyms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sessions"
          element={
            <ProtectedRoute>
              <Sessions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activity"
          element={
            <ProtectedRoute>
              <Activity />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
