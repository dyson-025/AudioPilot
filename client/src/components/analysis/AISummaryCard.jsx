const AISummaryCard = ({ question, ai_report }) => {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 mt-4">

      <div>
        <p className="uppercase tracking-[0.2em] text-[10px] text-gray-500">
          YOUR QUESTION
        </p>

        <h3 className="text-lg font-semibold mt-3 leading-7">{question}</h3>
      </div>

      <div className="h-px bg-white/10 my-6" />

      <div>
        <p className="uppercase tracking-[0.2em] text-[10px] text-gray-500">
          AI SUMMARY
        </p>

        <h3 className="text-lg font-semibold mt-2">Overall Analysis</h3>

        <p className="text-gray-300 leading-7 mt-4 whitespace-pre-line text-sm">
          {ai_report}
        </p>
      </div>
    </div>
  );
};

export default AISummaryCard;
