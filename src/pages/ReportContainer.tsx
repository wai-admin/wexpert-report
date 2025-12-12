import { useRef } from "react";
import { usePrintAction } from "@/hooks";
import {
  useBridgeStore,
  useLoadingStore,
  useErrorStore,
  useReportListStore,
  useCurrentReportMode,
} from "@/store";
import { PrintPage, ReportController, EmptyPrintPage } from "@/pages";
import usePrintHandler from "@/hooks/print/usePrintHandler";
import { LoadingIndicator, ErrorIndicator } from "@/components-common";
import { checkProd } from "@/utils";
import { ImageExportOptionValues } from "@/types";

const ReportContainer = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  //Bridge Message
  const { isInitializedBridgeMessage } = useBridgeStore();
  // Loading Status
  const { isLoading } = useLoadingStore();
  // Error Status
  const { isError } = useErrorStore();
  // Report List Empty Status
  const { isReportListEmpty } = useReportListStore();
  // Current Report Mode
  const { isAllReportMode } = useCurrentReportMode();
  // Data Information
  const { printData } = usePrintHandler();
  // Handlers & State
  const { handlePrint } = usePrintAction({
    printRef,
    imageExportOption:
      printData?.analysisImage.itemOption.imageExportOption ??
      ImageExportOptionValues.ALL_IMAGE,
    physicianAssessment: printData?.physicianAssessment ?? "",
    patientName: printData?.patientDetail.patientName ?? "",
  });

  // bridgeMessage를 받을 때까지 아무것도 렌더링하지 않음 (프로덕션 환경에서만)
  if (!isInitializedBridgeMessage && checkProd()) {
    return (
      <div className="size-full flex items-center justify-center bg-bg-base-alt">
        <LoadingIndicator isLoading={true} full={true} />
      </div>
    );
  }

  // api 호출 실패 시 에러 표시 (프로덕션 환경에서만)
  if (isError && checkProd()) {
    return (
      <>
        <ErrorIndicator />
        <LoadingIndicator isLoading={isLoading} full={true} />
      </>
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
