import { useRef } from "react";
import { usePrintAction, useWebViewLoading } from "@/hooks";
import { useMessageStore, useLoadingStore } from "@/store";
import { PrintPage, ReportController } from "@/pages";
import usePrintPageHandler from "@/hooks/usePrintPageHandler";
import { ReportOptionType } from "@/lib";
import { LoadingIndicator } from "@/components-common";

// WARNING: usePrintPageHandler 업데이트 시 전체 렌더링 주의 (개선 필요)
const ReportContainer = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  //Bridge Message
  const { nativeMessage } = useMessageStore();
  // Loading Status
  const { isLoading } = useLoadingStore();
  // Data Information
  const { printPageData, option } = usePrintPageHandler();
  // Handlers & State
  const { handlePrint } = usePrintAction({
    printRef,
    imageExportOption: option.imageExportOption,
    physicianAssessment: printPageData?.physicianAssessment ?? "",
    patientName: printPageData?.patientDetail.patientName ?? "",
  });

  // Native에 로딩 상태 전송
  useWebViewLoading(isLoading);

  console.log("ReportContainer: PrintPage Data Information", printPageData);
  const reportMode = nativeMessage?.reportMode ?? ReportOptionType.NEW_REPORT;

  return (
    <div className="size-full flex justify-start relative">
      <LoadingIndicator isLoading={isLoading} full={true} />
      <div
        ref={scrollRef}
        className={`h-full flex justify-center overflow-y-scroll
          ${
            reportMode === ReportOptionType.ALL_REPORT_HISTORY
              ? "w-[calc(100%-var(--all-report-controller-width))]"
              : "w-[calc(100%-var(--patient-report-controller-width))]"
          }
          `}
      >
        <PrintPage
          printRef={printRef}
          scrollRef={scrollRef}
          printPageData={printPageData}
          option={option}
        />
      </div>
      <div className="fixed right-0 top-0">
        <ReportController
          printPageData={printPageData}
          reportMode={reportMode}
          onPrint={handlePrint}
        />
      </div>
    </div>
  );
};

export default ReportContainer;
