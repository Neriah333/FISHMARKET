// controllers/fishSupplyController.js
const FishSupply = require("../models/FishSupply");

exports.createSupply = async (req, res) => {
  try {
    const supply = await FishSupply.create({
      ...req.body,
      fisherman: req.user.id, // Optional: attach current user
    });
    res.status(201).json(supply);
  } catch (error) {
    console.error("Error creating fish supply:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllSupplies = async (req, res) => {
  try {
    const supplies = await FishSupply.find().populate("fisherman");
    res.json(supplies);
  } catch (error) {
    console.error("Error fetching supplies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMySupplies = async (req, res) => {
  try {
    const supplies = await FishSupply.find({ fisherman: req.user.id });
    res.json(supplies);
  } catch (error) {
    console.error("Error fetching your supplies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
