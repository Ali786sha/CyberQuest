const Badge = require("../models/Badge");

exports.createBadge = async (req, res) => {
  try {
    const badge = await Badge.create(req.body);
    res.status(201).json(badge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBadges = async (req, res) => {
  try {
    const badges = await Badge.find();
    res.status(200).json(badges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
