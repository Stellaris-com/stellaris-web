/**
 * Modelos de domínio da aplicação.
 *
 * Estes tipos representam as entidades "limpas" usadas pela UI e pelos hooks.
 * A camada de `request` lida com DTOs (formato bruto vindo do backend) e a
 * camada de `services` é responsável por mapear DTO -> domínio.
 */

export type PresenceStatus = "online" | "idle" | "dnd" | "offline"

export interface User {
  readonly id: string
  readonly username: string
  /** Cor usada no avatar quando não há imagem (padrão Discord). */
  readonly accentColor: string
  readonly status: PresenceStatus
  readonly role?: string
  readonly roomsCreated?: string
  readonly messages?: Number
}

export interface Server {
  readonly id: string
  readonly name: string
  /** Sigla exibida no ícone do servidor (ex.: "Nexus" -> "NX"). */
  readonly acronym: string
}

export interface Message {
  readonly id: string
  readonly serverId: string
  readonly author: User
  readonly content: string
  /** ISO string para facilitar serialização entre camadas. */
  readonly createdAt: string
}

export interface AuthSession {
  readonly token: string
  readonly user: User
}

/** Credenciais de login submetidas pela UI. */
export interface LoginCredentials {
  readonly username: string
  readonly password: string
}

/** Estado de uma conexão WebSocket, consumido pela UI para feedback visual. */
export type ConnectionStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected"
