import { TableCell } from "@/pages";
import { ALL_PATIENTS_TABLE_COLUMNS } from "@/constants";

interface TableRowsProps {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const TableRows = ({ selectedIndex, setSelectedIndex }: TableRowsProps) => {
  return (
    <div className="w-full h-[460px] border-b border-b-solid-dk overflow-y-auto overscroll-contain">
      {MOCK_REPORT_LIST.map((report, index) => {
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
      })}
    </div>
  );
};

export default TableRows;

const MOCK_REPORT_LIST = [
  {
    id: 1,
    chartNumber: "25-123125",
    name: "",
    birthDate: "1990/01/01",
    reportCreatedDate: "2021/01/01",
  },
  {
    id: 2,
    chartNumber: "25-123126",
    name: "Jane Doe",
    birthDate: "1991/02/02",
    reportCreatedDate: "2021/02/02",
  },
  {
    id: 3,
    chartNumber: "25-123127",
    name: "Jim Beam",
    birthDate: "1992/03/03",
    reportCreatedDate: "2021/03/03",
  },
  {
    id: 4,
    chartNumber: "25-123128",
    name: "Jill Smith",
    birthDate: "1993/04/04",
    reportCreatedDate: "2021/04/04",
  },
  {
    id: 5,
    chartNumber: "25-123129",
    name: "Jackie Chan",
    birthDate: "1994/05/05",
    reportCreatedDate: "2021/05/05",
  },
  {
    id: 6,
    chartNumber: "25-123130",
    name: "Jill Smith",
    birthDate: "1995/06/06",
    reportCreatedDate: "2021/06/06",
  },
  {
    id: 7,
    chartNumber: "25-123131",
    name: "Jackie Chan",
    birthDate: "1996/07/07",
    reportCreatedDate: "2021/07/07",
  },
  {
    id: 8,
    chartNumber: "25-123132",
    name: "Jill Smith",
    birthDate: "1997/08/08",
    reportCreatedDate: "2021/08/08",
  },
  {
    id: 9,
    chartNumber: "25-123133",
    name: "Jackie Chan",
    birthDate: "1998/09/09",
    reportCreatedDate: "2021/09/09",
  },
  {
    id: 10,
    chartNumber: "25-123134",
    name: "Jill Smith",
    birthDate: "1999/10/10",
    reportCreatedDate: "2021/10/10",
  },
  {
    id: 11,
    chartNumber: "25-123135",
    name: "Jackie Chan",
    birthDate: "2000/11/11",
    reportCreatedDate: "2021/11/11",
  },
  {
    id: 12,
    chartNumber: "25-123136",
    name: "Jill Smith",
    birthDate: "2001/12/12",
    reportCreatedDate: "2021/12/12",
  },
];
