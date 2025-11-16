import { Router } from "express";
import { BoardController } from "@controllers/board";

export function getBoardsRouter(): Router {
    const router = Router();

    router.post("/", BoardController.createValidator, BoardController.create);

    router.get("/", BoardController.findAll);

    router.get("/:id", BoardController.findByIdValidator, BoardController.findById);

    router.post(
        "/:id/columns",
        BoardController.createColumnValidator,
        BoardController.createColumn,
    );

    return router;
}
