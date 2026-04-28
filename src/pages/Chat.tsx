import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Send, Bot, User, Sparkles, TrendingUp, FileText, Activity, AlertTriangle, FileCode } from "lucide-react";

type Message = {
  id: string;
  role: "assistant" | "user";
  type: "text" | "card";
  text?: string;
  data?: any;
};

export default function Chat() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const contextQuery = searchParams.get("context");
  const urlSkill = searchParams.get("skill");

  const [query, setQuery] = useState("");
  const [showSkills, setShowSkills] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(urlSkill || "auto");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const hasInit = useRef(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const skills = [
    { id: "auto", title: "智能分配规则", icon: <Sparkles className="w-5 h-5" />, color: "text-violet-600 bg-violet-100" },
    { id: "fundamental", title: "基本面分析", icon: <TrendingUp className="w-5 h-5" />, color: "text-blue-600 bg-blue-100" },
    { id: "report", title: "财报助手", icon: <FileText className="w-5 h-5" />, color: "text-indigo-600 bg-indigo-100" },
    { id: "technical", title: "技术分析", icon: <Activity className="w-5 h-5" />, color: "text-emerald-600 bg-emerald-100" },
    { id: "risk", title: "风险扫描", icon: <AlertTriangle className="w-5 h-5" />, color: "text-rose-600 bg-rose-100" },
    { id: "custom_dividend", title: "高股息模型", icon: <FileCode className="w-5 h-5" />, color: "text-amber-600 bg-amber-100" },
  ];

  useEffect(() => {
    if (!hasInit.current) {
      hasInit.current = true;
      let initialMsg = "你好！我是 Hermes 投资助手。你可以直接向我提问，或者在左下角选择特定的分析引擎。";

      if (contextQuery) {
        initialMsg = `关于「${contextQuery}」的初步分析已完成。如果有任何细节需要深挖，或者想针对某些财务指标继续追问，请随时告诉我。`;
      } else if (urlSkill && urlSkill !== "auto") {
        const sName = skills.find(s => s.id === urlSkill)?.title;
        if (sName) initialMsg = `已为您切换至【${sName}】。请输入您想了解的股票代码、名称或具体问题。`;
      }

      setMessages([
        { id: Date.now().toString(), role: "assistant", type: "text", text: initialMsg }
      ]);
    }
  }, [contextQuery, urlSkill]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleInputResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const handleSend = () => {
    if (!query.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", type: "text", text: query };
    setMessages(prev => [...prev, userMsg]);
    setQuery("");
    setIsTyping(true);
    setShowSkills(false);

    const ta = document.getElementById("chat-textarea");
    if (ta) ta.style.height = 'auto';

    setTimeout(() => {
      const sName = skills.find(s => s.id === currentSkill)?.title || "智能路由";
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        type: "text",
        text: `收到。我正在使用【${sName}】为您分析“${userMsg.text}”，请稍候...`
      }]);

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          type: "card",
          data: {
            query: userMsg.text,
            skill: currentSkill
          }
        }]);
      }, 1500);

    }, 600);
  };

  const currentSkillObj = skills.find(s => s.id === currentSkill) || skills[0];

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden relative">
      {/* Header */}
      <div className="shrink-0 bg-slate-50/90 backdrop-blur-md z-10 px-4 py-3 pb-4 flex items-center justify-between border-b border-slate-200 shadow-sm shadow-slate-100/50">
        <div className="font-semibold text-slate-800 flex items-center gap-2 mt-1">
          <div className="bg-slate-900 text-amber-400 p-1.5 rounded-lg shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <span>Hermes 投资助手</span>
        </div>
        <div className="text-xs bg-slate-200/50 text-slate-500 font-medium px-2 py-1 rounded-md mt-1">
          Online
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        {messages.map((msg) => {
          if (msg.role === "assistant") {
            if (msg.type === "card") {
              return (
                <div key={msg.id} className="flex gap-2.5 w-full">
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0 shadow-sm border border-slate-200">
                    <Bot className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="flex-1 max-w-[85%] mt-1">
                    <div className="bg-white border border-slate-200/70 shadow-sm rounded-2xl rounded-tl-sm overflow-hidden text-[15px] text-slate-800">
                      <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-semibold text-slate-800">深度分析已完成</span>
                      </div>
                      <div className="p-3">
                        <p className="text-[14px] text-slate-600 mb-3 leading-relaxed">
                          基于大语言模型，针对「<span className="font-medium text-slate-800">{msg.data.query}</span>」的多维度数据扫描与结构化提炼已完成。
                        </p>
                        <button
                          onClick={() => navigate(`/result?q=${encodeURIComponent(msg.data.query)}&skill=${msg.data.skill}`)}
                          className="w-full bg-slate-900 text-white font-medium py-2 rounded-xl text-sm justify-center flex items-center gap-1.5 active:bg-slate-800 transition shadow-sm shadow-slate-900/20"
                        >
                          <FileText className="w-4 h-4" />
                          查看完整报告
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={msg.id} className="flex gap-2.5 w-full">
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0 shadow-sm border border-slate-200">
                  <Bot className="w-5 h-5 text-slate-700" />
                </div>
                <div className="bg-white border border-slate-200/70 shadow-sm px-4 py-3 rounded-2xl rounded-tl-sm text-[15px] text-slate-700 whitespace-pre-wrap max-w-[80%] leading-relaxed mt-1">
                  {msg.text}
                </div>
              </div>
            );
          } else {
            return (
              <div key={msg.id} className="flex gap-2.5 w-full justify-end">
                <div className="bg-slate-800 text-white shadow-sm shadow-slate-800/10 px-4 py-3 rounded-2xl rounded-tr-sm text-[15px] whitespace-pre-wrap max-w-[80%] leading-relaxed mt-1">
                  {msg.text}
                </div>
                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
                  <User className="w-5 h-5 text-slate-500" />
                </div>
              </div>
            );
          }
        })}

        {isTyping && (
          <div className="flex gap-2.5 w-full">
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0 shadow-sm border border-slate-200">
              <Bot className="w-5 h-5 text-slate-700" />
            </div>
            <div className="bg-white border border-slate-200/70 shadow-sm px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1 mt-1">
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={bottomRef} className="h-2" />
      </div>

      {/* Input Area */}
      <div className="bg-slate-50 px-3 pb-3 pt-2 relative z-20 border-t border-slate-200/60 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.02)]">
        {/* Skill Picker Overlay */}
        {showSkills && (
          <div className="absolute bottom-full left-0 w-full px-3 mb-2 animate-in slide-in-from-bottom-2 fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-3 relative overflow-hidden">
              <div className="text-xs font-semibold text-slate-400 mb-3 px-1 uppercase tracking-wider flex justify-between items-center">
                <span>切换分析引擎</span>
                <button onClick={() => setShowSkills(false)} className="underline text-slate-500 hover:text-slate-800">关闭</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {skills.map((s) => (
                  <button
                    key={s.id}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border transition-colors ${
                      currentSkill === s.id 
                        ? "border-slate-800 bg-slate-100" 
                        : "border-slate-100 bg-slate-50 hover:bg-slate-100"
                    }`}
                    onClick={() => {
                      setCurrentSkill(s.id);
                      setShowSkills(false);
                    }}
                  >
                    <div className={`p-1.5 rounded-lg ${s.color}`}>
                      {s.icon}
                    </div>
                    <span className={`text-[13px] font-medium ${currentSkill === s.id ? 'text-slate-900' : 'text-slate-600'}`}>
                      {s.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white border border-slate-200/80 focus-within:border-slate-800 focus-within:shadow-sm focus-within:shadow-slate-200/50 rounded-[20px] p-2 flex items-end gap-2 transition-all">
          <button
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors mb-0.5 ${
              showSkills ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 active:bg-slate-300'
            }`}
            onClick={() => setShowSkills(!showSkills)}
            title="选择分析引擎"
          >
            {skills.find(s => s.id === currentSkill)?.icon || <Sparkles className="w-5 h-5" />}
          </button>
          
          <textarea
            id="chat-textarea"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              handleInputResize(e);
            }}
            className="flex-1 bg-transparent max-h-32 py-2 text-[15px] outline-none resize-none text-slate-800 placeholder:text-slate-400 leading-relaxed"
            placeholder={currentSkill === 'auto' ? "输入股票代码或具体问题..." : `使用 ${currentSkillObj.title} 分析...`}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          
          <button
            onClick={handleSend}
            disabled={!query.trim()}
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all mb-0.5 ${
              query.trim() 
                ? 'bg-slate-900 text-white shadow-md shadow-slate-900/30 hover:bg-slate-800 active:bg-slate-700 transform scale-100' 
                : 'bg-slate-100 text-slate-400 transform scale-95'
            }`}
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
