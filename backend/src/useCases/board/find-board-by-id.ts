import { BoardRepository } from "@domain/board";
import { boardRepository } from "@database/prisma/repositories";

function makeFindBoardById(findById: BoardRepository["findById"]) {
    return async (id: number) => {
        return await findById(id);
    };
}

export const findBoardById = makeFindBoardById(boardRepository.findById);
