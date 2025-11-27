import { AllPatientsController, PatientController } from "@/pages";
import { PrintPageData } from "@/types";
import { ReportOptionType } from "@/lib/nativeMessageType";

interface ReportControllerProps {
  printPageData: PrintPageData | null;
  reportMode: ReportOptionType;
  onPrint: () => void;
}

const ReportController = ({
  printPageData,
  reportMode,
  onPrint,
}: ReportControllerProps) => {
  return (
    <div
      className={`h-screen bg-bg-base-alt ${
        reportMode === ReportOptionType.ALL_REPORT_HISTORY
          ? "w-[var(--all-report-controller-width)]"
          : "w-[var(--patient-report-controller-width)]"
      }`}
    >
      {reportMode === ReportOptionType.ALL_REPORT_HISTORY ? (
        <AllPatientsController
          printPageData={printPageData}
          onPrint={onPrint}
        />
      ) : (
        <PatientController printPageData={printPageData} onPrint={onPrint} />
      )}
    </div>
  );
};

export default ReportController;
