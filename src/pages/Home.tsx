import { useNavigate } from "react-router-dom";
import { Search, TrendingUp, FileText, Activity, AlertTriangle, Bell, Sparkles } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const skills = [
    { id: "fundamental", title: "基本面分析", icon: <TrendingUp className="w-6 h-6 text-blue-500" /> },
    { id: "report", title: "财报助手", icon: <FileText className="w-6 h-6 text-indigo-500" /> },
    { id: "technical", title: "技术分析", icon: <Activity className="w-6 h-6 text-green-500" /> },
    { id: "risk", title: "风险扫描", icon: <AlertTriangle className="w-6 h-6 text-rose-500" /> },
  ];

  return (
    <div className="flex-1 flex flex-col pt-8 pb-6 px-4">
      <header className="mb-8 mt-4">
        <h1 className="text-2xl font-semibold text-slate-900">早上好，投资人</h1>
        <p className="text-slate-500 mt-1 text-sm">今天想了解哪只股票的新潜能？</p>
      </header>

      {/* Banner 入口 */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 mb-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-blue-200" />
            <h2 className="text-lg font-semibold text-white">Hermes AI 投资助手</h2>
          </div>
          <p className="text-blue-100 text-sm leading-relaxed mb-5">
            基于大语言模型的智能分析工具。选择下方分析引擎，快速了解财务健康、估值风险与技术形态。
          </p>
          <button 
            className="w-full bg-white text-blue-600 font-medium px-4 py-3 rounded-xl shadow-sm active:bg-blue-50 transition-colors"
            onClick={() => navigate("/skills")}
          >
            开始全新分析
          </button>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-slate-800">常用分析 (Skills)</h2>
          <button 
            className="text-sm text-blue-600 font-medium"
            onClick={() => navigate("/skills")}
          >
            查看全部
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-8">
          {skills.map((skill) => (
            <div 
              key={skill.id}
              onClick={() => navigate(`/input?skill=${skill.id}`)}
              className="bg-white border text-center border-slate-100 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 cursor-pointer active:bg-slate-50 transition-colors shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-1">
                {skill.icon}
              </div>
              <span className="text-sm font-medium text-slate-700">{skill.title}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-slate-800">主动追踪任务</h2>
        </div>
        
        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex items-start gap-4">
          <div className="p-2 ml-1 mt-1 bg-amber-50 text-amber-600 rounded-lg">
            <Bell className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-slate-800">财报更新提醒</h3>
              <span className="text-xs text-slate-400">进行中</span>
            </div>
            <p className="text-sm text-slate-500 mt-1 line-clamp-2">如果腾讯控股发布最新季度财报，立即生成关键指标对比简报。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
