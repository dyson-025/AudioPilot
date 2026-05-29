import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/common/ProtectedRoute";

import Home from "../pages/Home";

import Analyze from "../pages/Analyze";

import MyAnalysis from "../pages/MyAnalysis";

import Auth from "../pages/Auth";

import Settings from "../pages/Settings";

import AnalysisDetails from "../pages/AnalysisDetails";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />

      <Route path="/auth" element={<Auth />} />

      {/* PROTECTED */}
      <Route element={<ProtectedRoute />}>
        <Route path="/analyze" element={<Analyze />} />

        <Route path="/my-analysis" element={<MyAnalysis />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/analysis-details" element={<AnalysisDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
