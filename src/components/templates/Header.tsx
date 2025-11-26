import usePrintPageHandler from "@/hooks/usePrintPageHandler";

const Header = () => {
  const { printPageData } = usePrintPageHandler();

  const hospitalName = printPageData?.cover.hospitalName || "";

  return (
    <div className="header">
      <p className="header-hospital-name">{hospitalName}</p>
      <img src="/images/wexpert.png" className="header-logo" />
    </div>
  );
};

export default Header;
