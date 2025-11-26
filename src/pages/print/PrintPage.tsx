import { RefObject } from "react";
import useA4Handler from "@/hooks/useA4Handler";
import { checkTruthy } from "@/utils";
import { A4Template } from "@/components";
import { Cover, ElementRenderer } from "@/pages";
import { PrintPageData } from "@/types";

interface PrintPageProps {
  printRef: RefObject<HTMLDivElement | null>;
  printPageData: PrintPageData | null;
}

const PrintPage = ({ printRef, printPageData }: PrintPageProps) => {
  const { elementPageInfo, MeasureContainer } = useA4Handler();

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
                <A4Template key={`page-${pageNumber}`} pageNumber={pageNumber}>
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
