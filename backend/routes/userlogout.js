// import Blacklist from "../models/Blacklist.js";

// router.post("/logout", verifyToken, async (req, res) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         const expiresAt = new Date(Date.now() + 3600000); // 1 hour
//         await Blacklist.create({ token, expiresAt });
//         res.status(200).json({ message: "Logout successful" });
//     } catch (err) {
//         res.status(500).json({ message: "Logout failed", error: err.message });
//     }
// });
// routes/userlogout.js

// routes/userlogout.js
const express = require("express");
const router = express.Router();
const Blacklist = require("../models/Blacklist");
const verifyToken = require("../middleware/authMiddleware"); // 👈 same as login/register

router.post("/logout", verifyToken, async (req, res) => {
  try {
    // Get token from headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Set expiry (1 hour from now)
    const expiresAt = new Date(Date.now() + 3600000);

    // Save token in blacklist
    await Blacklist.create({ token, expiresAt });

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Logout error:", err.message);
    res.status(500).json({ message: "Logout failed", error: err.message });
  }
});

module.exports = router;