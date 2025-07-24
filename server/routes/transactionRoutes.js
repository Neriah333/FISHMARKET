const express = require("express");
const { createTransaction, getAllTransactions } = require("../controllers/transactionController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, authorize(["agent", "admin"]), createTransaction);
router.get("/", protect, authorize(["agent", "admin"]), getAllTransactions);

module.exports = router;
