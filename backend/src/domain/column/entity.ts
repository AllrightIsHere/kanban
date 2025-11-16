import { Board } from "@domain/board";
import { Card } from "@domain/card";

export interface Column {
    id: number;
    name: string;
    boardId: number;

    board?: Board;
    cards?: Card[];
}
