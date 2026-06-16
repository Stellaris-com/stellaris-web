import { cn } from "@/lib/utils"
import type { ConnectionStatus } from "@/lib/types/domain"

const META: Record<ConnectionStatus, { label: string; dot: string }> = {
  idle: { label: "Inativo", dot: "bg-muted-foreground" },
  connecting: { label: "Conectando", dot: "bg-idle animate-pulse" },
  connected: { label: "Conectado", dot: "bg-online" },
  reconnecting: { label: "Reconectando", dot: "bg-idle animate-pulse" },
  disconnected: { label: "Desconectado", dot: "bg-dnd" },
}

/** Mostra o estado atual do WebSocket (apresentação pura). */
export function ConnectionBadge({ status }: { status: ConnectionStatus }) {
  const meta = META[status]
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      <span className={cn("size-2 rounded-full", meta.dot)} aria-hidden="true" />
      {meta.label}
    </span>
  )
}
