import { useRef, useState } from "react";
import { Button, SearchInput, Pagination } from "@/components-common";
import { PrintPageData } from "@/types";
import { TableHeader, TableRows } from "@/pages";
import { MOCK_REPORT_LIST } from "@/constants";

interface AllPatientsControllerProps {
  printPageData: PrintPageData | null;
  onPrint: () => void;
}

const AllPatientsController = ({
  printPageData,
  onPrint,
}: AllPatientsControllerProps) => {
  const [selectedReportIndex, setSelectedReportIndex] = useState<number>(0);
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
            <TableHeader />
            <TableRows
              selectedIndex={selectedReportIndex}
              setSelectedIndex={setSelectedReportIndex}
            />
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

            <Pagination
              totalItems={MOCK_REPORT_LIST.length}
              itemsPerPage={20}
              currentPage={1}
              onPageChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPatientsController;
