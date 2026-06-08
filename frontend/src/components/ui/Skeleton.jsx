import { cn } from '../../utils/helpers';

export function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={cn('skeleton', className)}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-[#111827] border border-[#1E2D45] rounded-[14px] p-5 space-y-3">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-[#1E2D45]">
      <Skeleton className="h-9 w-9 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-5 w-20 rounded-full" />
      <Skeleton className="h-5 w-16 rounded-full" />
      <Skeleton className="h-7 w-20 rounded-[8px]" />
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="bg-[#111827] border border-[#1E2D45] rounded-[14px] p-5">
      <Skeleton className="h-3 w-24 mb-3" />
      <Skeleton className="h-8 w-16 mb-2" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}
