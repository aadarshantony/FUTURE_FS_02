import { cn } from '../../utils/helpers';

export function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={cn('animate-pulse bg-[#E4E4E7] rounded-none', className)}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white border border-[#E4E4E7] rounded-none p-6 lg:p-8 space-y-5" data-testid="skeleton-card">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <div className="flex gap-3 pt-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-32" />
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-6 px-6 py-4 border-b border-[#E4E4E7] bg-white" data-testid="skeleton-row">
      <Skeleton className="h-10 w-10 shrink-0" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-10 w-28" />
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="bg-white border border-[#E4E4E7] rounded-none p-6 lg:p-8" data-testid="skeleton-stats">
      <Skeleton className="h-12 w-12 mb-8" />
      <Skeleton className="h-10 w-28 mb-4" />
      <Skeleton className="h-4 w-32 mb-2" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}