"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { NotFoundError, serversService } from "@/lib/services/servers.service";

import type { Server } from "@/lib/types/domain";

export function useServerDiscovery(accessToken: string) {
  const [servers, setServers] = useState<Server[]>([]);
  const [search, setSearch] = useState("");

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadServers = useCallback(async () => {
    if (!accessToken) return;

    setLoading(true);
    setError(null);

    try {
      console.log(accessToken);
      const result = await serversService.list(accessToken);

      setServers(result);
    } catch (err) {
      const message =
        err instanceof NotFoundError
          ? err.message
          : "Não foi possível carregar os servidores.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const joinServer = useCallback(
    async (roomId: string) => {
      if (!accessToken) return;

      setLoading(true);
      setError(null);

      try {
        await serversService.entryServer(accessToken, roomId);
      } catch (err) {
        const message =
          err instanceof NotFoundError
            ? err.message
            : "Não foi possível entrar no servidor.";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [accessToken],
  );

  useEffect(() => {
    void loadServers();
  }, [loadServers]);

  const filteredServers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return servers;
    }

    return servers.filter((server) =>
      server.name.toLowerCase().includes(query),
    );
  }, [servers, search]);

  return {
    servers: filteredServers,
    search,
    setSearch,

    isLoading,
    error,

    joinServer,
    refresh: loadServers,
  };
}
