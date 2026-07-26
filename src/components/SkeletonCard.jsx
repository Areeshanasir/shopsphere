function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl border border-[#E8E2D8] bg-white dark:border-[#3A3A3A] dark:bg-[#1B1B1B]">

      <div className="h-72 bg-[#EFE8DD] dark:bg-[#2A2A2A]"></div>

      <div className="space-y-4 p-6">

        <div className="h-4 w-20 rounded bg-[#E5D8C5] dark:bg-[#3A3A3A]"></div>

        <div className="h-6 w-3/4 rounded bg-[#E5D8C5] dark:bg-[#3A3A3A]"></div>

        <div className="h-4 w-1/3 rounded bg-[#E5D8C5] dark:bg-[#3A3A3A]"></div>

        <div className="flex justify-between">

          <div className="h-6 w-20 rounded bg-[#E5D8C5] dark:bg-[#3A3A3A]"></div>

          <div className="h-10 w-24 rounded bg-[#E5D8C5] dark:bg-[#3A3A3A]"></div>

        </div>

      </div>

    </div>
  );
}

export default SkeletonCard;