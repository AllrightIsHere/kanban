import { Column } from "@domain/column";

export interface Board {
    id: number;
    name: string;

    columns?: Column[];
}
