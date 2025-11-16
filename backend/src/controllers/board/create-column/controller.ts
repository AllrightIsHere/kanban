import { Response } from "express";
import { BoardCreateColumnRequest } from "./validator";
import { createColumn as createColumnUseCase } from "@useCases/column";
import { ConstStatusCode } from "@kanban-types/status-code";

export async function createColumn(req: BoardCreateColumnRequest, res: Response) {
    try {
        const createDTO = req.body;
        const boardId = req.params.id;
        const board = await createColumnUseCase({ ...createDTO, boardId });
        return res.status(ConstStatusCode.created).send(board);
    } catch (error) {
        console.error(error);
        return res.status(ConstStatusCode.serverError).send();
    }
}
