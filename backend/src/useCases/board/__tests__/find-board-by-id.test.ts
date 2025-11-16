import { findBoardById } from "@useCases/board/find-board-by-id";
import { Board } from "@domain/board";
import { boardRepository } from "@database/prisma/repositories";

jest.mock("@database/prisma/repositories", () => ({
    boardRepository: {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
    },
}));

describe("findBoardById", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve retornar um board pelo id", async () => {
        const board: Board = { id: 1, name: "Projeto A" };
        (boardRepository.findById as unknown as jest.Mock).mockResolvedValue(board);

        const result = await findBoardById(1);

        expect(boardRepository.findById).toHaveBeenCalledWith(1);
        expect(result).toEqual(board);
    });

    it("deve propagar erro do repository", async () => {
        const error = new Error("findById error");
        (boardRepository.findById as unknown as jest.Mock).mockRejectedValue(error);

        await expect(findBoardById(999)).rejects.toThrow(error);
    });
});