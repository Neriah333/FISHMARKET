const FishSale = require("../models/FishSale");


// ================= CREATE SALE =================
exports.createSale = async (req, res) => {
  try {
    const { fishSupply, saleDate, saleAmount } = req.body;

    const sale = await FishSale.create({ fishSupply, saleDate, saleAmount });

    // ✅ Populate before sending back
    await sale.populate({
      path: "fishSupply",
      populate: { path: "fisherman", model: "Fisherman" },
    });

    res.status(201).json(sale);
  } catch (error) {
    console.error("Error creating sale:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Get All Sales (Admin/Accountant)
exports.getAllSales = async (req, res) => {
  try {
    const sales = await FishSale.find()
      .populate({
        path: "fishSupply",
        populate: { path: "fisherman", select: "name"} // ✅ deep populate
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
    // Ensure req.user is available
    const sales = await FishSale.find()
      .populate({
        path: "fishSupply",
        populate: { path: "fisherman", select: "name" }
      });

    // ✅ Filter by logged-in user
    const mySales = (sales || []).filter(
      (sale) => sale.fishSupply?.fisherman?._id.toString() === req.user.id
    );

    res.json(mySales);
  } catch (err) {
    console.error("Error fetching my sales:", err);
    res.status(500).json({ message: "Failed to fetch my sales" });
  }
};
// ================= GET SINGLE SALE =================
exports.getSaleById = async (req, res) => {
  try {
    const sale = await FishSale.findById(req.params.id)
      .populate({
        path: "fishSupply",
        populate: { path: "fisherman", model: "Fisherman" },
      });

    if (!sale) return res.status(404).json({ message: "Sale not found" });

    res.json(sale);
  } catch (error) {
    console.error("Error fetching sale:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// ================= UPDATE SALE =================
exports.updateSale = async (req, res) => {
  try {
    const sale = await FishSale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate({
      path: "fishSupply",
      populate: { path: "fisherman", model: "Fisherman" },
    });

    if (!sale) return res.status(404).json({ message: "Sale not found" });

    res.json(sale);
  } catch (error) {
    console.error("Error updating sale:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// ================= DELETE SALE =================
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
