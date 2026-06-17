"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { NotFoundError, serversService } from "@/lib/services/servers.service";

import type { Server } from "@/lib/types/domain";

export function useMyServers(accessToken: string) {
  const [myServers, setMyServers] = useState<Server[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMyServers = useCallback(async () => {
    if (!accessToken) return;

    setLoading(true);
    setError(null);

    try {
      const result = await serversService.myServers(accessToken);

      setMyServers(result);

      setSelectedId((current) => {
        if (current) return current;

        return result[0]?.id ?? null;
      });
    } catch (err) {
      const message =
        err instanceof NotFoundError
          ? err.message
          : "Não foi possível carregar seus servidores.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void loadMyServers();
  }, [loadMyServers]);

  const selectedServer = useMemo(
    () => myServers.find((server) => server.id === selectedId) ?? null,
    [myServers, selectedId],
  );

  return {
    myServers,

    selectedId,
    selectedServer,

    isLoading,
    error,

    selectServer: setSelectedId,
    refresh: loadMyServers,
  };
}
