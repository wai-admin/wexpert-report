import { normalizeLineBreaks } from "@/utils/common";
import { numberedList } from "./templates/numberedList";

const recommendTreatment = (id: string, recommendedTreatment: string) => `
  <div id="${id}" class="column">
      ${numberedList(3, "AI 분석 결과에 따른 추천 치료")}
      <div class="comment-box-recommend">
        ${normalizeLineBreaks(recommendedTreatment)}
      </div>
      <div class="recommend-warning">
        ※ 분석 결과는 업로드된 이미지만을 대상으로 한 것이며, 분석되지 않은 부위에 문제가 있을 가능성이 있습니다. 최종 진단은 보형물 검사를 시행한 검사자나 진료를 진행한 의사의 판단에 따릅니다.
      </div>
    </div>
`;

export { recommendTreatment };
