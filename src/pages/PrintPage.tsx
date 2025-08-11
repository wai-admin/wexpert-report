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

  // 리포트 데이터 가공
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
