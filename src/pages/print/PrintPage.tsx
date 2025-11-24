import { RefObject } from "react";
import useA4Handler from "@/hooks/useA4Handler";
import { ReportResponse } from "@/lib";
import { checkTruthy } from "@/utils";
import { A4Template } from "@/components";
import { Cover, ElementRenderer } from "@/pages";

interface PrintPageProps {
  printRef: RefObject<HTMLDivElement | null>;
  reportData: ReportResponse | undefined;
}

const PrintPage = ({ printRef, reportData }: PrintPageProps) => {
  const { elementPageInfo, MeasureContainer } = useA4Handler();

  // Data Information
  const hospitalName = checkTruthy(reportData)
    ? reportData.data.patientSummary.hospitalName
    : "";

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
