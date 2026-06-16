/**
 * Configuração central de ambiente.
 *
 * Toda a camada de `request` lê daqui. Para apontar a POC para um backend real
 * basta definir as variáveis de ambiente abaixo (e `NEXT_PUBLIC_USE_MOCK=false`).
 */
export const config = {
  /**
   * Quando `true` (padrão), as requisições e o WebSocket usam implementações
   * simuladas em memória — permitindo rodar a POC sem backend.
   */
  useMock: process.env.NEXT_PUBLIC_USE_MOCK !== "false",

  /** URL base da API REST (ex.: https://api.exemplo.com). */
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",

  /** URL do servidor WebSocket (ex.: wss://api.exemplo.com/ws). */
  wsUrl: process.env.NEXT_PUBLIC_WS_URL ?? "",
} as const
