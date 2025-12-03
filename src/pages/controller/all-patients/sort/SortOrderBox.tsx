import { SortOrder } from "@/store";

const SORT_ORDER_OPTIONS = {
  label: "Sort order",
  options: [SortOrder.ASC, SortOrder.DESC],
};

interface SortOrderBoxProps {
  sortOrder: SortOrder;
  onSelectSortOrder: (sortOrder: SortOrder) => void;
}

const SortOrderBox = ({ sortOrder, onSelectSortOrder }: SortOrderBoxProps) => {
  return (
    <div className="flex flex-col py-[14px] gap-[12px]">
      <p className="font-pretendard text-[12px] text-text-tertiary px-[12px]">
        {SORT_ORDER_OPTIONS.label}
      </p>
      <div className="flex flex-col gap-[2px]">
        {SORT_ORDER_OPTIONS.options.map((option) => (
          <button
            key={option}
            className={`flex px-[12px] py-[8px] cursor-default ${
              sortOrder === option
                ? "bg-subtle-transparent-7"
                : "hover:bg-subtle-transparent-7"
            }`}
            onClick={() => onSelectSortOrder(option)}
          >
            <p className="font-pretendard text-[15px] text-white">{option}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortOrderBox;
