import { numberedList } from "./templates/numberedList";

const analysisViewer = (id: string) => `
  <div id="${id}" class="column">
      ${numberedList(4, "부작용 감지 이미지 첨부")}
      <div class="comment-box-image">
        파열이 감지되었습니다.
      </div>
    </div>
`;

export { analysisViewer };
