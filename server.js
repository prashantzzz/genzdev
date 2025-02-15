require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(req.body.prompt);
    res.json(await result.response.text());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
