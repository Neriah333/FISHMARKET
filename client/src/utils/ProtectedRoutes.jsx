import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role")?.toLowerCase(); // normalize

  // Must be logged in
  if (!token) return <Navigate to="/login" replace />;

  // Role check
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}


