import Chat from "../models/Chat.js";
import model from "../config/gemini.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    // Ask Gemini AI
    const result = await model.generateContent(message);
    const aiResponse = result.response.text();

    // Save chat in MongoDB
    const chat = await Chat.create({
      user: req.user.id,
      message,
      response: aiResponse,
    });

    res.status(200).json({
      success: true,
      chat,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};