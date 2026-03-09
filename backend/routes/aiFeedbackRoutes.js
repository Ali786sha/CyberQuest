// const express = require("express");
// const router = express.Router();
// const {
//   createFeedback,
//   getAllFeedback
// } = require("../controllers/aiFeedbackController");

// router.post("/", createFeedback);
// router.get("/", getAllFeedback);

// module.exports = router;

const express = require("express");
const router = express.Router();
const axios = require("axios");

// POST /api/ai-feedback
router.post("/", async (req, res) => {
  const { userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Hugging Face API call
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/distilgpt2",
      { inputs: userMessage },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );

    const reply = response.data[0].generated_text;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "AI error occurred" });
  }
});

module.exports = router;
