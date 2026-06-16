/**
 * DTOs (Data Transfer Objects): o formato bruto trocado com o backend.
 *
 * Eles ficam isolados dos modelos de domínio de propósito: se o contrato do
 * backend mudar, apenas a camada de `services` (que faz o mapeamento) precisa
 * ser ajustada — a UI e os hooks permanecem intactos.
 */

import type { PresenceStatus } from "./domain"

export interface UserDTO {
  id: string
  username: string
  accent_color: string
  status: PresenceStatus
}

export interface ServerDTO {
  id: string
  name: string
}

export interface MessageDTO {
  id: string
  server_id: string
  author: UserDTO
  content: string
  created_at: string
}

export interface LoginResponseDTO {
  token: string
  user: UserDTO
}

/* -------------------------------------------------------------------------- */
/*                          Contratos do WebSocket                            */
/* -------------------------------------------------------------------------- */

/** Eventos enviados pelo cliente -> servidor. */
export type ClientEvent =
  | { type: "authenticate"; payload: { token: string } }
  | { type: "join_server"; payload: { serverId: string } }
  | { type: "send_message"; payload: { serverId: string; content: string } }

/** Eventos recebidos do servidor -> cliente. */
export type ServerEvent =
  | { type: "message_history"; payload: { serverId: string; messages: MessageDTO[] } }
  | { type: "message_created"; payload: MessageDTO }
  | { type: "presence_update"; payload: { serverId: string; members: UserDTO[] } }

export type ServerEventType = ServerEvent["type"]
