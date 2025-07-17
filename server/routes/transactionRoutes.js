const express = require("express");
const { createTransaction, getAllTransactions } = require("../controllers/transactionController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, authorize(["accountant", "admin"]), createTransaction);
router.get("/", protect, authorize(["accountant", "admin"]), getAllTransactions);

module.exports = router;
