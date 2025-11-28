import { NumberedList } from "@/components";
import { useTranslation } from "react-i18next";
import { PrintPagePatientDetail } from "@/types";

interface PatientInformationProps {
  id: string;
  patientDetail: PrintPagePatientDetail;
}
const PatientInformation = ({ id, patientDetail }: PatientInformationProps) => {
  const { t: i18n } = useTranslation();
  const { chartNumber, patientName, birth, patientType, analysisDate } =
    patientDetail;

  return (
    <div id={id} className="column">
      <NumberedList
        number={1}
        title={i18n("numberedList.patient-information")}
      />
      <table>
        <tbody>
          <tr>
            <td className="td-label">
              {i18n("patient-information.chart-number")}
            </td>
            <td className="td-value">{chartNumber}</td>
          </tr>
          <tr>
            <td className="td-label">{i18n("patient-information.name")}</td>
            <td className="td-value">{patientName}</td>
          </tr>
          <tr>
            <td className="td-label">
              {i18n("patient-information.birth-date")}
            </td>
            <td className="td-value">{birth}</td>
          </tr>
          <tr>
            <td className="td-label">{i18n("patient-information.type")}</td>
            <td className="td-value">{patientType}</td>
          </tr>
          <tr>
            <td className="td-label">
              {i18n("patient-information.exam-date")}
            </td>
            <td className="td-value">{analysisDate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PatientInformation;
