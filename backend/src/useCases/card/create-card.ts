import { CardRepository, CreateCardDTO } from "@domain/card";
import { cardRepository } from "@database/prisma/repositories";

function makeCreateCard(create: CardRepository["create"]) {
    return async (cardDTO: CreateCardDTO) => {
        return await create(cardDTO);
    };
}

export const createCard = makeCreateCard(cardRepository.create);
