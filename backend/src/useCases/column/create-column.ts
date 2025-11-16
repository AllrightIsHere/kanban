import { ColumnRepository, CreateColumnDTO } from "@domain/column";
import { columnRepository } from "@database/prisma/repositories";

function makeCreateColumn(create: ColumnRepository["create"]) {
    return async (columnDTO: CreateColumnDTO) => {
        return await create(columnDTO);
    };
}

export const createColumn = makeCreateColumn(columnRepository.create);
