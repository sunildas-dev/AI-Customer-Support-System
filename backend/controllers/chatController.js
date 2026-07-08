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
export const getChatHistory = async (req, res) => {
  try {
    console.log("===== HISTORY API =====");
    console.log("User:", req.user);

    const chats = await Chat.find({
      user: req.user.id,
    }).sort({ createdAt: 1 });

    console.log("Chats Found:", chats.length);
    console.log(chats);

    res.status(200).json({
      success: true,
      chats,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};