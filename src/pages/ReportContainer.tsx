import { useRef } from "react";
import { usePrintAction } from "@/hooks";
import {
  useMessageStore,
  useLoadingStore,
  useErrorStore,
  useReportListStore,
  useCurrentReportModeStore,
} from "@/store";
import { PrintPage, ReportController, EmptyPrintPage } from "@/pages";
import usePrintHandler from "@/hooks/print/usePrintHandler";
import { LoadingIndicator, ErrorIndicator } from "@/components-common";
import { checkFalsy, checkProd } from "@/utils";

// WARNING: usePrintHandler 업데이트 시 전체 렌더링 주의 (개선 필요)
const ReportContainer = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  //Bridge Message
  const { nativeMessage } = useMessageStore();
  // Loading Status
  const { isLoading } = useLoadingStore();
  // Error Status
  const { isError } = useErrorStore();
  // Report List Empty Status
  const { isReportListEmpty } = useReportListStore();
  // Current Report Mode
  const { isAllReportMode } = useCurrentReportModeStore();
  // Data Information
  const { printData, option } = usePrintHandler();
  // Handlers & State
  const { handlePrint } = usePrintAction({
    printRef,
    imageExportOption: option.imageExportOption,
    physicianAssessment: printData?.physicianAssessment ?? "",
    patientName: printData?.patientDetail.patientName ?? "",
  });

  // nativeMessage를 받을 때까지 아무것도 렌더링하지 않음 (프로덕션 환경에서만)
  if (checkFalsy(nativeMessage) && checkProd()) {
    return (
      <div className="size-full flex items-center justify-center bg-bg-base-alt">
        <LoadingIndicator isLoading={true} full={true} />
      </div>
    );
  }

  if (isError) {
    return <ErrorIndicator />;
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
