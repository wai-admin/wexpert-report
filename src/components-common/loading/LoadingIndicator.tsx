interface LoadingIndicatorProps {
  isLoading?: boolean;
  full?: boolean;
}

const LoadingIndicator = ({
  isLoading = true,
  full = false,
}: LoadingIndicatorProps) => {
  if (isLoading === false) {
    return null;
  }

  if (full) {
    return (
      <div className="fixed w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.25)] z-50">
        <LoadingSpinner />
      </div>
    );
  } else {
    return <LoadingSpinner />;
  }
};

export default LoadingIndicator;

const LoadingSpinner = () => {
  return (
    <div className="size-full flex flex-col justify-center items-center">
      <div className="relative size-5">
        <div className="absolute w-full h-full border-[3px] border-component-blue rounded-full"></div>
        <div className="absolute w-full h-full border-[3px] border-solid-lt-solid rounded-full animate-spin border-t-transparent"></div>
      </div>
    </div>
  );
};
