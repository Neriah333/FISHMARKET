import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  try {
    // Decode JWT payload
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userRole = payload.role?.toLowerCase();

    // Role check
    if (roles && !roles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;
  } catch (err) {
    console.error("Invalid token", err);
    return <Navigate to="/login" replace />;
  }
}


