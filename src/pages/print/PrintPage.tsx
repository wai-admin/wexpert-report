import { RefObject } from "react";
import useA4Handler from "@/hooks/print/useA4Handler";
import { checkTruthy } from "@/utils";
import { A4Template } from "@/components";
import { Cover, ElementRenderer } from "@/pages";
import { PrintData } from "@/types";

interface PrintPageProps {
  printRef: RefObject<HTMLDivElement | null>;
  printData: PrintData | null;
}

const PrintPage = ({ printRef, printData }: PrintPageProps) => {
  const { elementPageInfo, MeasureContainer } = useA4Handler({
    printData,
  });

  const hospitalName = checkTruthy(printData)
    ? printData.cover.hospitalName
    : "";

  return (
    <div className="print-preview-container">
      <MeasureContainer />
      <div ref={printRef} className="a4-container">
        <Cover hospitalName={hospitalName} />
        {printData && (
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
                      printData={printData}
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
