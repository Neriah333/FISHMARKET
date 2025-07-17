const express = require("express");
const { createSupply, getAllSupplies, getMySupplies } = require("../controllers/fishSupplyController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, authorize(["fisherman", "admin"]), createSupply);
router.get("/me", protect, getMySupplies);
router.get("/all", protect, authorize(["admin"]), getAllSupplies);

module.exports = router;
