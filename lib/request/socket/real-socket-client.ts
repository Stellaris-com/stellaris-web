/**
 * Implementação real do SocketClient sobre a API nativa `WebSocket`.
 *
 * Trata (re)conexão básica e (de)serialização das mensagens. Não contém regra
 * de negócio: apenas transporta eventos tipados.
 */
import type { ClientEvent, ServerEvent } from "@/lib/types/dto"
import { BaseSocketClient } from "./socket-client"

export class RealSocketClient extends BaseSocketClient {
  private socket: WebSocket | null = null
  private token = ""
  private shouldReconnect = false
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null

  constructor(private readonly url: string) {
    super()
  }

  connect(token: string): void {
    this.token = token
    this.shouldReconnect = true
    this.open()
  }

  private open(): void {
    this.setStatus(this.socket ? "reconnecting" : "connecting")
    const socket = new WebSocket(this.url)
    this.socket = socket

    socket.onopen = () => {
      this.setStatus("connected")
      this.send({ type: "authenticate", payload: { token: this.token } })
    }

    socket.onmessage = (raw) => {
      try {
        const event = JSON.parse(raw.data) as ServerEvent
        this.emit(event)
      } catch {
        // Mensagem malformada é ignorada de propósito.
      }
    }

    socket.onclose = () => {
      this.socket = null
      if (this.shouldReconnect) {
        this.setStatus("reconnecting")
        this.reconnectTimer = setTimeout(() => this.open(), 2000)
      } else {
        this.setStatus("disconnected")
      }
    }

    socket.onerror = () => socket.close()
  }

  send(event: ClientEvent): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(event))
    }
  }

  disconnect(): void {
    this.shouldReconnect = false
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer)
    this.socket?.close()
    this.socket = null
    this.setStatus("disconnected")
  }
}
