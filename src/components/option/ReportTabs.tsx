import { ReportTabValues } from "@/types";

interface ReportTabsProps {
  selectedReportTab: ReportTabValues;
  setSelectedReportTab: (tab: ReportTabValues) => void;
}

interface ReportTabProps extends ReportTabsProps {
  tab: ReportTabValues;
}

const ReportTabs = ({
  selectedReportTab,
  setSelectedReportTab,
}: ReportTabsProps) => {
  return (
    <div className="w-full flex border-b border-[rgba(255,255,255,0.5)]">
      {Object.values(ReportTabValues).map((tab) => (
        <ReportTab
          key={tab}
          selectedReportTab={selectedReportTab}
          setSelectedReportTab={setSelectedReportTab}
          tab={tab}
        />
      ))}
    </div>
  );
};

export default ReportTabs;

const ReportTab = ({
  selectedReportTab,
  setSelectedReportTab,
  tab,
}: ReportTabProps) => {
  return (
    <button
      className={`flex flex-1 justify-center ${
        selectedReportTab === tab
          ? "border-b-[2px] border-blue-300"
          : "border-none border-text-tertiary"
      } pb-[15px]`}
      onClick={() => setSelectedReportTab(tab)}
    >
      <p
        className={`text-[15px] font-pretendard font-semibold ${
          selectedReportTab === tab ? "text-blue-300" : "text-text-tertiary"
        }`}
      >
        {tab}
      </p>
    </button>
  );
};
