import { SendHorizontal } from "lucide-react";
import { Skeleton } from "../skeleton";

export function ChatWorkspaceSkeleton() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Servidores */}
      <aside className="flex w-18 flex-col items-center gap-3 bg-[#1E1F22] border-r p-3">
        <Skeleton className="h-12 w-12 rounded-2xl" />

        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-12 rounded-2xl" />
        ))}

        <div className="mt-auto">
          <Skeleton className="h-12 w-12 rounded-2xl" />
        </div>
      </aside>

      {/* Conteúdo */}
      <div className="flex flex-1">
        {/* Chat */}
        <main className="flex flex-1 flex-col">
          {/* Header */}
          <header className="border-b p-4">
            <Skeleton className="h-6 w-64" />
          </header>

          <div className=" p-4 h-40 mb-6 pb-24">
            <div className="flex-1 space-y-2">
              <Skeleton className="rounded-full  h-14 w-15 " />

              <Skeleton className="h-8 w-80" />
              <Skeleton className="h-6 w-40" />
            </div>
            <div className="border-b w-full mt-5" />
          </div>

          {/* Mensagens */}
          <div className="flex-1 space-y-6 overflow-hidden p-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />

                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-12" />
                  </div>

                  <Skeleton className="h-4 w-80 max-w-full" />
                  <Skeleton className="h-4 w-56" />
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4">
            <div className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5">
              <div className="flex-1 bg-transparent  text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed">
                <span className="text-gray-500">Conversar em #geral</span>
              </div>

              <div className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-40">
                <SendHorizontal className="size-5" aria-hidden="true" />
              </div>
            </div>
          </div>
        </main>

        {/* Usuários online */}
        <aside className="w-64 flex flex-col justify-between bg-[#2B2D31] ">
          <div className="flex flex-col gap-2 p-4">
            <Skeleton className="mb-4 h-5 w-24" />

            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-4 w-36" />
                </div>
              ))}
            </div>

            <div className="mt-auto pt-8">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flexflex-2 flex-col p-4 max-h-14 bg-[#1E1F22]   ">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
