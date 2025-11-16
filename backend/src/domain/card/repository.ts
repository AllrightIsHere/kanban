import { CreateCardDTO, UpdateCardDTO } from "./dto";
import { Card } from "./entity";

export interface CardRepository {
    create: (cardDTO: CreateCardDTO) => Promise<Card>;
    delete: (id: number) => Promise<boolean>;
    update: (id: number, cardDTO: UpdateCardDTO) => Promise<Card>;
    move: (id: number, columnId: number) => Promise<Card>;
}
