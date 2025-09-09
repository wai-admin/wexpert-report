import { NumberedList } from "@/components";
import { AnalysisSummary as AnalysisSummaryType } from "@/lib/reportType";
import { useTranslation } from "react-i18next";

interface AnalysisSummaryProps {
  id: string;
  analysisSummary: AnalysisSummaryType;
}

const AnalysisSummary = ({ id, analysisSummary }: AnalysisSummaryProps) => {
  const { t: i18n } = useTranslation();
  const { implantPosition, ruptureStatus, surfaceType } = analysisSummary;

  return (
    <div id={id} className="column">
      <NumberedList
        number={2}
        title={i18n("numberedList.summary-of-ai-analysis")}
      />
      <table>
        <tbody>
          <tr>
            <td className="td-label">
              {i18n("analysis-summary.pocket-position")}
            </td>
            <td className="td-value">{implantPosition}</td>
          </tr>
          <tr>
            <td className="td-label">{i18n("analysis-summary.shell-type")}</td>
            <td className="td-value">{surfaceType}</td>
          </tr>
          <tr>
            <td className="td-label">{i18n("analysis-summary.rupture")}</td>
            <td className="td-value">{ruptureStatus}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AnalysisSummary;
