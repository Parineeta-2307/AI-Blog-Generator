import { generateBlog } from "./geminiService.js";

export const createBlog = async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ error: "Topic is required!" });

    const content = await generateBlog(topic);
    res.json({ content });

  } catch (error) {
    console.error("❌ Blog generation error:", error.message);
    res.status(500).json({ error: "Failed to generate blog" });
  }
};