import { A4Template, Assessment, AnalysisResult } from "@/components";
import { PRINT_CONFIG } from "@/constants/config";

const RemainingPage = ({ analysisItems }) => {
  const allPages = [];
  const { FIRST_PAGE_ITEMS, ITEMS_PER_PAGE } = PRINT_CONFIG;

  // ITEMS_PER_PAGE(5개)씩 그룹으로 나누어 페이지 생성 (한 페이지 최대 5개)
  for (let i = 0; i < analysisItems.length; i += ITEMS_PER_PAGE) {
    // 현재 페이지에 들어갈 아이템들을 추출 (i부터 i+ITEMS_PER_PAGE까지)
    const pageItems = analysisItems.slice(i, i + ITEMS_PER_PAGE);

    // 현재 페이지 번호 계산 (0부터 시작하므로 +1)
    const pageNumber = Math.floor(i / ITEMS_PER_PAGE) + 1;

    // 현재 페이지가 마지막 페이지인지 확인 (i + ITEMS_PER_PAGE가 전체 길이보다 크거나 같으면 마지막 페이지)
    const isLastPage = i + ITEMS_PER_PAGE >= analysisItems.length;

    // 현재 페이지가 꽉 찼는지 확인 (5개가 모두 들어갔는지)
    const isPageFull = pageItems.length === ITEMS_PER_PAGE;

    // 현재 페이지를 allPages 배열에 추가
    allPages.push(
      <A4Template key={`page-${pageNumber}`}>
        {/* 현재 페이지의 아이템들을 렌더링 */}
        {pageItems.map((item, index) => {
          // 전체 인덱스 계산 (첫 페이지 아이템 수 + 현재 페이지 시작 위치 + 현재 아이템 위치)
          const resultNumber = FIRST_PAGE_ITEMS + i + index + 1;

          return (
            <AnalysisResult key={item.id} index={resultNumber} item={item} />
          );
        })}
        {/* 페이지가 꽉 차지 않았고 마지막 페이지인 경우에만 Assessment 컴포넌트 표시 */}
        {/* 이 조건은 마지막 페이지에 5개 미만의 아이템이 있을 때만 실행됨 */}
        {isPageFull === false && isLastPage && <Assessment />}
      </A4Template>
    );
  }

  // 마지막 페이지가 꽉 찬 경우 새로운 페이지에 "끝" 표시
  if (analysisItems.length > 0 && analysisItems.length % ITEMS_PER_PAGE === 0) {
    allPages.push(<Assessment />);
  }

  return <>{allPages}</>;
};

export default RemainingPage;
