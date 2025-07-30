const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const validator = require("validator");

exports.signup = async (req, res) => {
  try {
    const { fullName, email, contact, password, role } = req.body;

    // Validate required fields
    if (!fullName || !email || !contact || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Validate role
    if (!["fisherman", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    // Check for existing user
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      fullName,
      email,
      contact,
      password: hashedPassword,
      role,
    });

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      token,
      role: user.role,
      fullName: user.fullName,
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User Not Found" });

    // Match password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Incorrect password" });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      role: user.role,
      fullName: user.fullName,
    });

  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
