"use client"

import { type FormEvent, useState } from "react"
import { Loader2, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { LoginCredentials } from "@/lib/types/domain"

interface LoginScreenProps {
  onLogin: (credentials: LoginCredentials) => void
  isLoading: boolean
  error: string | null
}

/**
 * Tela de login (componente de apresentação).
 *
 * Gerencia apenas o estado dos campos (regra de renderização) e delega o login
 * via `onLogin`. Não conhece nenhuma regra de negócio.
 */
export function LoginScreen({ onLogin, isLoading, error }: LoginScreenProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onLogin({ username, password })
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-rail p-4">
      <div className="w-full max-w-md rounded-md bg-card p-8 shadow-2xl">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <MessageSquare className="size-6" aria-hidden="true" />
          </span>
          <h1 className="text-2xl font-bold text-foreground text-balance">Que bom te ver de novo!</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Entre para conversar em tempo real no Nexus.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-xs font-bold uppercase tracking-wide text-muted-foreground"
            >
              Usuário
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-sm border-none bg-input px-3 py-2.5 text-foreground outline-none ring-ring/50 transition focus:ring-2 placeholder:text-muted-foreground"
              placeholder="seu.usuario"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-xs font-bold uppercase tracking-wide text-muted-foreground"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border-none bg-input px-3 py-2.5 text-foreground outline-none ring-ring/50 transition focus:ring-2 placeholder:text-muted-foreground"
              placeholder="••••••••"
            />
          </div>

          {error ? (
            <p role="alert" className="text-sm font-medium text-destructive">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-1 h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>

          <p className="text-xs text-muted-foreground">
            Dica: qualquer usuário (3+ caracteres) e senha (4+ caracteres) funcionam nesta POC.
          </p>
        </form>
      </div>
    </main>
  )
}
