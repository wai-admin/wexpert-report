const LoadingSpinner = () => {
  return (
    <div className="size-full flex flex-col justify-center items-center">
      <div className="size-10 rounded-full border-2 border-solid-lt border-transparent border-t-solid-lt animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
