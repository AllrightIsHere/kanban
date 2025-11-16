import { createCard } from "@useCases/card/create-card";
import { Card, CreateCardDTO } from "@domain/card";
import { cardRepository } from "@database/prisma/repositories";

jest.mock("@database/prisma/repositories", () => ({
    cardRepository: {
        create: jest.fn(),
        delete: jest.fn(),
        update: jest.fn(),
        move: jest.fn(),
    },
}));

describe("createCard", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve criar um card via repository", async () => {
        const dto: CreateCardDTO = { title: "Task", description: "desc", columnId: 1 };
        const card: Card = { id: 1, title: "Task", description: "desc", columnId: 1 };
        (cardRepository.create as unknown as jest.Mock).mockResolvedValue(card);

        const result = await createCard(dto);

        expect(cardRepository.create).toHaveBeenCalledWith(dto);
        expect(result).toEqual(card);
    });

    it("deve propagar erro do repository", async () => {
        const error = new Error("create error");
        (cardRepository.create as unknown as jest.Mock).mockRejectedValue(error);

        await expect(createCard({ title: "X", columnId: 1 })).rejects.toThrow(error);
        expect(cardRepository.create).toHaveBeenCalledTimes(1);
    });
});