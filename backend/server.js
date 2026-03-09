
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const axios = require("axios");

// Load env variables
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// Test route
app.get("/", (req, res) => {
  res.send("CyberQuest Backend Running 🚀");
});

// ================= ROUTES =================
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/ai-feedback", require("./routes/aiFeedbackRoutes"));
app.use("/api/badges", require("./routes/badgeRoutes"));
app.use("/api/game-sessions", require("./routes/gameSessionRoutes"));
app.use("/api/scenarios", require("./routes/scenarioRoutes"));
app.use("/api/scores", require("./routes/scoreRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/leaderboard", require("./routes/leaderboardRoutes"));

const authRoutes = require("./routes/authRoutes");
app.use("/api/user", authRoutes);

//ai chatbot 
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message; // ✅ YEH LINE MISSING HAI

    const response = await axios.post(
 "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        contents: [
          {
            parts: [{ text: userMessage }],
          },
        ],
      },
      {
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );

    const botReply =
      response.data.candidates[0].content.parts[0].text;

    res.json({ reply: botReply });

  } catch (error) {
    console.error("Gemini Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// Other routes
const logoutRoute = require("./routes/logout");
app.use("/api/logout", logoutRoute);

// // user logout route
// const userlogoutRoute = require("./routes/userlogout");
// app.use("/api/user", userlogoutRoute); // 👈 final endpoint: POST /api/user/logout


// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
