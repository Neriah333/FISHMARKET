const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// Public endpoints
router.post("/signup", register); // Users select role here
router.post("/login", login);

module.exports = router;
