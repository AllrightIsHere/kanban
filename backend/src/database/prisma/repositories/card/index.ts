import { prisma } from "@database/prisma/client";
import { CardRepository } from "@domain/card";

const cardModel = prisma.card;

export function makeCardRepository(model = cardModel): CardRepository {
    return {
        async create(data) {
            return model.create({ data });
        },
        async delete(id) {
            const deleted = await model.delete({ where: { id } });
            return !!deleted;
        },
        async update(id, cardDTO) {
            return model.update({
                where: { id },
                data: cardDTO,
            });
        },
        async move(id, columnId) {
            return model.update({
                where: { id },
                data: { columnId },
            });
        },
    };
}

export const cardRepository = makeCardRepository();
