import { RadioIndicator } from "@/components-common";
import { checkTruthy, convertISOToLocal } from "@/utils";
import { AllPatientReportListDetailData } from "@/lib/allPatientReportListType";

interface RenderProps {
  report: AllPatientReportListDetailData;
  isSelected: boolean;
}

const ALL_PATIENTS_TABLE_COLUMNS = [
  {
    key: "radio indicator",
    title: "",
    width: 50,
    render: ({ isSelected }: RenderProps) => (
      <RadioIndicator checked={isSelected} />
    ),
  },
  {
    key: "chart number",
    title: "Chart number",
    width: 165,
    render: ({ report }: RenderProps) => (
      <p className="w-full min-w-0 font-pretendard text-[14px] text-text-secondary truncate px-[8px]">
        {checkTruthy(report.chartNumber) ? report.chartNumber : "-"}
      </p>
    ),
  },
  {
    key: "name",
    title: "Name",
    width: 165,
    render: ({ report }: RenderProps) => (
      <p className="w-full min-w-0 font-pretendard text-[14px] text-text-secondary truncate px-[8px]">
        {checkTruthy(report.patientName) ? report.patientName : "-"}
      </p>
    ),
  },
  {
    key: "date of birth",
    title: "Date of birth",
    width: 155,
    render: ({ report }: RenderProps) => (
      <p className="font-pretendard text-[14px] text-text-secondary px-[8px]">
        {checkTruthy(report.patientBirthDate)
          ? convertISOToLocal(report.patientBirthDate, true, true)
          : "-"}
      </p>
    ),
  },
  {
    key: "report created",
    title: "Report created",
    width: 165,
    render: ({ report }: RenderProps) => (
      <p className="font-pretendard text-[14px] text-text-secondary px-[8px]">
        {checkTruthy(report.createdAt)
          ? convertISOToLocal(report.createdAt, false, true)
          : "-"}
      </p>
    ),
  },
];

export { ALL_PATIENTS_TABLE_COLUMNS };
