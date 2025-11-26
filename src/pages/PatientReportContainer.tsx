import { useRef } from "react";
import { usePrintAction, useWebViewLoading } from "@/hooks";
import { PrintPage, OptionHandler } from "@/pages";
import usePrintPageHandler from "@/hooks/usePrintPageHandler";

// WARNING: usePrintPageHandler 업데이트 시 전체 렌더링 주의 (개선 필요)
const PatientReportContainer = () => {
  const printRef = useRef<HTMLDivElement>(null);
  // Data Information
  const { printPageData, option, isLoading } = usePrintPageHandler();
  // Handlers & State
  const { handlePrint } = usePrintAction({
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
