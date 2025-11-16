import { CardRepository } from "@domain/card";
import { cardRepository } from "@database/prisma/repositories";

function makeMoveCard(move: CardRepository["move"]) {
    return async (id: number, columnId: number) => {
        return await move(id, columnId);
    };
}

export const moveCard = makeMoveCard(cardRepository.move);
