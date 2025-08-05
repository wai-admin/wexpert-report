import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import Cover from "./Cover";
import A4Template from "./A4Template";
import NumberedList from "./NumberedList";
import AnalysisResult from "./AnalysisResult";

import { imageMock } from "@/constants/mock";

const Print = () => {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Wexpert Report",
    onAfterPrint: () => console.log("Print completed"),
  });

  let allPages = [];
  const firstPageItems = 2; // 첫 페이지에 들어갈 아이템 수
  const itemsPerPage = 5; // 추가 페이지당 아이템 수

  // 첫 번째 페이지 (환자 정보 + AI 분석 요약 + 추천 치료 + 부작용 감지 이미지 2개)
  allPages.push(
    <A4Template key="first-page">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <NumberedList number={1} title="환자 정보" />
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

        <NumberedList number={2} title="AI 분석 요약" />
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

        <NumberedList number={3} title="AI 분석 결과에 따른 추천 치료" />
        <div className="info-input-recommend">
          보형물 주변에 형성된 <br /> 보형물 주변에 형성된 <br /> 보형물 주변에
          형성된 <br /> 보형물 주변에 형성된 <br /> 보형물 주변에 형성된
        </div>

        <NumberedList number={4} title="부작용 감지 이미지 첨부" />
        <div className="info-input-image">
          총 {imageMock.length}장의 이미지 중 2장에서 파열이 감지되었습니다.
        </div>
        {imageMock.slice(0, 2).map((item, index) => (
          <AnalysisResult key={item.id} index={index + 1} item={item} />
        ))}
      </div>
    </A4Template>
  );

  // 첫 페이지 이후의 아이템들을 5개씩 그룹으로 나누기
  const remainingItems = imageMock.slice(firstPageItems);

  for (let i = 0; i < remainingItems.length; i += itemsPerPage) {
    const pageItems = remainingItems.slice(i, i + itemsPerPage);
    const pageNumber = Math.floor(i / itemsPerPage) + 1;
    const isLastPage = i + itemsPerPage >= remainingItems.length;
    const isPageFull = pageItems.length === itemsPerPage;

    console.log("pageNumber", pageNumber, remainingItems.length);

    allPages.push(
      <A4Template key={`page-${pageNumber}`}>
        {pageItems.map((item, index) => (
          <AnalysisResult
            key={item.id}
            index={firstPageItems + i + index + 1}
            item={item}
          />
        ))}
        {/* 페이지가 꽉 차지 않았고 마지막 페이지인 경우에만 "끝" 표시 */}
        {!isPageFull && isLastPage && (
          <>
            <NumberedList number={5} title="담당 의사 소견" />
            <div className="info-input-assessment">
              AI 분석 결과와 일치하게, 피막 내 실리콘 침범이 관찰되어 실리콘
              보형물 파열로 판단됩니다. 이에 피막 제거술이 가능한 성형외과
              전문의의 진료를 받으실 것을 권합니다.
            </div>
          </>
        )}
      </A4Template>
    );
  }

  // 마지막 페이지가 꽉 찬 경우 새로운 페이지에 "끝" 표시
  if (remainingItems.length > 0 && remainingItems.length % itemsPerPage === 0) {
    allPages.push(
      <A4Template key="end-page">
        <NumberedList number={5} title="담당 의사 소견" />
        <div className="info-input-assessment">
          AI 분석 결과와 일치하게, 피막 내 실리콘 침범이 관찰되어 실리콘 보형물
          파열로 판단됩니다. 이에 피막 제거술이 가능한 성형외과 전문의의 진료를
          받으실 것을 권합니다.
        </div>
      </A4Template>
    );
  }

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
        {allPages}
      </div>
    </div>
  );
};

export default Print;
