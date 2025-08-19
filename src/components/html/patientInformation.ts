import { numberedList } from "./templates/numberedList";

const patientInformation = (id: string) => `
  <div id="${id}" class="column">
      ${numberedList(1, "환자 정보")}
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
          <tr>
            <td class="td-label"></td>
            <td class="td-value"></td>
          </tr>
        </tbody>
      </table>
    </div>
`;

export { patientInformation };
