import { NumberedList } from "@/components";

interface PatientInformationProps {
  id: string;
  patientInformation: {
    chatNumber: string;
    patientName: string;
    birth: string;
    analysisDate: string;
  };
}
const PatientInformation = ({
  id,
  patientInformation,
}: PatientInformationProps) => {
  const { chatNumber, patientName, birth, analysisDate } = patientInformation;

  return (
    <div id={id} className="column">
      <NumberedList number={1} title="환자 정보" />
      <table>
        <tbody>
          <tr>
            <td className="td-label">차트 번호</td>
            <td className="td-value">{chatNumber}</td>
          </tr>
          <tr>
            <td className="td-label">성명</td>
            <td className="td-value">{patientName}</td>
          </tr>
          <tr>
            <td className="td-label">생년월일</td>
            <td className="td-value">{birth}</td>
          </tr>
          <tr>
            <td className="td-label">검사일시</td>
            <td className="td-value">{analysisDate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PatientInformation;
