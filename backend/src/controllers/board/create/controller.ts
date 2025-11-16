import { Response } from "express";
import { BoardCreateRequest } from "./validator";
import { createBoard } from "@useCases/board";
import { ConstStatusCode } from "@kanban-types/status-code";

export async function create(req: BoardCreateRequest, res: Response) {
    try {
        const createDTO = req.body;
        const board = await createBoard(createDTO);
        return res.status(ConstStatusCode.created).send(board);
    } catch (error) {
        console.error(error);
        return res.status(ConstStatusCode.serverError).send();
    }
}
