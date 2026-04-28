import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, Send, Sparkles, X } from "lucide-react";

export default function Input() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const skill = searchParams.get("skill") || "fundamental";
  const context = searchParams.get("context");
  
  const [query, setQuery] = useState("");
  
  const skillNames: Record<string, string> = {
    fundamental: "基本面分析",
    report: "财报助手",
    technical: "技术面扫描",
    risk: "风险雷达",
    custom_dividend: "高股息精选模型"
  };

  const handleSend = () => {
    if (!query.trim()) return;
    const finalQuery = context ? `关于「${context}」的追问：${query}` : query;
    navigate(`/analyzing?q=${encodeURIComponent(finalQuery)}&skill=${skill}`);
  };

  const examples = [
    "帮我分析一下示例股票 A 最近是否值得关注",
    "看下宁德时代最新财报解读",
    "苹果公司现在的宏观风险有哪些？",
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 flex items-center justify-between border-b border-slate-50">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-slate-500 active:bg-slate-50 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 px-5 py-6 flex flex-col">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4 mt-2">
          {context ? "继续追问" : "你想了解什么？"}
        </h2>

        {context && (
          <div className="mb-6 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-600 flex items-center">
            正在分析：<span className="font-semibold text-slate-800 ml-1 line-clamp-1">{context}</span>
          </div>
        )}

        {/* Selected Skill Chip */}
        <div className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium mb-6 self-start">
          <Sparkles className="w-4 h-4 mr-1.5" />
          当前 Skill：{skillNames[skill] || "智能分析"}
          <button 
            className="ml-2 bg-blue-100 rounded-full p-0.5 hover:bg-blue-200"
            onClick={() => navigate("/skills")}
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        <div className="relative mb-6">
          <textarea 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={context ? "输入你想继续了解的问题..." : "输入股票名称、代码或你的问题..."}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pr-12 min-h-[160px] resize-none outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow text-slate-800 block"
            autoFocus
          ></textarea>
          
          <button 
            className={`absolute right-3 bottom-3 p-3 rounded-xl transition-colors ${
              query.trim() 
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 active:bg-blue-700" 
                : "bg-slate-200 text-slate-400"
            }`}
            onClick={handleSend}
            disabled={!query.trim()}
          >
            <Send className="w-5 h-5 -ml-0.5 mt-0.5" />
          </button>
        </div>

        {query.trim().length === 0 && !context && (
          <div className="mt-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">或者尝试以下示例</h4>
            <div className="flex flex-col gap-2">
              {examples.map((ex, i) => (
                <button 
                  key={i}
                  className="text-left p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-600 active:bg-slate-100 transition-colors"
                  onClick={() => setQuery(ex)}
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
