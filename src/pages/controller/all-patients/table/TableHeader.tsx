import { ALL_PATIENTS_TABLE_COLUMNS } from "@/constants";

const TableHeader = () => {
  return (
    <div className="w-full h-[48px] flex items-center bg-bg-base rounded-[6px] px-[14px]">
      {ALL_PATIENTS_TABLE_COLUMNS.map((column) => {
        const { key, title, width } = column;
        return (
          <div
            key={key}
            className={`size-full flex items-center justify-center`}
            style={{ maxWidth: `${width}px` }}
          >
            <p className="font-pretendard text-[16px] text-text-tertiary">
              {title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TableHeader;
