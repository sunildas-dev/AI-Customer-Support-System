import { MessageSquarePlus, MessageCircle } from "lucide-react";

function Sidebar() {
  return (
    <div className="w-72 h-screen bg-slate-900 text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-blue-400">
          AI Support
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Customer Assistant
        </p>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg transition"
        >
          <MessageSquarePlus size={20} />
          New Chat
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-4">

        <h2 className="text-gray-400 text-sm mb-3">
          Recent Chats
        </h2>

        <div className="space-y-2">

          <button className="w-full flex items-center gap-3 bg-slate-800 hover:bg-slate-700 p-3 rounded-lg">
            <MessageCircle size={18} />
            Order Status
          </button>

          <button className="w-full flex items-center gap-3 bg-slate-800 hover:bg-slate-700 p-3 rounded-lg">
            <MessageCircle size={18} />
            Refund Request
          </button>

          <button className="w-full flex items-center gap-3 bg-slate-800 hover:bg-slate-700 p-3 rounded-lg">
            <MessageCircle size={18} />
            Product Issue
          </button>

        </div>

      </div>

      {/* Footer */}
      <div className="p-5 border-t border-slate-700">

        <p className="text-center text-gray-400 text-sm">
          AI Customer Support
        </p>

      </div>

    </div>
  );
}

export default Sidebar;