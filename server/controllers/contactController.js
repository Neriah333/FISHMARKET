const ContactMessage = require("../models/ContactMessage");

// Fisherman sends message
exports.createMessage = async (req, res) => {
  try {
    const message = await ContactMessage.create({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    res.status(201).json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Admin & Accountant can view all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .populate("fisherman", "name contact")
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fisherman can view only their own messages
exports.getMyMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find({ fisherman: req.user.id }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching my messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin can delete any, Fisherman can delete only their own
exports.deleteMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });

    // Check ownership or admin role
    if (message.fisherman.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this message" });
    }

    await message.deleteOne();
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
