import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoutes";
import { Toaster } from "sonner";

// ===== Public Pages =====
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ContactUs from "./pages/Contact";
import AboutUs from "./pages/About";
import SupplyPage from "./pages/Supply";
import SalesPage from "./pages/Sales";
import TransactionPage from "./pages/Transaction";
import CommunityBlog from "./pages/Community";
import Unauthorized from "./pages/Unauthorized";

// ===== User Dashboard =====
import Dashboard from "./pages/Dashboard";

// ===== Admin Dashboard =====
import AdminDashboard from "./pages/AdminDashboard";

// ===== Fishermen Management =====
import FishermanList from "./pages/admin/FishermanList";
import AddFisherman from "./pages/admin/AddFisherman";
import EditFisherman from "./pages/admin/EditFisherman";

// ===== Admin Sales =====
import SalesAdmin from "./pages/admin/SaleList";
import AddSale from "./pages/admin/AddSales";
import EditSale from "./pages/admin/EditSales";

// ===== Admin Supply =====
import SupplyAdmin from "./pages/admin/SupplyList";
import AddSupply from "./pages/admin/AddSupply";
import EditSupply from "./pages/admin/EditSupply";

// ===== Admin Transactions =====
import TransactionsAdmin from "./pages/admin/TransactionList";
import AddTransaction from "./pages/admin/AddTransaction";
import EditTransaction from "./pages/admin/EditTransaction";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      <Routes>
        {/* ===== Public Pages ===== */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/supply" element={<SupplyPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="/community" element={<CommunityBlog />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ===== User Dashboard ===== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["fisherman"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ===== Admin Dashboard ===== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ===== Fishermen Management ===== */}
        <Route
          path="/admin/fishermen"
          element={
            <ProtectedRoute roles={["admin"]}>
              <FishermanList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/fishermen/add"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AddFisherman />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/fishermen/update/:id"
          element={
            <ProtectedRoute roles={["admin"]}>
              <EditFisherman />
            </ProtectedRoute>
          }
        />

        {/* ===== Sales Management ===== */}
        <Route
          path="/admin/sales"
          element={
            <ProtectedRoute roles={["agent", "admin"]}>
              <SalesAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sales/add"
          element={
            <ProtectedRoute roles={["agent", "admin"]}>
              <AddSale />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sales/update/:id"
          element={
            <ProtectedRoute roles={["agent", "admin"]}>
              <EditSale />
            </ProtectedRoute>
          }
        />

        {/* ===== Supply Management ===== */}
        <Route
          path="/admin/supply"
          element={
            <ProtectedRoute roles={["agent", "admin"]}>
              <SupplyAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/supply/add"
          element={
            <ProtectedRoute roles={["agent", "admin"]}>
              <AddSupply />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/supply/update/:id"
          element={
            <ProtectedRoute roles={["agent", "admin"]}>
              <EditSupply />
            </ProtectedRoute>
          }
        />

        {/* ===== Transactions Management ===== */}
        <Route
          path="/admin/transactions"
          element={
            <ProtectedRoute roles={["admin"]}>
              <TransactionsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/transactions/add"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AddTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/transactions/update/:id"
          element={
            <ProtectedRoute roles={["admin"]}>
              <EditTransaction />
            </ProtectedRoute>
          }
        />

        {/* ===== Catch-all Route ===== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
