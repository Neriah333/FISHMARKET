const express = require("express");
const {
  createTransaction,
  getAllTransactions,
  getMyTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Fisherman: view only their transactions
router.get("/me", protect, authorize(["fisherman", "accountant", "admin"]), getMyTransactions);

// Admin & Accountant: view all transactions
router.get("/", protect, authorize(["accountant", "admin"]), getAllTransactions);

// Admin only: create, update, delete
router.post("/", protect, authorize(["admin"]), createTransaction);
router.put("/:id", protect, authorize(["admin"]), updateTransaction);
router.delete("/:id", protect, authorize(["admin"]), deleteTransaction);

module.exports = router;

