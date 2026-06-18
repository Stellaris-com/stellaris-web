"use client";

import { useMemo, useState } from "react";
import { CompassIcon, Loader2, Search, Users, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useJoinServerModal } from "@/hooks/use-join-server-modal";

import type { Server } from "@/lib/types/domain";

interface JoinServerModalProps {
  servers: Server[];
  isLoading: boolean;
  error: string | null;
  onJoinServer: (roomId: string) => Promise<void>;
}

export function JoinServerModal({
  servers,
  isLoading,
  error,
  onJoinServer,
}: JoinServerModalProps) {
  const { isOpen, close } = useJoinServerModal();

  const [search, setSearch] = useState("");
  const [joiningServerId, setJoiningServerId] = useState<string | null>(null);

  const filteredServers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return servers;

    return servers.filter((server) =>
      server.name.toLowerCase().includes(query),
    );
  }, [search, servers]);

  async function handleJoin(serverId: string) {
    try {
      setJoiningServerId(serverId);

      await onJoinServer(serverId);

      close();
    } finally {
      setJoiningServerId(null);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative pb-8.25 flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-md bg-card shadow-2xl">
        <button
          onClick={close}
          className="absolute right-4 top-4 text-muted-foreground transition hover:text-foreground"
        >
          <X className="size-4" />
        </button>

        <div className=" p-6">

          <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10">
            <CompassIcon className="size-6 text-primary" aria-hidden="true" />
          </div>
          
          <h2 className="text-2xl font-bold text-foreground">
            Descobrir servidores
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Escolha um servidor para participar da conversa.
          </p>

          <div className="relative mt-5">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar servidor..."
              className="w-full rounded-sm bg-input py-2.5 pl-10 pr-3 outline-none ring-ring/50 transition focus:ring-2"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar p-4">
          {error && (
            <p className="mb-4 text-sm font-medium text-destructive">{error}</p>
          )}

          {filteredServers.length === 0 ? (
            <div className="flex h-40 items-center justify-center text-center">
              <p className="text-sm text-muted-foreground">
                Nenhum servidor encontrado.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredServers.map((server) => {
                const isJoining = joiningServerId === server.id && isLoading;

                return (
                  <div
                    key={server.id}
                    className="flex items-center justify-between rounded-lg  bg-background p-4 transition hover:border-primary/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground">
                        {server.acronym}
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground">
                          {server.name}
                        </h3>

                        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="size-3" />

                          <span>{server.members.length} membros</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      disabled={isLoading}
                      onClick={() => handleJoin(server.id)}
                    >
                      {isJoining ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Entrando...
                        </>
                      ) : (
                        "Entrar"
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
