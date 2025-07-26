const bcrypt = require("bcryptjs");
const jwt  = require("jsonwebtoken");
const User = require("../models/User");
const validator = require("validator");


// Signup Endpoint Logic
exports.signup = async (req, res) => {
try {
  const { email, password } = req.body;

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Validate password strength
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  const exists = await User.findOne({ email });
  if (exists) return res.status(400) .json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn:"1h",
  });
  res.json({ token });
} catch (error) {
  console.error("Signup error:", error);
  res.status(500).json({ message: "Internal server error"});
}
};

exports.login = async (req, res) => {
  try {
    console.log("Login request body:", req.body); // 🟡 Step 1

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("Found user:", user); // 🟡 Step 2

    if (!user) return res.status(401).json({ message: "User Not Found" });

    const match = await bcrypt.compare(password, user.password);
    console.log("Password match:", match); // 🟡 Step 3

    if (!match) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    console.log("Login error:", error); // 🟡 Final fallback
    res.status(500).json({ message: "Internal server error" });
  }
};
