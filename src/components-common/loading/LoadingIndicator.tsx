import { useEffect } from "react";

interface LoadingIndicatorProps {
  isLoading?: boolean;
  full?: boolean;
}

const LoadingIndicator = ({
  isLoading = true,
  full = false,
}: LoadingIndicatorProps) => {
  // isLoading = true, full = true 일 때 스크롤을 막음
  useEffect(() => {
    if (full && isLoading) {
      document.body.style.overflow = "hidden";

      // cleanup: 로딩이 끝나거나 컴포넌트가 언마운트될 때 스크롤 복원
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [full, isLoading]);

  if (isLoading === false) {
    return null;
  }

  if (full) {
    return (
      <div className="fixed w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50">
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
      <div className="relative size-10">
        <div className="absolute w-full h-full border-[4px] border-component-blue rounded-full"></div>
        <div className="absolute w-full h-full border-[4px] border-solid-lt-solid rounded-full animate-spin border-t-transparent"></div>
      </div>
    </div>
  );
};
