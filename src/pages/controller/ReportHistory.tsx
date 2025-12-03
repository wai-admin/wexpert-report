import { useState, useEffect } from "react";
import { RadioIndicator, Button } from "@/components-common";
import { PrintGuide } from "@/components";
import { usePatientReportList } from "@/services/usePatientReportList";
import {
  convertISOToLocal,
  hasValidPatientId,
  checkTruthy,
  checkFalsy,
} from "@/utils";
import { useBridgeStore, useReportStore, useLoadingStore } from "@/store";
import { PrintOptions } from "@/hooks/print/useHandlePrint";

interface ReportHistoryProps {
  onPrint: (options?: PrintOptions) => void;
}

const ReportHistory = ({ onPrint }: ReportHistoryProps) => {
  const [selectedReportIndex, setSelectedReportIndex] = useState<number>(0);

  const { setSelectedReportId, setIsReportListEmpty } = useReportStore();
  const { bridgeMessage } = useBridgeStore();
  const { setLoading } = useLoadingStore();

  const {
    data: patientReportListData,
    isFetching: isPatientReportListLoading,
  } = usePatientReportList({
    enabled: hasValidPatientId(bridgeMessage),
  });
  const patientReportList = patientReportListData?.data ?? [];

  // 리스트 로드 성공 시 또는 selectedReportIndex 변경 시 selectedReportId 업데이트
  useEffect(() => {
    if (checkTruthy(patientReportListData)) {
      const hasReportList = patientReportListData.data.length > 0;
      if (hasReportList) {
        const { id: reportId } =
          patientReportListData.data[selectedReportIndex];
        if (checkTruthy(reportId)) {
          setSelectedReportId(reportId);
        }
      } else {
        setIsReportListEmpty(true);
      }
    }
  }, [patientReportListData, selectedReportIndex]);

  useEffect(() => {
    setLoading(isPatientReportListLoading);
  }, [isPatientReportListLoading]);

  // List를 받아온 상태에서 리스트가 비어있는 경우
  const isEmptyReportList =
    checkTruthy(patientReportListData) && patientReportList.length <= 0;
  if (isEmptyReportList) {
    return <NoReportList />;
  }

  return (
    <div className="size-full flex flex-col justify-between gap-[10px]">
      <TableHeader />
      {isPatientReportListLoading && checkFalsy(patientReportList) ? (
        <></>
      ) : (
        <div className="w-full flex flex-col flex-1 overflow-y-auto overscroll-contain scroll-custom">
          {patientReportList.map((report, index) => {
            const { id, createdAt, includeAllImages } = report;
            const date = convertISOToLocal(createdAt, false, true);
            const exportOption = includeAllImages
              ? "All Image"
              : "Rupture Case";

            const isSelected = index === selectedReportIndex;

            return (
              <div
                key={id}
                className="w-full min-h-[52px] flex justify-between items-center hover:bg-[rgb(49,51,53)] border-b-[1px] border-solid-lt cursor-pointer transition-colors duration-100"
                onClick={() => setSelectedReportIndex(index)}
              >
                <div className="w-[50px] flex justify-center">
                  <RadioIndicator checked={isSelected} />
                </div>
                <div className="w-[160px] flex justify-center">
                  <p className="text-[14px] font-pretendard text-text-tertiary">
                    {date}
                  </p>
                </div>
                <div className="w-[160px] flex justify-center">
                  <p className="text-[14px] font-pretendard text-white">
                    {exportOption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="w-full flex flex-col gap-[10px]">
        <Button
          label="Print"
          onClick={() => onPrint({ shouldUploadReport: false })}
        />
        <PrintGuide />
      </div>
    </div>
  );
};

export default ReportHistory;

// TODO: 해당 페이지 Table 리팩토링
const TableHeader = () => {
  return (
    <div className="w-full h-[48px] flex justify-between items-center bg-bg-base rounded-[6px]">
      <div className="w-[50px] flex justify-center">
        <div className="w-[18px] h-[18px]" />
      </div>
      <div className="w-[160px] flex justify-center">
        <p className="font-pretendard text-[16px] text-text-tertiary">
          Report created
        </p>
      </div>
      <div className="w-[160px] flex justify-center">
        <p className="font-pretendard text-[16px] text-text-tertiary">
          Export option
        </p>
      </div>
    </div>
  );
};

const NoReportList = () => {
  return (
    <div className="size-full flex flex-col items-center justify-center gap-[5px]">
      <p className="text-[16px] font-pretendard text-text-tertiary">
        There are no exported reports.
      </p>
      <p className="text-[16px] font-pretendard text-solid-lt text-center">
        Please click ‘Export’ in the ‘New Report’ tab <br /> to create your
        first report.
      </p>
    </div>
  );
};
