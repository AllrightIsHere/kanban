import { BoardRepository, CreateBoardDTO } from "@domain/board";
import { boardRepository } from "@database/prisma/repositories";

function makeCreateBoard(create: BoardRepository["create"]) {
    return async (boardDto: CreateBoardDTO) => {
        return await create(boardDto);
    };
}

export const createBoard = makeCreateBoard(boardRepository.create);
