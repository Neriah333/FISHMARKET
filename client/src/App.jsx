import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoutes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ContactUs from "./pages/Contact";
import AboutUs from "./pages/About";
import { Toaster } from "sonner";
import SupplyPage from "./pages/Supply";
import SalesPage from "./pages/Sales";
import TransactionPage from "./pages/Transaction";
import AdminDashboard from "./pages/AdminDashboard";
import Fisherman from "./pages/Fisherman";
import SalesAdmin from "./pages/SalesAdmin";
import SupplyAdmin from "./pages/SupplyAdmin";
import TransactionsAdmin from "./pages/TransactionsAdmin";
import Unauthorized from "./pages/Unauthorized";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Public pages */}
        <Route path="/supply" element={<SupplyPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />


        {/* Protected user dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard & Sections */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/fishermen"
          element={
            <ProtectedRoute>
              <Fisherman />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sales"
          element={
            <ProtectedRoute>
              <SalesAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/supply"
          element={
            <ProtectedRoute>
              <SupplyAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/transactions"
          element={
            <ProtectedRoute>
              <TransactionsAdmin />
            </ProtectedRoute>
          }
        />

        {/* Catch-all: redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
