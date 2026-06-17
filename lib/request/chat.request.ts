/**
 * Requests de chat: apenas acesso bruto à API.
 */
import { ChatMessageResponseDTO } from "../types/dto";
import { httpClient } from "./http-client";

export interface SendChatMessageBody {
  message: string;
}

export function fetchRoomMessagesRequest(
  accessToken: string,
  roomId: string,
): Promise<ChatMessageResponseDTO[]> {
  return httpClient.get<ChatMessageResponseDTO[]>(`/messages/${roomId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export function sendRoomMessageRequest(
  accessToken: string,
  roomId: string,
  body: SendChatMessageBody,
): Promise<ChatMessageResponseDTO> {
  return httpClient.post<ChatMessageResponseDTO>(`/messages/${roomId}`, body, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
