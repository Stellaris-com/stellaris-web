import { cn } from "@/lib/utils"
import type { PresenceStatus } from "@/lib/types/domain"
import { StatusDot } from "./status-dot"

interface UserAvatarProps {
  username: string
  accentColor: string
  status?: PresenceStatus
  size?: "sm" | "md"
  className?: string
}

function initials(username: string): string {
  return username.replace(/[._-]/g, " ").trim().charAt(0).toUpperCase() || "?"
}

/** Avatar circular com iniciais e, opcionalmente, indicador de presença. */
export function UserAvatar({
  username,
  accentColor,
  status,
  size = "md",
  className,
}: UserAvatarProps) {
  const dimension = size === "sm" ? "size-8" : "size-9"

  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "flex items-center justify-center rounded-full font-semibold text-primary-foreground",
          dimension,
          size === "sm" ? "text-xs" : "text-sm",
        )}
        style={{ backgroundColor: accentColor }}
      >
        {initials(username)}
      </span>
      {status ? (
        <StatusDot status={status} ring className="absolute -bottom-0.5 -right-0.5" />
      ) : null}
    </span>
  )
}
