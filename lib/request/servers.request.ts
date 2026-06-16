/**
 * Request de servidores: busca a lista de servidores disponíveis (DTO bruto).
 */
import { config } from "@/lib/config"
import type { ServerDTO } from "@/lib/types/dto"
import { httpClient } from "./http-client"
import { MOCK_SERVERS } from "./mock/mock-data"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function fetchServersMock(): Promise<ServerDTO[]> {
  return delay(400).then(() => [...MOCK_SERVERS])
}

export function fetchServersRequest(): Promise<ServerDTO[]> {
  if (config.useMock) return fetchServersMock()
  return httpClient.get<ServerDTO[]>("/servers")
}
