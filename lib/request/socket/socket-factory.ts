/**
 * Factory + Singleton do SocketClient.
 *
 * `getSocketClient()` devolve sempre a mesma instância (uma conexão por app) e
 * escolhe a implementação correta com base na configuração de ambiente.
 */
import { config } from "@/lib/config"
import { MockSocketClient } from "./mock-socket-client"
import { RealSocketClient } from "./real-socket-client"
import type { SocketClient } from "./socket-client"

let instance: SocketClient | null = null

function createSocketClient(): SocketClient {
  if (config.useMock || !config.wsUrl) {
    return new MockSocketClient()
  }
  return new RealSocketClient(config.wsUrl)
}

export function getSocketClient(): SocketClient {
  if (!instance) {
    instance = createSocketClient()
  }
  return instance
}
