import { useState } from "react";
import { ReportTabs } from "@/components";
import { NewReport, ReportHistory } from "@/pages";
import { ReportTabValues } from "@/types";

interface OptionHandlerProps {
  onPrint: () => void;
}

const OptionHandler = ({ onPrint }: OptionHandlerProps) => {
  const [selectedReportTab, setSelectedReportTab] = useState<ReportTabValues>(
    ReportTabValues.NEW_REPORT
  );

  const selectedNewReportTab = selectedReportTab === ReportTabValues.NEW_REPORT;
  const selectedReportHistoryTab =
    selectedReportTab === ReportTabValues.REPORT_HISTORY;

  return (
    <div
      className={`w-[var(--option-container-width)] h-screen flex flex-col justify-between p-[30px] bg-bg-base-alt ${
        selectedNewReportTab ? "gap-[20px]" : "gap-[0px]"
      }`}
    >
      <ReportTabs
        selectedReportTab={selectedReportTab}
        setSelectedReportTab={setSelectedReportTab}
      />
      {/* TODO: min-h-0이 왜 필요한지 확인 */}
      <div className="flex-1 min-h-0">
        {selectedNewReportTab && <NewReport onPrint={onPrint} />}
        {selectedReportHistoryTab && <ReportHistory onPrint={onPrint} />}
      </div>
    </div>
  );
};

export default OptionHandler;
