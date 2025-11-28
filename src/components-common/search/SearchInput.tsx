interface SearchInputProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

const SearchInput = ({
  value,
  placeholder,
  onChange,
  onSearch,
  onClear,
}: SearchInputProps) => {
  return (
    <div className="w-full flex items-center gap-[10px]">
      <div className="w-full max-w-[300px] h-[44px] flex items-center px-[10px] bg-transparent border border-solid-lt rounded-[6px] gap-[10px]">
        <div className="flex flex-1">
          <input
            type="text"
            value={value}
            placeholder={placeholder}
            className="w-full h-full text-[16px] text-white placeholder:text-solid-lt font-pretendard bg-transparent outline-none border-none"
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        {value && (
          <button onClick={onClear}>
            <img src="/images/close-icon.png" className="w-[17px] h-[17px]" />
          </button>
        )}
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
