import { createBoard } from "@useCases/board/create-board";
import { Board, CreateBoardDTO } from "@domain/board";
import { boardRepository } from "@database/prisma/repositories";

jest.mock("@database/prisma/repositories", () => ({
    boardRepository: {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
    },
}));

describe("createBoard", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve criar um board via repository", async () => {
        const dto: CreateBoardDTO = { name: "Projeto A" };
        const board: Board = { id: 1, name: "Projeto A" };
        (boardRepository.create as unknown as jest.Mock).mockResolvedValue(board);

        const result = await createBoard(dto);

        expect(boardRepository.create).toHaveBeenCalledWith(dto);
        expect(result).toEqual(board);
    });

    it("deve propagar erro do repository", async () => {
        const error = new Error("create error");
        (boardRepository.create as unknown as jest.Mock).mockRejectedValue(error);

        await expect(createBoard({ name: "X" })).rejects.toThrow(error);
        expect(boardRepository.create).toHaveBeenCalledTimes(1);
    });
});