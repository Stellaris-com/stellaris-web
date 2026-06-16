"use client"

import { LogOut } from "lucide-react"
import { UserAvatar } from "@/components/shared/user-avatar"
import type { User } from "@/lib/types/domain"

interface MembersListProps {
  members: User[]
  currentUserId: string
  currentUser: User
  onLogout: () => void
}

/**
 * Barra lateral direita com os usuários conectados ao servidor.
 * Apresentação pura: recebe a lista já ordenada pelo service e apenas a separa
 * visualmente entre online e offline. No rodapé exibe o painel do usuário atual.
 */
export function MembersList({ members, currentUserId, currentUser, onLogout }: MembersListProps) {
  const online = members.filter((m) => m.status !== "offline")
  const offline = members.filter((m) => m.status === "offline")

  return (
    <aside
      aria-label="Membros conectados"
      className="hidden w-60 shrink-0 flex-col bg-card lg:flex"
    >
      <div className="flex-1 overflow-y-auto px-2 py-4">
        <MemberGroup title="Online" count={online.length}>
          {online.map((member) => (
            <MemberRow key={member.id} member={member} isCurrentUser={member.id === currentUserId} />
          ))}
        </MemberGroup>

        {offline.length > 0 ? (
          <MemberGroup title="Offline" count={offline.length}>
            {offline.map((member) => (
              <MemberRow key={member.id} member={member} dimmed />
            ))}
          </MemberGroup>
        ) : null}
      </div>

      <div className="flex items-center gap-2 bg-rail px-2 py-2">
        <UserAvatar
          username={currentUser.username}
          accentColor={currentUser.accentColor}
          status={currentUser.status}
          size="sm"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{currentUser.username}</p>
          <p className="truncate text-xs text-muted-foreground">Online</p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          aria-label="Sair"
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-destructive"
        >
          <LogOut className="size-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  )
}

function MemberGroup({
  title,
  count,
  children,
}: {
  title: string
  count: number
  children: React.ReactNode
}) {
  return (
    <section className="mb-4">
      <h3 className="mb-1 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title} — {count}
      </h3>
      <ul className="flex flex-col">{children}</ul>
    </section>
  )
}

function MemberRow({
  member,
  isCurrentUser = false,
  dimmed = false,
}: {
  member: User
  isCurrentUser?: boolean
  dimmed?: boolean
}) {
  return (
    <li>
      <div
        className={`flex items-center gap-3 rounded-md px-2 py-1.5 transition hover:bg-accent ${
          dimmed ? "opacity-40" : ""
        }`}
      >
        <UserAvatar
          username={member.username}
          accentColor={member.accentColor}
          status={member.status}
          size="sm"
        />
        <span className="truncate text-sm font-medium text-foreground">
          {member.username}
          {isCurrentUser ? <span className="text-muted-foreground"> (você)</span> : null}
        </span>
      </div>
    </li>
  )
}
