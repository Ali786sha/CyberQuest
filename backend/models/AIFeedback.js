const mongoose = require("mongoose");

const aiFeedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  feedbackText: String,
  rating: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("AIFeedback", aiFeedbackSchema);
