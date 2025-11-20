import { useRef, useEffect } from "react";
import { useWebViewLoading, usePrintHandler } from "@/hooks";
import useA4Handler from "@/hooks/useA4Handler";
import { useReport } from "@/services/useReport";
import { usePrintStore } from "@/store";
import { Cover, ElementRenderer } from "@/pages";
import { A4Template } from "@/components";

const PrintPage = () => {
  const printRef = useRef<HTMLDivElement>(null);

  // Data Information
  const { data: reportData, isFetching } = useReport();
  const patientName = reportData?.data.patientSummary.patientName ?? "";
  const hospitalName = reportData?.data.patientSummary.hospitalName ?? "";

  // Handlers & State
  const { handlePrint } = usePrintHandler(printRef, patientName);
  const { isPrintRequested } = usePrintStore();
  const { elementPageInfo, MeasureContainer } = useA4Handler();

  // Native에 로딩 상태 전송
  useWebViewLoading(isFetching);

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

  return (
    <div className="print-preview-container">
      <MeasureContainer />
      <div ref={printRef} className="a4-container">
        <Cover hospitalName={hospitalName} />
        {/* 페이지 정보를 기반으로 페이지 렌더링 */}
        {elementPageInfo.map((page) => {
          const { page: pageNumber, elements } = page;

          return (
            <A4Template key={`page-${pageNumber}`} pageNumber={pageNumber}>
              {elements.map((element) => (
                <ElementRenderer
                  key={element}
                  element={element}
                  reportData={reportData}
                />
              ))}
            </A4Template>
          );
        })}
      </div>
    </div>
  );
};

export default PrintPage;
