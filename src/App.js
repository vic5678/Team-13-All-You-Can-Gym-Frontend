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
import AdminHome from "./pages/AdminHome";
import EditSession1 from "./pages/EditSession1";
import EditSession2 from "./pages/EditSession2";
import CreateSession from "./pages/CreateSession";
import BasicPlan from "./pages/BasicPlan";
import AdminSessions from "./pages/AdminSessions";

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/Login" replace />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> 
        {/* LOGIN MUST NOT BE PROTECTED */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/Packages"
          element={
            <ProtectedRoute>
              <Packages />
            </ProtectedRoute>
          }
        />
        <Route path="/premium-plan" element={<PremiumPlan />} />
        <Route path="/basic-plan" element={<BasicPlan />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/admin/edit-session" element={<EditSession1 />} />
        <Route path="/admin/sessions" element={<AdminSessions />} />
        <Route path="/admin/edit-session2" element={<EditSession2 />} />
        <Route path="/admin/create-session" element={<CreateSession />} />
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
