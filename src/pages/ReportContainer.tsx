import { useRef } from "react";
import { usePrintAction, useWebViewLoading } from "@/hooks";
import {
  useMessageStore,
  useLoadingStore,
  useReportListStore,
  useCurrentReportModeStore,
} from "@/store";
import { PrintPage, ReportController, EmptyPrintPage } from "@/pages";
import usePrintPageHandler from "@/hooks/usePrintPageHandler";
import { LoadingIndicator } from "@/components-common";
import { checkFalsy, checkProd } from "@/utils";

// WARNING: usePrintPageHandler 업데이트 시 전체 렌더링 주의 (개선 필요)
const ReportContainer = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  //Bridge Message
  const { nativeMessage } = useMessageStore();
  // Loading Status
  const { isLoading } = useLoadingStore();
  // Report List Empty Status
  const { isReportListEmpty } = useReportListStore();
  // Current Report Mode
  const { isAllReportMode } = useCurrentReportModeStore();
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

  // nativeMessage를 받을 때까지 아무것도 렌더링하지 않음 (프로덕션 환경에서만)
  if (checkFalsy(nativeMessage) && checkProd()) {
    return (
      <div className="size-full flex items-center justify-center bg-bg-base-alt">
        <LoadingIndicator isLoading={true} full={true} />
      </div>
    );
  }

  return (
    <div className="size-full flex justify-start relative">
      <LoadingIndicator isLoading={isLoading} full={true} />
      <div
        ref={scrollRef}
        className={`h-full flex justify-center overflow-y-scroll
          ${
            isAllReportMode
              ? "w-[calc(100%-var(--all-report-controller-width))]"
              : "w-[calc(100%-var(--patient-report-controller-width))]"
          }
          `}
      >
        {isReportListEmpty ? (
          <EmptyPrintPage />
        ) : (
          <PrintPage
            printRef={printRef}
            scrollRef={scrollRef}
            printPageData={printPageData}
            option={option}
          />
        )}
      </div>
      <div className="fixed right-0 top-0">
        <ReportController printPageData={printPageData} onPrint={handlePrint} />
      </div>
    </div>
  );
};

export default ReportContainer;
