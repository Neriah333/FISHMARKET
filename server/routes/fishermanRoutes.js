const express = require("express");
const {
  createFisherman,
  getAllFishermen,
  getFishermanById,  // ✅ Add this
  getMyFisherman,
  updateFisherman,
  deleteFisherman,
} = require("../controllers/fishermanController");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Fisherman: view only their own profile
router.get("/me", protect, authorize(["fisherman", "agent", "admin"]), getMyFisherman);

// Admin & Accountant: view all fishermen
router.get("/all", protect, authorize(["agent", "admin"]), getAllFishermen);

// ✅ Admin only: view single fisherman by ID
router.get("/:id", protect, authorize(["admin"]), getFishermanById);

// Admin only: create, update, delete
router.post("/", protect, authorize(["admin"]), createFisherman);
router.put("/:id", protect, authorize(["admin"]), updateFisherman);
router.delete("/:id", protect, authorize(["admin"]), deleteFisherman);

module.exports = router;

