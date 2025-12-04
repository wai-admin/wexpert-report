import { Button } from "@/components-common";
import { useErrorStore } from "@/store";

const ErrorIndicator = () => {
  const { refetch } = useErrorStore();

  const handleRetry = () => {
    if (refetch) {
      refetch();
    }
  };

  return (
    <div className="size-full flex flex-col items-center justify-center bg-bg-base-alt gap-[10px]">
      <p className="text-[16px] text-text-primary font-pretendard">
        A connection error has occurred.
      </p>
      <p className="text-[12px] text-text-tertiary font-pretendard">
        The page couldn't be loaded. Please reload or try again in a moment.
      </p>
      <div className="w-full max-w-[245px] mt-[10px]">
        <Button label="Retry" onClick={handleRetry} />
      </div>
    </div>
  );
};

export default ErrorIndicator;
