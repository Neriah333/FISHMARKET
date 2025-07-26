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

export default function App() {
  return (
    <BrowserRouter>

    <Toaster richColors position="top-right" />
      <Routes>
        {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/supply" element={<SupplyPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}