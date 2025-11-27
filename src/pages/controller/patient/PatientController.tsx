import { useState } from "react";
import { ReportTabs } from "@/components";
import { NewReport, ReportHistory } from "@/pages";
import { PrintPageData, ReportTabValues } from "@/types";

interface PatientControllerProps {
  printPageData: PrintPageData | null;
  onPrint: () => void;
}

const PatientController = ({
  printPageData,
  onPrint,
}: PatientControllerProps) => {
  const [selectedReportTab, setSelectedReportTab] = useState<ReportTabValues>(
    ReportTabValues.NEW_REPORT
  );

  const selectedNewReportTab = selectedReportTab === ReportTabValues.NEW_REPORT;
  const selectedReportHistoryTab =
    selectedReportTab === ReportTabValues.REPORT_HISTORY;

  return (
    <div
      className={`size-full flex flex-col justify-between p-[30px] ${
        selectedNewReportTab ? "gap-[20px]" : "gap-[0px]"
      }`}
    >
      <ReportTabs
        selectedReportTab={selectedReportTab}
        setSelectedReportTab={setSelectedReportTab}
      />
      <div className="flex-1 min-h-0">
        {selectedNewReportTab && (
          <NewReport printPageData={printPageData} onPrint={onPrint} />
        )}
        {selectedReportHistoryTab && <ReportHistory onPrint={onPrint} />}
      </div>
    </div>
  );
};

export default PatientController;
