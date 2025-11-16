import { Column } from "@domain/column";

export interface Card {
    id: number;
    title: string;
    description?: string;
    columnId: number;

    column?: Column;
}
