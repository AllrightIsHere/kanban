import { CardRepository, UpdateCardDTO } from "@domain/card";
import { cardRepository } from "@database/prisma/repositories";

function makeUpdateCard(update: CardRepository["update"]) {
    return async (id: number, updateDTO: UpdateCardDTO) => {
        return await update(id, updateDTO);
    };
}

export const updateCard = makeUpdateCard(cardRepository.update);
