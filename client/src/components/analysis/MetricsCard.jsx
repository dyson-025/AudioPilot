import { AudioWaveform, Brain, Mic } from "lucide-react";

const MetricsCard = ({ metrics }) => {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
      <p className="uppercase tracking-[0.2em] text-[10px] text-gray-500 mb-5">
        AUDIO METRICS
      </p>

      <div className="grid grid-cols-2 gap-6">

        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs">Clarity</p>

            <h3 className="text-lg font-bold mt-1">{metrics.clarity_score}%</h3>
          </div>

          <AudioWaveform size={18} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs">Energy</p>

            <h3 className="text-lg font-bold mt-1">{metrics.energy}</h3>
          </div>

          <Brain size={18} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs">Silence</p>

            <h3 className="text-lg font-bold mt-1">
              {metrics.silence_percentage}%
            </h3>
          </div>

          <Mic size={18} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs">Noise Level</p>

            <h3 className="text-lg font-bold mt-1">{metrics.noise_level}</h3>
          </div>

          <AudioWaveform size={18} />
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;
