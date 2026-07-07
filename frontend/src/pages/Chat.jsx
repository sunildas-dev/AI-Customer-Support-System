import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import API from "../services/api";

function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      message: "Hello 👋 Welcome to AI Customer Support.",
    },
  ]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      message: text,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/chat/send",
        { message: text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        message: res.data.chat.response,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          message: "❌ Backend Error",
        },
      ]);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <ChatHeader />

        <ChatWindow messages={messages} />

        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;