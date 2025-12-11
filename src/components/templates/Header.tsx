interface HeaderProps {
  hospitalName: string;
}

const Header = ({ hospitalName }: HeaderProps) => {
  return (
    <div className="header">
      <p className="header-hospital-name">{hospitalName}</p>
      <img src="./images/wexpert.png" className="header-logo" />
    </div>
  );
};

export default Header;
