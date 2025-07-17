require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB =require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/fishermen", require("./routes/fishermanRoutes"));
app.use("/api/supplies", require("./routes/fishSupplyRoutes"));
app.use("/api/sales", require("./routes/fishSaleRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))