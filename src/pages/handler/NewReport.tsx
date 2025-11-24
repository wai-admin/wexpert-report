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
    <div className="flex flex-col gap-[26px]">
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
      <Divider />
      <Button label="Export" onClick={onPrint} />
    </div>
  );
};

export default NewReport;
