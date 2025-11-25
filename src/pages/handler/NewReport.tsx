import { useState } from "react";
import {
  Divider,
  ImageExportOption,
  ChartNumber,
  Name,
  DateOfBirth,
  PhysicianAssessment,
} from "@/components";
import { Button } from "@/components-common";
import { ImageExportOptionValues } from "@/types";

interface NewReportProps {
  onPrint: () => void;
}

const NewReport = ({ onPrint }: NewReportProps) => {
  const [imageExportOption, setImageExportOption] =
    useState<ImageExportOptionValues>(ImageExportOptionValues.ALL_IMAGE);
  const [physicianAssessment, setPhysicianAssessment] = useState<string>("");

  return (
    <div className="size-full flex flex-col justify-between gap-[10px]">
      <div className="w-full flex flex-col flex-1 gap-[26px] overflow-y-auto">
        <ImageExportOption
          checkedOption={imageExportOption}
          onChange={setImageExportOption}
        />
        <Divider />
        <ChartNumber value="as" />
        <Name value="as" />
        <DateOfBirth year="as" month="as" day="as" />
        <PhysicianAssessment
          value={physicianAssessment}
          onChange={setPhysicianAssessment}
        />
      </div>
      <Button label="Export" onClick={onPrint} />
    </div>
  );
};

export default NewReport;
