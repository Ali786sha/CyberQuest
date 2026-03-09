const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  notificationsEnabled: {
    type: Boolean,
    default: true
  },

  theme: {
    type: String,
    default: "light"
  },

  language: {
    type: String,
    default: "en"
  }
});

module.exports = mongoose.model("Settings", settingsSchema);
