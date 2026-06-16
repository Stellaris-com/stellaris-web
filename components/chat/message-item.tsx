import { UserAvatar } from "@/components/shared/user-avatar"
import type { Message } from "@/lib/types/domain"

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
}

/** Uma mensagem no chat (apresentação pura). */
export function MessageItem({ message }: { message: Message }) {
  return (
    <article className="flex gap-3 rounded-md px-2 py-1.5 transition hover:bg-card/40">
      <UserAvatar
        username={message.author.username}
        accentColor={message.author.accentColor}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-foreground">
            {message.author.username}
          </span>
          <time
            dateTime={message.createdAt}
            className="text-xs text-muted-foreground"
          >
            {formatTime(message.createdAt)}
          </time>
        </div>
        <p className="text-sm leading-relaxed text-foreground/90 break-words">
          {message.content}
        </p>
      </div>
    </article>
  )
}
