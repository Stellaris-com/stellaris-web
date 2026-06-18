"use client";

import { useState } from "react";
import { Loader2, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCreateServerModal } from "@/hooks/use-create-server-modal";
import { CreateServerDTO } from "@/lib/types/dto";

interface CreateServerModalProps {
  isLoading: boolean;
  error: string | null;
  onCreateServer: (serverContent: CreateServerDTO) => Promise<void>;
}

export function CreateServerModal({
  isLoading,
  error,
  onCreateServer,
}: CreateServerModalProps) {
  const { isOpen, close } = useCreateServerModal();

  const [serverName, setServerName] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = serverName.trim();

    if (!name) return;

    await onCreateServer({
      name: name,
    });

    setServerName("");
    close();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-md bg-card shadow-2xl">
        <button
          onClick={close}
          className="absolute right-4 top-4 text-muted-foreground transition hover:text-foreground"
        >
          <X className="size-4" />
        </button>

        <form onSubmit={handleSubmit}>
          <div className="p-6 ">
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <Plus className="size-6 text-primary" aria-hidden="true" />
            </div>

            <h2 className="text-2xl font-bold text-foreground">
              Criar servidor
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Escolha um nome para o seu servidor.
            </p>

            <div className="mt-5">
              <label
                htmlFor="server-name"
                className="mb-2 block text-sm font-medium"
              >
                Nome do servidor
              </label>

              <input
                id="server-name"
                autoFocus
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder="Ex: Desenvolvedores React"
                maxLength={50}
                className="w-full rounded-sm bg-input px-3 py-2.5 outline-none ring-ring/50 transition focus:ring-2"
              />
            </div>

            {error && (
              <p className="mt-3 text-sm font-medium text-destructive">
                {error}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 border-t border-border p-4">
            <Button
              type="button"
              variant="ghost"
              onClick={close}
              className={"cursor-pointer"}
              disabled={isLoading}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              className={"cursor-pointer"}
              disabled={isLoading || serverName.trim().length === 0}
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Criando...
                </>
              ) : (
                "Criar servidor"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
