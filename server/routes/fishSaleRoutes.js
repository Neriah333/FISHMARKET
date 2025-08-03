const express = require("express");
const {
  createSale,
  getAllSales,
  getSaleById,
  getMySales,
  updateSale,
  deleteSale,
} = require("../controllers/fishSaleController");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Fisherman: view only their own sales
router.get("/me", protect, getMySales);

// Get a single sale by ID
router.get("/:id", protect, authorize(["agent", "admin"]), getSaleById);



// Admin/Accountant: view all sales
router.get("/", protect, authorize(["agent", "admin"]), getAllSales);

// Admin/Accountant: create, update, delete
router.post("/", protect, authorize(["agent", "admin"]), createSale);
router.put("/:id", protect, authorize(["agent", "admin"]), updateSale);
router.delete("/:id", protect, authorize(["agent", "admin"]), deleteSale);

module.exports = router;

