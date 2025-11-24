import { useRef } from "react";
import { useReport } from "@/services/useReport";
import { usePrintHandler, useWebViewLoading } from "@/hooks";
import { PrintPage, OptionHandler } from "@/pages";

const PatientReportContainer = () => {
  const printRef = useRef<HTMLDivElement>(null);
  // Data Information
  const { data: reportData, isFetching } = useReport();
  const patientName = reportData?.data.patientSummary.patientName ?? "";
  // Handlers & State
  const { handlePrint } = usePrintHandler(printRef, patientName);

  // Native에 로딩 상태 전송
  useWebViewLoading(isFetching);

  console.log("PrintPage Data Information: ", reportData?.data);

  return (
    <div className="report-register">
      <div className="report-print-page">
        <PrintPage printRef={printRef} reportData={reportData} />
      </div>
      <div className="report-option-container">
        <OptionHandler onPrint={handlePrint} />
      </div>
    </div>
  );
};

export default PatientReportContainer;
