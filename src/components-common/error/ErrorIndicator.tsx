const ErrorIndicator = () => {
  return (
    <div className="size-full flex flex-col items-center justify-center bg-bg-base-alt gap-[10px]">
      <p className="text-[16px] text-text-primary font-pretendard">
        A connection error has occurred.
      </p>
      <p className="text-[12px] text-text-tertiary font-pretendard">
        The page couldn’t be loaded. Please close this window and reopen it.
      </p>
    </div>
  );
};

export default ErrorIndicator;
