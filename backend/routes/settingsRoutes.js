const express = require("express");
const router = express.Router();
const {
  createOrUpdateSettings
} = require("../controllers/settingsController");

router.post("/", createOrUpdateSettings);

module.exports = router;
