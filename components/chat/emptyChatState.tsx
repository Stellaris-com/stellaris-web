"use client";

import { Server } from "lucide-react";

export function EmptyChatState() {
  return (
    <section className="flex flex-1 items-center justify-center bg-background">
      <div className="flex max-w-lg flex-col items-center text-center">
        <div className="mb-8 flex size-24 items-center justify-center rounded-full border border-border bg-card">
          <Server
            className="size-12 text-muted-foreground"
            aria-hidden="true"
          />
        </div>

        <h2 className="text-2xl font-bold text-foreground">
          Bem-vindo ao chat
        </h2>

        <p className="mt-3 text-muted-foreground">
          Para começar, selecione um servidor na barra lateral esquerda. Depois
          escolha um canal para visualizar e enviar mensagens.
        </p>
      </div>
    </section>
  );
}
