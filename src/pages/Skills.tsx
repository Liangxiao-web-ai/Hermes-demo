import { useNavigate } from "react-router-dom";
import { ChevronLeft, TrendingUp, FileText, Activity, AlertTriangle, Globe, Cpu, Search, Plus, Wrench } from "lucide-react";

export default function Skills() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "基本面与财务",
      items: [
        { id: "fundamental", title: "基本面分析", desc: "公司概况、主营业务、护城河分析", icon: <TrendingUp className="w-5 h-5 text-blue-500" /> },
        { id: "report", title: "财报助手", desc: "最新财报解读、营收利润变化、管理层指引", icon: <FileText className="w-5 h-5 text-indigo-500" /> },
      ]
    },
    {
      title: "市场与技术",
      items: [
        { id: "technical", title: "技术面扫描", desc: "近期价格趋势、均线支撑、资金流向", icon: <Activity className="w-5 h-5 text-green-500" /> },
        { id: "risk", title: "风险雷达", desc: "宏观风险、行业政策、财务异常、负面舆论", icon: <AlertTriangle className="w-5 h-5 text-rose-500" /> },
      ]
    },
    {
      title: "概念与行业",
      items: [
        { id: "macro", title: "宏观行业影响", desc: "所属行业景气度、上下游关联影响", icon: <Globe className="w-5 h-5 text-teal-500" /> },
        { id: "concept", title: "主题概念", desc: "例如AI、新能源等当前热门主题契合度", icon: <Cpu className="w-5 h-5 text-purple-500" /> },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-4 py-4 flex items-center border-b border-slate-100">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-slate-500 active:bg-slate-100 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="font-medium text-slate-800 ml-1">选择分析模式 (Skill)</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        
        <div className="bg-white rounded-2xl p-3 flex items-center gap-3 border border-slate-200 mb-6 shadow-sm">
          <Search className="w-5 h-5 text-slate-400 ml-1" />
          <input 
            type="text" 
            placeholder="搜索 Skill..." 
            className="flex-1 bg-transparent border-none outline-none text-slate-800 text-sm"
          />
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-medium text-slate-500 mb-3 ml-1">我的自建 Skill</h3>
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x -mx-4 px-4 scrollbar-hide">
            <div 
              className="min-w-[140px] w-[140px] snap-start bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer active:bg-blue-100 transition-colors"
              onClick={() => navigate('/create-skill')}
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-blue-700">创建新引擎</span>
            </div>
            
            <div 
              className="min-w-[200px] snap-start bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-col justify-between cursor-pointer active:bg-slate-50 transition-colors"
              onClick={() => navigate(`/input?skill=custom_dividend`)}
            >
              <div className="flex items-start gap-3 mb-2">
                <div className="p-2 bg-amber-50 rounded-xl">
                  <Wrench className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 text-sm line-clamp-1">高股息精选模型</h4>
                  <p className="text-xs text-slate-400 mt-1">自建参数</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {categories.map((cat, idx) => (
          <div key={idx} className="mb-8">
            <h3 className="text-sm font-medium text-slate-500 mb-3 ml-1">{cat.title}</h3>
            <div className="flex flex-col gap-3">
              {cat.items.map(skill => (
                <div 
                  key={skill.id}
                  onClick={() => navigate(`/input?skill=${skill.id}`)}
                  className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 active:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="p-3 bg-slate-50 rounded-xl mt-0.5">
                    {skill.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-slate-800">{skill.title}</span>
                      {skill.id === "fundamental" && (
                        <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">推荐</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2">{skill.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
