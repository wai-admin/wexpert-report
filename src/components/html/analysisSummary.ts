import { numberedList } from "./templates/numberedList";

const analysisSummary = `
  <div id="analysis-summary" className="column">
      ${numberedList(2, "AI 분석 요약")}
      <table>
        <tbody>
          <tr>
            <td class="td-label"></td>
            <td class="td-value"></td>
          </tr>
          <tr>
            <td class="td-label"></td>
            <td class="td-value"></td>
          </tr>
          <tr>
            <td class="td-label"></td>
            <td class="td-value"></td>
          </tr>
        </tbody>
      </table>
    </div>
`;

export { analysisSummary };
