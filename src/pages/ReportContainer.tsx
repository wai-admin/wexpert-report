import { useRef } from "react";
import { useHandlePrint } from "@/hooks";
import {
  useMessageStore,
  useLoadingStore,
  useReportListStore,
  useCurrentReportModeStore,
} from "@/store";
import { PrintPage, ReportController, EmptyPrintPage } from "@/pages";
import usePrintHandler from "@/hooks/print/usePrintHandler";
import { LoadingIndicator } from "@/components-common";
import { checkProd } from "@/utils";

// WARNING: usePrintPageHandler 업데이트 시 전체 렌더링 주의 (개선 필요)
const ReportContainer = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  //Bridge Message
  const { isInitializedNativeMessage } = useMessageStore();
  // Loading Status
  const { isLoading } = useLoadingStore();
  // Report List Empty Status
  const { isReportListEmpty } = useReportListStore();
  // Current Report Mode
  const { isAllReportMode } = useCurrentReportModeStore();
  // Data Information
  const { printData, option } = usePrintHandler();
  // Handlers & State
  const { handlePrint } = useHandlePrint({
    printRef,
    imageExportOption: option.imageExportOption,
    physicianAssessment: printData?.physicianAssessment ?? "",
    patientName: printData?.patientDetail.patientName ?? "",
  });

  // 초기 nativeMessage를 받을 때까지 아무것도 렌더링하지 않음 (프로덕션 환경에서만)
  const isInitialLoading = !isInitializedNativeMessage && checkProd();
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
            scrollRef={scrollRef}
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
