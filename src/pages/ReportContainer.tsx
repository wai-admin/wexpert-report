import { useRef, useEffect } from "react";
import { useHandlePrint } from "@/hooks";
import {
  useBridgeStore,
  useLoadingStore,
  useReportStore,
  useCurrentReportMode,
} from "@/store";
import { PrintPage, ReportController, EmptyPrintPage } from "@/pages";
import usePrintHandler from "@/hooks/print/usePrintHandler";
import { LoadingIndicator } from "@/components-common";
import { checkProd, checkFalsy } from "@/utils";

// WARNING: usePrintPageHandler 업데이트 시 전체 렌더링 주의 (개선 필요)
const ReportContainer = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  //Bridge Message
  const { isInitializedBridgeMessage } = useBridgeStore();
  // Loading Status
  const { isLoading } = useLoadingStore();
  // Report List Empty Status
  const { isReportListEmpty, selectedReportId } = useReportStore();
  // Current Report Mode
  const { isAllReportMode } = useCurrentReportMode();
  // Data Information
  const { printData, option } = usePrintHandler();
  // Handlers & State
  const { handlePrint } = useHandlePrint({
    printRef,
    imageExportOption: option.imageExportOption,
    physicianAssessment: printData?.physicianAssessment ?? "",
    patientName: printData?.patientDetail.patientName ?? "",
  });

  // 새로운 리포트 선택 시 스크롤 초기화 (Report History 모드에 해당)
  useEffect(() => {
    if (checkFalsy(selectedReportId)) {
      return;
    }

    if (checkFalsy(scrollRef.current)) {
      return;
    }

    scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedReportId]);

  // 초기 bridgeMessage를 받을 때까지 아무것도 렌더링하지 않음 (프로덕션 환경에서만)
  const isInitialLoading = !isInitializedBridgeMessage && checkProd();
  if (isInitialLoading) {
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
        className={`h-full flex justify-center overflow-y-scroll overflow-x-hidden scroll-custom
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
            printData={printData}
            option={option}
          />
        )}
      </div>
      <div className="fixed right-0 top-0">
        <ReportController printData={printData} onPrint={handlePrint} />
      </div>
    </div>
  );
};

export default ReportContainer;
