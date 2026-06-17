/**
 * Request de servidores: busca a lista de servidores disponíveis (DTO bruto).
 */
import { config } from "@/lib/config";
import type { ServerDTO } from "@/lib/types/dto";
import { httpClient } from "./http-client";

export function fetchServersRequest(accessToken: string): Promise<ServerDTO[]> {
  return httpClient.get<ServerDTO[]>("/rooms", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export function fetchMyServersRequest(
  accessToken: string,
): Promise<ServerDTO[]> {
  return httpClient.get<ServerDTO[]>("/rooms/my", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export function entryServerRequest(
  accessToken: string,
  roomId: string,
): Promise<ServerDTO> {
  return httpClient.post<ServerDTO>(`/rooms/${roomId}/enter`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

