import { SortBy } from "@/store";

const SORT_BY_OPTIONS = {
  label: "Sort by",
  options: [SortBy.NAME, SortBy.REPORT_CREATED_DATE],
};

interface SortByBoxProps {
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
}

const SortByBox = ({ sortBy, setSortBy }: SortByBoxProps) => {
  return (
    <div className="flex flex-col py-[14px] gap-[12px]">
      <p className="font-pretendard text-[12px] text-text-tertiary px-[12px]">
        {SORT_BY_OPTIONS.label}
      </p>
      <div className="flex flex-col gap-[2px]">
        {SORT_BY_OPTIONS.options.map((option) => (
          <button
            key={option}
            className={`flex px-[12px] py-[8px] ${
              sortBy === option
                ? "bg-subtle-transparent-7"
                : "hover:bg-subtle-transparent-7"
            }`}
            onClick={() => setSortBy(option)}
          >
            <p className="font-pretendard text-[15px] text-white">{option}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortByBox;
