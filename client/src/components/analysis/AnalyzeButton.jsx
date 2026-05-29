const AnalyzeButton = ({ loading, handleAnalyze }) => {
  return (
    <button
      onClick={handleAnalyze}
      disabled={loading}
      className="w-full py-3 rounded-2xl bg-white text-black font-semibold transition hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
    >
      {loading ? (
        <div className="flex items-center justify-center gap-3">
          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />

          <span>Analyzing Audio...</span>
        </div>
      ) : (
        "Analyze Audio"
      )}
    </button>
  );
};

export default AnalyzeButton;
