import { AllPatientsController, PatientController } from "@/pages";
import { useCurrentReportModeStore } from "@/store";
import { PrintData } from "@/types";
import { PrintOptions } from "@/hooks/print/usePrintAction";

interface ReportControllerProps {
  printData: PrintData | null;
  onPrint: (options?: PrintOptions) => void;
}

const ReportController = ({ printData, onPrint }: ReportControllerProps) => {
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
        <PatientController printData={printData} onPrint={onPrint} />
      )}
    </div>
  );
};

export default ReportController;
