const express = require("express");
const router = express.Router();
const {
  createGameSession,
  getUserSessions
} = require("../controllers/gameSessionController");

router.post("/", createGameSession);
router.get("/user/:userId", getUserSessions);

module.exports = router;
