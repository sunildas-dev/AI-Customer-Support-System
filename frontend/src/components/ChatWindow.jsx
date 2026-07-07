import MessageBubble from "./MessageBubble";

function ChatWindow({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          sender={msg.sender}
          message={msg.message}
        />
      ))}
    </div>
  );
}

export default ChatWindow;