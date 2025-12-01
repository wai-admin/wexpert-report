import { AllPatientsController, PatientController } from "@/pages";
import { useCurrentReportModeStore } from "@/store";
import { PrintPageData } from "@/types";
import { PrintOptions } from "@/hooks/usePrintAction";

interface ReportControllerProps {
  printPageData: PrintPageData | null;
  onPrint: (options?: PrintOptions) => void;
}

const ReportController = ({
  printPageData,
  onPrint,
}: ReportControllerProps) => {
  // Current Report Mode
  const { isAllReportMode } = useCurrentReportModeStore();

  return (
    <div
      className={`h-screen bg-bg-base-alt ${
        isAllReportMode
          ? "w-[var(--all-report-controller-width)]"
          : "w-[var(--patient-report-controller-width)]"
      }`}
    >
      {isAllReportMode ? (
        <AllPatientsController onPrint={onPrint} />
      ) : (
        <PatientController printPageData={printPageData} onPrint={onPrint} />
      )}
    </div>
  );
};

export default ReportController;
