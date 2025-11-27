import { useState } from "react";
import { Button, SearchInput, Pagination } from "@/components-common";
import { PrintPageData } from "@/types";
import {
  TableHeader,
  TableRows,
  SortContainer,
  RowsPerPageContainer,
} from "@/pages";
import { MOCK_REPORT_LIST } from "@/constants";
import { useAllPatientsFilterStore } from "@/store";

interface AllPatientsControllerProps {
  printPageData: PrintPageData | null;
  onPrint: () => void;
}

const AllPatientsController = ({
  printPageData,
  onPrint,
}: AllPatientsControllerProps) => {
  const [selectedReportIndex, setSelectedReportIndex] = useState<number>(0);

  const {
    searchKeyword,
    setSearchKeyword,
    clearSearchKeyword,
    rowsPerPage,
    setRowsPerPage,
    currentPage,
    setCurrentPage,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = useAllPatientsFilterStore();

  const onSearch = () => {
    console.log("onSearch: ", printPageData);
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
            value={searchKeyword}
            placeholder="Enter search keywords"
            onChange={setSearchKeyword}
            onSearch={onSearch}
            onClear={clearSearchKeyword}
          />
        </div>
        <Button width="w-[150px]" label="Print" onClick={onPrint} />
      </div>
      <div className="w-full flex flex-col gap-[20px]">
        {/* Report List Header */}
        <div className="w-full flex justify-between items-center">
          <p className="font-pretendard text-[16px] text-white font-medium">
            Report List
          </p>
          <SortContainer
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
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
            <RowsPerPageContainer
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
            />
            <Pagination
              totalItems={MOCK_REPORT_LIST.length}
              itemsPerPage={rowsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPatientsController;
