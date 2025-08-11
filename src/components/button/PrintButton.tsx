import { RefObject } from "react";
import { useReactToPrint } from "react-to-print";

interface PrintButtonProps {
  printRef: RefObject<HTMLDivElement | null>;
}

const PrintButton = ({ printRef }: PrintButtonProps) => {
  const handlePrint = useReactToPrint({
    contentRef: printRef ?? undefined,
    documentTitle: "Wexpert Report",
    onAfterPrint: () => console.log("Print completed"),
    pageStyle: `
      @page {
        size: A4;
        margin: 0 0 0 0 !important;
      }
      body {
        margin: 0 0 0 0 !important;
        -webkit-print-color-adjust: exact;
      }
      @media print {
        body {
          margin: 0 0 0 0;
          padding: 0 0 0 0;
        }
      }
    `,
  });

  return (
    <button
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        width: "100px",
        height: "30px",
        backgroundColor: "white",
      }}
      onClick={handlePrint}
    >
      <p style={{ fontSize: "14px", color: "rgb(102, 102, 102)" }}>프린트</p>
    </button>
  );
};

export default PrintButton;
