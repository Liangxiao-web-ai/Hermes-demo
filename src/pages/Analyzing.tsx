import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { X, CheckCircle2, Loader2 } from "lucide-react";

export default function Analyzing() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "示例股票";
  const skill = searchParams.get("skill") || "fundamental";
  
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    "解析分析需求...",
    "采集最近财务数据...",
    "对比行业历史指标...",
    "提炼关键信号与结论..."
  ];

  useEffect(() => {
    // 模拟进度条和步骤步进
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          // 分析完成后跳转至结果页
          setTimeout(() => navigate(`/result?q=${encodeURIComponent(query)}&skill=${skill}`), 500);
          return 100;
        }
        return p + 2; // 50 * 50ms = 2500ms total roughly
      });
    }, 50);

    return () => clearInterval(interval);
  }, [navigate, query, skill]);

  useEffect(() => {
    // 根据进度更新当前文字步骤
    if (progress > 80) setStepIndex(3);
    else if (progress > 50) setStepIndex(2);
    else if (progress > 20) setStepIndex(1);
    else setStepIndex(0);
  }, [progress]);

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 text-slate-400 bg-white/50 backdrop-blur rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="relative w-24 h-24 mb-8">
          {/* 外圈动画 */}
          <motion.div 
            className="absolute inset-0 rounded-full border-4 border-slate-200"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 -ml-2 -mt-2 w-4 h-4 bg-amber-500 rounded-full"></div>
          </motion.div>
          {/* 内层 Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-slate-800 animate-spin" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-slate-800 text-center mb-2">
          正在分析中...
        </h2>
        <p className="text-sm text-slate-500 text-center mb-10 max-w-[260px]">
          "{query}"
        </p>

        {/* 步骤列表 */}
        <div className="w-full max-w-[280px] space-y-4">
          {steps.map((text, idx) => {
            const isActive = idx === stepIndex;
            const isDone = idx < stepIndex;
            return (
              <div key={idx} className="flex items-center gap-3">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : isActive ? (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-800 border-t-transparent animate-spin"></div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-200"></div>
                )}
                <span className={`text-sm ${
                  isDone ? 'text-slate-500' : 
                  isActive ? 'text-slate-800 font-medium' : 'text-slate-400'
                }`}>
                  {text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-[280px] mt-12">
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

      </div>
    </div>
  );
}
