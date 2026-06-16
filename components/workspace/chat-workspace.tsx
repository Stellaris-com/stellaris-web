"use client"

import { useServers } from "@/hooks/use-servers"
import { useChat } from "@/hooks/use-chat"
import type { AuthSession } from "@/lib/types/domain"
import { ServerRail } from "@/components/servers/server-rail"
import { ChatPanel } from "@/components/chat/chat-panel"
import { MembersList } from "@/components/members/members-list"

interface ChatWorkspaceProps {
  session: AuthSession
  onLogout: () => void
}

/** Canal padrão exibido para todo servidor nesta POC. */
const DEFAULT_CHANNEL = "geral"

/**
 * Container do workspace.
 *
 * Responsabilidade: orquestrar os hooks (servidores + chat) e distribuir os
 * dados/handlers para os componentes de apresentação. Nenhuma regra de negócio
 * vive aqui — apenas a coordenação entre hooks.
 */
export function ChatWorkspace({ session, onLogout }: ChatWorkspaceProps) {
  const { servers, selectedId, selectedServer, selectServer } = useServers()
  const { status, messages, members, sendMessage } = useChat(session.token, selectedId)

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background text-foreground">
      <ServerRail servers={servers} selectedId={selectedId} onSelect={selectServer} />

      <ChatPanel
        serverName={selectedServer?.name ?? "Carregando..."}
        channelName={DEFAULT_CHANNEL}
        status={status}
        messages={messages}
        onSend={sendMessage}
      />

      <MembersList members={members} currentUserId={session.user.id} currentUser={session.user} onLogout={onLogout} />
    </div>
  )
}
