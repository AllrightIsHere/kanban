import axios from "axios";
import type {
  Board,
  Card,
  CreateCardDTO,
  UpdateCardDTO,
  MoveCardDTO,
  CreateBoardDTO,
  CreateColumnDTO,
  Column,
} from "../types";
import { API_BASE_URL } from "../constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const boardService = {
  getAll: async (): Promise<Board[]> => {
    const response = await api.get<Board[]>("/boards");
    return response.data;
  },

  getById: async (id: number): Promise<Board> => {
    const response = await api.get<Board>(`/boards/${id}`);
    return response.data;
  },

  create: async (data: CreateBoardDTO): Promise<Board> => {
    const response = await api.post<Board>("/boards", data);
    return response.data;
  },

  createColumn: async (
    boardId: number,
    data: CreateColumnDTO
  ): Promise<Column> => {
    const response = await api.post<Column>(`/boards/${boardId}/columns`, data);
    return response.data;
  },
};

export const cardService = {
  create: async (columnId: number, data: CreateCardDTO): Promise<Card> => {
    const response = await api.post<Card>(`/columns/${columnId}/cards`, data);
    return response.data;
  },

  update: async (id: number, data: UpdateCardDTO): Promise<Card> => {
    const response = await api.put<Card>(`/cards/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/cards/${id}`);
  },

  move: async (id: number, data: MoveCardDTO): Promise<Card> => {
    const response = await api.patch<Card>(`/cards/${id}/move`, data);
    return response.data;
  },
};
