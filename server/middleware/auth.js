const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure User model has a 'role' field

// Verify JWT
exports.protect = async (req, res, next) => {
  let token;

  console.log("🔹 Incoming request to:", req.originalUrl); // ✅ Log endpoint being accessed
  console.log("🔹 Authorization header:", req.headers.authorization); // ✅ Log header

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log("🔹 Extracted token:", token); // ✅ Log token extracted
  }

  if (!token) {
    console.warn("⚠️ No token found in request.");
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded:", decoded); // ✅ Log decoded payload

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      console.warn("⚠️ User not found for token ID:", decoded.id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ Authenticated user:", req.user.email, "| Role:", req.user.role); // ✅ Log user and role
    next();
  } catch (error) {
    console.error("❌ JWT Error:", error.message); // ✅ Log JWT failure reason
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

// Restrict access by role
exports.authorize = (roles) => {
  return (req, res, next) => {
    console.log("🔹 Checking role for:", req.user.role, "| Allowed roles:", roles); // ✅ Log role check
    if (!roles.includes(req.user.role)) {
      console.warn("⚠️ Forbidden: User role not allowed.");
      return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }
    next();
  };
};
