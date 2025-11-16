import { findAllBoards } from "@useCases/board/find-all-boards";
import { Board } from "@domain/board";
import { boardRepository } from "@database/prisma/repositories";

jest.mock("@database/prisma/repositories", () => ({
    boardRepository: {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
    },
}));

describe("findAllBoards", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve retornar todos os boards", async () => {
        const boards: Board[] = [
            { id: 1, name: "Projeto A" },
            { id: 2, name: "Projeto B" },
        ];
        (boardRepository.findAll as unknown as jest.Mock).mockResolvedValue(boards);

        const result = await findAllBoards();

        expect(boardRepository.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(boards);
    });

    it("deve propagar erro do repository", async () => {
        const error = new Error("findAll error");
        (boardRepository.findAll as unknown as jest.Mock).mockRejectedValue(error);

        await expect(findAllBoards()).rejects.toThrow(error);
    });
});