import { Router } from "express";
import { ColumnController } from "@controllers/column";

export function getColumnsRouter(): Router {
    const router = Router();

    router.post("/:id/cards", ColumnController.createCardValidator, ColumnController.createCard);

    return router;
}
