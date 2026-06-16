"use client";

import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { authService, ValidationError } from "@/lib/services/auth.service";

import type {
  AuthSession,
  LoginCredentials,
  RegisterCredentials,
} from "@/lib/types/domain";
import { AuthContext, AuthContextData } from "../model/authContext";

type AuthStatus = "idle" | "loading" | "authenticated" | "error";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [status, setStatus] = useState<AuthStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setStatus("loading");
    setError(null);

    try {
      const result = await authService.login(credentials);

      setSession(result);
      setStatus("authenticated");
    } catch (err) {
      const message =
        err instanceof ValidationError
          ? err.message
          : "Não foi possível entrar. Tente novamente.";

      setError(message);
      setStatus("error");
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    setStatus("loading");
    setError(null);

    try {
      const result = await authService.register(credentials);

      setSession(result);
      setStatus("authenticated");
    } catch (err) {
      const message =
        err instanceof ValidationError
          ? err.message
          : "Não foi possível realizar o cadastro. Tente novamente.";

      setError(message);
      setStatus("error");
    }
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    setStatus("idle");
    setError(null);
  }, []);

  const value = useMemo<AuthContextData>(
    () => ({
      session,
      isAuthenticated: status === "authenticated" && session !== null,
      isLoading: status === "loading",
      error,
      login,
      register,
      logout,
    }),
    [session, status, error, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
