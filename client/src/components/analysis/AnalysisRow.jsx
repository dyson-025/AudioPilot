import { Link } from "react-router-dom";

import { FileAudio, Eye, Download, Trash2 } from "lucide-react";

import downloadReport from "../../utils/downloadReport";

const AnalysisRow = ({ item, handleDelete }) => {
  return (
    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-6
      gap-4
      px-6
      py-5
      border-b
      border-white/5
      hover:bg-white/[0.03]
      transition
      "
    >
      <div className="md:col-span-2 flex items-center gap-4">
        <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
          <FileAudio size={18} />
        </div>

        <div>
          <h3 className="font-medium text-sm break-all">{item.filename}</h3>

          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
            {item.question}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center md:block">
        <span className="md:hidden text-gray-500 text-xs">Date</span>

        <p className="text-gray-400 text-sm">
          {new Date(item.created_at).toLocaleDateString()}
        </p>
      </div>

      <div className="flex justify-between items-center md:block">
        <span className="md:hidden text-gray-500 text-xs">Clarity</span>

        <p className="font-semibold text-sm">{item.clarity_score}%</p>
      </div>

      <div className="flex justify-between items-center md:block">
        <span className="md:hidden text-gray-500 text-xs">Status</span>

        <span className="px-3 py-1.5 rounded-full text-xs bg-green-500/10 text-green-400">
          Completed
        </span>
      </div>

      <div className="flex justify-between items-center md:block">
        <span className="md:hidden text-gray-500 text-xs">Actions</span>

        <div className="flex items-center gap-3">
          
          <Link
            to="/analysis-details"
            state={{
              filename: item.filename,

              question: item.question,

              ai_report: item.ai_report,

              metrics: {
                clarity_score: item.clarity_score,

                energy: item.energy,

                silence_percentage: item.silence_percentage,

                noise_level: item.noise_level,

                duration: item.duration,
              },
            }}
            className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
          >
            <Eye size={16} />
          </Link>

          <button
            onClick={() =>
              downloadReport({
                filename: item.filename,

                question: item.question,

                ai_report: item.ai_report,

                metrics: {
                  clarity_score: item.clarity_score,

                  energy: item.energy,

                  silence_percentage: item.silence_percentage,

                  noise_level: item.noise_level,

                  duration: item.duration,
                },
              })
            }
            className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
          >
            <Download size={16} />
          </button>

          <button
            onClick={() => handleDelete(item.id)}
            className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisRow;
