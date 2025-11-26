import {
  Divider,
  ImageExportOption,
  ChartNumber,
  Name,
  DateOfBirth,
  PhysicianAssessment,
  PrintGuide,
} from "@/components";
import { Button } from "@/components-common";

interface NewReportProps {
  onPrint: () => void;
}

const NewReport = ({ onPrint }: NewReportProps) => {
  return (
    <div className="size-full flex flex-col justify-between gap-[10px]">
      <div className="w-full flex flex-col flex-1 gap-[26px] overflow-y-auto overscroll-contain">
        <ImageExportOption />
        <Divider />
        <ChartNumber value="as" />
        <Name value="as" />
        <DateOfBirth year="as" month="as" day="as" />
        <PhysicianAssessment />
      </div>
      <div className="w-full flex flex-col gap-[10px]">
        <Button label="Export" onClick={onPrint} />
        <PrintGuide />
      </div>
    </div>
  );
};

export default NewReport;
