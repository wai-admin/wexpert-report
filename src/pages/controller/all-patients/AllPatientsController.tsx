import { useState, useRef, useEffect } from "react";
import { Button, SearchInput, Pagination } from "@/components-common";
import { useAllPatientReportList } from "@/services/useAllPatientReportList";
import {
  TableHeader,
  TableRows,
  SortDropdown,
  RowsPerPageDropdown,
} from "@/pages";
import {
  useAllPatientsFilterStore,
  useErrorStore,
  useLoadingStore,
  useReportListStore,
} from "@/store";
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
  const { setSelectedReportId, setSelectedPatientId, setIsReportListEmpty } =
    useReportListStore();
  const { setIsError } = useErrorStore();

  const {
    data: allPatientReportListResponse,
    isFetching: isAllPatientReportListLoading,
    isError: isAllPatientReportListError,
  } = useAllPatientReportList();

  const isValidAllPatientReportList = checkTruthy(allPatientReportListResponse);
  const isEmptyAllPatientReportList =
    isValidAllPatientReportList && allPatientReportListResponse.data.total <= 0;

  // 리스트 로드 상태 업데이트
  useEffect(() => {
    setLoading(isAllPatientReportListLoading);
  }, [isAllPatientReportListLoading]);

  // 리스트 에러 상태 업데이트
  useEffect(() => {
    setIsError(isAllPatientReportListError);
  }, [isAllPatientReportListError]);

  // 새로운 리포트 리스트 호출 시
  useEffect(() => {
    if (isValidAllPatientReportList) {
      // 첫 번째 리포트 선택
      setSelectedReportIndex(0);

      // 스크롤 초기화
      if (checkTruthy(scrollRef.current)) {
        scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }

      // 리스트 비어있는 상태 업데이트
      setIsReportListEmpty(isEmptyAllPatientReportList);
    }
  }, [allPatientReportListResponse]);

  // 리스트 로드 후 selectedReportIndex 변경 시 리포트 정보 업데이트
  useEffect(() => {
    if (isValidAllPatientReportList === false) {
      return;
    }

    if (isEmptyAllPatientReportList) {
      return;
    }

    // 선택된 리포트 정보 업데이트
    const { reportId, patientId } =
      allPatientReportListResponse.data.data[selectedReportIndex];

    if (checkTruthy(reportId) && checkTruthy(patientId)) {
      setSelectedReportId(reportId);
      setSelectedPatientId(patientId);
    }
    // WARNING: 리스트 로드 후 로직이 실행되어야하기 때문에 의존성 배열에 allPatientReportListResponse를 추가합니다.
  }, [allPatientReportListResponse, selectedReportIndex]);

  return (
    <div className="size-full flex flex-col p-[30px] gap-[25px] overflow-hidden">
      <div className="w-full flex justify-between items-end">
        {/* Search Header */}
        <div className="flex flex-col flex-1 gap-[20px]">
          <p className="font-pretendard text-[16px] text-white font-medium">
            Search
          </p>
          <SearchInput
            placeholder="Chart number or Name"
            onSearch={setSearchKeyword}
            onClear={clearSearchKeyword}
          />
        </div>
        <Button
          width="w-[150px]"
          label="Print"
          onClick={() => onPrint({ shouldUploadReport: false })}
          disabled={isEmptyAllPatientReportList}
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
                {isEmptyAllPatientReportList ? (
                  <NoReportList />
                ) : (
                  <TableRows
                    scrollRef={scrollRef}
                    allPatientReportList={
                      isValidAllPatientReportList
                        ? allPatientReportListResponse.data.data
                        : []
                    }
                    selectedReportIndex={selectedReportIndex}
                    setSelectedReportIndex={setSelectedReportIndex}
                  />
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
              totalItems={
                isValidAllPatientReportList
                  ? allPatientReportListResponse.data.total
                  : 0
              }
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
