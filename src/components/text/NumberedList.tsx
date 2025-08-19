interface NumberedListProps {
  number: number;
  title: string;
}

const NumberedList = ({ number, title }: NumberedListProps) => {
  return (
    <h3 className="numbered-list">
      {number}. {title}
    </h3>
  );
};

export default NumberedList;
