import { NumberedList } from "@/components";
import { AnalysisSummary as AnalysisSummaryType } from "@/lib/reportType";

interface AnalysisSummaryProps {
  id: string;
  analysisSummary: AnalysisSummaryType;
}

const AnalysisSummary = ({ id, analysisSummary }: AnalysisSummaryProps) => {
  const { implantPosition, ruptureStatus, surfaceType } = analysisSummary;

  return (
    <div id={id} className="column">
      <NumberedList number={2} title="AI 분석 요약" />
      <table>
        <tbody>
          <tr>
            <td className="td-label">보형물 삽입 위치</td>
            <td className="td-value">{implantPosition}</td>
          </tr>
          <tr>
            <td className="td-label">표면 타입</td>
            <td className="td-value">{surfaceType}</td>
          </tr>
          <tr>
            <td className="td-label">파열 여부</td>
            <td className="td-value">{ruptureStatus}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AnalysisSummary;
