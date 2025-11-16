import { removeCard } from "@useCases/card/remove-card";
import { cardRepository } from "@database/prisma/repositories";

jest.mock("@database/prisma/repositories", () => ({
    cardRepository: {
        create: jest.fn(),
        delete: jest.fn(),
        update: jest.fn(),
        move: jest.fn(),
    },
}));

describe("removeCard", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve remover um card com sucesso (true)", async () => {
        (cardRepository.delete as unknown as jest.Mock).mockResolvedValue(true);

        const result = await removeCard(1);

        expect(cardRepository.delete).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });

    it("deve retornar false quando não remover", async () => {
        (cardRepository.delete as unknown as jest.Mock).mockResolvedValue(false);

        const result = await removeCard(1);

        expect(result).toBe(false);
    });

    it("deve propagar erro do repository", async () => {
        const error = new Error("delete error");
        (cardRepository.delete as unknown as jest.Mock).mockRejectedValue(error);

        await expect(removeCard(999)).rejects.toThrow(error);
    });
});