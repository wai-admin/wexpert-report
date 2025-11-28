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
import { PrintPageData } from "@/types";

interface NewReportProps {
  printPageData: PrintPageData | null;
  onPrint: () => void;
}

const NewReport = ({ printPageData, onPrint }: NewReportProps) => {
  return (
    <div className="size-full flex flex-col justify-between gap-[10px]">
      <div className="w-full flex flex-col flex-1 gap-[26px] overflow-y-auto overscroll-contain">
        <ImageExportOption />
        <Divider />
        <ChartNumber value={printPageData?.patientDetail.chartNumber ?? ""} />
        <Name value={printPageData?.patientDetail.patientName ?? ""} />
        <DateOfBirth birth={printPageData?.patientDetail.birth ?? ""} />
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
