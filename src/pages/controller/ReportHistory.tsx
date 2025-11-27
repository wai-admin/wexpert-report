import { useState } from "react";
import { RadioIndicator, Button } from "@/components-common";
import { PrintGuide } from "@/components";

interface ReportHistoryProps {
  onPrint: () => void;
}

const ReportHistory = ({ onPrint }: ReportHistoryProps) => {
  const [selectedReportIndex, setSelectedReportIndex] = useState<number>(0);

  return (
    <div className="size-full flex flex-col justify-between gap-[10px]">
      {MOCK_REPORT_HISTORY.length > 0 ? (
        <>
          <div className="w-full flex flex-col flex-1 overflow-y-auto overscroll-contain">
            {MOCK_REPORT_HISTORY.map((report, index) => {
              const { id, date, exportOption } = report;
              const isSelected = index === selectedReportIndex;

              return (
                <div
                  key={id}
                  className="w-full min-h-[52px] flex justify-between items-center hover:bg-[rgb(49,51,53)] border-b-[1px] border-solid-lt px-[14px] cursor-pointer transition-colors duration-100"
                  onClick={() => setSelectedReportIndex(index)}
                >
                  <div className="flex items-center gap-[24px]">
                    <RadioIndicator checked={isSelected} />
                    <p className="text-[14px] font-pretendard text-text-tertiary">
                      {date}
                    </p>
                  </div>
                  <p className="text-[14px] font-pretendard text-white">
                    {exportOption}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="w-full flex flex-col gap-[10px]">
            <Button label="Print" onClick={onPrint} />
            <PrintGuide />
          </div>
        </>
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
      <p className="text-[16px] font-pretendard text-solid-lt">
        Click Export to create a first report.
      </p>
    </div>
  );
};

const MOCK_REPORT_HISTORY: any[] = [
  {
    id: 1,
    date: "2025/11/18 04:47 PM",
    exportOption: "All Image",
  },
  {
    id: 2,
    date: "2025/11/18 04:47 PM",
    exportOption: "Rupture Case",
  },
  {
    id: 3,
    date: "2025/11/18 04:47 PM",
    exportOption: "Rupture Case",
  },
  {
    id: 4,
    date: "2025/11/18 04:47 PM",
    exportOption: "All Image",
  },
  {
    id: 5,
    date: "2025/11/18 04:47 PM",
    exportOption: "All Image",
  },
  {
    id: 6,
    date: "2025/11/18 04:47 PM",
    exportOption: "All Image",
  },
  {
    id: 7,
    date: "2025/11/18 04:47 PM",
    exportOption: "All Image",
  },
  {
    id: 8,
    date: "2025/11/18 04:47 PM",
    exportOption: "All Image",
  },
  {
    id: 9,
    date: "2025/11/18 04:47 PM",
    exportOption: "All Image",
  },
  {
    id: 10,
    date: "2025/11/18 04:47 PM",
    exportOption: "All Image",
  },
  {
    id: 11,
    date: "2025/11/18 04:47 PM",
    exportOption: "All Image",
  },
  {
    id: 12,
    date: "2025/11/18 04:47 PM",
    exportOption: "All Image",
  },
  {
    id: 13,
    date: "2025/11/18 04:47 PM",
    exportOption: "All Image",
  },
  {
    id: 14,
    date: "2025/11/18 04:47 PM",
    exportOption: "All Image",
  },
];
