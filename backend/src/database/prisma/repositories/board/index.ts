import { prisma } from "@database/prisma/client";
import { BoardRepository } from "@domain/board";

const boardModel = prisma.board;

export function makeBoardRepository(model = boardModel): BoardRepository {
    return {
        async create(data) {
            return model.create({ data });
        },
        async findById(id) {
            return model.findUniqueOrThrow({
                where: {
                    id,
                },
                include: {
                    columns: {
                        include: {
                            cards: {
                                orderBy: {
                                    id: "asc",
                                },
                            },
                        },
                        orderBy: {
                            id: "asc",
                        },
                    },
                },
            });
        },
        async findAll() {
            return model.findMany({
                include: {
                    columns: {
                        include: {
                            cards: {
                                orderBy: {
                                    id: "asc",
                                },
                            },
                        },
                        orderBy: {
                            id: "asc",
                        },
                    },
                },
                orderBy: {
                    id: "asc",
                },
            });
        },
    };
}

export const boardRepository = makeBoardRepository();
