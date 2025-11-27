import { useState } from "react";
import { RadioIndicator, Button, LoadingSpinner } from "@/components-common";
import { PrintGuide } from "@/components";
import { usePatientReportList } from "@/services/usePatientReportList";
import { convertISOToLocal } from "@/utils";

interface ReportHistoryProps {
  onPrint: () => void;
}

const ReportHistory = ({ onPrint }: ReportHistoryProps) => {
  const [selectedReportIndex, setSelectedReportIndex] = useState<number>(0);

  const { data, isLoading } = usePatientReportList({ enabled: true });

  console.log("ReportHistory patientReportList: ", data);

  const patientReportList = data?.data ?? [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="size-full flex flex-col justify-between gap-[10px]">
      {patientReportList.length > 0 ? (
        <div className="size-full flex flex-col">
          <TableHeader />
          <div className="w-full flex flex-col flex-1 overflow-y-auto overscroll-contain">
            {patientReportList.map((report, index) => {
              const { id, createdAt, includeAllImages } = report;
              const date = convertISOToLocal(createdAt, false);
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
          <div className="w-full flex flex-col gap-[10px]">
            <Button label="Print" onClick={onPrint} />
            <PrintGuide />
          </div>
        </div>
      ) : (
        <NoReportHistory />
      )}
    </div>
  );
};

export default ReportHistory;

const NoReportHistory = () => {
  return (
    <div className="size-full flex flex-col items-center justify-center gap-[5px]">
      <p className="text-[16px] font-pretendard text-text-tertiary">
        There are no exported reports.
      </p>
      <p className="text-[16px] font-pretendard text-solid-lt text-center">
        Please click ‘Export’ in the ‘New Export’ tab <br /> to create your
        first report.
      </p>
    </div>
  );
};

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
          Export Option
        </p>
      </div>
    </div>
  );
};
