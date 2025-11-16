import type { Board } from "./board";
import type { Card } from "./card";

export interface Column {
  id: number;
  name: string;
  boardId: number;
  board?: Board;
  cards?: Card[];
}

export interface CreateColumnDTO {
  name: string;
}
