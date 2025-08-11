import { useRef, useEffect } from "react";
import { useQuery, useWebViewLoading, usePrintHandler } from "@/hooks";
import { useMessageStore, usePrintStore } from "@/store";
import { Cover, FirstPage, RemainingPage } from "@/pages";
import { QUERY_KEYS, NativeDefaultMessage } from "@/lib";
import { reportApi } from "@/services/api";
import { getPatientId, hasValidPatientId } from "@/utils";
import { processReportData } from "@/utils/reportDataProcessor";

const PrintPage = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const { nativeMessage } = useMessageStore();
  const { isPrintRequested } = usePrintStore();
  const { handlePrint } = usePrintHandler(printRef);

  const patientId = getPatientId(nativeMessage);

  const { data: reportData, isFetching } = useQuery({
    queryKey: QUERY_KEYS.REPORT.DETAIL(patientId),
    queryFn: () => reportApi.getReport(patientId),
    enabled: hasValidPatientId(nativeMessage),
    retry: (failureCount, error: any) => {
      // 네트워크 오류나 5xx 서버 오류는 재시도
      const isNetworkOrServerError =
        error.message.includes("Network") ||
        (error.response?.status && error.response.status >= 500);

      if (isNetworkOrServerError) {
        return failureCount < 2; // 최대 2번 재시도
      }

      // 4xx 클라이언트 오류는 재시도하지 않음
      return false;
    },
    // 1번째 재시도: 1초 딜레이, 2번째 재시도: 2초 딜레이
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // WebView에 로딩 상태 전송
  useWebViewLoading(isFetching);

  // 인쇄 요청 시 자동 실행
  useEffect(() => {
    if (isPrintRequested) {
      handlePrint();
    }
  }, [isPrintRequested, handlePrint]);

  console.log("PrintPage reportData: ", reportData?.data);

  // 리포트 데이터 가공 (안전한 타입 캐스팅)
  const patientInfo = nativeMessage as NativeDefaultMessage | null;
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
      <div ref={printRef} className="a4-container">
        <Cover hospitalName={hospitalName} />
        <FirstPage
          patientInformation={patientInformation}
          analysisSummary={analysisSummary}
          recommendedTreatment={recommendedTreatment}
          analysisItems={firstPageItems}
          analysisCount={analysisCount}
          ruptureCount={ruptureCount}
          exportOptionType={patientInfo?.exportOptionType}
        />
        <RemainingPage
          firstPageItems={firstPageItems}
          analysisItems={remainingItems}
        />
      </div>
    </div>
  );
};

export default PrintPage;
