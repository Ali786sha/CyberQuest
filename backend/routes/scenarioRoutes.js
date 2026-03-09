const express = require("express");
const router = express.Router();
const {
  createScenario,
  getScenarios
} = require("../controllers/scenarioController");

router.post("/", createScenario);
router.get("/", getScenarios);

module.exports = router;
