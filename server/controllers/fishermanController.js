const Fisherman = require("../models/Fisherman");

// ========== CREATE FISHERMAN (Admin Only) ==========
exports.createFisherman = async (req, res) => {
  try {
    const fisherman = await Fisherman.create(req.body);
    res.status(201).json(fisherman);
  } catch (error) {
    console.error("Error creating fisherman:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ========== GET ALL FISHERMEN (Admin & Accountant) ==========
exports.getAllFishermen = async (req, res) => {
  try {
    const fishermen = await Fisherman.find().sort({ createdAt: -1 });
    res.json(fishermen);
  } catch (error) {
    console.error("Error fetching fishermen:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// ✅ Get single fisherman by ID
exports.getFishermanById = async (req, res) => {
  try {
    const fisherman = await Fisherman.findById(req.params.id);
    if (!fisherman) return res.status(404).json({ message: "Fisherman not found" });
    res.json(fisherman);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// ========== GET MY FISHERMAN PROFILE (Fisherman) ==========
exports.getMyFisherman = async (req, res) => {
  try {
    const fisherman = await Fisherman.findById(req.user.id);
    if (!fisherman) {
      return res.status(404).json({ message: "Fisherman not found" });
    }
    res.json(fisherman);
  } catch (error) {
    console.error("Error fetching my fisherman profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ========== UPDATE FISHERMAN (Admin Only) ==========
exports.updateFisherman = async (req, res) => {
  try {
    const fisherman = await Fisherman.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!fisherman) {
      return res.status(404).json({ message: "Fisherman not found" });
    }
    res.json(fisherman);
  } catch (error) {
    console.error("Error updating fisherman:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ========== DELETE FISHERMAN (Admin Only) ==========
exports.deleteFisherman = async (req, res) => {
  try {
    const fisherman = await Fisherman.findByIdAndDelete(req.params.id);
    if (!fisherman) {
      return res.status(404).json({ message: "Fisherman not found" });
    }
    res.json({ message: "Fisherman deleted successfully" });
  } catch (error) {
    console.error("Error deleting fisherman:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
