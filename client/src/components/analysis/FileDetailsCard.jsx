import { FileAudio } from "lucide-react";

const FileDetailsCard = ({ filename, metrics }) => {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
          <FileAudio size={15} />
        </div>

        <h3 className="text-base font-semibold">File Details</h3>
      </div>

      <div className="space-y-4 text-sm text-gray-400">
        <div className="flex justify-between">
          <span>Format</span>

          <span className="text-white">
            {filename.split(".").pop().toUpperCase()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Duration</span>

          <span className="text-white">{metrics.duration} sec</span>
        </div>

        <div className="flex justify-between">
          <span>Status</span>

          <span className="text-green-400">Analyzed</span>
        </div>
      </div>
    </div>
  );
};

export default FileDetailsCard;
