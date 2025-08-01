const Transaction = require("../models/Transaction");

// ========== CREATE TRANSACTION (Admin Only) ==========
exports.createTransaction = async (req, res) => {
  try {
    const { fisherman, fishSale, transactionDate, paymentAmount } = req.body;

    const transaction = await Transaction.create({
      fisherman,
      fishSale,
      transactionDate,
      paymentAmount,
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ========== GET ALL TRANSACTIONS (Admin & Agent) ==========
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("fisherman")
      .populate({
        path: "fishSale",
        populate: { path: "fishSupply", populate: { path: "fisherman" } },
      })
      .sort({ transactionDate: -1 });

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ========== GET MY TRANSACTIONS (Fisherman) ==========
exports.getMyTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ fisherman: req.user.id })
      .populate("fisherman")
      .populate({
        path: "fishSale",
        populate: { path: "fishSupply", populate: { path: "fisherman" } },
      })
      .sort({ transactionDate: -1 });

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching my transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ========== UPDATE TRANSACTION (Admin Only) ==========
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("fisherman")
      .populate({
        path: "fishSale",
        populate: { path: "fishSupply", populate: { path: "fisherman" } },
      });

    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    res.json(transaction);
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ========== DELETE TRANSACTION (Admin Only) ==========
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
