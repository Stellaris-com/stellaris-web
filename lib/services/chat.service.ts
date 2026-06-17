/**
 * Service de chat: aplica normalização simples e devolve o modelo de domínio.
 */
import {
  fetchRoomMessagesRequest,
  sendRoomMessageRequest,
} from "@/lib/request/chat.request";
import { ChatMessageResponseDTO } from "../types/dto";
import { ChatMessage } from "../types/domain";

function mapChatMessage(dto: ChatMessageResponseDTO): ChatMessage {
  return {
    id: dto.id,
    message: dto.message,
    createdAt: dto.createdAt,
    user: {
      id: dto.user.id,
      username: dto.user.username,
    },
  };
}

export const chatService = {
  async listMessages(
    accessToken: string,
    roomId: string,
  ): Promise<ChatMessage[]> {
    const dtos = await fetchRoomMessagesRequest(accessToken, roomId);

    return dtos
      .map(mapChatMessage)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
  },

  async sendMessage(
    accessToken: string,
    roomId: string,
    message: string,
  ): Promise<ChatMessage> {
    const dto = await sendRoomMessageRequest(accessToken, roomId, {
      message,
    });

    return mapChatMessage(dto);
  },
};
