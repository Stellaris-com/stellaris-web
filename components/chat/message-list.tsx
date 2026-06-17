"use client"

import { useEffect, useRef } from "react"
import { Hash } from "lucide-react"
import type { ChatMessage, Message } from "@/lib/types/domain"
import { MessageItem } from "./message-item"

interface MessageListProps {
  messages: ChatMessage[]
  channelName: string
}

/**
 * Lista rolável de mensagens. A regra de auto-scroll para o fim é puramente de
 * renderização, então vive no componente de apresentação.
 */
export function MessageList({ messages, channelName }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <div className="mb-6 flex flex-col gap-2 border-b border-border pb-6">
        <span className="flex size-16 items-center justify-center rounded-full bg-card text-muted-foreground">
          <Hash className="size-8" aria-hidden="true" />
        </span>
        <h2 className="text-2xl font-bold text-foreground">Bem-vindo a #{channelName}</h2>
        <p className="text-sm text-muted-foreground">
          Este é o início do canal #{channelName}. Diga olá!
        </p>
      </div>

      <div className="flex flex-col gap-0.5">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>

      <div ref={bottomRef} />
    </div>
  )
}
