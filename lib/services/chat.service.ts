/**
 * Service de chat: traduz os eventos brutos do WebSocket em modelos de domínio
 * e aplica regras de negócio (ordenação de membros por presença, etc.).
 *
 * Os hooks consomem APENAS este service — nunca o socket diretamente.
 */
import { chatRequest } from "@/lib/request/chat.request"
import type { Unsubscribe } from "@/lib/request/socket/socket-client"
import type { ConnectionStatus, Message, PresenceStatus, User } from "@/lib/types/domain"
import { mapMessage, mapUser } from "./mappers"

/** Peso de cada status para ordenar a lista de membros (online primeiro). */
const STATUS_WEIGHT: Record<PresenceStatus, number> = {
  online: 0,
  idle: 1,
  dnd: 2,
  offline: 3,
}

function sortMembers(members: User[]): User[] {
  return [...members].sort((a, b) => {
    const byStatus = STATUS_WEIGHT[a.status] - STATUS_WEIGHT[b.status]
    return byStatus !== 0 ? byStatus : a.username.localeCompare(b.username)
  })
}

export const chatService = {
  connect(token: string): void {
    chatRequest.connect(token)
  },

  disconnect(): void {
    chatRequest.disconnect()
  },

  joinServer(serverId: string): void {
    chatRequest.joinServer(serverId)
  },

  sendMessage(serverId: string, content: string): boolean {
    const trimmed = content.trim()
    // Regra de negócio: não envia mensagens vazias.
    if (trimmed.length === 0) return false
    chatRequest.sendMessage(serverId, trimmed)
    return true
  },

  onMessage(serverId: string, callback: (message: Message) => void): Unsubscribe {
    return chatRequest.onEvent((event) => {
      if (event.type === "message_created" && event.payload.server_id === serverId) {
        callback(mapMessage(event.payload))
      }
    })
  },

  onHistory(serverId: string, callback: (messages: Message[]) => void): Unsubscribe {
    return chatRequest.onEvent((event) => {
      if (event.type === "message_history" && event.payload.serverId === serverId) {
        callback(event.payload.messages.map(mapMessage))
      }
    })
  },

  onPresence(serverId: string, callback: (members: User[]) => void): Unsubscribe {
    return chatRequest.onEvent((event) => {
      if (event.type === "presence_update" && event.payload.serverId === serverId) {
        callback(sortMembers(event.payload.members.map(mapUser)))
      }
    })
  },

  onStatusChange(callback: (status: ConnectionStatus) => void): Unsubscribe {
    return chatRequest.onStatusChange(callback)
  },

  getStatus(): ConnectionStatus {
    return chatRequest.getStatus()
  },
}
