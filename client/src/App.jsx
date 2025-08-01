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
import AddFisherman from "./pages/addFisherman"; // ✅ Fixed capitalization to match import convention
import UpdateFisherman from "./pages/UpdateFisherman"; // ✅ Added Update page
import SalesAdmin from "./pages/SalesAdmin";
import AddSale from "./pages/AddSales";
import UpdateSale from "./pages/UpdateSales";
import SupplyAdmin from "./pages/SupplyAdmin";
import AddSupply from "./pages/AddSupply";
import UpdateSupply from "./pages/UpdateSupply";
import TransactionsAdmin from "./pages/TransactionsAdmin";
import AddTransaction from "./pages/AddTransaction";
import UpdateTransaction from "./pages/UpdateTransaction";
import CommunityBlog from "./pages/Community";
import Unauthorized from "./pages/Unauthorized";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      <Routes>
        {/* Public pages */}
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

        {/* Protected User Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fishermen Management */}
        <Route
          path="/admin/fishermen"
          element={
            <ProtectedRoute>
              <Fisherman />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/fishermen/add"
          element={
            <ProtectedRoute>
              <AddFisherman />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/fishermen/update/:id"
          element={
            <ProtectedRoute>
              <UpdateFisherman />
            </ProtectedRoute>
          }
        />

        {/* Admin Sections */}
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
        <Route
          path="/admin/supply/add"
          element={
            <ProtectedRoute>
              <AddSupply />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/supply/update/:id"
          element={
            <ProtectedRoute>
              <UpdateSupply />
            </ProtectedRoute>
          }
          />

          <Route
            path="/admin/sales/add"
            element={
              <ProtectedRoute>
                <AddSale />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/sales/update/:id"
            element={
              <ProtectedRoute>
                <UpdateSale />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/transactions/add"
            element={
              <ProtectedRoute>
                <AddTransaction />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/transactions/update/:id"
            element={
              <ProtectedRoute>
                <UpdateTransaction />
              </ProtectedRoute>
            }
          />


        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
