import { useEffect, useState } from "react";

import Navbar from "../components/common/Navbar";

import API from "../services/api";

import toast from "react-hot-toast";

import AnalysisTable from "../components/analysis/AnalysisTable";

import LoadingAnalysis from "../components/analysis/LoadingAnalysis";

import EmptyAnalysis from "../components/analysis/EmptyAnalysis";

const MyAnalysis = () => {
  const [analyses, setAnalyses] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchAnalyses = async () => {
    try {
      const response = await API.get("/audio/my-analysis");

      setAnalyses(response.data);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to load analyses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/audio/delete-analysis/${id}`);

      setAnalyses((prev) => prev.filter((item) => item.id !== id));

      toast.success("Analysis deleted");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to delete analysis");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        
        <div className="mb-10">
          <p className="uppercase tracking-widest text-xs text-gray-500">
            History
          </p>

          <h1 className="text-4xl font-bold mt-3">My Analysis</h1>

          <p className="text-gray-400 mt-3 max-w-2xl text-sm">
            Access your previous AI audio analyses and insights.
          </p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
          {loading ? (
            <LoadingAnalysis />
          ) : analyses.length === 0 ? (
            <EmptyAnalysis />
          ) : (
            <AnalysisTable analyses={analyses} handleDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAnalysis;
