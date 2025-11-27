import { useState } from "react";
import OptionBox from "./OptionBox";

interface RowsPerPageContainerProps {
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
}

const RowsPerPageContainer = ({
  rowsPerPage,
  setRowsPerPage,
}: RowsPerPageContainerProps) => {
  const [isOpenRowsPerPageDropdown, setIsOpenRowsPerPageDropdown] =
    useState<boolean>(false);

  return (
    <div className="flex items-center gap-[16px]">
      <p className="font-pretendard text-[16px] text-[rgba(136,141,150,1)]">
        Rows per page:
      </p>
      <div className="relative">
        <button
          className="flex items-center gap-[5px] py-[4px]"
          onClick={() =>
            setIsOpenRowsPerPageDropdown(!isOpenRowsPerPageDropdown)
          }
        >
          <p className="font-pretendard text-[16px] text-text-secondary">
            {rowsPerPage}
          </p>
          <img
            src="/images/arrow-normal-icon.png"
            width={22}
            height={22}
            className={` transition-all duration-200 ${
              isOpenRowsPerPageDropdown ? "-rotate-90" : "rotate-90"
            }`}
          />
        </button>
        {isOpenRowsPerPageDropdown && (
          <div className="absolute right-0 bottom-full w-[80px] bg-bg-base-alt border border-solid-lt rounded-[6px]">
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

export default RowsPerPageContainer;
