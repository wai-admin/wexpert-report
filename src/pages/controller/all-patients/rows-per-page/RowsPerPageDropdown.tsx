import { useState, useRef } from "react";
import { useClickOutside } from "@/hooks";
import OptionBox from "./OptionBox";

interface RowsPerPageDropdownProps {
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
}

const RowsPerPageDropdown = ({
  rowsPerPage,
  setRowsPerPage,
}: RowsPerPageDropdownProps) => {
  const [isOpenRowsPerPageDropdown, setIsOpenRowsPerPageDropdown] =
    useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 외부 클릭 시 닫기
  useClickOutside<HTMLDivElement>(
    dropdownRef,
    () => setIsOpenRowsPerPageDropdown(false),
    isOpenRowsPerPageDropdown
  );

  return (
    <div className="flex items-center gap-[12px]">
      <p className="font-pretendard text-[16px] text-[rgba(136,141,150,1)]">
        Rows per page:
      </p>
      <div ref={dropdownRef} className="relative">
        <button
          className="flex items-center gap-[5px] p-[6px] hover:bg-[rgb(49,51,53)] rounded-[6px] transition-colors duration-100 cursor-default"
          onClick={() =>
            setIsOpenRowsPerPageDropdown(!isOpenRowsPerPageDropdown)
          }
        >
          <p className="font-pretendard text-[16px] text-text-secondary">
            {rowsPerPage}
          </p>
          <img
            src="./images/arrow-normal-icon.png"
            width={22}
            height={22}
            className={` transition-all duration-200 ${
              isOpenRowsPerPageDropdown ? "-rotate-90" : "rotate-90"
            }`}
          />
        </button>
        {isOpenRowsPerPageDropdown && (
          <div className="absolute right-0 bottom-full w-[80px] bg-bg-base-alt border border-solid-dk rounded-[6px]">
            <OptionBox
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              onCloseDropdown={() => setIsOpenRowsPerPageDropdown(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RowsPerPageDropdown;
