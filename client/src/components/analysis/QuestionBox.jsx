const QuestionBox = ({ question, setQuestion }) => {
  return (
    <div className="mt-4">
      <label className="text-[11px] text-gray-500">ASK AUDIOPILOT AI</label>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="How professional does this sound?"
        className="w-full mt-2 h-24 rounded-2xl bg-black/40 border border-white/10 p-4 text-sm outline-none resize-none focus:border-white/30"
      />
    </div>
  );
};

export default QuestionBox;
