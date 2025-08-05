const Header = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: "16px",
        borderBottom: "1px solid black",
      }}
    >
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>병원명</p>
      <img
        src="/images/wexpert.png"
        style={{ width: "82px", height: "18px" }}
      />
    </div>
  );
};

export default Header;
