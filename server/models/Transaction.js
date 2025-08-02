

// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    fisherman: { type: mongoose.Schema.Types.ObjectId, ref: "Fisherman", required: true },
    fishSale: { type: mongoose.Schema.Types.ObjectId, ref: "FishSale", required: true },
    transactionDate: { type: Date, required: true },
    paymentAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
