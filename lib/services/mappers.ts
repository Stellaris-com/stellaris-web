/**
 * Mapeadores DTO -> Domínio.
 *
 * Concentram a tradução do formato do backend para os modelos consumidos pela
 * UI. É o único lugar que conhece os dois formatos ao mesmo tempo.
 */
import type { Message, Server, User } from "@/lib/types/domain"
import type { MessageDTO, ServerDTO, UserDTO } from "@/lib/types/dto"

/** Deriva a sigla do servidor a partir do nome (ex.: "Design Lab" -> "DL"). */
function deriveAcronym(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export function mapUser(dto: UserDTO): User {
  return {
    id: dto.id,
    username: dto.username,
    accentColor: dto.accent_color,
    status: dto.status,
  }
}

export function mapServer(dto: ServerDTO): Server {
  return {
    id: dto.id,
    name: dto.name,
    acronym: deriveAcronym(dto.name),
  }
}

export function mapMessage(dto: MessageDTO): Message {
  return {
    id: dto.id,
    serverId: dto.server_id,
    author: mapUser(dto.author),
    content: dto.content,
    createdAt: dto.created_at,
  }
}
