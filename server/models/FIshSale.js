const mongoose = require("mongoose");

const fishSaleSchema = new mongoose.Schema({
  fishSupply: { type: mongoose.Schema.Types.ObjectId, ref: "FishSupply", required: true },
  saleDate: { type: Date, required: true },
  saleAmount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("FishSale", fishSaleSchema);
