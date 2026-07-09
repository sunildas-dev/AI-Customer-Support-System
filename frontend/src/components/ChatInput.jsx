import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

function ChatInput({ onSend, isTyping }) {
  const [text, setText] = useState("");

  function handleSend() {
    if (!text.trim() || isTyping) return;

    onSend(text);
    setText("");
  }

  return (
    <div className="bg-white border-t p-4">
      <div className="flex gap-3">

        <input
          type="text"
          placeholder={
            isTyping
              ? "AI is responding..."
              : "Type your message..."
          }
          value={text}
          disabled={isTyping}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />

        <button
          onClick={handleSend}
          disabled={isTyping}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-5 rounded-xl flex items-center justify-center"
        >
          {isTyping ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
        </button>

      </div>
    </div>
  );
}

export default ChatInput;