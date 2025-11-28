import { useState, useEffect } from "react";
import { ReportTabs } from "@/components";
import { NewReport, ReportHistory } from "@/pages";
import { PrintPageData, ReportTabValues } from "@/types";
import { ReportOptionType } from "@/lib/nativeMessageType";

interface PatientControllerProps {
  printPageData: PrintPageData | null;
  reportMode: ReportOptionType;
  onPrint: () => void;
}

const PatientController = ({
  printPageData,
  reportMode,
  onPrint,
}: PatientControllerProps) => {
  const [selectedReportTab, setSelectedReportTab] = useState<ReportTabValues>(
    ReportTabValues.NEW_REPORT
  );

  useEffect(() => {
    setSelectedReportTab(
      reportMode === ReportOptionType.NEW_REPORT
        ? ReportTabValues.NEW_REPORT
        : ReportTabValues.REPORT_HISTORY
    );
  }, [reportMode]);

  const selectedNewReportMode = reportMode === ReportOptionType.NEW_REPORT;
  const selectedReportHistoryMode =
    reportMode === ReportOptionType.PATIENT_REPORT_HISTORY;

  const selectedNewReportTab = selectedReportTab === ReportTabValues.NEW_REPORT;
  const selectedReportHistoryTab =
    selectedReportTab === ReportTabValues.REPORT_HISTORY;

  return (
    <div className="size-full flex flex-col justify-between p-[30px] gap-[25px]">
      {/* 분석 이미지 화면을 통해 들어온 경우 */}
      {selectedNewReportMode && (
        <ReportTabs
          selectedReportTab={selectedReportTab}
          setSelectedReportTab={setSelectedReportTab}
        />
      )}
      {/* 환자 리스트 화면을 통해 들어온 경우 */}
      {selectedReportHistoryMode && (
        <p className="font-pretendard text-[16px] text-white font-medium">
          Report History
        </p>
      )}
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
