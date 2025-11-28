import { useState } from "react";
import {
  Button,
  SearchInput,
  Pagination,
  LoadingIndicator,
} from "@/components-common";
import { useAllPatientReportList } from "@/services/useAllPatientReportList";
import { usePatientReportDetail } from "@/services/usePatientReportDetail";
import { checkTruthy } from "@/utils";
import { NoReportHistory } from "@/components";
import {
  TableHeader,
  TableRows,
  SortContainer,
  RowsPerPageContainer,
} from "@/pages";
import { useAllPatientsFilterStore } from "@/store";
import { PrintOptions } from "@/hooks/usePrintAction";

interface AllPatientsControllerProps {
  onPrint: (options?: PrintOptions) => void;
}

const AllPatientsController = ({ onPrint }: AllPatientsControllerProps) => {
  const [selectedReportIndex, setSelectedReportIndex] = useState<number>(0);

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
    isLoading: isAllPatientReportListLoading,
  } = useAllPatientReportList();
  const allPatientReportListData = allPatientReportListResponse?.data ?? {
    page: 0,
    limit: 0,
    total: 0,
    hasNext: false,
    data: [],
  };

  usePatientReportDetail({
    reportId: allPatientReportListData.data[selectedReportIndex]?.id.toString(),
    enabled: checkTruthy(allPatientReportListData.data),
  });

  console.log(
    "AllPatientsController: allPatientReportListData & isAllPatientReportListLoading",
    allPatientReportListData,
    isAllPatientReportListLoading
  );

  if (isAllPatientReportListLoading) {
    return <LoadingIndicator />;
  }

  if (allPatientReportListData.data.length <= 0) {
    return <NoReportHistory />;
  }

  return (
    <div className="size-full flex flex-col p-[30px] gap-[25px] overflow-y-auto overscroll-contain">
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
              allPatientReportList={allPatientReportListData.data}
              selectedReportIndex={selectedReportIndex}
              setSelectedReportIndex={setSelectedReportIndex}
            />
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
