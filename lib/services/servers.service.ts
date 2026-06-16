/**
 * Service de servidores: busca os servidores e os entrega já no formato de
 * domínio, ordenados por nome.
 */
import { fetchServersRequest } from "@/lib/request/servers.request"
import type { Server } from "@/lib/types/domain"
import { mapServer } from "./mappers"

export const serversService = {
  async list(): Promise<Server[]> {
    const dtos = await fetchServersRequest()
    return dtos.map(mapServer).sort((a, b) => a.name.localeCompare(b.name))
  },
}
