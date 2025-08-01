const express = require("express");
const {
  createFisherman,
  getAllFishermen,
  getMyFisherman,
  updateFisherman,
  deleteFisherman,
} = require("../controllers/fishermanController");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Fisherman: view only their own profile
router.get("/me", protect, authorize(["fisherman", "accountant", "admin"]), getMyFisherman);

// Admin & Accountant: view all fishermen
router.get("/all", protect, authorize(["accountant", "admin"]), getAllFishermen);

// Admin only: create, update, delete
router.post("/", protect, authorize(["admin"]), createFisherman);
router.put("/:id", protect, authorize(["admin"]), updateFisherman);
router.delete("/:id", protect, authorize(["admin"]), deleteFisherman);

module.exports = router;

