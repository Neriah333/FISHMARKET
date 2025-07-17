const Fisherman = require("../models/Fisherman");

// POST /api/fisherman
exports.createFisherman = async (req, res) => {
  try {
    const fisherman = await Fisherman.create({ ...req.body, owner: req.user.id });
    res.status(201).json(fisherman);
  } catch (error) {
    console.error("Error creating fisherman:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/fisherman/me
exports.getMyFisherman = async (req, res) => {
  try {
    const fishermen = await Fisherman.find({ owner: req.user.id });
    res.json(fishermen);
  } catch (error) {
    console.error("Error fetching my fishermen:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/fisherman/all
exports.getAllFisherman = async (req, res) => {
  try {
    const fishermen = await Fisherman.find().populate("owner", "email");
    res.json(fishermen);
  } catch (error) {
    console.error("Error fetching all fishermen:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
