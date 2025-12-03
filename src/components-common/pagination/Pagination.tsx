interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages < 1) return <></>;

  return (
    <nav className="flex items-center justify-center gap-[6px]">
      {/* 노출된 리포트 갯수 표시 */}
      <p className="font-pretendard text-[16px] text-text-secondary">
        {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}-
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </p>

      <div className="flex gap-[5px]">
        {/* 이전 버튼 */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-[40px] h-[40px] hover:bg-solid-dk disabled:hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed rounded-[6px] cursor-default"
          aria-label="이전 페이지"
        >
          <img
            src="/images/arrow-normal-icon.png"
            alt="arrow-left"
            width={22}
            height={22}
            className="rotate-180"
          />
        </button>

        {/* 다음 버튼 */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-[40px] h-[40px] hover:bg-solid-dk disabled:hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed rounded-[6px] cursor-default"
          aria-label="다음 페이지"
        >
          <img
            src="/images/arrow-normal-icon.png"
            alt="arrow-right"
            width={22}
            height={22}
          />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
