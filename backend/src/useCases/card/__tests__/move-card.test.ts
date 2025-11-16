import { moveCard } from "@useCases/card/move-card";
import { Card } from "@domain/card";
import { cardRepository } from "@database/prisma/repositories";

jest.mock("@database/prisma/repositories", () => ({
    cardRepository: {
        create: jest.fn(),
        delete: jest.fn(),
        update: jest.fn(),
        move: jest.fn(),
    },
}));

describe("moveCard", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve mover um card para outra coluna", async () => {
        const updated: Card = { id: 1, title: "Task", columnId: 2 };
        (cardRepository.move as unknown as jest.Mock).mockResolvedValue(updated);

        const result = await moveCard(1, 2);

        expect(cardRepository.move).toHaveBeenCalledWith(1, 2);
        expect(result).toEqual(updated);
    });

    it("deve propagar erro do repository", async () => {
        const error = new Error("move error");
        (cardRepository.move as unknown as jest.Mock).mockRejectedValue(error);

        await expect(moveCard(1, 99)).rejects.toThrow(error);
    });
});