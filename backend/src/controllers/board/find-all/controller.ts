import { Response, Request } from "express";
import { findAllBoards } from "@useCases/board";
import { ConstStatusCode } from "@kanban-types/status-code";

export async function findAll(req: Request, res: Response) {
    try {
        const boards = await findAllBoards();
        return res.status(ConstStatusCode.ok).send(boards);
    } catch (error) {
        console.error(error);
        return res.status(ConstStatusCode.serverError).send();
    }
}
