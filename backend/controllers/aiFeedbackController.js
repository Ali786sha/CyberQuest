const AIFeedback = require("../models/AIFeedback");

exports.createFeedback = async (req, res) => {
  try {
    const feedback = await AIFeedback.create(req.body);
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await AIFeedback.find().populate("userId");
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
