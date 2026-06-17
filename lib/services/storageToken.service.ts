/**
 * Service de armazenamento do token.
 *
 * Centraliza operações de persistência e recuperação do token de sessão.
 * A aplicação não conhece detalhes do mecanismo de armazenamento utilizado.
 */

export class StorageTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StorageTokenError";
  }
}

const TOKEN_KEY = "auth_token";

export const storageTokenService = {
  save(token: string): void {
    try {
      if (!token.trim()) {
        throw new StorageTokenError("Token inválido.");
      }

      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      throw new StorageTokenError("Não foi possível salvar o token da sessão.");
    }
  },

  get(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      throw new StorageTokenError(
        "Não foi possível recuperar o token da sessão.",
      );
    }
  },

  remove(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      throw new StorageTokenError(
        "Não foi possível remover o token da sessão.",
      );
    }
  },
};
