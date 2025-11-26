import { useRef } from "react";
import { usePrintHandler, useWebViewLoading } from "@/hooks";
import { PrintPage, OptionHandler } from "@/pages";
import usePrintPageHandler from "@/hooks/usePrintPageHandler";

const PatientReportContainer = () => {
  const printRef = useRef<HTMLDivElement>(null);
  // Data Information
  const { printPageData, option, isLoading } = usePrintPageHandler();
  // Handlers & State
  const { handlePrint } = usePrintHandler({
    printRef,
    imageExportOption: option.imageExportOption,
    physicianAssessment: printPageData?.physicianAssessment ?? "",
    patientName: printPageData?.patientDetail.patientName ?? "",
  });

  // Native에 로딩 상태 전송
  useWebViewLoading(isLoading);

  console.log("PrintPage Data Information: ", printPageData);

  return (
    <div className="report-register">
      <div className="report-print-page">
        <PrintPage
          printRef={printRef}
          printPageData={printPageData}
          option={option}
        />
      </div>
      <div className="report-option-container">
        <OptionHandler printPageData={printPageData} onPrint={handlePrint} />
      </div>
    </div>
  );
};

export default PatientReportContainer;
