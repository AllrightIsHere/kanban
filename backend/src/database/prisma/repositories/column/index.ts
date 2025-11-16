import { prisma } from "@database/prisma/client";
import { ColumnRepository } from "@domain/column";

const columnModel = prisma.column;

export function makeColumnRepository(model = columnModel): ColumnRepository {
    return {
        async create(data) {
            return model.create({ data });
        },
    };
}

export const columnRepository = makeColumnRepository();
