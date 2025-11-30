import { useEffect } from "react";
import { TableCell } from "@/pages";
import { ALL_PATIENTS_TABLE_COLUMNS } from "@/constants";
import { AllPatientReportListDetailData } from "@/lib/allPatientReportListType";
import { useReportHistoryStore } from "@/store";

interface TableRowsProps {
  allPatientReportList: AllPatientReportListDetailData[];
  selectedReportIndex: number;
  setSelectedReportIndex: (index: number) => void;
}

const TableRows = ({
  allPatientReportList,
  selectedReportIndex,
  setSelectedReportIndex,
}: TableRowsProps) => {
  const { setSelectedReportId } = useReportHistoryStore();

  // 리스트 로드 성공 시 또는 selectedReportIndex 변경 시 selectedReportId 업데이트
  useEffect(() => {
    if (allPatientReportList.length > 0) {
      const reportId = allPatientReportList[selectedReportIndex]?.id.toString();
      if (reportId) {
        setSelectedReportId(reportId);
      }
    }
  }, [allPatientReportList, selectedReportIndex, setSelectedReportId]);

  return (
    <div className="w-full h-[460px] border-b border-b-solid-dk overflow-y-auto overscroll-contain">
      {allPatientReportList.map(
        (report: AllPatientReportListDetailData, index: number) => {
          const isSelected = index === selectedReportIndex;

          return (
            <div
              key={report.id}
              className="w-full h-[48px] flex items-center justify-between bg-transparent hover:bg-[rgb(49,51,53)] border-b border-b-solid-dk px-[14px] cursor-pointer transition-colors duration-100"
              onClick={() => setSelectedReportIndex(index)}
            >
              {ALL_PATIENTS_TABLE_COLUMNS.map((column) => (
                <TableCell
                  key={column.key}
                  column={column as any}
                  report={report as any}
                  isSelected={isSelected}
                />
              ))}
            </div>
          );
        }
      )}
    </div>
  );
};

export default TableRows;
