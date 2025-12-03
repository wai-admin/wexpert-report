import { Routes, Route } from "react-router-dom";
import { ReportContainer } from "@/pages";

const GlobalRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<ReportContainer />} />
    </Routes>
  );
};

export default GlobalRoutes;
