import { updateCard } from "@useCases/card/update-card";
import { Card, UpdateCardDTO } from "@domain/card";
import { cardRepository } from "@database/prisma/repositories";

jest.mock("@database/prisma/repositories", () => ({
    cardRepository: {
        create: jest.fn(),
        delete: jest.fn(),
        update: jest.fn(),
        move: jest.fn(),
    },
}));

describe("updateCard", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve atualizar um card", async () => {
        const dto: UpdateCardDTO = { title: "Task updated", description: "desc" };
        const updated: Card = { id: 1, title: "Task updated", description: "desc", columnId: 1 };
        (cardRepository.update as unknown as jest.Mock).mockResolvedValue(updated);

        const result = await updateCard(1, dto);

        expect(cardRepository.update).toHaveBeenCalledWith(1, dto);
        expect(result).toEqual(updated);
    });

    it("deve propagar erro do repository", async () => {
        const error = new Error("update error");
        (cardRepository.update as unknown as jest.Mock).mockRejectedValue(error);

        await expect(updateCard(1, { title: "X" })).rejects.toThrow(error);
    });
});