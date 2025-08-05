import { NumberedList } from "@/components";

const PatientInformation = () => {
  return (
    <div className="column">
      <NumberedList number={1} title="환자 정보" />
      <table>
        <tbody>
          <tr>
            <td className="td-label">차트 번호</td>
            <td className="td-value"></td>
          </tr>
          <tr>
            <td className="td-label">성명</td>
            <td className="td-value"></td>
          </tr>
          <tr>
            <td className="td-label">생년월일</td>
            <td className="td-value"></td>
          </tr>
          <tr>
            <td className="td-label">검사일시</td>
            <td className="td-value"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PatientInformation;
