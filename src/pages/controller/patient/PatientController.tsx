import { useEffect } from "react";
import { ReportTabs } from "@/components";
import { NewReport, ReportHistory } from "@/pages";
import { PrintData, ReportTabValues, CurrentReportModeValues } from "@/types";
import { usePatientControllerStore, useCurrentReportModeStore } from "@/store";
import { PrintOptions } from "@/hooks/print/useHandlePrint";
import { ReportOptionType } from "@/lib";

interface PatientControllerProps {
  printData: PrintData | null;
  onPrint: (options?: PrintOptions) => void;
}

const PatientController = ({ printData, onPrint }: PatientControllerProps) => {
  const {
    currentReportMode,
    isNewReportMode,
    isPatientReportMode,
    initialReportMode,
  } = useCurrentReportModeStore();

  const { selectedReportTab, setSelectedReportTab } =
    usePatientControllerStore();

  useEffect(() => {
    setSelectedReportTab(
      currentReportMode === CurrentReportModeValues.NEW_REPORT
        ? ReportTabValues.NEW_REPORT
        : ReportTabValues.REPORT_HISTORY
    );
  }, [currentReportMode]);

  const isInitialNewReport = initialReportMode === ReportOptionType.NEW_REPORT;
  const isInitialReportHistory =
    initialReportMode === ReportOptionType.PATIENT_REPORT_HISTORY;

  return (
    <div className="size-full flex flex-col justify-between p-[30px] gap-[25px]">
      {/* 분석 이미지 화면을 통해 들어온 경우 */}
      {isInitialNewReport && (
        <ReportTabs
          selectedReportTab={selectedReportTab}
          setSelectedReportTab={setSelectedReportTab}
        />
      )}
      {/* 환자 리스트 화면을 통해 들어온 경우 */}
      {isInitialReportHistory && (
        <p className="font-pretendard text-[16px] text-white font-medium">
          Report History
        </p>
      )}
      <div className="flex-1 min-h-0">
        {isNewReportMode && (
          <NewReport printData={printData} onPrint={onPrint} />
        )}
        {isPatientReportMode && <ReportHistory onPrint={onPrint} />}
      </div>
    </div>
  );
};

export default PatientController;
