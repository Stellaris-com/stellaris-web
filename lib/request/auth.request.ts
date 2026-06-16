/**
 * Request de autenticação: I/O puro, devolve DTO bruto.
 *
 * Em modo mock, simula a resposta do backend com um pequeno atraso de rede.
 */
import type { LoginCredentials } from "@/lib/types/domain"
import type { LoginResponseDTO, UserDTO } from "@/lib/types/dto"
import { httpClient } from "./http-client"



export function loginRequest(credentials: LoginCredentials): Promise<LoginResponseDTO> {
  return httpClient.post<LoginResponseDTO>("/auth/login", credentials)
}

export function getUserRequest(accessToken: string): Promise<UserDTO>{
  return httpClient.get<UserDTO>("/users/me", {headers : { Authorization: `Bearer ${accessToken}` }})
}