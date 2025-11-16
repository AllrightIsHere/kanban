import { createColumn } from "@useCases/column/create-column";
import { Column, CreateColumnDTO } from "@domain/column";
import { columnRepository } from "@database/prisma/repositories";

jest.mock("@database/prisma/repositories", () => ({
    columnRepository: {
        create: jest.fn(),
    },
}));

describe("createColumn", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve criar uma coluna via repository", async () => {
        const dto: CreateColumnDTO = { name: "To Do", boardId: 1 };
        const column: Column = { id: 1, name: "To Do", boardId: 1 };
        (columnRepository.create as unknown as jest.Mock).mockResolvedValue(column);

        const result = await createColumn(dto);

        expect(columnRepository.create).toHaveBeenCalledWith(dto);
        expect(result).toEqual(column);
    });

    it("deve propagar erro do repository", async () => {
        const error = new Error("create column error");
        (columnRepository.create as unknown as jest.Mock).mockRejectedValue(error);

        await expect(createColumn({ name: "X", boardId: 1 })).rejects.toThrow(error);
    });
});