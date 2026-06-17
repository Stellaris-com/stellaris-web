/**
 * Service de servidores: busca os servidores e os entrega já no formato de
 * domínio, ordenados por nome.
 */
import {
  entryServerRequest,
  fetchMyServersRequest,
  fetchServersRequest,
} from "@/lib/request/servers.request";
import type { Server } from "@/lib/types/domain";
import { mapServer } from "./mappers";

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "notFoundError";
  }
}

export const serversService = {
  async list(accessToken: string): Promise<Server[]> {
    const dtos = await fetchServersRequest(accessToken);
    return dtos.map(mapServer).sort((a, b) => a.name.localeCompare(b.name));
  },

  async myServers(accessToken: string): Promise<Server[]> {
    const dtos = await fetchMyServersRequest(accessToken);
    return dtos.map(mapServer).sort((a, b) => a.name.localeCompare(b.name));
  },

  async entryServer(accessToken: string, roomId: string): Promise<Server> {
    const dto = await entryServerRequest(accessToken, roomId);
    return mapServer(dto);
  },
};
