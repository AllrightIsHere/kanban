import { Response } from "express";
import { CardUpdateRequest } from "./validator";
import { updateCard } from "@useCases/card";
import { ConstStatusCode } from "@kanban-types/status-code";

export async function update(req: CardUpdateRequest, res: Response) {
    try {
        const updateDTO = req.body;
        const cardId = req.params.id;
        const card = await updateCard(cardId, updateDTO);
        return res.status(ConstStatusCode.ok).send(card);
    } catch (error) {
        console.error(error);
        return res.status(ConstStatusCode.serverError).send();
    }
}
