import { A4Template, Assessment, AnalysisResult } from "@/components";
import { PRINT_CONFIG } from "@/constants/print-config";
import { Sonography } from "@/lib/reportType";
import {
  showAssessmentInFirstPage,
  EXCEED_ASSESSMENT_LENGTH_IN_REMAINING_PAGE,
} from "@/utils";

interface RemainingPageProps {
  firstPageItems: Sonography[];
  analysisItems: Sonography[];
  assessment: string;
}

const RemainingPage = ({
  firstPageItems,
  analysisItems,
  assessment,
}: RemainingPageProps) => {
  const allPages = [];
  const { FIRST_PAGE_ITEMS, ITEMS_PER_PAGE } = PRINT_CONFIG;

  let showAssessmentInLastPage = false;

  // ITEMS_PER_PAGE(5개)씩 그룹으로 나누어 페이지 생성 (한 페이지 최대 5개)
  for (let i = 0; i < analysisItems.length; i += ITEMS_PER_PAGE) {
    // 현재 페이지에 들어갈 아이템들을 추출 (i부터 i+ITEMS_PER_PAGE까지)
    const pageItems = analysisItems.slice(i, i + ITEMS_PER_PAGE);

    // 현재 페이지 번호 계산 (0부터 시작하므로 +1, FirstPage가 있으므로 +1)
    const pageNumber = Math.floor(i / ITEMS_PER_PAGE) + 2;

    // 현재 페이지가 마지막 페이지인지 확인 (i + ITEMS_PER_PAGE가 전체 길이보다 크거나 같으면 마지막 페이지)
    const isLastPage = i + ITEMS_PER_PAGE >= analysisItems.length;

    console.log(pageItems.length, ITEMS_PER_PAGE, assessment.length);
    // 현재 페이지가 5개의 분석 결과가 존재하는지 (pageItems.length === ITEMS_PER_PAGE)
    // 혹은
    // 4개의 분석 결과가 존재하면서 [담당 의사 소견]의 텍스트 길이가 741자 이상인지 확인 (pageItems.length === ITEMS_PER_PAGE - 1 && assessment.length > EXCEED_ASSESSMENT_LENGTH_IN_REMAINING_PAGE)
    // 참고: 741자가 초과되면 UI가 깨지기 때문에 다음 페이지에서 [담당 의사 소견] 표시를 해야함.
    const isPageFull =
      pageItems.length === ITEMS_PER_PAGE ||
      (pageItems.length === ITEMS_PER_PAGE - 1 &&
        assessment.length > EXCEED_ASSESSMENT_LENGTH_IN_REMAINING_PAGE);

    showAssessmentInLastPage = isPageFull === false && isLastPage;

    // 현재 페이지를 allPages 배열에 추가
    allPages.push(
      <A4Template key={`page-${pageNumber}`} pageNumber={pageNumber}>
        {/* 현재 페이지의 아이템들을 렌더링 */}
        {pageItems.map((item, index) => {
          // 전체 인덱스 계산 (첫 페이지 아이템 수 + 현재 페이지 시작 위치 + 현재 아이템 위치)
          const resultNumber = FIRST_PAGE_ITEMS + i + index + 1;

          return (
            <AnalysisResult key={item.id} index={resultNumber} item={item} />
          );
        })}
        {showAssessmentInLastPage && <Assessment />}
      </A4Template>
    );
  }

  // 첫 페이지, 마지막 페이지 모두 [담당 의사 소견] 표시 안되는 경우
  // 새로운 A4를 추가하여 [담당 의사 소견] 표시
  if (
    showAssessmentInLastPage === false &&
    showAssessmentInFirstPage(firstPageItems, assessment) === false
  ) {
    // 마지막 페이지 번호 계산
    const lastPageNumber = allPages.length + 2;

    allPages.push(
      <A4Template key={`page-${lastPageNumber}`} pageNumber={lastPageNumber}>
        <Assessment />
      </A4Template>
    );
  }

  return <>{allPages}</>;
};

export default RemainingPage;
