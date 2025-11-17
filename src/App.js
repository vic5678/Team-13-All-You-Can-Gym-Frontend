import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SubscriptionPackages from "./pages/SubscriptionPackages";
import SubscriptionPackage from "./pages/SubscriptionPackage"; // Import the new Plan page
import Gyms from "./pages/Gyms";
import Activity from "./pages/Activity";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import PaymentPage from "./pages/PaymentPage";
import AdminHome from "./pages/AdminHome";
import EditSession1 from "./pages/EditSession1";
import EditSession from "./pages/EditSession";
import CreateSession from "./pages/CreateSession";
import AdminSessions from "./pages/AdminSessions";
import SubscriptionManagement from "./pages/SubscriptionManagement";
import SearchGyms from "./pages/SearchGyms";
import SearchSessions from "./pages/SearchSessions";

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
          path="/SubscriptionPackages"
          element={
            <ProtectedRoute>
              <SubscriptionPackages />
            </ProtectedRoute>
          }
        />
        <Route path="/SubscriptionPackages" element={<SubscriptionPackages />} />
        <Route path="/plan/:id" element={<SubscriptionPackage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/admin/edit-session" element={<EditSession />} />
        <Route path="/admin/sessions" element={<AdminSessions />} />
        <Route path="/admin/create-session" element={<CreateSession />} />
        <Route path="/packages/:id" element={<SubscriptionPackage />} />
        <Route
          path="/gyms"
          element={
            <ProtectedRoute>
              <Gyms />
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
        <Route
          path="/search-sessions"
          element={
            <ProtectedRoute>
              <SearchSessions />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
