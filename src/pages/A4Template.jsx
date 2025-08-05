import Header from "./Header";

const A4Template = ({ children }) => {
  return (
    <div
      style={{
        width: "210mm",
        height: "297mm",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <div
        style={{ height: "297mm", padding: "40px", boxSizing: "border-box" }}
      >
        <Header />
        {children}
      </div>
    </div>
  );
};

export default A4Template;
