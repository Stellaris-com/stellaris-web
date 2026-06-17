"use client";

import { useChat } from "@/hooks/use-chat";
import type { AuthSession } from "@/lib/types/domain";
import { ServerRail } from "@/components/servers/server-rail";
import { ChatPanel } from "@/components/chat/chat-panel";
import { MembersList } from "@/components/members/members-list";
import { JoinServerModal } from "../modals/joinServerModal";
import { useJoinServerModal } from "@/hooks/use-join-server-modal";
import { useMyServers } from "@/hooks/use-my-servers";
import { useServerDiscovery } from "@/hooks/use-servers-discovery";

interface ChatWorkspaceProps {
  session: AuthSession;
  onLogout: () => void;
}

const DEFAULT_CHANNEL = "geral";

/**
 * Container do workspace.
 *
 * Responsabilidade: orquestrar os hooks (servidores + chat) e distribuir os
 * dados/handlers para os componentes de apresentação. Nenhuma regra de negócio
 * vive aqui — apenas a coordenação entre hooks.
 */
export function ChatWorkspace({ session, onLogout }: ChatWorkspaceProps) {
  const { myServers, refresh, selectServer, selectedId, selectedServer } =
    useMyServers(session.token);

  const {
    error,
    isLoading: isLoadingOnServerDiscovery,
    joinServer,
    servers,
    refresh: refreshOnUserServerDiscovery,
  } = useServerDiscovery(session.token);

  const { open: openJoinServerModal, close: closeJoinServerModal } =
    useJoinServerModal();

  const { messages, sendMessage } = useChat(session.token, selectedId);

  const handlejoinonServerModal = async (roomId: string) => {
    await joinServer(roomId);
    await refresh();
    await refreshOnUserServerDiscovery();
    closeJoinServerModal();
  };

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background text-foreground">
      <ServerRail
        servers={myServers}
        selectedId={selectedId}
        onSelect={selectServer}
        onClick={openJoinServerModal}
      />

      <ChatPanel
        serverName={selectedServer?.name ?? "Carregando..."}
        channelName={DEFAULT_CHANNEL}
        status={"connected"}
        messages={messages}
        onSend={sendMessage}
      />

      <MembersList
        members={selectedServer?.members ?? []}
        currentUserId={session.user.id}
        currentUser={session.user}
        onLogout={onLogout}
      />

      <JoinServerModal
        servers={servers}
        error={error}
        isLoading={isLoadingOnServerDiscovery}
        onJoinServer={handlejoinonServerModal}
      />
    </div>
  );
}
