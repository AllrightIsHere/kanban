import { useCallback } from "react";
import { cardService } from "../services/api";
import type { Card, CreateCardDTO, UpdateCardDTO, MoveCardDTO } from "../types";
import { ERROR_MESSAGES } from "../constants";
import { handleApiError, logError } from "../utils/errorHandler";

interface UseCardsOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useCards(options: UseCardsOptions = {}) {
  const { onSuccess, onError } = options;

  const createCard = useCallback(
    async (columnId: number, data: CreateCardDTO): Promise<Card> => {
      try {
        const card = await cardService.create(columnId, data);
        onSuccess?.();
        return card;
      } catch (err) {
        const errorMessage = handleApiError(err);
        const message = ERROR_MESSAGES.CREATE_CARD;
        logError(err, "createCard");
        onError?.(message);
        throw new Error(errorMessage);
      }
    },
    [onSuccess, onError]
  );

  const updateCard = useCallback(
    async (id: number, data: UpdateCardDTO): Promise<Card> => {
      try {
        const card = await cardService.update(id, data);
        onSuccess?.();
        return card;
      } catch (err) {
        const errorMessage = handleApiError(err);
        const message = ERROR_MESSAGES.UPDATE_CARD;
        logError(err, "updateCard");
        onError?.(message);
        throw new Error(errorMessage);
      }
    },
    [onSuccess, onError]
  );

  const deleteCard = useCallback(
    async (id: number): Promise<void> => {
      try {
        await cardService.delete(id);
        onSuccess?.();
      } catch (err) {
        const errorMessage = handleApiError(err);
        const message = ERROR_MESSAGES.DELETE_CARD;
        logError(err, "deleteCard");
        onError?.(message);
        throw new Error(errorMessage);
      }
    },
    [onSuccess, onError]
  );

  const moveCard = useCallback(
    async (id: number, data: MoveCardDTO): Promise<Card> => {
      try {
        const card = await cardService.move(id, data);
        onSuccess?.();
        return card;
      } catch (err) {
        const errorMessage = handleApiError(err);
        const message = ERROR_MESSAGES.MOVE_CARD;
        logError(err, "moveCard");
        onError?.(message);
        throw new Error(errorMessage);
      }
    },
    [onSuccess, onError]
  );

  return {
    createCard,
    updateCard,
    deleteCard,
    moveCard,
  };
}
