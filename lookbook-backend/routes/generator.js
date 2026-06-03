import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { eventType, weather, bodyType } = req.body;

    const prompt = `
      You are a professional fashion stylist AI.
      Suggest a complete outfit based on:
      - Event: ${eventType}
      - Weather: ${weather}
      - Body Type: ${bodyType || "not specified"}

      Format response as:
      1. Topwear:
      2. Bottomwear:
      3. Footwear:
      4. Accessories:
      5. Style Tips:
    `;

    // ✅ This works with version 0.24.1
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const suggestion = result.response.text();

    res.json({ suggestion });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Failed to generate outfit suggestion" });
  }
});

export default router;
