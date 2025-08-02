const express = require("express");
const {
  createSupply,
  getAllSupplies,
  getMySupplies,
  updateSupply,
  deleteSupply,
} = require("../controllers/fishSupplyController");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Fisherman: view only their supplies
router.get("/me", protect, getMySupplies);

// Admin/Accountant: view all supplies
router.get("/", protect, authorize(["accountant", "admin"]), getAllSupplies);

// Admin/Accountant: create, update, delete
router.post("/", protect, authorize(["agent", "admin"]), createSupply);
router.put("/:id", protect, authorize(["agent", "admin"]), updateSupply);
router.delete("/:id", protect, authorize(["agent", "admin"]), deleteSupply);

module.exports = router;

