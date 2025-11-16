import { BoardRepository } from "@domain/board";
import { boardRepository } from "@database/prisma/repositories";

function makeFindAllBoards(findAll: BoardRepository["findAll"]) {
    return async () => {
        return await findAll();
    };
}

export const findAllBoards = makeFindAllBoards(boardRepository.findAll);
