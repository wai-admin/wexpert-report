import { useReport } from "@/services/useReport";

const Header = () => {
  const { data: reportData } = useReport();

  const hospitalName = reportData?.data?.patientSummary?.hospitalName || "";

  return (
    <div className="header">
      <p className="header-hospital-name">{hospitalName}</p>
      <img src="/images/wexpert.png" className="header-logo" />
    </div>
  );
};

export default Header;
