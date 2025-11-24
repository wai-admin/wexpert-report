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

  return (
    <div className="w-[var(--option-container-width)] h-screen flex flex-col p-[30px] bg-bg-base-alt gap-[20px] overflow-y-auto">
      <ReportTabs
        selectedReportTab={selectedReportTab}
        setSelectedReportTab={setSelectedReportTab}
      />
      {selectedReportTab === ReportTabValues.NEW_REPORT && (
        <NewReport onPrint={onPrint} />
      )}
      {selectedReportTab === ReportTabValues.REPORT_HISTORY && (
        <ReportHistory onPrint={onPrint} />
      )}
    </div>
  );
};

export default OptionHandler;
