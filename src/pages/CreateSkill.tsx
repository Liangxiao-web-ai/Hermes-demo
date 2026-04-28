import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Save, Plus, X } from "lucide-react";

export default function CreateSkill() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSave = () => {
    if (!name.trim()) return;
    // In a real app, save this to backend. For demo, we just go back.
    alert('Demo: 自建 Skill 已保存');
    navigate("/skills");
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 px-4 py-4 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-slate-500 active:bg-slate-100 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="font-medium text-slate-800 ml-1">创建新引擎</span>
        </div>
        <button 
          onClick={handleSave}
          disabled={!name.trim()}
          className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            name.trim() 
              ? "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-700" 
              : "bg-slate-100 text-slate-400"
          }`}
        >
          <Save className="w-4 h-4" />
          保存
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        
        {/* 基本信息 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">基本信息</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-500 font-medium mb-1.5 block">引擎名称 <span className="text-rose-500">*</span></label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例如：高股息精选模型" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-shadow"
              />
            </div>
            
            <div>
              <label className="text-xs text-slate-500 font-medium mb-1.5 block">一句话简介</label>
              <input 
                type="text" 
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="例如：重点关注连续3年股息率超过5%的标的" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-shadow"
              />
            </div>
          </div>
        </div>

        {/* 核心提示词 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">分析逻辑 (Prompt)</h3>
          <div>
            <textarea 
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="在这里输入该引擎的核心分析逻辑和关注指标，例如：
1. 优先提取该股票近3年的分红派息记录；
2. 结合最新一期财报的自由现金流进行保障率评估；
3. 输出结果时请按照【核心结论】、【股息历史】、【现金流健康度】三段格式展示。" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 min-h-[200px] text-sm text-slate-800 resize-none outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-shadow leading-relaxed"
            ></textarea>
          </div>
        </div>

        {/* 数据源挂载 (Mock) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-700">挂载私有数据源</h3>
            <button className="text-slate-700 text-xs font-medium bg-slate-100 px-2 py-1 rounded flex items-center gap-1 active:bg-slate-200 hover:bg-slate-200 transition-colors">
              <Plus className="w-3 h-3" />添加
            </button>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded">
                  <span className="text-[10px] font-bold">CSV</span>
                </div>
                <span className="text-xs font-medium text-slate-600">A股历年分红全量数据.csv</span>
              </div>
              <button className="text-slate-400 p-1 hover:bg-slate-200 rounded">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-rose-100 text-rose-600 flex items-center justify-center rounded">
                  <span className="text-[10px] font-bold">PDF</span>
                </div>
                <span className="text-xs font-medium text-slate-600">某券商高股息策略研报.pdf</span>
              </div>
              <button className="text-slate-400 p-1 hover:bg-slate-200 rounded">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
