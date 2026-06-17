/**
 * DTOs (Data Transfer Objects): o formato bruto trocado com o backend.
 *
 * Eles ficam isolados dos modelos de domínio de propósito: se o contrato do
 * backend mudar, apenas a camada de `services` (que faz o mapeamento) precisa
 * ser ajustada — a UI e os hooks permanecem intactos.
 */


export interface UserDTO {
  id: string,
  messages: Number,
  username: string,
  roomsCreated: string,
  role: string
}

export interface ServerDTO {
  id: string;
  name: string;
  simpleDescription: string;
  membersOfRoom: ServerMembersDTO[];
}

interface ServerMembersDTO {
  id: string;
  username: string;
  typeOfMember: string;
}

export interface MessageDTO {
  id: string
  server_id: string
  author: UserDTO
  content: string
  created_at: string
}

export interface LoginResponseDTO {
  accessToken: string
}

export interface GetUserResponseDTO { }


export interface ChatUserResponseDTO {
  id: string;
  username: string;
}

export interface ChatMessageResponseDTO {
  id: string;
  message: string;
  createdAt: string;
  user: ChatUserResponseDTO;
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
