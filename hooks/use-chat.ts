"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { chatService } from "@/lib/services/chat.service";
import { ChatMessage } from "@/lib/types/domain";

function appendUniqueMessage(previous: ChatMessage[], next: ChatMessage) {
  if (previous.some((message) => message.id === next.id)) {
    return previous;
  }

  return [...previous, next];
}

export function useChat(accessToken: string, roomId: string | null) {
  const clientRef = useRef<Client | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isSending, setSending] = useState(false);
  const [isConnected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = useCallback(async () => {
    if (!accessToken || !roomId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await chatService.listMessages(accessToken, roomId);
      setMessages(result);
    } catch {
      setError("Não foi possível carregar o histórico do chat.");
    } finally {
      setLoading(false);
    }
  }, [accessToken, roomId]);

  useEffect(() => {
    void loadMessages();
  }, [loadMessages]);

  useEffect(() => {
    if (!roomId) {
      setConnected(false);
      return;
    }

    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      setConnected(true);
      setError(null);

      client.subscribe(`/topic/rooms/${roomId}`, (frame) => {
        try {
          const payload: ChatMessage = JSON.parse(frame.body);

          setMessages((previous) => appendUniqueMessage(previous, payload));
        } catch {
          setError("Recebemos uma mensagem inválida do WebSocket.");
        }
      });
    };

    client.onStompError = () => {
      setError("Erro ao estabelecer comunicação STOMP.");
    };

    client.onWebSocketError = () => {
      setError("Erro na conexão WebSocket.");
    };

    client.onWebSocketClose = () => {
      setConnected(false);
    };

    clientRef.current = client;
    client.activate();

    return () => {
      setConnected(false);
      clientRef.current = null;
      void client.deactivate();
    };
  }, [roomId]);

  const sendMessage = useCallback(
    async (messageText: string) => {
      if (!accessToken || !roomId) {
        return null;
      }

      const message = messageText.trim();
      if (!message) {
        return null;
      }

      setSending(true);
      setError(null);

      try {
        const createdMessage = await chatService.sendMessage(
          accessToken,
          roomId,
          message,
        );

        setMessages((previous) =>
          appendUniqueMessage(previous, createdMessage),
        );

        return createdMessage;
      } catch {
        setError("Não foi possível enviar a mensagem.");
        throw new Error("send_message_failed");
      } finally {
        setSending(false);
      }
    },
    [accessToken, roomId],
  );

  return {
    messages,
    isLoading,
    isSending,
    isConnected,
    error,
    sendMessage,
    refresh: loadMessages,
  };
}
