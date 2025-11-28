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

export default NoReportHistory;
