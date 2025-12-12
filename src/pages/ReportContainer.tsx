import { useEffect, useRef } from "react";
import { usePrintAction } from "@/hooks";
import { useReportListStore, useCurrentReportMode } from "@/store";
import { PrintPage, ReportController, EmptyPrintPage } from "@/pages";
import usePrintHandler from "@/hooks/print/usePrintHandler";
import { checkFalsy } from "@/utils";
import { ImageExportOptionValues } from "@/types";

const ReportContainer = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { isReportListEmpty, selectedReportId } = useReportListStore();
  const { isAllReportMode } = useCurrentReportMode();
  const { printData } = usePrintHandler();
  const { handlePrint } = usePrintAction({
    printRef,
    imageExportOption:
      printData?.analysisImage.itemOption.imageExportOption ??
      ImageExportOptionValues.ALL_IMAGE,
    physicianAssessment: printData?.physicianAssessment ?? "",
    patientName: printData?.patientDetail.patientName ?? "",
  });

  // 새로운 리포트 선택 시 스크롤 초기화 (Report History 모드에 해당)
  useEffect(() => {
    if (checkFalsy(selectedReportId) || checkFalsy(scrollRef.current)) return;

    scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedReportId]);

  const printPageWidth = isAllReportMode
    ? "w-[calc(100%-var(--all-report-controller-width))]"
    : "w-[calc(100%-var(--patient-report-controller-width))]";

  return (
    <div className="size-full flex justify-start relative">
      <div
        ref={scrollRef}
        className={`h-full flex justify-center overflow-y-scroll overflow-x-hidden scroll-custom ${printPageWidth}`}
      >
        {isReportListEmpty ? (
          <EmptyPrintPage />
        ) : (
          <PrintPage printRef={printRef} printData={printData} />
        )}
      </div>
      <div className="fixed right-0 top-0">
        <ReportController printData={printData} onPrint={handlePrint} />
      </div>
    </div>
  );
};

export default ReportContainer;
