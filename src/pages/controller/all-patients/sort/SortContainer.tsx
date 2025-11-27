import { useState } from "react";
import { SortBy, SortOrder } from "@/store";
import SortByBox from "./SortByBox";
import SortOrderBox from "./SortOrderBox";

interface SortContainerProps {
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  sortOrder: SortOrder;
  setSortOrder: (sortOrder: SortOrder) => void;
}

const SortContainer = ({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: SortContainerProps) => {
  const [isOpenSortDropdown, setIsOpenSortDropdown] = useState<boolean>(false);

  return (
    <div className="relative">
      <button
        className="flex gap-[5px] py-[4px]"
        onClick={() => setIsOpenSortDropdown(!isOpenSortDropdown)}
      >
        <p className="font-pretendard text-[16px] text-text-tertiary">Sort</p>
        <img
          src="/images/arrow-dropdown-icon.png"
          className="w-[17px] h-[17px]"
        />
      </button>
      {isOpenSortDropdown && (
        <div className="absolute right-0 top-full w-[130px] bg-bg-base-alt border border-solid-lt rounded-[6px]">
          <SortByBox sortBy={sortBy} setSortBy={setSortBy} />
          <div className="w-full min-h-[1px] bg-[rgba(145,145,148,0.5)]" />
          <SortOrderBox sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>
      )}
    </div>
  );
};

export default SortContainer;
