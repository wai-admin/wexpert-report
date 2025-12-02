import { RefObject } from "react";
import { TableCell } from "@/pages";
import { ALL_PATIENTS_TABLE_COLUMNS } from "@/constants";
import { AllPatientReportListDetailData } from "@/lib/allPatientReportListType";

interface TableRowsProps {
  scrollRef: RefObject<HTMLDivElement | null>;
  allPatientReportList: AllPatientReportListDetailData[];
  selectedReportIndex: number;
  setSelectedReportIndex: (index: number) => void;
}

const TableRows = ({
  scrollRef,
  allPatientReportList,
  selectedReportIndex,
  setSelectedReportIndex,
}: TableRowsProps) => {
  return (
    <div
      ref={scrollRef}
      className="w-full flex-1 border-b border-b-solid-dk overflow-y-auto overscroll-contain scroll-custom"
    >
      {allPatientReportList.map(
        (report: AllPatientReportListDetailData, index: number) => {
          const isSelected = index === selectedReportIndex;

          return (
            <div
              key={report.reportId.toString()}
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
