"use client"

/**
 * Hook de autenticação.
 *
 * Abstrai o `authService`, expondo apenas estado e ações para a UI. A UI não
 * sabe como o login acontece — só dispara `login()` e reage ao estado.
 */
import { useCallback, useState } from "react"
import { authService, ValidationError } from "@/lib/services/auth.service"
import type { AuthSession, LoginCredentials } from "@/lib/types/domain"

type AuthStatus = "idle" | "loading" | "authenticated" | "error"

export function useAuth() {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [status, setStatus] = useState<AuthStatus>("idle")
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (credentials: LoginCredentials) => {
    setStatus("loading")
    setError(null)
    try {
      const result = await authService.login(credentials)
      setSession(result)
      setStatus("authenticated")
    } catch (err) {
      const message =
        err instanceof ValidationError
          ? err.message
          : "Não foi possível entrar. Tente novamente."
      setError(message)
      setStatus("error")
    }
  }, [])

  const logout = useCallback(() => {
    setSession(null)
    setStatus("idle")
    setError(null)
  }, [])

  return {
    session,
    isAuthenticated: status === "authenticated" && session !== null,
    isLoading: status === "loading",
    error,
    login,
    logout,
  }
}
