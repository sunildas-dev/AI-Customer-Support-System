import { LogOut, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function ChatHeader() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");

    toast.success("Logged out successfully 👋");

    setTimeout(() => {
      navigate("/");
    }, 500);
  }

  return (
    <div className="flex items-center justify-between bg-white border-b px-8 py-5 shadow-sm">
      <div className="flex items-center gap-3">
        <Bot className="text-blue-600" size={32} />

        <div>
          <h1 className="text-2xl font-bold">
            AI Customer Support
          </h1>

          <p className="text-sm text-gray-500">
            Ask anything about your orders, refunds & products
          </p>
        </div>
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}

export default ChatHeader;