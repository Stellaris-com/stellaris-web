import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md",
        "bg-muted/80",
        "ring-1 ring-white/3",
        "bg-zinc-700/40",
        "after:absolute after:inset-y-0",
        "after:w-1/3",
        "after:-translate-x-full",
        "after:animate-[shimmer_3s_linear_infinite]",
        "after:bg-linear-to-r",
        "after:from-transparent",
        "after:via-white/6",
        "after:to-transparent",
        className,
      )}
      {...props}
    />
  );
}
