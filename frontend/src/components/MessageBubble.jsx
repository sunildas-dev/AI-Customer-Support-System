import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MessageBubble({ message, sender }) {
  const isUser = sender === "user";

  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-md whitespace-pre-wrap ${
          isUser
            ? "bg-blue-600 text-white rounded-br-sm"
            : "bg-white text-gray-800 rounded-bl-sm"
        }`}
      >
        {isUser ? (
          message
        ) : (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;