import { cn } from "@/lib/utils"
import type { PresenceStatus } from "@/lib/types/domain"

const STATUS_COLOR: Record<PresenceStatus, string> = {
  online: "bg-online",
  idle: "bg-idle",
  dnd: "bg-dnd",
  offline: "bg-muted-foreground",
}

const STATUS_LABEL: Record<PresenceStatus, string> = {
  online: "Online",
  idle: "Ausente",
  dnd: "Não perturbe",
  offline: "Offline",
}

interface StatusDotProps {
  status: PresenceStatus
  /** Quando true, desenha uma borda na cor do fundo (estilo "recorte" do Discord). */
  ring?: boolean
  className?: string
}

/** Indicador circular de presença (apresentação pura). */
export function StatusDot({ status, ring = false, className }: StatusDotProps) {
  return (
    <span
      role="img"
      aria-label={STATUS_LABEL[status]}
      className={cn(
        "inline-block size-3 rounded-full",
        STATUS_COLOR[status],
        ring && "ring-2 ring-card",
        className,
      )}
    />
  )
}
