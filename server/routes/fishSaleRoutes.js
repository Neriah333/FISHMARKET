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

/**
 * Fisherman: View only their own sales
 */
router.get("/me", protect, getMySales);

/**
 * Admin/Agent: View all sales
 */
router.get("/", protect, authorize(["fisherman", "agent", "admin"]), getAllSales);

/**
 * Admin/Agent: View single sale by ID
 */
router.get("/:id", protect, authorize(["agent", "admin"]), getSaleById);

/**
 * Admin/Agent: Create a sale
 */
router.post("/", protect, authorize(["agent", "admin"]), createSale);

/**
 * Admin/Agent: Update a sale
 */
router.put("/:id", protect, authorize(["agent", "admin"]), updateSale);

/**
 * Admin/Agent: Delete a sale
 */
router.delete("/:id", protect, authorize(["agent", "admin"]), deleteSale);

module.exports = router;
