import { UserAvatar } from "@/components/shared/user-avatar";
import type { ChatMessage } from "@/lib/types/domain";
import { formatDateTime, getUserAccentColor } from "@/lib/utils";

/** Uma mensagem no chat (apresentação pura). */
export function MessageItem({ message }: { message: ChatMessage }) {
  return (
    <article className="flex gap-3 rounded-md px-2 py-1.5 transition hover:bg-card/40">
      <UserAvatar
        username={message.user.id}
        accentColor={getUserAccentColor(message.user.id)}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-foreground">
            {message.user.username}
          </span>
          <time
            dateTime={message.createdAt}
            className="text-xs text-muted-foreground"
          >
            {formatDateTime(message.createdAt)}
          </time>
        </div>
        <p className="text-sm leading-relaxed text-foreground/90 wrap-break-words">
          {message.message}
        </p>
      </div>
    </article>
  );
}
