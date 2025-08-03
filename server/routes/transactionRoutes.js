const express = require("express");
const {
  createTransaction,
  getAllTransactions,
  getMyTransactions,
  getTransactionById, // make sure exported in controller
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Example correct routes:
router.get("/", protect, authorize(["admin", "agent"]), getAllTransactions);
router.get("/me", protect, getMyTransactions);
router.get("/:id", protect, authorize(["admin", "agent"]), getTransactionById); // ✅ handler is a function

router.post("/", protect, authorize(["admin", "agent"]), createTransaction);
router.put("/:id", protect, authorize(["admin", "agent"]), updateTransaction);
router.delete("/:id", protect, authorize(["admin", "agent"]), deleteTransaction);

module.exports = router;
