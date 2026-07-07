import { useState } from "react";
import { Send } from "lucide-react";

function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    onSend(text);
    setText("");
  };

  return (
    <div className="bg-white border-t p-4">
      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl"
        >
          <Send size={20} />
        </button>

      </div>
    </div>
  );
}

export default ChatInput;