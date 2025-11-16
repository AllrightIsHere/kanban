import { Column } from "./entity";

export type CreateColumnDTO = Omit<Column, "id" | "board" | "cards">;
