"use client"

/**
 * Hook central de chat em tempo real.
 *
 * Orquestra o `chatService`: conecta o WebSocket quando há sessão, entra no
 * servidor selecionado, mantém o estado de mensagens/membros/conexão e expõe
 * a ação de enviar mensagem. A UI permanece 100% declarativa.
 */
import { useCallback, useEffect, useState } from "react"
import { chatService } from "@/lib/services/chat.service"
import type { ConnectionStatus, Message, User } from "@/lib/types/domain"

export function useChat(token: string | null, serverId: string | null) {
  const [status, setStatus] = useState<ConnectionStatus>("idle")
  const [messages, setMessages] = useState<Message[]>([])
  const [members, setMembers] = useState<User[]>([])

  // Ciclo de vida da conexão: abre ao receber o token, fecha ao desmontar.
  useEffect(() => {
    if (!token) return
    const unsubscribe = chatService.onStatusChange(setStatus)
    chatService.connect(token)
    setStatus(chatService.getStatus())
    return () => {
      unsubscribe()
      chatService.disconnect()
    }
  }, [token])

  // Entra no servidor selecionado e assina seus eventos quando conectado.
  useEffect(() => {
    if (!serverId || status !== "connected") return

    setMessages([])
    setMembers([])

    const offHistory = chatService.onHistory(serverId, setMessages)
    const offMessage = chatService.onMessage(serverId, (message) =>
      setMessages((prev) => [...prev, message]),
    )
    const offPresence = chatService.onPresence(serverId, setMembers)

    chatService.joinServer(serverId)

    return () => {
      offHistory()
      offMessage()
      offPresence()
    }
  }, [serverId, status])

  const sendMessage = useCallback(
    (content: string) => {
      if (!serverId) return
      chatService.sendMessage(serverId, content)
    },
    [serverId],
  )

  return { status, messages, members, sendMessage }
}
