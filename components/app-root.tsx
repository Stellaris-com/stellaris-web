"use client"

import { useAuth } from "@/hooks/use-auth"
import { LoginScreen } from "@/components/login/login-screen"
import { ChatWorkspace } from "@/components/workspace/chat-workspace"

/**
 * Container raiz da aplicação.
 *
 * Responsabilidade: usar o hook de autenticação para decidir qual fluxo
 * renderizar (login vs. workspace). É o único ponto que conhece o hook de auth,
 * mantendo as telas filhas desacopladas da lógica de sessão.
 */
export function AppRoot() {
  const { session, isLoading, error, login, logout } = useAuth()

  if (!session) {
    return <LoginScreen onLogin={login} isLoading={isLoading} error={error} />
  }

  return <ChatWorkspace session={session} onLogout={logout} />
}
