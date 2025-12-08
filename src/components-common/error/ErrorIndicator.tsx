import { useUIStore } from "@/store";

const ErrorIndicator = () => {
  const { refetchFn, isLoading } = useUIStore();

  const handleRetry = () => {
    if (refetchFn) {
      refetchFn();
    }
  };

  return (
    <div className="size-full flex flex-col items-center justify-center bg-bg-base gap-[20px]">
      <div className="flex flex-col items-center gap-[10px]">
        <p className="text-[16px] text-text-primary font-pretendard">
          A connection error has occurred.
        </p>
        <p className="text-[12px] text-text-tertiary font-pretendard">
          The page couldn't be loaded. Please reload or try again in a moment.
        </p>
      </div>
      <button
        onClick={handleRetry}
        className={`w-[240px] px-[10px] h-[40px] rounded-[6px] bg-blue-300 hover:bg-blue-400 transition-all duration-100 cursor-default mt-[10px]
          ${
            isLoading
              ? "opacity-50 cursor-not-allowed bg-component-disabled"
              : " bg-blue-300 hover:bg-blue-400 cursor-default"
          }
          `}
      >
        <p className="text-[14px] text-white font-pretendard">Reload</p>
      </button>
    </div>
  );
};

export default ErrorIndicator;
