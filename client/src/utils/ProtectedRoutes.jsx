import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Stored during login

  // 1️⃣ Must be logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ Check if role is allowed
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3️⃣ Authorized → show the page
  return children;
}

