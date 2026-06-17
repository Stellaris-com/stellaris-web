"use client"

import { Hash, Users } from "lucide-react"
import { ConnectionBadge } from "@/components/shared/connection-badge"
import type { ChatMessage, ConnectionStatus, Message } from "@/lib/types/domain"
import { MessageInput } from "./message-input"
import { MessageList } from "./message-list"

interface ChatPanelProps {
  serverName: string
  channelName: string
  status: ConnectionStatus
  messages: ChatMessage[]
  onSend: (content: string) => void
}

/**
 * Chat central: cabeçalho do canal + lista de mensagens + caixa de envio.
 * Container de composição puramente visual.
 */
export function ChatPanel({ serverName, channelName, status, messages, onSend }: ChatPanelProps) {
  const isConnected = status === "connected"

  return (
    <section
      aria-label={`Canal ${channelName} de ${serverName}`}
      className="flex min-w-0 flex-1 flex-col bg-background"
    >
      <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-4 shadow-sm">
        <Hash className="size-5 text-muted-foreground" aria-hidden="true" />
        <h1 className="font-semibold text-foreground">{channelName}</h1>
        <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
        <span className="hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex">
          <Users className="size-4" aria-hidden="true" />
          {serverName}
        </span>
        <div className="ml-auto">
          <ConnectionBadge status={status} />
        </div>
      </header>

      <MessageList messages={messages} channelName={channelName} />

      <MessageInput channelName={channelName} disabled={!isConnected} onSend={onSend} />
    </section>
  )
}
