import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, MessageCircle, BellPlus, Info, AlertTriangle, TrendingDown, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";

export default function Result() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "示例股票 A";
  const skill = searchParams.get("skill") || "fundamental";

  return (
    <div className="flex flex-col h-full bg-slate-50 relative pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 px-4 py-4 flex items-center justify-between border-b border-slate-100 shadow-sm shadow-slate-100/50">
        <div className="flex items-center">
          <button 
            onClick={() => navigate("/")}
            className="p-2 -ml-2 text-slate-600 active:bg-slate-100 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="font-medium text-slate-800 ml-1">分析结果</span>
        </div>
        <div className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">基本面分析</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        
        {/* Title area */}
        <div className="px-1">
          <h1 className="text-2xl font-semibold text-slate-900 leading-tight">
            关于「{query}」的分析
          </h1>
        </div>

        {/* AI 结论 */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-50 px-4 py-3 flex items-center gap-2 border-b border-slate-100">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="font-medium text-slate-800 text-sm">AI 核心结论</h2>
          </div>
          <div className="p-4">
            <p className="text-slate-800 text-[15px] leading-relaxed">
              当前更适合<span className="font-semibold text-amber-700 bg-amber-50 px-1 rounded mx-1">继续观察</span>，短期不直接给出买卖建议。公司营收稳定增长，但受行业波动影响，短期利润率承压。技术面上涨动能不足，建议等待更明确的筑底信号。
            </p>
          </div>
        </div>

        {/* 关键指标 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">营收增速 ( YoY )</span>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xl font-bold text-slate-800">+12.4%</span>
              <TrendingUp className="w-4 h-4 text-rose-500" /> {/* A股习惯：红涨绿跌 */}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">毛利率变化</span>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xl font-bold text-slate-800">-2.1%</span>
              <TrendingDown className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
        </div>

        {/* 核心依据 */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 mb-3 px-1">核心依据</h3>
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm divide-y divide-slate-50 text-sm">
            <div className="py-2.5 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <p className="text-slate-700"><span className="font-medium">基本面稳健：</span>主营业务收入平稳上升，核心护城河依然稳固。</p>
            </div>
            <div className="py-2.5 flex items-start gap-3">
              <Info className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
              <p className="text-slate-700"><span className="font-medium">行业景气度：</span>上下游供应链面临一定成本上升压力，短期存在去库存阶段。</p>
            </div>
            <div className="py-2.5 flex items-start gap-3">
              <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-slate-700"><span className="font-medium">近期波动：</span>资金面上周出现流出迹象，处于震荡整理区间。</p>
            </div>
          </div>
        </div>

        {/* 风险提示 */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 mb-3 px-1 text-rose-500">风险提示</h3>
          <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100 shadow-sm">
            <ul className="list-disc list-outside ml-4 text-sm text-slate-700 space-y-2 marker:text-rose-400">
              <li>本分析基于历史公开财报与公开数据，具有滞后性；</li>
              <li>注意行业政策近期可能出现利空调整；</li>
              <li>AI 总结仅供参考，不构成实质投资建议，请谨慎决策。</li>
            </ul>
          </div>
        </div>
        
      </div>

      {/* 底部行动动作区 */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-100 p-4 pb-safe flex items-center gap-3 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] z-20">
        <button 
          className="flex-1 bg-white border-2 border-slate-200 text-slate-700 font-medium px-4 py-3 min-h-[48px] rounded-xl flex items-center justify-center gap-2 active:bg-slate-50"
          onClick={() => navigate(`/chat?skill=${skill}&action=track&context=${encodeURIComponent(query)}`)}
        >
          <BellPlus className="w-5 h-5 text-amber-500" />
          <span>创建跟踪任务</span>
        </button>
        <button 
          className="flex-1 bg-slate-900 text-white font-medium px-4 py-3 min-h-[48px] rounded-xl flex items-center justify-center gap-2 active:bg-slate-800 transition-colors"
          onClick={() => navigate(`/chat?skill=${skill}&fromResult=true&context=${encodeURIComponent(query)}`)}
        >
          <MessageCircle className="w-5 h-5" />
          <span>继续追问</span>
        </button>
      </div>

    </div>
  );
}
