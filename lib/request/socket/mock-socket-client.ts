/**
 * Implementação simulada do SocketClient.
 *
 * Reproduz o comportamento esperado de um servidor de chat: responde ao join
 * com histórico + presença, ecoa as mensagens enviadas e injeta mensagens
 * "ambiente" de outros usuários em intervalos aleatórios.
 */
import type { ClientEvent, UserDTO } from "@/lib/types/dto"
import { AMBIENT_PHRASES, getMockHistory, getMockMembers } from "@/lib/request/mock/mock-data"
import { BaseSocketClient } from "./socket-client"

export class MockSocketClient extends BaseSocketClient {
  private currentUser: UserDTO | null = null
  private joinedServerId: string | null = null
  private ambientTimer: ReturnType<typeof setInterval> | null = null

  connect(token: string): void {
    this.setStatus("connecting")
    // Simula a latência do handshake.
    setTimeout(() => {
      this.currentUser = this.deriveUserFromToken(token)
      this.setStatus("connected")
    }, 500)
  }

  send(event: ClientEvent): void {
    switch (event.type) {
      case "authenticate":
        this.currentUser = this.deriveUserFromToken(event.payload.token)
        break
      case "join_server":
        this.handleJoinServer(event.payload.serverId)
        break
      case "send_message":
        this.handleSendMessage(event.payload.serverId, event.payload.content)
        break
    }
  }

  disconnect(): void {
    this.stopAmbient()
    this.joinedServerId = null
    this.setStatus("disconnected")
  }

  private handleJoinServer(serverId: string): void {
    this.joinedServerId = serverId

    // Histórico de mensagens do servidor.
    this.emit({
      type: "message_history",
      payload: { serverId, messages: getMockHistory(serverId) },
    })

    // Lista de presença (inclui o usuário atual no topo).
    const members = getMockMembers(serverId)
    const withSelf = this.currentUser
      ? [this.currentUser, ...members.filter((m) => m.id !== this.currentUser?.id)]
      : members
    this.emit({ type: "presence_update", payload: { serverId, members: withSelf } })

    this.startAmbient(serverId)
  }

  private handleSendMessage(serverId: string, content: string): void {
    if (!this.currentUser) return
    // Eco com leve atraso, como se o servidor confirmasse o recebimento.
    setTimeout(() => {
      this.emit({
        type: "message_created",
        payload: {
          id: `m-${crypto.randomUUID()}`,
          server_id: serverId,
          author: this.currentUser as UserDTO,
          content,
          created_at: new Date().toISOString(),
        },
      })
    }, 120)
  }

  private startAmbient(serverId: string): void {
    this.stopAmbient()
    this.ambientTimer = setInterval(() => {
      if (this.joinedServerId !== serverId) return
      const members = getMockMembers(serverId).filter((m) => m.id !== this.currentUser?.id)
      if (members.length === 0) return
      const author = members[Math.floor(Math.random() * members.length)]
      const content = AMBIENT_PHRASES[Math.floor(Math.random() * AMBIENT_PHRASES.length)]
      this.emit({
        type: "message_created",
        payload: {
          id: `m-${crypto.randomUUID()}`,
          server_id: serverId,
          author,
          content,
          created_at: new Date().toISOString(),
        },
      })
    }, 9000)
  }

  private stopAmbient(): void {
    if (this.ambientTimer) {
      clearInterval(this.ambientTimer)
      this.ambientTimer = null
    }
  }

  private deriveUserFromToken(token: string): UserDTO {
    const username = token.startsWith("mock-token:") ? token.slice("mock-token:".length) : "convidado"
    return { id: `u-${username}`, username, accent_color: "#5865f2", status: "online" }
  }
}
