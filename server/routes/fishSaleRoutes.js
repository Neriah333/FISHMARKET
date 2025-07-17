const express = require("express");
const { createSale, getAllSales } = require("../controllers/fishSaleController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, authorize(["accountant", "admin"]), createSale);
router.get("/", protect, authorize(["accountant", "admin"]), getAllSales);

module.exports = router;
