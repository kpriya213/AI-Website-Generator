// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Google AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// --------------------
// Generate Website Route
// --------------------
app.post("/generate", async (req, res) => {
  const { prompt, framework } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
You are an expert frontend developer and UI designer.

Create a complete responsive webpage for the following request:

${prompt}

Framework to use: ${framework}

Requirements:
- Modern UI design
- Responsive layout
- Include multiple sections if needed
- Use clean and structured HTML
- Include styling inside <style> tags
- Add smooth animations or hover effects
- Use proper spacing and typography

Typical sections may include:
- Navbar
- Hero section
- Features / Services
- Testimonials
- Pricing
- Footer

Return ONLY the code inside a single HTML file.
`,
    });

    const responseText = response.text;

    res.json({ text: responseText });
  } catch (error) {
    console.error(error);

    // Handle quota / 429 errors
    if (error.status === 429 || error.message?.includes("quota")) {
      return res.status(429).json({
        error: "Daily AI quota reached. Try again tomorrow.",
      });
    }

    res.status(500).json({ error: "AI generation failed" });
  }
});

// --------------------
// Improve Website Route
// --------------------
app.post("/improve", async (req, res) => {
  const { code, framework } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
Improve the following UI code.

Requirements:
- Better styling
- Add animations and hover effects
- Improve responsiveness
- Keep the same framework: ${framework}

Return ONLY the improved code.

Code:
${code}
`,
    });

    const responseText = response.text;

    res.json({ text: responseText });
  } catch (error) {
    console.error(error);

    // Handle quota / 429 errors
    if (error.status === 429 || error.message?.includes("quota")) {
      return res.status(429).json({
        error: "Daily AI quota reached. Try again tomorrow.",
      });
    }

    res.status(500).json({ error: "AI improvement failed" });
  }
});

// --------------------
// Start Server
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
