import { useState } from "react";

import Navbar from "../components/common/Navbar";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import UploadBox from "../components/analysis/UploadBox";

import QuestionBox from "../components/analysis/QuestionBox";

import AnalyzeButton from "../components/analysis/AnalyzeButton";

import SuggestedQuestions from "../components/analysis/SuggestedQuestions";

const Analyze = () => {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);

  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/mp3",
      "audio/x-wav",
      "audio/mp4",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a valid audio file");

      return;
    }

    const maxSize = 20 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("File size must be under 20MB");

      return;
    }

    setSelectedFile(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !question.trim()) {
      toast.error("Please upload audio and ask a question");

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("audio", selectedFile);

      formData.append("question", question.trim());

      const response = await API.post(
        "/audio/upload",

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Analysis completed");

      navigate(
        "/analysis-details",

        {
          state: response.data,
        },
      );
    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Analysis failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-6">
        
        <div className="mb-7">
          <h1 className="text-3xl font-bold mt-2">Analyze Your Audio</h1>

          <p className="text-gray-400 mt-3 max-w-lg leading-6 text-sm">
            Upload podcasts, interviews, meetings or voice recordings and ask
            AudioPilot AI about clarity, pacing, noise levels, professionalism
            and overall listening quality.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_0.92fr] gap-4 items-start">
          
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4">
            <UploadBox
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              handleFileChange={handleFileChange}
            />

            <QuestionBox question={question} setQuestion={setQuestion} />

            <AnalyzeButton loading={loading} handleAnalyze={handleAnalyze} />
          </div>

          <SuggestedQuestions setQuestion={setQuestion} />
        </div>
      </div>
    </div>
  );
};

export default Analyze;
