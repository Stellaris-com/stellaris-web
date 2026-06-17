"use client";

/**
 * Hook da lista de servidores.
 *
 */
import { useCallback, useEffect, useState } from "react";
import { NotFoundError, serversService } from "@/lib/services/servers.service";
import { Server } from "@/lib/types/domain";

export function useServers(accessToken: string) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [servers, setServers] = useState<Server[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const listMyServers = useCallback(async (accessToken: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await serversService.myServers(accessToken);

      setServers(result);

      if (!selectedId) {
        setSelectedId(result[0].id);
      }

      setLoading(false);
      setError(null);
    } catch (err) {
      const message =
        err instanceof NotFoundError
          ? err.message
          : "Não foi possível encontrar a listá de servidores. Tente novamente.";

      setError(message);
      setLoading(false);
    }
  }, []);

  const listServers = useCallback(async (accessToken: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await serversService.list(accessToken);

      setServers(result);
      setLoading(false);
      setError(null);
    } catch (err) {
      const message =
        err instanceof NotFoundError
          ? err.message
          : "Não foi possível encontrar a listá de servidores. Tente novamente.";

      setError(message);
      setLoading(false);
    }
  }, []);

  const entryserver = useCallback(
    async (accessToken: string, roomId: string) => {
      setLoading(true);
      setError(null);

      try {
        const result = await serversService.entryServer(accessToken, roomId);

        setServers([...servers, result]);
        setLoading(false);
        setError(null);
      } catch (err) {
        const message =
          err instanceof NotFoundError
            ? err.message
            : "Não foi possível entrar no servidor. Tente novamente.";

        setError(message);
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    void listMyServers(accessToken);
  }, [accessToken]);

  const selectedServer = servers?.find((s) => s.id === selectedId) ?? null;

  return {
    servers: servers ?? [],
    isLoading,
    selectedId,
    selectedServer,
    selectServer: setSelectedId,
    error,

    listMyServers,
    listServers,
    entryserver,
  };
}
