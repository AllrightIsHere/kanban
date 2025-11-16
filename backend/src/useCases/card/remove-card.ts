import { CardRepository } from "@domain/card";
import { cardRepository } from "@database/prisma/repositories";

function makeRemoveCard(remove: CardRepository["delete"]) {
    return async (id: number) => {
        return await remove(id);
    };
}

export const removeCard = makeRemoveCard(cardRepository.delete);
