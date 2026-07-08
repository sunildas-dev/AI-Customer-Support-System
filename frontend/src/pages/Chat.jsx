import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import API from "../services/api";

function Chat() {
  const welcomeMessage = {
    id: 1,
    sender: "ai",
    message: "Hello 👋 Welcome to AI Customer Support.",
  };

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
              id: chat._id + "-user",
              sender: "user",
              message: chat.message,
            });

            history.push({
              id: chat._id + "-ai",
              sender: "ai",
              message: chat.response,
            });
          });

          setMessages(
            history.length
              ? history
              : [
                {
                  id: 1,
                  sender: "ai",
                  message: "Hello 👋 Welcome to AI Customer Support.",
                },
              ]
          );
        }
      } catch (error) {
        console.error(error);

        setMessages([
          {
            id: 1,
            sender: "ai",
            message: "Hello 👋 Welcome to AI Customer Support.",
          },
        ]);
      }
    }

    loadHistory();
  }, []);

  // ✅ New Chat
  const startNewChat = () => {
    setMessages([welcomeMessage]);
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

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

      setIsTyping(false);

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        message: res.data.chat.response,
      };

      setMessages((prev) => [...prev, aiMessage]);

      // ❌ remove window.location.reload()
    } catch (error) {
      console.error(error);

      setIsTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          sender: "ai",
          message: "❌ Backend Error",
        },
      ]);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar onNewChat={startNewChat} />

      <div className="flex-1 flex flex-col">
        <ChatHeader />

        <ChatWindow
          messages={messages}
          isTyping={isTyping}
        />

        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;