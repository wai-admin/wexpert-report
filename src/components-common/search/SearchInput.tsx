import { RefObject } from "react";

interface SearchInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
  placeholder: string;
  onSearch: () => void;
}

const SearchInput = ({ inputRef, placeholder, onSearch }: SearchInputProps) => {
  return (
    <div className="w-full flex items-center gap-[10px]">
      <div className="w-full max-w-[300px] h-[44px] px-[10px] bg-transparent border border-solid-lt rounded-[6px]">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className="w-full h-full text-[16px] text-white placeholder:text-solid-lt font-pretendard bg-transparent outline-none border-none"
        />
      </div>
      <button
        className="w-[44px] h-[44px] flex items-center justify-center bg-blue-300 hover:bg-blue-400 rounded-[6px] transition-all duration-100"
        onClick={onSearch}
      >
        <img src="/images/search-icon.png" className="w-[17px] h-[17px]" />
      </button>
    </div>
  );
};

export default SearchInput;
