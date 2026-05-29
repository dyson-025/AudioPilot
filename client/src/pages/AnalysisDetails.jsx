import Navbar from "../components/common/Navbar";

import { useLocation, Navigate } from "react-router-dom";

import downloadReport from "../utils/downloadReport";

import AnalysisHeader from "../components/analysis/AnalysisHeader";

import MetricsCard from "../components/analysis/MetricsCard";

import FileDetailsCard from "../components/analysis/FileDetailsCard";

import AISummaryCard from "../components/analysis/AISummaryCard";

const AnalysisDetails = () => {
  const location = useLocation();

  const analysisData = location.state;

  if (!analysisData) {
    return <Navigate to="/my-analysis" replace />;
  }

  const {
    filename,

    question,

    metrics,

    ai_report,
  } = analysisData;

  const handleDownloadReport = () => {
    downloadReport({
      filename,

      question,

      metrics,

      ai_report,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        
        <AnalysisHeader
          filename={filename}
          metrics={metrics}
          onDownload={handleDownloadReport}
        />

        <div className="grid lg:grid-cols-[1.5fr_0.7fr] gap-4">
          <MetricsCard metrics={metrics} />

          <FileDetailsCard filename={filename} metrics={metrics} />
        </div>

        <AISummaryCard question={question} ai_report={ai_report} />
      </div>
    </div>
  );
};

export default AnalysisDetails;
