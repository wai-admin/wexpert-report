import { FormEvent, useState } from "react";

interface SearchInputProps {
  placeholder: string;
  onSearch: (keyword: string) => void;
}

const SearchInput = ({ placeholder, onSearch }: SearchInputProps) => {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(keyword);
  };

  const onClear = () => {
    setKeyword("");
    onSearch(""); // 검색어 초기화 시 빈 문자열로 검색
  };

  return (
    <form
      className="w-full flex items-center gap-[10px]"
      onSubmit={handleSubmit}
    >
      <div className="w-full max-w-[300px] h-[44px] flex items-center px-[10px] bg-transparent border border-solid-lt rounded-[6px] gap-[10px]">
        <div className="flex flex-1">
          <input
            name="keyword"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            className="w-full h-full text-[16px] text-white placeholder:text-solid-lt font-pretendard bg-transparent outline-none border-none"
          />
        </div>
        {keyword && (
          <button type="button" onClick={onClear}>
            <img src="/images/close-icon.png" className="w-[17px] h-[17px]" />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="w-[44px] h-[44px] flex items-center justify-center bg-blue-300 hover:bg-blue-400 rounded-[6px] transition-all duration-100"
      >
        <img src="/images/search-icon.png" className="w-[17px] h-[17px]" />
      </button>
    </form>
  );
};

export default SearchInput;
