import { RadioIndicator } from "@/components-common";
import { checkTruthy } from "@/utils/common";

interface RenderProps {
  report: any;
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
    width: 170,
    render: ({ report }: RenderProps) => (
      <p className="font-pretendard text-[14px] text-text-secondary">
        {checkTruthy(report.chartNumber) ? report.chartNumber : "-"}
      </p>
    ),
  },
  {
    key: "name",
    title: "Name",
    width: 170,
    render: ({ report }: RenderProps) => (
      <p className="font-pretendard text-[14px] text-text-secondary">
        {checkTruthy(report.name) ? report.name : "-"}
      </p>
    ),
  },
  {
    key: "date of birth",
    title: "Date of birth",
    width: 170,
    render: ({ report }: RenderProps) => (
      <p className="font-pretendard text-[14px] text-text-secondary">
        {checkTruthy(report.birthDate) ? report.birthDate : "-"}
      </p>
    ),
  },
  {
    key: "report created",
    title: "Report created",
    width: 170,
    render: ({ report }: RenderProps) => (
      <p className="font-pretendard text-[14px] text-text-secondary">
        {checkTruthy(report.reportCreatedDate) ? report.reportCreatedDate : "-"}
      </p>
    ),
  },
];

export { ALL_PATIENTS_TABLE_COLUMNS };
