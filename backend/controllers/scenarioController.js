const Scenario = require("../models/Scenario");

exports.createScenario = async (req, res) => {
  try {
    const scenario = await Scenario.create(req.body);
    res.status(201).json(scenario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getScenarios = async (req, res) => {
  try {
    const scenarios = await Scenario.find();
    res.status(200).json(scenarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
