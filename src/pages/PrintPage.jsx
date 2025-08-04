import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import Cover from "./Cover";
import Header from "./Header";

const Print = () => {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Wexpert Report",
    onAfterPrint: () => console.log("Print completed"),
  });

  return (
    <div className="print-preview-container">
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
      <div ref={printRef} className="a4-container">
        <Cover />
        <table style={{ width: "210mm" }}>
          <thead>
            <tr
              style={{
                width: "210mm",
                display: "flex",
                justifyContent: "center",
                margin: "50px 0 24px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: "710px",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "20px",
                  borderBottom: "1px solid black",
                }}
              >
                <th>
                  <p style={{ fontSize: "18px", fontWeight: "bold" }}>병원명</p>
                </th>
                <th>
                  <img
                    src="/images/wexpert.png"
                    style={{ width: "82px", height: "18px" }}
                  />
                </th>
              </div>
            </tr>
          </thead>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "0px 40px",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
              1. 환자 정보
            </h3>
            <div className="info-table">
              <div className="table-row">
                <div className="table-label">차트 번호</div>
                <div className="table-value"></div>
              </div>
              <div className="table-row">
                <div className="table-label">성명</div>
                <div className="table-value"></div>
              </div>
              <div className="table-row">
                <div className="table-label">생년월일</div>
                <div className="table-value"></div>
              </div>
              <div className="table-row">
                <div className="table-label">검사일시</div>
                <div className="table-value"></div>
              </div>
            </div>

            <h3
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginTop: "30px",
              }}
            >
              2. AI 분석 요약
            </h3>
            <div className="info-table">
              <div className="table-row">
                <div className="table-label">보형물 삽입 위치</div>
                <div className="table-value"></div>
              </div>
              <div className="table-row">
                <div className="table-label">표면 타입</div>
                <div className="table-value"></div>
              </div>
              <div className="table-row">
                <div className="table-label">파열 여부</div>
                <div className="table-value"></div>
              </div>
            </div>
            {/* <div className="info-input page-break-avoid">
              보형물 주변에 형성된
            </div>
            <div className="info-input page-break-avoid">
              보형물 주변에 형성된
            </div>
            <div className="info-input page-break-avoid">
              보형물 주변에 형성된
            </div>
            <div className="info-input page-break-avoid">
              보형물 주변에 형성된
            </div>
            <div className="info-input page-break-avoid">
              보형물 주변에 형성된
            </div>
            <div className="info-input page-break-avoid">
              보형물 주변에 형성된
            </div>
            <div className="info-input page-break-avoid">
              보형물 주변에 형성된
            </div>
            <div className="info-input page-break-avoid">
              보형물 주변에 형성된
            </div> */}
          </div>
        </table>
      </div>
    </div>
  );
};

export default Print;
