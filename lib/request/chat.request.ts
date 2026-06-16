/**
 * Request de chat: fachada fina sobre o SocketClient.
 *
 * Expõe apenas as operações de transporte (conectar, entrar em servidor, enviar
 * mensagem, assinar eventos). Toda interpretação dos dados é feita no service.
 */
import { getSocketClient } from "./socket/socket-factory"
import type { EventListener, StatusListener, Unsubscribe } from "./socket/socket-client"

export const chatRequest = {
  connect(token: string): void {
    getSocketClient().connect(token)
  },

  disconnect(): void {
    getSocketClient().disconnect()
  },

  joinServer(serverId: string): void {
    getSocketClient().send({ type: "join_server", payload: { serverId } })
  },

  sendMessage(serverId: string, content: string): void {
    getSocketClient().send({ type: "send_message", payload: { serverId, content } })
  },

  onEvent(listener: EventListener): Unsubscribe {
    return getSocketClient().onEvent(listener)
  },

  onStatusChange(listener: StatusListener): Unsubscribe {
    return getSocketClient().onStatusChange(listener)
  },

  getStatus() {
    return getSocketClient().getStatus()
  },
}
