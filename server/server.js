require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/fishermen", require("./routes/fishermanRoutes"));
app.use("/api/supplies", require("./routes/fishSupplyRoutes"));
app.use("/api/sales", require("./routes/fishSaleRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/community", require("./routes/communityRoutes")); // ✅ added

// Default route
app.get("/", (req, res) => {
  res.send("🎣 Fish Market API is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
