// routes/transactionRoutes.js
const express = require("express");
const {
  createTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Admin only: view all transactions
router.get("/", protect, authorize(["admin"]), getAllTransactions);

// Admin only: create, update, delete
router.post("/", protect, authorize(["admin"]), createTransaction);
router.put("/:id", protect, authorize(["admin"]), updateTransaction);
router.delete("/:id", protect, authorize(["admin"]), deleteTransaction);

module.exports = router;
