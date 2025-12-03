const ROWS_PER_PAGE_OPTIONS = [10, 15, 20, 30, 40, 50, 100];

interface OptionBoxProps {
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  onCloseDropdown: () => void;
}

const OptionBox = ({
  rowsPerPage,
  setRowsPerPage,
  onCloseDropdown,
}: OptionBoxProps) => {
  const handleClickOption = (option: number) => {
    setRowsPerPage(option);
    onCloseDropdown();
  };

  return (
    <>
      {ROWS_PER_PAGE_OPTIONS.map((option) => (
        <button
          key={option}
          className={`w-full flex px-[12px] py-[8px] cursor-default
            ${
              rowsPerPage === option
                ? "bg-subtle-transparent-7"
                : "hover:bg-subtle-transparent-7"
            }`}
          onClick={() => handleClickOption(option)}
        >
          <p className="font-pretendard text-[16px] text-text-secondary">
            {option}
          </p>
        </button>
      ))}
    </>
  );
};

export default OptionBox;
