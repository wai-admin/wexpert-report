import { useRef, useEffect } from "react";
import { useWebViewLoading, usePrintHandler } from "@/hooks";
import useA4Handler from "@/hooks/useA4Handler";
import { useReport } from "@/services/useReport";
import { useMessageStore, usePrintStore } from "@/store";
import { Cover } from "@/pages";
import { NativeDefaultMessage } from "@/lib";
import {
  A4Template,
  AnalysisResult,
  AnalysisSummary,
  AnalysisViewer,
  Assessment,
  PatientInformation,
  RecommendTreatment,
} from "@/components";
import { processReportData } from "@/utils/reportDataProcessor";
import { ELEMENT } from "@/constants/element-id";

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

  const { elementPageInfo, measureRootRef } = useA4Handler({
    reportData,
    nativeMessage,
  });

  // 인쇄 요청 시 자동 실행
  useEffect(() => {
    if (isPrintRequested) {
      handlePrint();
    }
  }, [isPrintRequested]);

  console.log(
    "PrintPage Data Information: ",
    reportData?.data,
    elementPageInfo
  );

  // 리포트 데이터 가공 (안전한 타입 캐스팅)
  const patientInfo = nativeMessage as NativeDefaultMessage;
  const {
    hospitalName,
    patientInformation,
    analysisSummary,
    recommendedTreatment,
    analysisItems,
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
        {elementPageInfo.map((page) => {
          const { page: pageNumber, elements } = page;

          return (
            <A4Template key={`page-${pageNumber}`} pageNumber={pageNumber}>
              {elements.map((element) => {
                if (element === ELEMENT.PATIENT_INFORMATION) {
                  return (
                    <PatientInformation
                      key={element}
                      patientInformation={patientInformation}
                    />
                  );
                }

                if (element === ELEMENT.ANALYSIS_SUMMARY) {
                  return (
                    <AnalysisSummary
                      key={element}
                      analysisSummary={analysisSummary}
                    />
                  );
                }

                if (element === ELEMENT.RECOMMEND_TREATMENT) {
                  return (
                    <RecommendTreatment
                      key={element}
                      recommendedTreatment={recommendedTreatment}
                    />
                  );
                }

                if (element === ELEMENT.ANALYSIS_VIEWER) {
                  return (
                    <AnalysisViewer
                      key={element}
                      analysisCount={analysisCount}
                      ruptureCount={ruptureCount}
                    />
                  );
                }

                if (element.includes(ELEMENT.ANALYSIS_RESULT_COMMON)) {
                  const analysisResultIndex = Number(element.split("-")[2]);
                  const analysisItem = analysisItems[analysisResultIndex];

                  return (
                    <AnalysisResult
                      key={element}
                      index={analysisResultIndex + 1}
                      item={analysisItem}
                    />
                  );
                }

                if (element === ELEMENT.ASSESSMENT) {
                  return <Assessment key={element} />;
                }
              })}
            </A4Template>
          );
        })}
      </div>
    </div>
  );
};

export default PrintPage;
