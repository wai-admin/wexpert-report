import { useRef } from "react";
import { Button, SearchInput, RadioIndicator } from "@/components-common";
import { PrintPageData } from "@/types";

interface AllPatientsControllerProps {
  printPageData: PrintPageData | null;
  onPrint: () => void;
}

const AllPatientsController = ({
  printPageData,
  onPrint,
}: AllPatientsControllerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearch = () => {
    console.log("onSearch: ", inputRef.current?.value, printPageData);
  };

  return (
    <div className="size-full flex flex-col p-[30px] gap-[25px] overflow-y-auto overscroll-contain">
      <div className="w-full flex justify-between items-end">
        {/* Search Header */}
        <div className="flex flex-col flex-1 gap-[20px]">
          <p className="font-pretendard text-[16px] text-white font-medium">
            Search
          </p>
          <SearchInput
            inputRef={inputRef}
            placeholder="Enter search keywords"
            onSearch={onSearch}
          />
        </div>
        <Button width="w-[150px]" label="Reprint" onClick={onPrint} />
      </div>
      <div className="w-full flex flex-col gap-[20px]">
        {/* Report List Header */}
        <div className="w-full flex justify-between items-center">
          <p className="font-pretendard text-[16px] text-white font-medium">
            Report List
          </p>
          <button className="flex gap-[5px]">
            <p className="font-pretendard text-[16px] text-text-tertiary">
              Sort
            </p>
            <img
              src="/images/arrow-dropdown-icon.png"
              className="w-[17px] h-[17px]"
            />
          </button>
        </div>
        {/* Table */}
        <div className="w-full flex flex-col gap-[14px]">
          <div className="w-full flex flex-col">
            {/* Table Header */}
            <div className="w-full h-[48px] flex items-center justify-between bg-bg-base rounded-[6px] px-[10px]">
              <div className="w-[18px] h-[18px] rounded-full bg-transparent border-[1.5px] border-solid-lt" />
              <p className="font-pretendard text-[16px] text-text-tertiary">
                Chart number
              </p>
              <p className="font-pretendard text-[16px] text-text-tertiary">
                Name
              </p>
              <p className="font-pretendard text-[16px] text-text-tertiary">
                Date of birth
              </p>
              <p className="font-pretendard text-[16px] text-text-tertiary">
                Report created
              </p>
            </div>
            {/* Table Body */}
            <div className="w-full h-[460px] border-b border-b-solid-dk overflow-y-auto overscroll-contain">
              {MOCK_REPORT_LIST.map((report) => {
                const { id, chartNumber, name, birthDate, reportCreatedDate } =
                  report;

                return (
                  <div
                    key={id}
                    className="w-full h-[48px] flex items-center justify-between bg-transparent border-b border-b-solid-dk px-[10px]"
                  >
                    <RadioIndicator checked={false} />
                    <p className="font-pretendard text-[14px] text-text-secondary">
                      {chartNumber}
                    </p>
                    <p className="font-pretendard text-[14px] text-text-secondary">
                      {name}
                    </p>
                    <p className="font-pretendard text-[14px] text-text-secondary">
                      {birthDate}
                    </p>
                    <p className="font-pretendard text-[14px] text-text-secondary">
                      {reportCreatedDate}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Pagination Footer */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-[16px]">
              <p className="font-pretendard text-[16px] text-[rgba(136,141,150,1)]">
                Rows per page:
              </p>
              <button className="flex items-center gap-[5px]">
                <p className="font-pretendard text-[16px] text-text-secondary">
                  20
                </p>
                <img
                  src="/images/arrow-normal-icon.png"
                  className="w-[22px] h-[22px] rotate-90"
                />
              </button>
            </div>
            <div className="flex items-center gap-[10px]">
              <p className="font-pretendard text-[16px] text-text-secondary">
                1-20 of 1
              </p>
              <div className="flex gap-[5px]">
                <button className="grayscale">
                  <img
                    src="/images/arrow-normal-icon.png"
                    className="w-[22px] h-[22px] rotate-180"
                  />
                </button>
                <button className="g">
                  <img
                    src="/images/arrow-normal-icon.png"
                    className="w-[22px] h-[22px]"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPatientsController;

const MOCK_REPORT_LIST = [
  {
    id: 1,
    chartNumber: "25-123125",
    name: "John Doe",
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
