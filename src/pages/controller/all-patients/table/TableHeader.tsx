import { ALL_PATIENTS_TABLE_COLUMNS } from "@/constants";
import { SortOrder, useAllPatientsFilterStore } from "@/store";

// TODO: 추후 수정 필요
const validSortKeys = ["report created", "name"];

const TableHeader = () => {
  const { sortBy, sortOrder } = useAllPatientsFilterStore();
  const isSortedASC = sortOrder === SortOrder.ASC;

  return (
    <div className="w-full h-[48px] flex items-center bg-bg-base rounded-[6px] px-[14px]">
      {ALL_PATIENTS_TABLE_COLUMNS.map((column) => {
        const { key, title, width } = column;

        const isValidSortKey =
          validSortKeys.includes(key) &&
          sortBy.toLowerCase() === key.toLowerCase();

        return (
          <div
            key={key}
            className="size-full flex items-center justify-center gap-[5px]"
            style={{ maxWidth: `${width}px` }}
          >
            <p className="font-pretendard text-[16px] text-text-tertiary">
              {title}
            </p>
            {isValidSortKey && (
              <img
                src="./images/arrow-sort-icon.png"
                className={`w-[16px] h-[16px] ${
                  isSortedASC ? "" : "rotate-180"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TableHeader;
