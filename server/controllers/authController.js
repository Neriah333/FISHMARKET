const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ====================== REGISTER ======================
exports.register = async (req, res) => {
  const { fullname, email, contact, password, confirmPassword, role } = req.body;

  try {
    console.log("Incoming signup data:", req.body);

    // 1. Check required fields
    if (!fullname || !email || !contact || !password || !confirmPassword || !role) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // 2. Password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 3. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🚀 During development, allow admin signup
    // In production, you can restrict this:
    // if (role === "admin") return res.status(403).json({ message: "Admin registration not allowed" });

    // 5. Create new user
    const user = await User.create({
      fullName: fullname, 
      email,
      contact,
      password,
      role,
    });

    // 6. Respond with token
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      contact: user.contact,
      role: user.role,
      token: generateToken(user._id, user.role),
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ====================== LOGIN ======================
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      contact: user.contact,
      role: user.role,
      token: generateToken(user._id, user.role),
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
