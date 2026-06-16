/**
 * Contrato de um cliente de tempo real (padrão Adapter).
 *
 * A aplicação depende apenas desta abstração — nunca de `WebSocket` direto.
 * Isso permite trocar a implementação real por uma simulada (mock) sem que a
 * camada de `services` ou os hooks percebam a diferença (Dependency Inversion).
 */
import type { ConnectionStatus } from "@/lib/types/domain"
import type { ClientEvent, ServerEvent } from "@/lib/types/dto"

export type EventListener = (event: ServerEvent) => void
export type StatusListener = (status: ConnectionStatus) => void
export type Unsubscribe = () => void

export interface SocketClient {
  connect(token: string): void
  disconnect(): void
  /** Envia um evento do cliente para o servidor. */
  send(event: ClientEvent): void
  /** Inscreve-se para receber eventos do servidor. Retorna função de cancelamento. */
  onEvent(listener: EventListener): Unsubscribe
  /** Observa mudanças no estado da conexão. */
  onStatusChange(listener: StatusListener): Unsubscribe
  getStatus(): ConnectionStatus
}

/**
 * Base com a lógica de pub/sub (Observer) compartilhada pelas implementações.
 */
export abstract class BaseSocketClient implements SocketClient {
  private eventListeners = new Set<EventListener>()
  private statusListeners = new Set<StatusListener>()
  private status: ConnectionStatus = "idle"

  abstract connect(token: string): void
  abstract disconnect(): void
  abstract send(event: ClientEvent): void

  onEvent(listener: EventListener): Unsubscribe {
    this.eventListeners.add(listener)
    return () => this.eventListeners.delete(listener)
  }

  onStatusChange(listener: StatusListener): Unsubscribe {
    this.statusListeners.add(listener)
    return () => this.statusListeners.delete(listener)
  }

  getStatus(): ConnectionStatus {
    return this.status
  }

  /** Usado pelas subclasses para notificar os assinantes de um evento. */
  protected emit(event: ServerEvent): void {
    this.eventListeners.forEach((listener) => listener(event))
  }

  /** Usado pelas subclasses para atualizar e propagar o estado da conexão. */
  protected setStatus(status: ConnectionStatus): void {
    this.status = status
    this.statusListeners.forEach((listener) => listener(status))
  }
}
