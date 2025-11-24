import { useState } from "react";
import { Button } from "@/components-common";
import {
  Divider,
  ImageExportOption,
  ChartNumber,
  Name,
  DateOfBirth,
  PhysicianAssessment,
} from "@/components";
import { ImageExportOptionValues, ReportTab } from "@/types";

interface OptionHandlerProps {
  onPrint: () => void;
}

const OptionHandler = ({ onPrint }: OptionHandlerProps) => {
  const [selectedReportTab, setSelectedReportTab] = useState<ReportTab>(
    ReportTab.NEW_REPORT
  );
  const [imageExportOption, setImageExportOption] =
    useState<ImageExportOptionValues>(ImageExportOptionValues.ALL_IMAGE);
  const [physicianAssessment, setPhysicianAssessment] = useState<string>("");

  return (
    <div className="w-[var(--option-container-width)] h-screen flex flex-col p-[30px] bg-bg-base-alt gap-[26px] overflow-y-auto">
      <div className="w-full flex border-b border-[rgba(255,255,255,0.5)]">
        {Object.values(ReportTab).map((tab) => (
          <button
            className={`flex flex-1 justify-center ${
              selectedReportTab === tab
                ? "border-b-[2px] border-blue-300"
                : "border-none border-text-tertiary"
            } pb-[15px]`}
            onClick={() => setSelectedReportTab(tab)}
          >
            <p
              className={`text-[15px] font-pretendard font-semibold ${
                selectedReportTab === tab
                  ? "text-blue-300"
                  : "text-text-tertiary"
              }`}
            >
              {tab}
            </p>
          </button>
        ))}
      </div>
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

export default OptionHandler;
