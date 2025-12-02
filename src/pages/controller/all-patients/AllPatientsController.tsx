import { useState, useRef, useEffect } from "react";
import { Button, SearchInput, Pagination } from "@/components-common";
import { useAllPatientReportList } from "@/services/useAllPatientReportList";
import {
  TableHeader,
  TableRows,
  SortDropdown,
  RowsPerPageDropdown,
} from "@/pages";
import { useAllPatientsFilterStore, useLoadingStore } from "@/store";
import { PrintOptions } from "@/hooks/usePrintAction";
import { checkTruthy } from "@/utils";

interface AllPatientsControllerProps {
  onPrint: (options?: PrintOptions) => void;
}

const AllPatientsController = ({ onPrint }: AllPatientsControllerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedReportIndex, setSelectedReportIndex] = useState<number>(0);

  const { setLoading } = useLoadingStore();
  const {
    setSearchKeyword,
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

  // 새로운 리포트 리스트 호출 시 첫 번째 리포트 선택 및 스크롤 초기화
  useEffect(() => {
    if (checkTruthy(allPatientReportListData)) {
      setSelectedReportIndex(0);

      if (checkTruthy(scrollRef.current)) {
        scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [allPatientReportListData]);

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
          <SortDropdown
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
                    scrollRef={scrollRef}
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
            <RowsPerPageDropdown
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
