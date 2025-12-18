import { RefObject, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { checkTruthy, formatPdfFileName } from "@/utils";
import { useReportListStore } from "@/store";
import { useReportUpload } from "@/services/useReportUpload";
import { ReportData } from "@/services/types";
import { ImageExportOptionValues } from "@/types";

interface UsePrintActionProps {
  printRef: RefObject<HTMLDivElement | null>;
  imageExportOption: ImageExportOptionValues;
  physicianAssessment: string;
  patientName: string;
}

export interface PrintOptions {
  shouldUploadReport?: boolean;
}

/**
 * 인쇄 처리를 위한 커스텀 훅
 */
export const usePrintAction = ({
  printRef,
  imageExportOption,
  physicianAssessment,
  patientName,
}: UsePrintActionProps) => {
  const { selectedPatientId } = useReportListStore();
  const { uploadReport, isSuccess: isUploadSuccess } = useReportUpload();
  const { setIsReportListEmpty } = useReportListStore();

  const fileName = `${patientName}_${formatPdfFileName(new Date())}`;

  // 현재 인쇄 옵션을 저장할 ref
  const printOptionsRef = { shouldUploadReport: true };

  // 업로드 성공 시 리포트 리스트 비어있지 않음으로 설정
  useEffect(() => {
    if (isUploadSuccess) {
      console.log("[Upload Success] Setting isReportListEmpty to false");
      setIsReportListEmpty(false);
    }
  }, [isUploadSuccess, setIsReportListEmpty]);

  const handlePrintInternal = useReactToPrint({
    contentRef: printRef,
    documentTitle: fileName,
    onBeforePrint: async () => {
      // 리포트 업로드 (옵션에 따라 분기)
      if (
        printOptionsRef.shouldUploadReport &&
        checkTruthy(selectedPatientId)
      ) {
        const reportData = {
          patientId: selectedPatientId,
          includeAllImages:
            imageExportOption === ImageExportOptionValues.ALL_IMAGE,
          doctorOpinion: physicianAssessment || null,
        } as ReportData;

        uploadReport({
          report: reportData,
          file: null,
        });
      }

      return Promise.resolve();
    },
    pageStyle: `
      @page {
        size: A4;
        margin: 0 0 0 0 !important;
      }
      body {
        margin: 0 0 0 0 !important;
        -webkit-print-color-adjust: exact;
      }
      @media print {
        body {
          margin: 0 0 0 0;
          padding: 0 0 0 0;
        }
      }
    `,
  });

  // 옵션을 받을 수 있는 래퍼 함수
  const handlePrint = (options?: PrintOptions) => {
    printOptionsRef.shouldUploadReport = options?.shouldUploadReport ?? true;
    handlePrintInternal();
  };

  return { handlePrint };
};
