const GameSession = require("../models/GameSession");

exports.createGameSession = async (req, res) => {
  try {
    const session = await GameSession.create(req.body);
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserSessions = async (req, res) => {
  try {
    const sessions = await GameSession.find({
      userId: req.params.userId
    }).populate("scenarioId");
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
