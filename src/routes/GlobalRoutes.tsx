import { Routes, Route } from "react-router-dom";
import { PatientReportContainer } from "@/pages";

const GlobalRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<PatientReportContainer />} />
    </Routes>
  );
};

export default GlobalRoutes;
