const FishSupply = require("../models/FishSupply");

// ================= CREATE SUPPLY (Admin/Accountant) =================
exports.createSupply = async (req, res) => {
  try {
    const { fisherman, quantity, pricePerUnit, catchDate } = req.body;

    const supply = await FishSupply.create({
      fisherman,
      quantity,
      pricePerUnit,
      catchDate,
    });

    res.status(201).json(supply);
  } catch (error) {
    console.error("Error creating supply:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= GET ALL SUPPLIES (Admin/Accountant) =================
exports.getAllSupplies = async (req, res) => {
  try {
    const supplies = await FishSupply.find()
      .populate("fisherman")
      .sort({ catchDate: -1 });

    res.json(supplies);
  } catch (error) {
    console.error("Error fetching supplies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= GET MY SUPPLIES (Fisherman) =================
exports.getMySupplies = async (req, res) => {
  try {
    const supplies = await FishSupply.find({ fisherman: req.user.id })
      .populate("fisherman")
      .sort({ catchDate: -1 });

    res.json(supplies);
  } catch (error) {
    console.error("Error fetching my supplies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSupplyById = async (req, res) => {
  try {
    const supply = await FishSupply.findById(req.params.id).populate("fisherman");
    if (!supply) {
      return res.status(404).json({ message: "Supply not found" });
    }
    res.json(supply);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// ================= UPDATE SUPPLY (Admin/Accountant) =================
exports.updateSupply = async (req, res) => {
  try {
    const supply = await FishSupply.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("fisherman");

    if (!supply) return res.status(404).json({ message: "Supply not found" });

    res.json(supply);
  } catch (error) {
    console.error("Error updating supply:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= DELETE SUPPLY (Admin/Accountant) =================
exports.deleteSupply = async (req, res) => {
  try {
    const supply = await FishSupply.findByIdAndDelete(req.params.id);
    if (!supply) return res.status(404).json({ message: "Supply not found" });

    res.json({ message: "Supply deleted successfully" });
  } catch (error) {
    console.error("Error deleting supply:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
