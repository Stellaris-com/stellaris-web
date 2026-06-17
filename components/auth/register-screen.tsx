"use client";

import { type FormEvent, useState } from "react";
import { Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RegisterCredentials } from "@/lib/types/domain";
import Link from "next/link";

interface RegisterScreenProps {
  onRegister: (credentials: RegisterCredentials) => void;
  isLoading: boolean;
  error: string | null;
}

export function RegisterScreen({
  onRegister,
  isLoading,
  error,
}: RegisterScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onRegister({ username, password });
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-rail p-4">
      <div className="w-full max-w-md rounded-md bg-card p-8 shadow-2xl">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <MessageSquare className="size-6" aria-hidden="true" />
          </span>
          <h1 className="text-2xl font-bold text-foreground text-balance">
            Uma carinha nova por aqui!
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Se cadastre para poder conversar em tempo real com seus amigos no
            Nexus.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          noValidate
        >
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
                Carregando...
              </>
            ) : (
              "Criar conta"
            )}
          </Button>

          <Link
            className="text-center text-xs  text-blue-400"
            href={"/login"}
          >
            Já tem uma conta ? Faça login.
          </Link>
        </form>
      </div>
    </main>
  );
}
