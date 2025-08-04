import { Routes, Route } from "react-router-dom";
import PrintPage from "@/pages/PrintPage";

function GlobalRoutes() {
  return (
    <Routes>
      <Route path="*" element={<PrintPage />} />
    </Routes>
  );
}

export default GlobalRoutes;
