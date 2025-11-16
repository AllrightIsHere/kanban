import { Response } from "express";
import { ColumnCreateCardRequest } from "./validator";
import { createCard as createCardUseCase } from "@useCases/card";
import { ConstStatusCode } from "@kanban-types/status-code";

export async function createCard(req: ColumnCreateCardRequest, res: Response) {
    try {
        const createDTO = req.body;
        const columnId = req.params.id;
        const card = await createCardUseCase({ ...createDTO, columnId });
        return res.status(ConstStatusCode.created).send(card);
    } catch (error) {
        console.error(error);
        return res.status(ConstStatusCode.serverError).send();
    }
}
