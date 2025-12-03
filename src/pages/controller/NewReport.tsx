import { useRef } from "react";
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
import { PrintData } from "@/types";
import { PrintOptions } from "@/hooks/print/useHandlePrint";
import { useHasScroll } from "@/hooks";

interface NewReportProps {
  printData: PrintData | null;
  onPrint: (options?: PrintOptions) => void;
}

const NewReport = ({ printData, onPrint }: NewReportProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { hasScroll } = useHasScroll(scrollRef);

  return (
    <div className="size-full flex flex-col justify-between gap-[10px]">
      <div
        ref={scrollRef}
        className={`w-full flex flex-col flex-1 gap-[26px] overflow-y-auto overscroll-contain scroll-custom ${
          hasScroll ? "pr-[10px]" : ""
        }`}
      >
        <ImageExportOption />
        <Divider />
        <ChartNumber value={printData?.patientDetail.chartNumber ?? "-"} />
        <Name value={printData?.patientDetail.patientName ?? "-"} />
        <DateOfBirth birth={printData?.patientDetail.birth ?? "-"} />
        <PhysicianAssessment />
      </div>
      <div className="w-full flex flex-col gap-[10px]">
        <Button
          label="Export"
          onClick={() => onPrint({ shouldUploadReport: true })}
        />
        <PrintGuide />
      </div>
    </div>
  );
};

export default NewReport;
