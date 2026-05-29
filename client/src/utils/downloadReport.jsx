const downloadReport = (data) => {
  if (!data || !data.metrics) {
    toaster.error(
      "Download failed: Invalid or incomplete report data provided.",
    );
    return;
  }

  const report = `
AUDIOPILOT REPORT

File:
${data.filename || "Unknown_File"}

Question:
${data.question || "N/A"}

--------------------------------

AUDIO METRICS

Clarity:
${data.metrics.clarity_score ?? 0}%

Energy:
${data.metrics.energy ?? "N/A"}

Silence Percentage:
${data.metrics.silence_percentage ?? 0}%

Noise Level:
${data.metrics.noise_level ?? "N/A"}

Duration:
${data.metrics.duration ?? 0} sec

--------------------------------

AI REPORT

${data.ai_report || "No AI analysis report available."}
`.trim(); 

  try {
    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;

    const safeFileName = data.filename
      ? `AudioPilot_Report_${data.filename.split(".")[0]}.txt`
      : "AudioPilot_Report.txt";
    link.download = safeFileName;

    link.style.display = "none";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    toaster.error(
      "An error occurred while generating the download link:",
      error,
    );
  }
};

export default downloadReport;
