import type { Column } from "./column";

export interface Card {
  id: number;
  title: string;
  description?: string;
  columnId: number;
  column?: Column;
}

export interface CreateCardDTO {
  title: string;
  description?: string;
}

export interface UpdateCardDTO {
  title?: string;
  description?: string;
}

export interface MoveCardDTO {
  newColumnId: number;
}
