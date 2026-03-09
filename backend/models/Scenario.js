const mongoose = require("mongoose");

const scenarioSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"]
  }
});

module.exports = mongoose.model("Scenario", scenarioSchema);
