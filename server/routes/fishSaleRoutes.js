const express = require("express");
const {
  createSale,
  updateSale,
  deleteSale,
  getAllSales,
  getMySales,
} = require("../controllers/fishSaleController");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Only agent and admin can create, update, delete
router.post("/", protect, authorize(["accountant", "admin"]), createSale);
router.put("/:id", protect, authorize(["accountant", "admin"]), updateSale);
router.delete("/:id", protect, authorize(["accountant", "admin"]), deleteSale);

// Admin and agent can view all sales
router.get("/", protect, authorize(["accountant", "admin"]), getAllSales);

// Fisherman sees only his sales
router.get("/me", protect, getMySales);

module.exports = router;

