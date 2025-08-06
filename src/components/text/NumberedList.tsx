const NumberedList = ({ number, title }) => {
  return (
    <h3 style={{ fontSize: "16px", fontWeight: "bold", margin: "26px 0 12px" }}>
      {number}. {title}
    </h3>
  );
};

export default NumberedList;
