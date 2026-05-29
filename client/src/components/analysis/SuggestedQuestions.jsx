import { Sparkles } from "lucide-react";

const SuggestedQuestions = ({ setQuestion }) => {
  const questions = [
    "How professional does this sound?",

    "Is there too much background noise?",

    "How can I improve audio clarity?",

    "Does this music feel energetic?",

    "Is the pacing smooth and balanced?",

    "How clean is the listening experience?",
  ];

  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 self-start">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={16} />

        <h3 className="text-base font-semibold">Suggested Questions</h3>
      </div>

      <div className="space-y-2.5">
        {questions.map((item, index) => (
          <button
            key={index}
            onClick={() => setQuestion(item)}
            className="w-full text-left p-3 rounded-xl border border-white/10 bg-black/30 hover:bg-white/10 transition text-sm text-gray-300"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-4 p-4 rounded-2xl bg-black/30 border border-white/10">
        <p className="text-gray-400 leading-5 text-xs">
          AudioPilot AI analyzes clarity, pacing, background noise, vocal
          balance, energy, and overall listening quality using AI-powered audio
          intelligence.
        </p>
      </div>
    </div>
  );
};

export default SuggestedQuestions;
