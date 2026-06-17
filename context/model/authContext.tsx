import {
  AuthSession,
  LoginCredentials,
  RegisterCredentials,
} from "@/lib/types/domain";
import { createContext } from "react";


export interface AuthContextData {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login(credentials: LoginCredentials): Promise<void>;
  register(credentials: RegisterCredentials): Promise<void>;
  logout(): void;
}

export const AuthContext = createContext<AuthContextData | null>(null);
