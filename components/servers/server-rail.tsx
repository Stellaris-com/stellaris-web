"use client";

import { Compass, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Server } from "@/lib/types/domain";

interface ServerRailProps {
  servers: Server[];
  selectedId: string | null;
  onSelect: (serverId: string) => void;
  onClick: () => void;
}

/**
 * Barra lateral esquerda com os servidores ativos (apresentação pura).
 * Reproduz o "rail" de ícones do Discord, incluindo o pílula de seleção.
 */
export function ServerRail({
  servers,
  selectedId,
  onSelect,
  onClick,
}: ServerRailProps) {
  return (
    <nav
      aria-label="Servidores"
      className="flex h-full w-[72px] shrink-0 flex-col items-center gap-2 bg-rail py-3"
    >
      <RailButton
        aria-label="Mensagens diretas"
        active
        className="bg-primary text-primary-foreground"
      >
        <Compass className="size-6" aria-hidden="true" />
      </RailButton>

      <span className="h-0.5 w-8 rounded-full bg-border" aria-hidden="true" />

      <ul className="flex flex-1 flex-col items-center gap-2 overflow-y-auto">
        {servers.map((server) => {
          const isActive = server.id === selectedId;
          return (
            <li key={server.id} className="relative flex w-full justify-center">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-1/2 w-1 -translate-y-1/2 rounded-r-full bg-rail-foreground transition-all",
                  isActive ? "h-9" : "h-0 group-hover:h-5",
                )}
              />
              <RailButton
                aria-label={server.name}
                aria-current={isActive ? "true" : undefined}
                active={isActive}
                onClick={() => onSelect(server.id)}
                className={cn(
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-rail-foreground hover:bg-primary hover:text-primary-foreground",
                )}
              >
                <span className="text-sm font-semibold">{server.acronym}</span>
              </RailButton>
            </li>
          );
        })}
      </ul>

      <RailButton
        aria-label="Adicionar servidor"
        className="bg-card text-online hover:bg-online hover:text-primary-foreground"
        onClick={onClick}
      >
        <Plus className="size-6" aria-hidden="true" />
      </RailButton>
    </nav>
  );
}

interface RailButtonProps extends React.ComponentProps<"button"> {
  active?: boolean;
}

/** Botão circular do rail que vira "squircle" quando ativo (efeito Discord). */
function RailButton({
  active,
  className,
  children,
  ...props
}: RailButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "group cursor-pointer ml-2 flex size-12 items-center justify-center overflow-hidden transition-all duration-200",
        active ? "rounded-2xl" : "rounded-3xl hover:rounded-2xl",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
