/**
 * Mapeadores DTO -> Domínio.
 *
 * Concentram a tradução do formato do backend para os modelos consumidos pela
 * UI. É o único lugar que conhece os dois formatos ao mesmo tempo.
 */
import type { Message, Server, User } from "@/lib/types/domain";
import type { MessageDTO, ServerDTO, UserDTO } from "@/lib/types/dto";
import { deriveAcronym, getUserAccentColor } from "../utils";

export function mapUser(dto: UserDTO): User {
  return {
    id: dto.id,
    username: dto.username,
    accentColor: getUserAccentColor(dto.id),
    status: "online",
    role: dto.role,
    messages: dto.messages,
    roomsCreated: dto.roomsCreated,
  };
}

export function mapServer(dto: ServerDTO): Server {
  return {
    id: dto.id,
    name: dto.name,
    acronym: deriveAcronym(dto.name),
    members: dto.membersOfRoom.map((member) => ({
      id: member.id,
      username: member.username,
      accentColor: getUserAccentColor(dto.id),
      status: "online",
      role: member.typeOfMember,
    })),
  };
}

export function mapMessage(dto: MessageDTO): Message {
  return {
    id: dto.id,
    serverId: dto.server_id,
    author: mapUser(dto.author),
    content: dto.content,
    createdAt: dto.created_at,
  };
}
