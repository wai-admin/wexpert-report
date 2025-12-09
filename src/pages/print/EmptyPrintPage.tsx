const EmptyPrintPage = () => {
  return (
    <div className="w-full min-h-full flex flex-col justify-center items-center bg-bg-base gap-[30px]">
      <img src="./images/no-preview-icon.png" className="w-[74px] h-[74px]" />
      <p className="text-[16px] font-pretendard text-text-tertiary font-medium">
        No preview available
      </p>
    </div>
  );
};

export default EmptyPrintPage;
