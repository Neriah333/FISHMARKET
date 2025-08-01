const FishSale = require("../models/FIshSale");
const FishSupply = require("../models/FishSupply");

// ================= CREATE SALE (Admin/Accountant) =================
exports.createSale = async (req, res) => {
  try {
    const { fishSupply, saleDate, saleAmount } = req.body;

    // Validate supply exists
    const supply = await FishSupply.findById(fishSupply);
    if (!supply) {
      return res.status(404).json({ message: "Fish supply not found" });
    }

    const sale = await FishSale.create({
      fishSupply,
      saleDate,
      saleAmount,
    });

    res.status(201).json(sale);
  } catch (error) {
    console.error("Error creating sale:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= GET ALL SALES (Admin/Accountant) =================
exports.getAllSales = async (req, res) => {
  try {
    const sales = await FishSale.find()
      .populate({
        path: "fishSupply",
        populate: { path: "fisherman" },
      })
      .sort({ saleDate: -1 });

    res.json(sales);
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= GET MY SALES (Fisherman) =================
exports.getMySales = async (req, res) => {
  try {
    // Find supplies belonging to the logged-in fisherman
    const supplies = await FishSupply.find({ fisherman: req.user.id });
    const supplyIds = supplies.map((supply) => supply._id);

    // Find sales linked to those supplies
    const sales = await FishSale.find({ fishSupply: { $in: supplyIds } })
      .populate({
        path: "fishSupply",
        populate: { path: "fisherman" },
      })
      .sort({ saleDate: -1 });

    res.json(sales);
  } catch (error) {
    console.error("Error fetching my sales:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= UPDATE SALE (Admin/Accountant) =================
exports.updateSale = async (req, res) => {
  try {
    const sale = await FishSale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate({
      path: "fishSupply",
      populate: { path: "fisherman" },
    });

    if (!sale) return res.status(404).json({ message: "Sale not found" });

    res.json(sale);
  } catch (error) {
    console.error("Error updating sale:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= DELETE SALE (Admin/Accountant) =================
exports.deleteSale = async (req, res) => {
  try {
    const sale = await FishSale.findByIdAndDelete(req.params.id);
    if (!sale) return res.status(404).json({ message: "Sale not found" });

    res.json({ message: "Sale deleted successfully" });
  } catch (error) {
    console.error("Error deleting sale:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
