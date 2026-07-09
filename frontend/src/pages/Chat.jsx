import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import API from "../services/api";

const welcomeMessage = {
  id: "welcome",
  sender: "ai",
  message: "Hello 👋 Welcome to AI Customer Support.",
};

function Chat() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    async function loadHistory() {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/chat/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          const history = [];

          res.data.chats.forEach((chat) => {
            history.push({
              id: `${chat._id}-user`,
              sender: "user",
              message: chat.message,
            });

            history.push({
              id: `${chat._id}-ai`,
              sender: "ai",
              message: chat.response,
            });
          });

          setMessages(history.length > 0 ? history : [welcomeMessage]);
        }
      } catch (error) {
        console.error("History Error:", error);

        toast.error("Failed to load chat history");

        setMessages([welcomeMessage]);
      }
    }

    loadHistory();
  }, []);

  function startNewChat() {
    setMessages([welcomeMessage]);
  }

  async function sendMessage(text) {
    if (!text.trim() || isTyping) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: "user",
      message: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

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
        id: (Date.now() + 1).toString(),
        sender: "ai",
        message: res.data.chat.response,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Send Message Error:", error);

      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar onNewChat={startNewChat} />

      <div className="flex-1 flex flex-col">
        <ChatHeader />

        <ChatWindow
          messages={messages}
          isTyping={isTyping}
        />

        <ChatInput
          onSend={sendMessage}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
}

export default Chat;