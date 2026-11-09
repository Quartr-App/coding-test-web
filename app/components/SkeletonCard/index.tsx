const SkeletonCard = () => {
  return (
    <div className="flex items-center gap-4 border-b border-gray-200 py-4 animate-pulse">
      <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-200" />

      <div className="flex flex-1 flex-col gap-3">
        <div className="h-4 w-2/3 rounded bg-gray-200" />

        <div className="h-3 w-1/3 rounded bg-gray-200" />
      </div>

      <div className="h-6 w-6 rounded bg-gray-200" />
    </div>
  );
};

export default SkeletonCard;
