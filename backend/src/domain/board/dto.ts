import { Board } from "./entity";

export type CreateBoardDTO = Omit<Board, "id" | "columns">;
