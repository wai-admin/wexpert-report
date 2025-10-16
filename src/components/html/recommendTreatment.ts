import { normalizeLineBreaks } from "@/utils/common";
import { numberedList } from "./templates/numberedList";

const recommendTreatment = (id: string, recommendedTreatment: string) => `
  <div id="${id}" class="column">
      ${numberedList(3, "AI 분석 결과에 따른 추천 치료")}
      <div class="comment-box-recommend">
        ${normalizeLineBreaks(recommendedTreatment)}
      </div>
      <div class="recommend-warning">
        ※ 분석 결과는 업로드된 이미지만을 대상으로 한 것이며, 분석 요청이 없는 부위의 문제는 알 수 없습니다. 최종 진단은 검사를 시행한 의사의 판단에 따릅니다.
      </div>
    </div>
`;

export { recommendTreatment };
