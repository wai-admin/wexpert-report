import { useRef } from "react";
import { usePrintAction } from "@/hooks";
import { useMessageStore } from "@/store";
import { PrintPage, ReportController } from "@/pages";
import usePrintPageHandler from "@/hooks/usePrintPageHandler";
import { ReportOptionType } from "@/lib";

// WARNING: usePrintPageHandler 업데이트 시 전체 렌더링 주의 (개선 필요)
const ReportContainer = () => {
  const printRef = useRef<HTMLDivElement>(null);
  //Bridge Message
  const { nativeMessage } = useMessageStore();
  // Data Information
  const { printPageData, option, isLoading } = usePrintPageHandler();
  // Handlers & State
  const { handlePrint } = usePrintAction({
    printRef,
    imageExportOption: option.imageExportOption,
    physicianAssessment: printPageData?.physicianAssessment ?? "",
    patientName: printPageData?.patientDetail.patientName ?? "",
  });

  console.log("PrintPage Data Information: ", printPageData);
  const reportMode = nativeMessage?.reportMode ?? ReportOptionType.NEW_REPORT;

  return (
    <div className="size-full flex justify-center relative">
      <div
        className={`h-full flex justify-center items-center
          ${
            reportMode === ReportOptionType.ALL_REPORT_HISTORY
              ? "w-[calc(100%-var(--all-report-controller-width))] pr-[var(--all-report-controller-width)]"
              : "w-[calc(100%-var(--patient-report-controller-width))] pr-[var(--patient-report-controller-width)]"
          }
          `}
      >
        <PrintPage
          printRef={printRef}
          printPageData={printPageData}
          option={option}
        />
      </div>
      <div className="fixed right-0 top-0">
        <ReportController
          printPageData={printPageData}
          reportMode={reportMode}
          isLoading={isLoading}
          onPrint={handlePrint}
        />
      </div>
    </div>
  );
};

export default ReportContainer;
