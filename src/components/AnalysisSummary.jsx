import { NumberedList } from "@/components";

const AnalysisSummary = () => {
  return (
    <div className="column">
      <NumberedList number={2} title="AI 분석 요약" />
      <table>
        <tbody>
          <tr>
            <td className="td-label">보형물 삽입 위치</td>
            <td className="td-value"></td>
          </tr>
          <tr>
            <td className="td-label">표면 타입</td>
            <td className="td-value"></td>
          </tr>
          <tr>
            <td className="td-label">파열 여부</td>
            <td className="td-value"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AnalysisSummary;
