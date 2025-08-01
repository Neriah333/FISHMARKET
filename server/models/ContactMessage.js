const mongoose = require("mongoose");

const ContactMessageSchema = new mongoose.Schema({
  fisherman: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Fisherman", 
    required: true 
  },
  subject: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model("ContactMessage", ContactMessageSchema);
