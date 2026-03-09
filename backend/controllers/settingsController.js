const Settings = require("../models/Settings");
// models\Setting.js

exports.createOrUpdateSettings = async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { userId: req.body.userId },
      req.body,
      { new: true, upsert: true }
    );
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
