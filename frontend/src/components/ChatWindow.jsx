import MessageBubble from "./MessageBubble";

function ChatWindow({ messages, isTyping }) {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          sender={msg.sender}
          message={msg.message}
        />
      ))}

      {isTyping && (
        <div className="flex mb-4 justify-start">
          <div className="bg-white px-4 py-3 rounded-2xl shadow-md text-gray-500 italic">
            🤖 AI is typing...
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;