const mongoose = require("mongoose");

const fishsupplySchema = new mongoose.Schema(
  {
    fisherman: { type: mongoose.Schema.Types.ObjectId, ref: "Fisherman", required: true },
    quantity: { type: Number, required: true },
    pricePerUnit: { type: Number, required: true },
    catchDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FishSupply", fishsupplySchema);

