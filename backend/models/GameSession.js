const mongoose = require("mongoose");

const gameSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  scenarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Scenario"
  },

  score: Number,
  startedAt: Date,
  endedAt: Date
});

module.exports = mongoose.model("GameSession", gameSessionSchema);
