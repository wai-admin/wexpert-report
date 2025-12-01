import { AllPatientsController, PatientController } from "@/pages";
import { PrintPageData } from "@/types";
import { ReportOptionType } from "@/lib/nativeMessageType";
import { PrintOptions } from "@/hooks/usePrintAction";

interface ReportControllerProps {
  printPageData: PrintPageData | null;
  reportMode: ReportOptionType;
  onPrint: (options?: PrintOptions) => void;
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
        <AllPatientsController onPrint={onPrint} />
      ) : (
        <PatientController
          printPageData={printPageData}
          reportMode={reportMode}
          onPrint={onPrint}
        />
      )}
    </div>
  );
};

export default ReportController;
