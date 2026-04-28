import { useNavigate, useLocation } from "react-router-dom";
import { Home, MessageSquare } from "lucide-react";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-100 px-2 py-1.5 pb-safe flex items-center shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] z-40">
      <button 
        className={`flex-1 flex flex-col items-center justify-center py-2 gap-1 rounded-xl transition-colors ${
          location.pathname === "/" ? "text-slate-900" : "text-slate-400 hover:bg-slate-50"
        }`}
        onClick={() => navigate("/")}
      >
        <Home className={`w-6 h-6 ${location.pathname === "/" ? "fill-slate-100" : ""}`} />
        <span className="text-[10px] font-medium">首页</span>
      </button>
      
      <button 
        className={`flex-1 flex flex-col items-center justify-center py-2 gap-1 rounded-xl transition-colors ${
          location.pathname === "/chat" ? "text-slate-900" : "text-slate-400 hover:bg-slate-50"
        }`}
        onClick={() => navigate("/chat")}
      >
        <MessageSquare className={`w-6 h-6 ${location.pathname === "/chat" ? "fill-slate-100" : ""}`} />
        <span className="text-[10px] font-medium">对话</span>
      </button>
    </div>
  );
}
