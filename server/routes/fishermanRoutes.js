const express = require("express");
const { createFisherman, getMyFisherman, getAllFisherman } = require("../controllers/fishermanController");
const { protect, authorize } = require("../middleware/auth");


const router = express.Router();

router.post("/", protect, authorize(["admin"]), createFisherman);
router.get("/me", protect, getMyFisherman);
router.get("/all", protect, authorize(["admin"]), getAllFisherman);

module.exports = router;
