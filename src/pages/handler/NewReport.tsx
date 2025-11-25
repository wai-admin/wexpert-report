import { useState } from "react";
import {
  Divider,
  ImageExportOption,
  ChartNumber,
  Name,
  DateOfBirth,
  PhysicianAssessment,
} from "@/components";
import { ImageExportOptionValues } from "@/types";

const NewReport = () => {
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
    </div>
  );
};

export default NewReport;
