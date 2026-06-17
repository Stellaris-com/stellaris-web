"use client";

import { ChatWorkspace } from "@/components/workspace/chat-workspace";
import { JoinServerModalProvider } from "@/context/provider/joinServerModalProvider";
import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";

export default function Page() {
  const { session, logout, isLoading } = useAuth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="h-dvh w-full">
      <JoinServerModalProvider>
        <ChatWorkspace session={session} onLogout={logout} />
      </JoinServerModalProvider>
    </main>
  );
}
