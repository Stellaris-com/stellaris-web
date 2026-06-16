"use client"

import { type FormEvent, type KeyboardEvent, useState } from "react"
import { SendHorizontal } from "lucide-react"

interface MessageInputProps {
  channelName: string
  disabled?: boolean
  onSend: (content: string) => void
}

/**
 * Caixa de envio de mensagem (apresentação pura).
 * Mantém apenas o texto digitado; o envio é delegado via `onSend`.
 */
export function MessageInput({ channelName, disabled = false, onSend }: MessageInputProps) {
  const [value, setValue] = useState("")

  function submit() {
    if (disabled || value.trim().length === 0) return
    onSend(value)
    setValue("")
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    submit()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 pb-6 pt-2">
      <div className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5">
        <input
          type="text"
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label={`Mensagem para #${channelName}`}
          placeholder={disabled ? "Conectando ao servidor..." : `Conversar em #${channelName}`}
          className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={disabled || value.trim().length === 0}
          aria-label="Enviar mensagem"
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <SendHorizontal className="size-5" aria-hidden="true" />
        </button>
      </div>
    </form>
  )
}
