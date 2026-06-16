"use client"

/**
 * Hook da lista de servidores.
 *
 * Usa SWR (com o `serversService` como fetcher) para buscar/cachear a lista e
 * gerencia o servidor atualmente selecionado. A UI só lê o resultado e chama
 * `selectServer`.
 */
import { useEffect, useState } from "react"
import useSWR from "swr"
import { serversService } from "@/lib/services/servers.service"

export function useServers() {
  const { data: servers, isLoading } = useSWR("servers", () => serversService.list(), {
    revalidateOnFocus: false,
  })

  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Seleciona o primeiro servidor assim que a lista chega.
  useEffect(() => {
    if (!selectedId && servers && servers.length > 0) {
      setSelectedId(servers[0].id)
    }
  }, [servers, selectedId])

  const selectedServer = servers?.find((s) => s.id === selectedId) ?? null

  return {
    servers: servers ?? [],
    isLoading,
    selectedId,
    selectedServer,
    selectServer: setSelectedId,
  }
}
