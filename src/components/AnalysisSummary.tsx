import { useTranslation } from "react-i18next";
import { NumberedList } from "@/components";
import { PrintPageAnalysisSummary } from "@/types";
import { checkFalsy } from "@/utils/common";

interface AnalysisSummaryProps {
  id: string;
  analysisSummary: PrintPageAnalysisSummary;
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
            <td className="td-value">
              {checkFalsy(implantPosition) ? "" : implantPosition}
            </td>
          </tr>
          <tr>
            <td className="td-label">{i18n("analysis-summary.shell-type")}</td>
            <td className="td-value">
              {checkFalsy(surfaceType) ? "" : surfaceType}
            </td>
          </tr>
          <tr>
            <td className="td-label">{i18n("analysis-summary.rupture")}</td>
            <td className="td-value">
              {checkFalsy(ruptureStatus) ? "" : ruptureStatus}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AnalysisSummary;
