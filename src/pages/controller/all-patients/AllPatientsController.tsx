import { useState, useEffect } from "react";
import { Button, SearchInput, Pagination } from "@/components-common";
import { useAllPatientReportList } from "@/services/useAllPatientReportList";
import {
  TableHeader,
  TableRows,
  SortContainer,
  RowsPerPageContainer,
} from "@/pages";
import { useAllPatientsFilterStore, useLoadingStore } from "@/store";
import { PrintOptions } from "@/hooks/usePrintAction";

interface AllPatientsControllerProps {
  onPrint: (options?: PrintOptions) => void;
}

const AllPatientsController = ({ onPrint }: AllPatientsControllerProps) => {
  const [selectedReportIndex, setSelectedReportIndex] = useState<number>(0);

  const { setLoading } = useLoadingStore();
  const {
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

  const {
    data: allPatientReportListResponse,
    isFetching: isAllPatientReportListLoading,
  } = useAllPatientReportList();
  console.log(
    "AllPatientsController: allPatientReportListData",
    allPatientReportListResponse
  );
  const allPatientReportListData = allPatientReportListResponse?.data ?? {
    page: 0,
    limit: 0,
    total: 0,
    hasNext: false,
    data: [],
  };

  useEffect(() => {
    setLoading(isAllPatientReportListLoading);
  }, [isAllPatientReportListLoading]);

  const hasAllPatientReportList = allPatientReportListData.total > 0;

  return (
    <div className="size-full flex flex-col p-[30px] gap-[25px] overflow-hidden">
      <div className="w-full flex justify-between items-end">
        {/* Search Header */}
        <div className="flex flex-col flex-1 gap-[20px]">
          <p className="font-pretendard text-[16px] text-white font-medium">
            Search
          </p>
          <SearchInput
            placeholder="Enter search keywords"
            onSearch={setSearchKeyword}
            onClear={clearSearchKeyword}
          />
        </div>
        <Button
          width="w-[150px]"
          label="Print"
          onClick={() => onPrint({ shouldUploadReport: false })}
        />
      </div>
      <div className="w-full flex flex-col flex-1 gap-[20px] overflow-hidden">
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
        <div className="w-full flex flex-col flex-1 gap-[14px] overflow-hidden">
          <div className="w-full flex flex-col flex-1 overflow-hidden">
            <TableHeader />
            {isAllPatientReportListLoading ? (
              <></>
            ) : (
              <>
                {hasAllPatientReportList ? (
                  <TableRows
                    allPatientReportList={allPatientReportListData.data}
                    selectedReportIndex={selectedReportIndex}
                    setSelectedReportIndex={setSelectedReportIndex}
                  />
                ) : (
                  <NoReportList />
                )}
              </>
            )}
          </div>
          {/* Pagination Footer */}
          <div className="w-full flex items-center justify-between">
            <RowsPerPageContainer
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
            />
            <Pagination
              totalItems={allPatientReportListData.total}
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

const NoReportList = () => {
  return (
    <div className="w-full flex flex-1 border-b border-b-solid-dk items-center justify-center overflow-hidden">
      <p className="text-[16px] font-pretendard text-text-tertiary">
        There are no exported reports.
      </p>
    </div>
  );
};
