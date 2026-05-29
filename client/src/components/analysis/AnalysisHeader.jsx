import { Calendar, Clock } from "lucide-react";

const AnalysisHeader = ({ filename, metrics, onDownload }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
      <div>
        <p className="uppercase tracking-[0.25em] text-[10px] text-gray-500">
          ANALYSIS DETAILS
        </p>

        <h1 className="text-2xl font-bold mt-2 break-all">{filename}</h1>

        <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <Calendar size={14} />

            <span>{new Date().toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={14} />

            <span>{metrics.duration} sec</span>
          </div>
        </div>
      </div>

      <button
        onClick={onDownload}
        className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:scale-105 transition"
      >
        Download Report
      </button>
    </div>
  );
};

export default AnalysisHeader;
