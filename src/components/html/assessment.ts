import { numberedList } from "./templates/numberedList";

const assessment = (assessment: string) => `
  <div id="assessment" class="column">
      ${numberedList(5, "담당 의사 소견")}
      <div class="comment-box-assessment">${assessment}</div>
    </div>
`;

export { assessment };
