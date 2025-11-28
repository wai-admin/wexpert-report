const LoadingSpinner = () => {
  return (
    <div className="size-full flex flex-col justify-center items-center">
      <div className="relative size-10">
        <div className="absolute w-full h-full border-[4px] border-component-blue rounded-full"></div>
        <div className="absolute w-full h-full border-[4px] border-solid-lt-solid rounded-full animate-spin border-t-transparent"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
