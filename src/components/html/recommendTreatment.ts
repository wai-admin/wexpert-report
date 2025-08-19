import { normalizeLineBreaks } from "@/utils/common";
import { numberedList } from "./templates/numberedList";

const recommendTreatment = (id: string, recommendedTreatment: string) => `
  <div id="${id}" class="column">
      ${numberedList(3, "AI 분석 결과에 따른 추천 치료")}
      <div class="comment-box-recommend">
        ${normalizeLineBreaks(recommendedTreatment)}
      </div>
    </div>
`;

export { recommendTreatment };
