const FishSale = require("../models/FIshSale");

// POST /api/fish-sale
exports.createSale = async (req, res) => {
  try {
    const sale = await FishSale.create(req.body);
    res.status(201).json(sale);
  } catch (error) {
    console.error("Error creating sale:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/fish-sale
exports.getAllSales = async (req, res) => {
  try {
    const sales = await FishSale.find().populate({
      path: "fishSupply",
      populate: { path: "fisherman" }
    });
    res.json(sales);
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
