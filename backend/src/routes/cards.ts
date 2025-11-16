import { Router } from "express";
import { CardController } from "@controllers/card";

export function getCardsRouter(): Router {
    const router = Router();

    router.put("/:id", CardController.updateValidator, CardController.update);

    router.delete("/:id", CardController.removeValidator, CardController.remove);

    router.patch("/:id/move", CardController.moveValidator, CardController.move);

    return router;
}
