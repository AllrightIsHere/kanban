import { Response } from "express";
import { CardMoveRequest } from "./validator";
import { moveCard } from "@useCases/card";
import { ConstStatusCode } from "@kanban-types/status-code";

export async function move(req: CardMoveRequest, res: Response) {
    try {
        const columnId = req.body.newColumnId;
        const cardId = req.params.id;
        const card = await moveCard(cardId, columnId);
        return res.status(ConstStatusCode.ok).send(card);
    } catch (error) {
        console.error(error);
        return res.status(ConstStatusCode.serverError).send();
    }
}
