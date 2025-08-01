const express = require("express");
const {
  createMessage,
  getAllMessages,
  getMyMessages,
  deleteMessage,
} = require("../controllers/contactController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Fisherman: send and view their messages
router.post("/", protect, authorize(["fisherman"]), createMessage);
router.get("/me", protect, authorize(["fisherman"]), getMyMessages);

// Admin & Accountant: view all messages
router.get("/", protect, authorize(["admin", "accountant"]), getAllMessages);

// Admin can delete any; Fisherman can delete only their own
router.delete("/:id", protect, authorize(["fisherman", "admin"]), deleteMessage);

module.exports = router;
