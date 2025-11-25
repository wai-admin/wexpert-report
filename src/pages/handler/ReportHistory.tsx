import { useState } from "react";
import { RadioIndicator, Button } from "@/components-common";

interface ReportHistoryProps {
  onPrint: () => void;
}

const ReportHistory = ({ onPrint }: ReportHistoryProps) => {
  const [selectedReportHistory, setSelectedReportHistory] = useState<number>(0);

  return (
    <div className="size-full flex flex-col justify-between gap-[10px]">
      <div className="w-full flex flex-col flex-1 overflow-y-auto">
        {MOCK_REPORT_HISTORY.map((report, index) => {
          const { id, date, exportOption } = report;
          const isSelected = index === selectedReportHistory;

          return (
            <div
              key={id}
              className="w-full min-h-[52px] flex justify-between items-center hover:bg-[rgb(49,51,53)] border-b-[1px] border-solid-lt px-[14px] cursor-pointer transition-colors duration-100"
              onClick={() => setSelectedReportHistory(index)}
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
      <Button label="Export" onClick={onPrint} />
    </div>
  );
};

export default ReportHistory;

const MOCK_REPORT_HISTORY = [
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
