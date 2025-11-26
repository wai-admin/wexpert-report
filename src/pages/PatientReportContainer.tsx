import { useRef } from "react";
import { usePrintHandler, useWebViewLoading } from "@/hooks";
import { PrintPage, OptionHandler } from "@/pages";
import usePrintPageHandler from "@/hooks/usePrintPageHandler";

const PatientReportContainer = () => {
  const printRef = useRef<HTMLDivElement>(null);
  // Data Information
  const { printPageData, isLoading } = usePrintPageHandler();
  const patientName = printPageData?.patientDetail.patientName ?? "";
  // Handlers & State
  const { handlePrint } = usePrintHandler(printRef, patientName);

  // Native에 로딩 상태 전송
  useWebViewLoading(isLoading);

  console.log("PrintPage Data Information: ", printPageData);

  return (
    <div className="report-register">
      <div className="report-print-page">
        <PrintPage printRef={printRef} printPageData={printPageData} />
      </div>
      <div className="report-option-container">
        <OptionHandler printPageData={printPageData} onPrint={handlePrint} />
      </div>
    </div>
  );
};

export default PatientReportContainer;
