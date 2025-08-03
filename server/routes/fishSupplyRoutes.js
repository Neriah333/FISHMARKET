const express = require("express");
const {
  createSupply,
  getAllSupplies,
  getSupplyById,
  getMySupplies,
  updateSupply,
  deleteSupply,
} = require("../controllers/fishSupplyController");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Fisherman: view only their supplies
router.get("/me", protect, getMySupplies);

// Admin/Agent: view all supplies
router.get("/", protect, authorize(["fisherman", "agent", "admin"]), getAllSupplies);

// Admin/Agent: single supply
router.get("/:id", protect, authorize(["agent", "admin"]), getSupplyById);

// Admin/Agent: create, update, delete
router.post("/", protect, authorize(["agent", "admin"]), createSupply);
router.put("/:id", protect, authorize(["agent", "admin"]), updateSupply);
router.delete("/:id", protect, authorize(["agent", "admin"]), deleteSupply);

module.exports = router;
