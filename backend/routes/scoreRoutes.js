const express = require("express");
const router = express.Router();
const {
  createScore,
  getUserScores,
  getLeaderboard,
  getWeeklyLeaderboard
} = require("../controllers/scoreController");

router.post("/", createScore);
router.get("/user/:userId", getUserScores);
router.get("/leaderboard", getLeaderboard);
router.get("/leaderboard/weekly", getWeeklyLeaderboard);
module.exports = router;
