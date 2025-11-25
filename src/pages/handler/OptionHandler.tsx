import { useState } from "react";
import { ReportTabs } from "@/components";
import { Button } from "@/components-common";
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
    <div className="w-[var(--option-container-width)] h-screen flex flex-col justify-between p-[30px] bg-bg-base-alt">
      <ReportTabs
        selectedReportTab={selectedReportTab}
        setSelectedReportTab={setSelectedReportTab}
      />
      <div className="flex-1 overflow-y-auto">
        {selectedNewReportTab && (
          <div className="mt-[20px]">
            <NewReport />
          </div>
        )}
        {selectedReportHistoryTab && <ReportHistory />}
      </div>
      <div className="mt-[10px]">
        <Button label="Export" onClick={onPrint} />
      </div>
    </div>
  );
};

export default OptionHandler;
