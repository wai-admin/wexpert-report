import { useEffect, RefObject } from "react";
import useA4Handler from "@/hooks/print/useA4Handler";
import { checkTruthy } from "@/utils";
import { A4Template } from "@/components";
import { Cover, ElementRenderer } from "@/pages";
import { PrintPageData, PrintPageOption } from "@/types";
import { useReportListStore } from "@/store";

interface PrintPageProps {
  printRef: RefObject<HTMLDivElement | null>;
  scrollRef: RefObject<HTMLDivElement | null>;
  printPageData: PrintPageData | null;
  option: PrintPageOption;
}

const PrintPage = ({
  printRef,
  scrollRef,
  printPageData,
  option,
}: PrintPageProps) => {
  const { selectedReportId } = useReportListStore();

  const { elementPageInfo, MeasureContainer } = useA4Handler({
    printPageData,
    option,
  });

  // 새로운 리포트 선택 시 스크롤 초기화 (Report History 모드에 해당)
  useEffect(() => {
    if (checkTruthy(selectedReportId) && checkTruthy(scrollRef.current)) {
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [[selectedReportId]]);
  // Data Information
  const hospitalName = checkTruthy(printPageData)
    ? printPageData.cover.hospitalName
    : "";

  return (
    <div className="print-preview-container">
      <MeasureContainer />
      <div ref={printRef} className="a4-container">
        <Cover hospitalName={hospitalName} />
        {printPageData && (
          <>
            {elementPageInfo.map((page) => {
              const { page: pageNumber, elements } = page;

              return (
                <A4Template
                  key={`page-${pageNumber}`}
                  pageNumber={pageNumber}
                  hospitalName={hospitalName}
                >
                  {elements.map((element) => (
                    <ElementRenderer
                      key={element}
                      element={element}
                      printPageData={printPageData}
                    />
                  ))}
                </A4Template>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default PrintPage;
