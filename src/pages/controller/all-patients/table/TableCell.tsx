import { AllPatientsTableColumn } from "@/types/table";

interface TableCellProps<T> {
  column: AllPatientsTableColumn<T>;
  report: T;
  isSelected: boolean;
}

const TableCell = <T,>({ column, report, isSelected }: TableCellProps<T>) => {
  const { width, render } = column;

  return (
    <div
      className="size-full flex items-center justify-center text-center"
      style={{ maxWidth: `${width}px` }}
    >
      {render ? render({ report, isSelected }) : null}
    </div>
  );
};

export default TableCell;
