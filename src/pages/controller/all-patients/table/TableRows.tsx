import { TableCell } from "@/pages";
import { ALL_PATIENTS_TABLE_COLUMNS } from "@/constants";
import { AllPatientReportListDetailData } from "@/lib/allPatientReportListType";

interface TableRowsProps {
  allPatientReportList: AllPatientReportListDetailData[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const TableRows = ({
  allPatientReportList,
  selectedIndex,
  setSelectedIndex,
}: TableRowsProps) => {
  return (
    <div className="w-full h-[460px] border-b border-b-solid-dk overflow-y-auto overscroll-contain">
      {allPatientReportList.map(
        (report: AllPatientReportListDetailData, index: number) => {
          const isSelected = index === selectedIndex;

          return (
            <div
              key={report.id}
              className="w-full h-[48px] flex items-center justify-between bg-transparent hover:bg-[rgb(49,51,53)] border-b border-b-solid-dk px-[14px] cursor-pointer transition-colors duration-100"
              onClick={() => setSelectedIndex(index)}
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
