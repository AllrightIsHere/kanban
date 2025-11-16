import { Response } from "express";
import { CardRemoveRequest } from "./validator";
import { removeCard } from "@useCases/card";
import { ConstStatusCode } from "@kanban-types/status-code";

export async function remove(req: CardRemoveRequest, res: Response) {
    try {
        const cardId = req.params.id;
        const isDeleted = await removeCard(cardId);
        return res.status(ConstStatusCode.accepted).send(isDeleted);
    } catch (error) {
        console.error(error);
        return res.status(ConstStatusCode.serverError).send();
    }
}
