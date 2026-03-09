const express = require("express");
const router = express.Router();
const {
  createBadge,
  getBadges
} = require("../controllers/badgeController");

router.post("/", createBadge);
router.get("/", getBadges);

module.exports = router;
