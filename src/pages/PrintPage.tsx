import { useRef, useEffect } from "react";
import { useWebViewLoading, usePrintHandler } from "@/hooks";
import useA4Handler from "@/hooks/useA4Handler";
import { useReport } from "@/services/useReport";
import { useMessageStore, usePrintStore } from "@/store";
import { Cover, FirstPage, RemainingPage } from "@/pages";
import { NativeDefaultMessage } from "@/lib";
import { processReportData } from "@/utils/reportDataProcessor";

const PrintPage = () => {
  // 리포트 관련 커스텀 훅
  const { nativeMessage } = useMessageStore();
  const { data: reportData, isFetching } = useReport();

  const printRef = useRef<HTMLDivElement>(null);
  const patientName = reportData?.data?.patientSummary?.patientName ?? "";

  // 프린트 관련 상태 및 커스텀 훅
  const { handlePrint } = usePrintHandler(printRef, patientName);
  const { isPrintRequested } = usePrintStore();

  // Native에 로딩 상태 전송
  useWebViewLoading(isFetching);

  const { pages, measureRootRef } = useA4Handler({ reportData, nativeMessage });

  // 인쇄 요청 시 자동 실행
  useEffect(() => {
    if (isPrintRequested) {
      handlePrint();
    }
  }, [isPrintRequested]);

  console.log("PrintPage Data Information: ", reportData?.data, pages);

  // 리포트 데이터 가공 (안전한 타입 캐스팅)
  const patientInfo = nativeMessage as NativeDefaultMessage;
  const {
    hospitalName,
    patientInformation,
    analysisSummary,
    recommendedTreatment,
    firstPageItems,
    remainingItems,
    analysisCount,
    ruptureCount,
  } = processReportData(reportData, patientInfo);

  return (
    <div className="print-preview-container">
      <div
        ref={measureRootRef}
        style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
      />
      <div ref={printRef} className="a4-container">
        <Cover hospitalName={hospitalName} />
        <FirstPage
          patientInformation={patientInformation}
          analysisSummary={analysisSummary}
          recommendedTreatment={recommendedTreatment}
          analysisItems={firstPageItems}
          analysisCount={analysisCount}
          ruptureCount={ruptureCount}
          assessment={patientInfo?.assessment}
        />
        <RemainingPage
          firstPageItems={firstPageItems}
          analysisItems={remainingItems}
          assessment={patientInfo?.assessment}
        />
      </div>
    </div>
  );
};

export default PrintPage;
