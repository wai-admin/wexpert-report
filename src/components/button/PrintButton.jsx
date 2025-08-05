import { useReactToPrint } from "react-to-print";

const PrintButton = ({ printRef }) => {
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Wexpert Report",
    onAfterPrint: () => console.log("Print completed"),
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
