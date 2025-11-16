import { Card } from "./entity";

export type CreateCardDTO = Omit<Card, "id" | "column">;

export type UpdateCardDTO = Omit<Card, "id" | "column" | "columnId">;
