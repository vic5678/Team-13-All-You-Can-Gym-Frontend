import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Packages from "./pages/Packages";
import SubscriptionPackage from "./pages/SubscriptionPackage"; // Import the new Plan page
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
import SubscriptionManagement from "./pages/SubscriptionManagement";
import SearchGyms from "./pages/SearchGyms";
import SubscriptionPackages from "./pages/Packages";

export default function App() {
  return (
    <div>
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
        <Route path="/packages" element={<Packages />} />
        <Route path="/plan/:id" element={<SubscriptionPackage />} />
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
        <Route
          path="/subscription-management"
          element={
            <ProtectedRoute>
              <SubscriptionManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search-gyms"
          element={
            <ProtectedRoute>
              <SearchGyms />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
