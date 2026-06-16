/**
 * Fonte de dados em memória usada pelas implementações de mock (HTTP e Socket).
 *
 * Mantida isolada para que, ao plugar um backend real, estes arquivos de mock
 * possam ser simplesmente ignorados sem tocar no resto da aplicação.
 */
import type { MessageDTO, ServerDTO, UserDTO } from "@/lib/types/dto"

export const MOCK_SERVERS: ServerDTO[] = [
  { id: "srv-nexus", name: "Nexus HQ" },
  { id: "srv-design", name: "Design Lab" },
  { id: "srv-gaming", name: "Game Night" },
  { id: "srv-devs", name: "Dev Brasil" },
]

const MEMBERS_BY_SERVER: Record<string, UserDTO[]> = {
  "srv-nexus": [
    { id: "u-ana", username: "ana.lima", accent_color: "#5865f2", status: "online" },
    { id: "u-bruno", username: "bruno.dev", accent_color: "#23a55a", status: "online" },
    { id: "u-clara", username: "clara_ux", accent_color: "#eb459e", status: "idle" },
    { id: "u-diego", username: "diego.qa", accent_color: "#f0b232", status: "dnd" },
    { id: "u-bot", username: "NexusBot", accent_color: "#3ba55d", status: "online" },
  ],
  "srv-design": [
    { id: "u-clara", username: "clara_ux", accent_color: "#eb459e", status: "online" },
    { id: "u-fer", username: "fernanda.art", accent_color: "#5865f2", status: "online" },
    { id: "u-gui", username: "gui.motion", accent_color: "#f0b232", status: "idle" },
  ],
  "srv-gaming": [
    { id: "u-bruno", username: "bruno.dev", accent_color: "#23a55a", status: "online" },
    { id: "u-hugo", username: "hugo.gg", accent_color: "#f23f43", status: "dnd" },
    { id: "u-ivo", username: "ivo.play", accent_color: "#5865f2", status: "online" },
    { id: "u-bot", username: "NexusBot", accent_color: "#3ba55d", status: "online" },
  ],
  "srv-devs": [
    { id: "u-ana", username: "ana.lima", accent_color: "#5865f2", status: "online" },
    { id: "u-joao", username: "joao.backend", accent_color: "#23a55a", status: "online" },
    { id: "u-kim", username: "kim.frontend", accent_color: "#eb459e", status: "idle" },
    { id: "u-lia", username: "lia.devops", accent_color: "#f0b232", status: "offline" },
  ],
}

export function getMockMembers(serverId: string): UserDTO[] {
  return MEMBERS_BY_SERVER[serverId] ?? []
}

const now = Date.now()
const minutesAgo = (m: number) => new Date(now - m * 60_000).toISOString()

const SEED_MESSAGES: Record<string, MessageDTO[]> = {
  "srv-nexus": [
    {
      id: "m-1",
      server_id: "srv-nexus",
      author: MEMBERS_BY_SERVER["srv-nexus"][0],
      content: "Bom dia, pessoal! Subimos a nova build no ambiente de staging.",
      created_at: minutesAgo(42),
    },
    {
      id: "m-2",
      server_id: "srv-nexus",
      author: MEMBERS_BY_SERVER["srv-nexus"][1],
      content: "Boa! Já estou testando o fluxo de mensagens via WebSocket aqui.",
      created_at: minutesAgo(40),
    },
    {
      id: "m-3",
      server_id: "srv-nexus",
      author: MEMBERS_BY_SERVER["srv-nexus"][2],
      content: "O layout ficou bem parecido com o Discord, curti demais.",
      created_at: minutesAgo(12),
    },
  ],
  "srv-design": [
    {
      id: "m-d1",
      server_id: "srv-design",
      author: MEMBERS_BY_SERVER["srv-design"][1],
      content: "Acabei o protótipo no Figma, alguém revisa?",
      created_at: minutesAgo(20),
    },
  ],
  "srv-gaming": [
    {
      id: "m-g1",
      server_id: "srv-gaming",
      author: MEMBERS_BY_SERVER["srv-gaming"][1],
      content: "Bora ranqueada hoje à noite?",
      created_at: minutesAgo(8),
    },
  ],
  "srv-devs": [
    {
      id: "m-dev1",
      server_id: "srv-devs",
      author: MEMBERS_BY_SERVER["srv-devs"][1],
      content: "Alguém já migrou pro Next.js 16? Como foi a experiência?",
      created_at: minutesAgo(33),
    },
  ],
}

export function getMockHistory(serverId: string): MessageDTO[] {
  return [...(SEED_MESSAGES[serverId] ?? [])]
}

/** Frases que os "outros usuários" enviam aleatoriamente para simular atividade. */
export const AMBIENT_PHRASES: string[] = [
  "Concordo!",
  "Boa ideia 👌",
  "Vou olhar isso agora.",
  "Alguém tem o link da doc?",
  "kkkk verdade",
  "Acabei de commitar, deem um pull.",
  "Reunião em 5 minutos, gente.",
  "Esse WebSocket tá voando.",
]
