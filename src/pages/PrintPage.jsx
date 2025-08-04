import { useRef } from "react";
// import { useReactToPrint } from "react-to-print";

const Print = () => {
  const printRef = useRef();

  // const handlePrint = useReactToPrint({
  //   contentRef: printRef,
  //   documentTitle: "Wexpert Report",
  //   onAfterPrint: () => console.log("Print completed"),
  // });

  return (
    <div className="print-preview-container">
      {/* <button
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
      </button> */}
      <div ref={printRef} className="a4-container">
        <div className="a4-page">
          <div className="a4-content">
            <img src="/images/wai.png" className="logo" />
            <h1 className="title-highlight">AI 기반 초음파 분석을 활용한</h1>
            <h1 className="title-normal">유방 보형물 진단</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              <p style={{ fontSize: "14px", color: "rgb(102, 102, 102)" }}>
                이 보고서는 AI 기반 진단 보조 시스템인
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <img
                  src="/images/wexpert.png"
                  style={{ width: "52px", height: "12px" }}
                />
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgb(102, 102, 102)",
                    marginLeft: "3px",
                    marginTop: "2px",
                  }}
                >
                  를 통해 생성된 영상 분석 문서입니다.
                </p>
              </div>
              <div style={{ marginTop: "50px" }}>
                <h1 style={{ fontSize: "18px", fontWeight: "bold" }}>병원명</h1>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: "0",
              bottom: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img
              src="/images/background.png"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
            <p
              style={{
                fontSize: "14px",
                color: "rgb(185, 185, 185)",
                marginTop: "30px",
              }}
            >
              Generated using a platform provided by W.AI Inc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Print;
