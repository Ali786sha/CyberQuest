const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String,
  pointsRequired: Number
});

module.exports = mongoose.model("Badge", badgeSchema);
