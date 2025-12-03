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
    <div className="w-full flex">
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
      className={`flex flex-1 justify-center cursor-default ${
        selectedReportTab === tab
          ? "border-b-[4px] border-solid-focus"
          : "border-b-[1px] border-solid-lt"
      } pb-[15px]`}
      onClick={() => setSelectedReportTab(tab)}
    >
      <p
        className={`text-[15px] font-pretendard font-semibold ${
          selectedReportTab === tab ? "text-solid-focus" : "text-solid-lt"
        }`}
      >
        {tab}
      </p>
    </button>
  );
};
