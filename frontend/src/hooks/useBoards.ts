import { useState, useCallback } from "react";
import { boardService } from "../services/api";
import type { Board, CreateBoardDTO, CreateColumnDTO } from "../types";
import { ERROR_MESSAGES } from "../constants";
import { handleApiError, logError } from "../utils/errorHandler";

export function useBoards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadBoards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await boardService.getAll();
      setBoards(data);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(ERROR_MESSAGES.LOAD_BOARDS);
      logError(err, "loadBoards");
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadBoard = useCallback(async (id: number) => {
    try {
      setError(null);
      const data = await boardService.getById(id);
      setSelectedBoard(data);
      return data;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(ERROR_MESSAGES.LOAD_BOARD);
      logError(err, "loadBoard");
      throw new Error(errorMessage);
    }
  }, []);

  const createBoard = useCallback(
    async (data: CreateBoardDTO): Promise<Board> => {
      try {
        setError(null);
        const newBoard = await boardService.create(data);
        await loadBoards();
        return newBoard;
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(ERROR_MESSAGES.CREATE_BOARD);
        logError(err, "createBoard");
        throw new Error(errorMessage);
      }
    },
    [loadBoards]
  );

  const createColumn = useCallback(
    async (boardId: number, data: CreateColumnDTO) => {
      try {
        setError(null);
        await boardService.createColumn(boardId, data);
        await loadBoard(boardId);
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(ERROR_MESSAGES.CREATE_COLUMN);
        logError(err, "createColumn");
        throw new Error(errorMessage);
      }
    },
    [loadBoard]
  );

  return {
    boards,
    selectedBoard,
    loading,
    error,
    loadBoards,
    loadBoard,
    createBoard,
    createColumn,
    setSelectedBoard,
    setError,
  };
}
