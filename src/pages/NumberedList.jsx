const NumberedList = ({ number, title }) => {
  return (
    <h3 style={{ fontSize: "18px", fontWeight: "bold", margin: "26px 0 14px" }}>
      {number}. {title}
    </h3>
  );
};

export default NumberedList;
