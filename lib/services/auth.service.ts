/**
 * Service de autenticação.
 *
 * Aplica regras de negócio (validação de credenciais), chama a request e mapeia
 * o DTO de resposta para o domínio. Lança erros de domínio legíveis pela UI.
 */
import { getUserRequest, loginRequest, registerRequest } from "@/lib/request/auth.request"
import type { AuthSession, LoginCredentials, RegisterCredentials } from "@/lib/types/domain"
import { mapUser } from "./mappers"

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ValidationError"
  }
}

function validate(credentials: LoginCredentials): void {
  if (credentials.username.trim().length < 3) {
    throw new ValidationError("O usuário deve ter ao menos 3 caracteres.")
  }
  if (credentials.password.trim().length < 4) {
    throw new ValidationError("A senha deve ter ao menos 4 caracteres.")
  }
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    validate(credentials)
    
    const loginDTO = await loginRequest({
      username: credentials.username.trim(),
      password: credentials.password,
    })

    const getUserDTO = await getUserRequest(loginDTO.accessToken)
    
    return { token: loginDTO.accessToken, user: mapUser(getUserDTO) }
  },

  async register(credentials: RegisterCredentials): Promise<AuthSession>{
    validate(credentials)

    const requestDTO = await registerRequest({
      username: credentials.username.trim(),
      password: credentials.password,
    })

    const getUserDTO = await getUserRequest(requestDTO.accessToken)
    
    return { token: requestDTO.accessToken, user: mapUser(getUserDTO) }
  }
  
  // logout
}
