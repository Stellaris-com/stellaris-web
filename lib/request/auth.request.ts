/**
 * Request de autenticação: I/O puro, devolve DTO bruto.
 *
 * Em modo mock, simula a resposta do backend com um pequeno atraso de rede.
 */
import { config } from "@/lib/config"
import type { LoginCredentials } from "@/lib/types/domain"
import type { LoginResponseDTO } from "@/lib/types/dto"
import { httpClient } from "./http-client"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function loginMock(credentials: LoginCredentials): Promise<LoginResponseDTO> {
  // O token "mock" carrega o username, simulando claims de um JWT. Assim o
  // socket simulado consegue identificar o autor das mensagens via protocolo.
  return delay(700).then(() => ({
    token: `mock-token:${credentials.username}`,
    user: {
      id: `u-${credentials.username}`,
      username: credentials.username,
      accent_color: "#5865f2",
      status: "online",
    },
  }))
}

export function loginRequest(credentials: LoginCredentials): Promise<LoginResponseDTO> {
  if (config.useMock) return loginMock(credentials)
  return httpClient.post<LoginResponseDTO>("/auth/login", credentials)
}
