import { Response } from "express";
import { BoardFindByIdRequest } from "./validator";
import { findBoardById } from "@useCases/board";
import { ConstStatusCode } from "@kanban-types/status-code";

export async function findById(req: BoardFindByIdRequest, res: Response) {
    try {
        const boardId = req.params.id;
        const board = await findBoardById(boardId);
        return res.status(ConstStatusCode.ok).send(board);
    } catch (error) {
        console.error(error);
        return res.status(ConstStatusCode.serverError).send();
    }
}
