const express = require("express");
const router = express.Router();

// POST /api/logout
router.post("/", (req, res) => {
  // Just respond, frontend should delete token
  res.status(200).json({ message: "User logged out successfully" });
});

module.exports = router;
