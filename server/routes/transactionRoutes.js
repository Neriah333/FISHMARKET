const express = require("express");
const {
  createTransaction,
  getAllTransactions,
  getMyTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

/**
 * Fisherman: View only their transactions
 * (must be logged in)
 */
router.get("/me", protect, getMyTransactions);

/**
 * Admin/Agent: View all transactions
 */
router.get("/", protect, authorize(["admin", "agent"]), getAllTransactions);

/**
 * Admin/Agent: View single transaction by ID
 */
router.get("/:id", protect, authorize(["admin", "agent"]), getTransactionById);

/**
 * Admin/Agent: Create new transaction
 */
router.post("/", protect, authorize(["admin", "agent"]), createTransaction);

/**
 * Admin/Agent: Update a transaction
 */
router.put("/:id", protect, authorize(["admin", "agent"]), updateTransaction);

/**
 * Admin/Agent: Delete a transaction
 */
router.delete("/:id", protect, authorize(["admin", "agent"]), deleteTransaction);

module.exports = router;

