import { useRef, useEffect } from "react";
import { useWebViewLoading, usePrintHandler } from "@/hooks";
import useA4Handler from "@/hooks/useA4Handler";
import { useReport } from "@/services/useReport";
import { useMessageStore, usePrintStore } from "@/store";
import { Cover, ElementRenderer } from "@/pages";
import { A4Template } from "@/components";

const PrintPage = () => {
  // 리포트 관련 커스텀 훅
  const { nativeMessage } = useMessageStore();
  const { data: reportData, isFetching } = useReport();
  // 표시 정보
  const patientName = reportData?.data?.patientSummary?.patientName ?? "";
  const hospitalName = reportData?.data?.patientSummary?.hospitalName ?? "";

  const printRef = useRef<HTMLDivElement>(null);

  // 프린트 관련 상태
  const { handlePrint } = usePrintHandler(printRef, patientName);
  // 프린트 요청 상태 정보(출력, 미출력)
  const { isPrintRequested } = usePrintStore();

  // Native에 로딩 상태 전송
  useWebViewLoading(isFetching);

  // 페이지 정보 관리
  const { elementPageInfo, MeasureContainer } = useA4Handler();

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
                  nativeMessage={nativeMessage}
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
