export function CompanyCellSkeleton() {
  return (
    <div data-testid="company-cell-skeleton" className="animate-pulse mb-[1px]">
      <div className="flex flex-row items-center gap-4 p-3">
        <div className="w-10 h-10 flex-shrink-0 bg-muted rounded-xl" />
        <div className="flex w-full flex-col gap-1">
          <div className="w-full h-4 bg-muted rounded" />
          <div className="w-full h-4 bg-muted rounded" />
        </div>
      </div>
    </div>
  )
}
