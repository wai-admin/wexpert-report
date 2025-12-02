import { useState, useRef } from "react";
import { SortBy, SortOrder } from "@/store";
import { useClickOutside } from "@/hooks";
import SortByBox from "./SortByBox";
import SortOrderBox from "./SortOrderBox";

interface SortDropdownProps {
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  sortOrder: SortOrder;
  setSortOrder: (sortOrder: SortOrder) => void;
}

const SortDropdown = ({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: SortDropdownProps) => {
  const [isOpenSortDropdown, setIsOpenSortDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 외부 클릭 시 닫기
  useClickOutside<HTMLDivElement>(
    dropdownRef,
    () => setIsOpenSortDropdown(false),
    isOpenSortDropdown
  );

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="flex gap-[5px] p-[6px] hover:bg-[rgb(49,51,53)] rounded-[6px] transition-colors duration-100"
        onClick={() => setIsOpenSortDropdown(!isOpenSortDropdown)}
      >
        <p className="font-pretendard text-[16px] text-text-tertiary">Sort</p>
        <img
          src="/images/arrow-normal-icon.png"
          width={17}
          height={17}
          className={` transition-all duration-200 ${
            isOpenSortDropdown ? "-rotate-90" : "rotate-90"
          }`}
        />
      </button>
      {isOpenSortDropdown && (
        <div className="absolute right-0 top-full w-[130px] bg-bg-base-alt border border-solid-lt rounded-[6px] z-10">
          <SortByBox sortBy={sortBy} setSortBy={setSortBy} />
          <div className="w-full min-h-[1px] bg-[rgba(145,145,148,0.5)]" />
          <SortOrderBox sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
